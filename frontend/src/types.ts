export interface Filtros {
  tabela: string;
  ano?: string;     
  cultura?: string;
  regiao?: string;
  anoMin?: number;  
  anoMax?: number;  
}

export interface Dado {
  produto: string;
  rendimentoMedio: number;
  ano: string | number;    
  cultura: string;
  regiao: string;
  localidade: string;
  valor: number;
  latitude: number;
  longitude: number;
  variavel: string;
}

export const stateCenters: Record<string, [number, number]> = {
  "Acre": [-8.77, -70.55],
  "Alagoas": [-9.62, -36.82],
  "Amapá": [1.41, -51.77],
  "Amazonas": [-3.47, -65.1],
  "Bahia": [-13.29, -41.71],
  "Ceará": [-5.2, -39.53],
  "Distrito Federal": [-15.83, -47.86],
  "Espírito Santo": [-19.19, -40.34],
  "Goiás": [-15.98, -49.86],
  "Maranhão": [-5.42, -45.44],
  "Mato Grosso": [-12.64, -55.42],
  "Mato Grosso do Sul": [-20.51, -54.54],
  "Minas Gerais": [-18.1, -44.38],
  "Pará": [-3.79, -52.48],
  "Paraíba": [-7.28, -36.72],
  "Paraná": [-24.89, -51.55],
  "Pernambuco": [-8.38, -37.86],
  "Piauí": [-8.28, -43.68],
  "Rio de Janeiro": [-22.25, -42.66],
  "Rio Grande do Norte": [-5.81, -36.59],
  "Rio Grande do Sul": [-30.17, -53.5],
  "Rondônia": [-10.83, -63.34],
  "Roraima": [1.99, -61.33],
  "Santa Catarina": [-27.45, -50.95],
  "São Paulo": [-22.19, -48.79],
  "Sergipe": [-10.57, -37.45],
  "Tocantins": [-9.46, -48.26],
};


