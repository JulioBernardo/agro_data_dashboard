import requests
import pprint

link = 'https://servicodados.ibge.gov.br/api/v3/agregados/1613/periodos/2020/variaveis/all?localidades=n6[all]&view=flat'

response = requests.get(link)
data = response.json()
pprint.pprint(data)
