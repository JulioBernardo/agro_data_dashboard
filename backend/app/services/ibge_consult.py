import requests

class IBGEClient:
    def __init__(self):
        self.base_url = "https://servicodados.ibge.gov.br/api/v3/agregados"

    def fetch_table(self, table_id, periodos, variavel, localidades, view="flat", classificacao=None):
        """
        Busca dados na API SIDRA.
        """
        url = f"{self.base_url}/{table_id}/periodos/{periodos}/variaveis/{variavel}"

        params = {
            "localidades": localidades,
            "view": view
        }
        if classificacao:
            params["classificacao"] = classificacao

        resp = requests.get(url, params=params)
        print(f"Requisição para URL: {resp.url}")  # Log da URL completa
        resp.raise_for_status()
        # print(f"Resposta da API: {resp.json()}")  # Log da resposta da API
        return resp.json()




