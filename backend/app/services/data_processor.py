import pandas as pd

class DataProcessor:
    @staticmethod
    def normalize(data: list):
        """
        Normaliza resposta da API SIDRA v3 (view=flat).
        Transforma lista de dicts em DataFrame limpo.
        """
        if not isinstance(data, list):
            raise ValueError("Formato inesperado: esperado list[dict]")

        df = pd.DataFrame(data)

        # Renomear colunas de interesse, se existirem
        col_map = {
            "D1C": "ano",
            "D2N": "localidade",   # nome do município/estado
            "D3N": "produto",      # cultura agrícola
            "V": "valor"           # valor da produção
        }
        for old, new in col_map.items():
            if old in df.columns:
                df = df.rename(columns={old: new})

        # Ajustar tipos
        if "ano" in df.columns:
            df["ano"] = pd.to_numeric(df["ano"], errors="coerce")
        if "valor" in df.columns:
            df["valor"] = pd.to_numeric(df["valor"], errors="coerce")

        return df

    @staticmethod
    def list_unique(df: pd.DataFrame, column: str):
        """Retorna lista única de valores de uma coluna"""
        if column not in df.columns:
            return []
        return df[column].dropna().unique().tolist()
