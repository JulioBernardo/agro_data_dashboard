from flask import Blueprint, jsonify, request
from app.services.ibge_consult import IBGEClient
from app.services.data_processor import DataProcessor
from app.config import Config

bp = Blueprint("main", __name__)
ibge = IBGEClient()

@bp.route("/api/dados/<string:tabela>", methods=["GET"])
def get_dados(tabela):
    """
    Retorna dados de uma tabela do IBGE com filtros opcionais
    /api/dados/temporarias?ano=2020&produto=Milho
    """
    if tabela not in Config.TABLES:
        return jsonify({"error": "Tabela inválida"}), 400

    table_id = Config.TABLES[tabela]
    # exemplo de uso
    raw = ibge.fetch_table(table_id, periodos="all", variavel="all")

    df = DataProcessor.normalize(raw)

    # Aplicar filtros
    ano = request.args.get("ano")
    produto = request.args.get("produto")

    if ano:
        df = df[df["ano"] == int(ano)]
    if produto:
        df = df[df["produto"].str.contains(produto, case=False, na=False)]

    return jsonify(df.to_dict(orient="records"))

@bp.route("/api/culturas/<string:tabela>", methods=["GET"])
def get_culturas(tabela):
    """
    Lista culturas disponíveis em uma tabela
    """
    if tabela not in Config.TABLES:
        return jsonify({"error": "Tabela inválida"}), 400

    table_id = Config.TABLES[tabela]
    # exemplo de uso
    raw = ibge.fetch_table(table_id, periodos="all", variavel="all")

    df = DataProcessor.normalize(raw)

    culturas = df["produto"].dropna().unique().tolist()
    return jsonify(culturas)

@bp.route("/api/anos/<string:tabela>", methods=["GET"])
def get_anos(tabela):
    """
    Lista anos disponíveis em uma tabela
    """
    if tabela not in Config.TABLES:
        return jsonify({"error": "Tabela inválida"}), 400

    table_id = Config.TABLES[tabela]
    # exemplo de uso
    raw = ibge.fetch_table(table_id, periodos="all", variavel="all")

    df = DataProcessor.normalize(raw)

    anos = df["ano"].dropna().unique().tolist()
    return jsonify(sorted(anos))
