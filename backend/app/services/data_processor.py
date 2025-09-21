import pandas as pd

class DataProcessor:
    @staticmethod
    def normalize(data: list) -> pd.DataFrame:
        """
        Normaliza os dados da API do IBGE para um formato analítico.
        """

        if not isinstance(data, list) or len(data) == 0:
            return pd.DataFrame()

        # Remove o primeiro item (metadados do IBGE) se ele não tiver chave "D1N"
        if "D1N" not in data[0]:
            data = data[1:]

        if len(data) == 0:
            return pd.DataFrame()

        df = pd.DataFrame(data)
        # df.to_excel("debug_raw_data.xlsx", index=False)

        col_map = {
            "D1N": "regiao",
            "D1C": "regiao_cod",
            "D2N": "ano",
            "D3N": "variavel",
            "D3C": "variavel_cod",
            "D4N": "cultura",
            "D4C": "cultura_cod",
            "V": "valor"
        }
        df.rename(columns={k: v for k, v in col_map.items() if k in df.columns}, inplace=True)

        # Converte tipos
        if "ano" in df.columns:
            df["ano"] = pd.to_numeric(df["ano"], errors="coerce", downcast="integer")
        if "valor" in df.columns:
            df["valor"] = pd.to_numeric(df["valor"], errors="coerce")

        # Garante colunas principais
        for col in ["regiao", "cultura", "variavel", "valor"]:
            if col not in df.columns:
                df[col] = None

        # Mantém só linhas com valor
        df = df.dropna(subset=["valor"])

        # df.to_excel("debug_normalized_data_pos.xlsx", index=False)
        return df