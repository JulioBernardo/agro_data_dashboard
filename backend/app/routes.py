from flask import Blueprint, jsonify, request
import pandas as pd
import math
import openpyxl
from app.services.ibge_consult import IBGEClient
from app.services.data_processor import DataProcessor
from app.config import Config

bp = Blueprint("main", __name__)
ibge = IBGEClient()

@bp.route("/api/filtros/<tabela>", methods=["GET"])
def get_filtros(tabela):
    tabela_str = str(tabela)

    if tabela_str not in Config.TABLES:
        return jsonify({"error": "Tabela inválida"}), 400

    table_id = Config.TABLES[tabela_str]

    # Dicionário com as culturas estáticas por tabela
    culturas_estaticas = {
        1612: [
            "2688  Abacaxi*",
            "40471  Alfafa fenada [1974 a 1987]",
            "2689  Algodão herbáceo (em caroço)",
            "2690  Alho",
            "2691  Amendoim (em casca)",
            "2692  Arroz (em casca)",
            "2693  Aveia (em grão)",
            "2694  Batata-doce",
            "2695  Batata-inglesa",
            "2696  Cana-de-açúcar",
            "40470  Cana para forragem [1974 a 1987]",
            "2697  Cebola",
            "2698  Centeio (em grão)",
            "2699  Cevada (em grão)",
            "2700  Ervilha (em grão) [1988 a 2024]",
            "2701  Fava (em grão)",
            "2702  Feijão (em grão)",
            "2703  Fumo (em folha)",
            "109179  Girassol (em grão) [2005 a 2024]",
            "2704  Juta (fibra)",
            "2705  Linho (semente)",
            "2706  Malva (fibra)",
            "2707  Mamona (baga)",
            "2708  Mandioca",
            "2709  Melancia",
            "2710  Melão",
            "2711  Milho (em grão)",
            "2712  Rami (fibra)",
            "2713  Soja (em grão)",
            "2714  Sorgo (em grão)",
            "2715  Tomate",
            "2716  Trigo (em grão)",
            "109180  Triticale (em grão) [2005 a 2024]"
        ],
        1613: [
            "2717  Abacate",
            "2718  Algodão arbóreo (em caroço)",
            "45981  Açaí [2015 a 2024]",
            "2719  Azeitona",
            "2720  Banana (cacho)",
            "2721  Borracha (látex coagulado) [1981 a 2024]",
            "40472  Borracha (látex líquido) [1981 a 1987]",
            "2722  Cacau (em amêndoa)",
            "2723  Café (em grão) Total",
            "31619  Café (em grão) Arábica [2012 a 2024]",
            "31620  Café (em grão) Canephora [2012 a 2024]",
            "40473  Caju [1974 a 1987]",
            "2724  Caqui",
            "2725  Castanha de caju [1988 a 2024]",
            "2726  Chá-da-índia (folha verde)",
            "2727  Coco-da-baía*",
            "2728  Dendê (cacho de coco) [1988 a 2024]",
            "2729  Erva-mate (folha verde) [1981 a 2024]",
            "2730  Figo",
            "2731  Goiaba [1988 a 2024]",
            "2732  Guaraná (semente) [1981 a 2024]",
            "2733  Laranja",
            "2734  Limão",
            "2735  Maçã",
            "2736  Mamão",
            "2737  Manga",
            "2738  Maracujá [1988 a 2024]",
            "2739  Marmelo",
            "2740  Noz (fruto seco)",
            "90001  Palmito [1981 a 2024]",
            "2741  Pera",
            "2742  Pêssego",
            "2743  Pimenta-do-reino",
            "2744  Sisal ou agave (fibra)",
            "2745  Tangerina",
            "2746  Tungue (fruto seco)",
            "2747  Urucum (semente) [1988 a 2024]",
            "2748  Uva"
        ],
        5457: [
            "40129  Abacate",
            "40092  Abacaxi*",
            "45982  Açaí [2015 a 2024]",
            "40329  Alfafa fenada [1974 a 1987]",
            "40130  Algodão arbóreo (em caroço)",
            "40099  Algodão herbáceo (em caroço)",
            "40100  Alho",
            "40101  Amendoim (em casca)",
            "40102  Arroz (em casca)",
            "40103  Aveia (em grão)",
            "40131  Azeitona",
            "40136  Banana (cacho)",
            "40104  Batata-doce",
            "40105  Batata-inglesa",
            "40137  Borracha (látex coagulado) [1981 a 2024]",
            "40468  Borracha (látex líquido) [1981 a 1987]",
            "40138  Cacau (em amêndoa)",
            "40139  Café (em grão) Total",
            "40140  Café (em grão) Arábica [2012 a 2024]",
            "40141  Café (em grão) Canephora [2012 a 2024]",
            "40330  Caju [1974 a 1987]",
            "40106  Cana-de-açúcar",
            "40331  Cana para forragem [1974 a 1987]",
            "40142  Caqui",
            "40143  Castanha de caju [1988 a 2024]",
            "40107  Cebola",
            "40108  Centeio (em grão)",
            "40109  Cevada (em grão)",
            "40144  Chá-da-índia (folha verde)",
            "40145  Coco-da-baía*",
            "40146  Dendê (cacho de coco) [1988 a 2024]",
            "40147  Erva-mate (folha verde) [1981 a 2024]",
            "40110  Ervilha (em grão) [1988 a 2024]",
            "40111  Fava (em grão)",
            "40112  Feijão (em grão)",
            "40148  Figo",
            "40113  Fumo (em folha)",
            "40114  Girassol (em grão) [2005 a 2024]",
            "40149  Goiaba [1988 a 2024]",
            "40150  Guaraná (semente) [1981 a 2024]",
            "40115  Juta (fibra)",
            "40151  Laranja",
            "40152  Limão",
            "40116  Linho (semente)",
            "40260  Maçã",
            "40117  Malva (fibra)",
            "40261  Mamão",
            "40118  Mamona (baga)",
            "40119  Mandioca",
            "40262  Manga",
            "40263  Maracujá [1988 a 2024]",
            "40264  Marmelo",
            "40120  Melancia",
            "40121  Melão",
            "40122  Milho (em grão)",
            "40265  Noz (fruto seco)",
            "40266  Palmito [1981 a 2024]",
            "40267  Pera",
            "40268  Pêssego",
            "40269  Pimenta-do-reino",
            "40123  Rami (fibra)",
            "40270  Sisal ou agave (fibra)",
            "40124  Soja (em grão)",
            "40125  Sorgo (em grão)",
            "40271  Tangerina",
            "40126  Tomate",
            "40127  Trigo (em grão)",
            "40128  Triticale (em grão) [2005 a 2024]",
            "40272  Tungue (fruto seco)",
            "40273  Urucum (semente) [1988 a 2024]",
            "40274  Uva"
        ]
    }

    try:
        raw = ibge.fetch_table(table_id, "all", "all", "n3[all]", "flat")
        df = DataProcessor.normalize(raw)
        
        if df is not None and not df.empty:
            anos = df['ano'].dropna().unique().tolist()
            anos = [str(int(a)) for a in anos if not pd.isna(a)]

            regioes = df['regiao'].dropna().unique().tolist()
            regioes = [str(r) for r in regioes if str(r).strip().lower() not in ["", "nan"]]

            # Retorna as culturas estáticas, se definidas
            culturas = culturas_estaticas.get(table_id, df['cultura'].dropna().unique().tolist())
            
            filtros_retorno = {
                "anos": anos,
                "culturas": culturas,
                "regioes": regioes
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
    raw = ibge.fetch_table(table_id, periodos="all", variavel="all")
    df = DataProcessor.normalize(raw)

    # aplica filtros
    if ano:
        df = df[df["ano"].astype(str) == str(ano)]
    if cultura:
        df = df[df["cultura"] == cultura]
    if regiao:
        df = df[df["regiao"] == regiao]

    # colunas disponíveis
    cols = [c for c in ["ano", "cultura", "regiao", "valor", "localidade", "latitude", "longitude"] if c in df.columns]
    dados = df[cols].dropna().to_dict(orient="records")

    return jsonify(dados)
