import requests
from app.config import Config

class IBGEClient:
    def __init__(self):
        self.base_url = "https://servicodados.ibge.gov.br/api/v3/agregados"

    def fetch_table(self, table_id: int, periodos="2020", variavel="all", localidades="n6[all]", view="flat"):
        """
        Consulta dados da API v3 SIDRA/IBGE.
        - table_id: código da tabela/agregado (ex: 1612, 1613, 5457)
        - periodos: "all" ou string com períodos separados por ; (ex: "2020;2021")
        - variavel: "all" ou id da variável
        - localidades: nível territorial, ex: "n6[all]" para municípios
        - view: "flat" para resposta amigável
        """
        url = f"{self.base_url}/{table_id}/periodos/{periodos}/variaveis/{variavel}"
        params = {
            "localidades": localidades,
            "view": view
        }
        resp = requests.get(url, params=params)
        resp.raise_for_status()
        return resp.json()
