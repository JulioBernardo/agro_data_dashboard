import pandas as pd

class DataProcessor:
    @staticmethod
    def normalize(data: list):
        
        # A API do IBGE retorna uma lista com o primeiro item sendo o cabeçalho
        if not isinstance(data, list) or len(data) <= 1:
            return pd.DataFrame()

        # Criar o DataFrame a partir dos dados (lista de dicionários)
        df = pd.DataFrame(data)

        # df.to_excel("debug_raw.xlsx")  # Linha para debug

        # Mapeamento de colunas. Esses são os nomes das colunas que a API do IBGE
        # usa para a tabela 5457.
        col_map = {
            'D4C': 'cultura',
            'D1N': 'regiao',
            'D2N': 'ano',
        }

        # Renomeia as colunas se elas existirem
        df.rename(columns=col_map, inplace=True)

        # Ajusta o tipo de dados para colunas numéricas
        if 'ano' in df.columns:
            df['ano'] = pd.to_numeric(df['ano'], errors='coerce')
        
        if 'cultura' not in df.columns:
            df['cultura'] = None
        if 'regiao' not in df.columns:
            df['regiao'] = None

        return df

    @staticmethod
    def list_unique(df: pd.DataFrame, column: str):
        if column not in df.columns or df[column].empty:
            return []
        
        return sorted(df[column].dropna().unique().tolist())