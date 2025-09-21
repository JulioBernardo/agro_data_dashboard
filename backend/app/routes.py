from flask import Blueprint, jsonify, request
import pandas as pd
import requests
import math
import openpyxl
from app.services.ibge_consult import IBGEClient
from app.services.data_processor import DataProcessor
from app.config import Config
from flask_cors import CORS


# Cria uma instância de Blueprint.
bp = Blueprint("main", __name__)
CORS(bp, resources={r"/api/*": {"origins": "*"}})
ibge = IBGEClient()

# Define a rota para buscar os filtros de uma tabela específica.
@bp.route("/api/filtros/<tabela>", methods=["GET"])
def get_filtros(tabela):
    tabela_str = str(tabela)

    if tabela_str not in Config.TABLES:
        return jsonify({"error": "Tabela inválida"}), 400

    table_id = Config.TABLES[tabela_str]

    culturas_estaticas = {
        1612: [
            "2688 Abacaxi*", "40471 Alfafa fenada [1974 a 1987]",
            "2689 Algodão herbáceo (em caroço)", "2690 Alho", "2691 Amendoim (em casca)",
            "2692 Arroz (em casca)", "2693 Aveia (em grão)", "2694 Batata-doce",
            "2695 Batata-inglesa", "2696 Cana-de-açúcar",
            "40470 Cana para forragem [1974 a 1987]", "2697 Cebola", "2698 Centeio (em grão)",
            "2699 Cevada (em grão)", "2700 Ervilha (em grão) [1988 a 2024]",
            "2701 Fava (em grão)", "2702 Feijão (em grão)", "2703 Fumo (em folha)",
            "109179 Girassol (em grão) [2005 a 2024]", "2704 Juta (fibra)",
            "2705 Linho (semente)", "2706 Malva (fibra)", "2707 Mamona (baga)",
            "2708 Mandioca", "2709 Melancia", "2710 Melão", "2711 Milho (em grão)",
            "2712 Rami (fibra)", "2713 Soja (em grão)", "2714 Sorgo (em grão)",
            "2715 Tomate", "2716 Trigo (em grão)", "109180 Triticale (em grão) [2005 a 2024]"
        ],
        1613: [
            "2717 Abacate", "2718 Algodão arbóreo (em caroço)",
            "45981 Açaí [2015 a 2024]", "2719 Azeitona", "2720 Banana (cacho)",
            "2721 Borracha (látex coagulado) [1981 a 2024]",
            "40472 Borracha (látex líquido) [1981 a 1987]",
            "2722 Cacau (em amêndoa)", "2723 Café (em grão) Total",
            "31619 Café (em grão) Arábica [2012 a 2024]",
            "31620 Café (em grão) Canephora [2012 a 2024]",
            "40473 Caju [1974 a 1987]", "2724 Caqui",
            "2725 Castanha de caju [1988 a 2024]",
            "2726 Chá-da-índia (folha verde)", "2727 Coco-da-baía*",
            "2728 Dendê (cacho de coco) [1988 a 2024]",
            "2729 Erva-mate (folha verde) [1981 a 2024]", "2730 Figo",
            "2731 Goiaba [1988 a 2024]",
            "2732 Guaraná (semente) [1981 a 2024]", "2733 Laranja",
            "2734 Limão", "2735 Maçã", "2736 Mamão", "2737 Manga",
            "2738 Maracujá [1988 a 2024]", "2739 Marmelo",
            "2740 Noz (fruto seco)", "90001 Palmito [1981 a 2024]",
            "2741 Pera", "2742 Pêssego", "2743 Pimenta-do-reino",
            "2744 Sisal ou agave (fibra)", "2745 Tangerina",
            "2746 Tungue (fruto seco)", "2747 Urucum (semente) [1988 a 2024]",
            "2748 Uva"
        ],
    }

    try:
        raw = ibge.fetch_table(table_id, "all", "all", "n3[all]", "flat")
        df = DataProcessor.normalize(raw)
        
        if df is not None and not df.empty:
            anos = df['ano'].dropna().unique().tolist()
            anos = [str(int(a)) for a in anos if not pd.isna(a)]

            regioes = df['regiao'].dropna().unique().tolist()
            regioes = [str(r) for r in regioes if str(r).strip().lower() not in ["", "nan"]]
            
            culturas = culturas_estaticas.get(table_id, df['cultura'].dropna().unique().tolist())
            
            filtros_retorno = {
                "anos": anos,
                "culturas": culturas,
                "regioes": regioes,
                "estados": sorted([e for e in Config.LOCALIDADES_MAP.keys() if len(e) == 2])
            }
            return jsonify(filtros_retorno)
        else:
            return jsonify({"error": "Dados normalizados estão vazios ou nulos"}), 500
    except Exception as e:
        print(f"Erro ao buscar filtros para a tabela {tabela}: {e}")
        return jsonify({"error": "Erro interno do servidor"}), 500

@bp.route("/api/dados", methods=["GET"])
def get_dados():
    tabela = request.args.get("tabela")
    ano = request.args.get("ano")
    cultura = request.args.get("cultura")
    regiao = request.args.get("regiao")

    if not tabela or tabela not in Config.TABLES:
        return jsonify({"error": "Tabela inválida"}), 400

    table_id = Config.TABLES[tabela]

    # Período seguro: se não informado, usar últimos 50 períodos (negativo)
    periodo_ibge = ano if ano else "-50"

    # Localidade (região ou Brasil)
    if not regiao or regiao.lower() == "brasil":
        localidades = "BR"
    else:
        estado_id = Config.LOCALIDADES_MAP.get(regiao)
        if not estado_id:
            return jsonify({"error": f"Região inválida: {regiao}"}), 400
        localidades = f"{estado_id}"

    # Variáveis -> definir explicitamente (conforme doc da tabela 1612)
    variaveis = "109|1000109|216|1000216|214|112|215|1000215"

    # Cultura (classificação opcional)
    classificacao = None
    if cultura:
        cultura_cod = cultura.split()[0]   # ex.: "2696"
        classificacao = f"81[{cultura_cod}]"

    print(
        f"Parâmetros recebidos - Tabela: {table_id}, "
        f"Período: {periodo_ibge}, "
        f"Classificação: {classificacao}, "
        f"Localidade: {localidades}"
    )

    try:
        raw = ibge.fetch_table(
            table_id=table_id,
            periodos=periodo_ibge,          # agora vai no path
            variavel=variaveis,
            localidades=localidades,
            view="flat",
            classificacao=classificacao     # ex.: 81[2697]
        )

        print(f"Dados brutos recebidos: {raw}")  # Log dos dados brutos recebidos
        dados_processados = DataProcessor.normalize(raw)
    
        # Converter para JSON-friendly antes de retornar
        dados_json = dados_processados.to_dict(orient="records")

        # Salvar também para inspeção
        dados_processados.to_excel("dados_processados.xlsx", index=False)

        return jsonify(dados_json)


    except requests.HTTPError as e:
        # Mensagem detalhada do IBGE
        return jsonify({"error": f"Erro na requisição IBGE: {e.response.text}"}), e.response.status_code

    except Exception as e:
        return jsonify({"error": str(e)}), 500
