import {
  // Importa os componentes de gráficos do Recharts.
  LineChart, // Gráfico de linhas.
  Line, // Linhas para o gráfico de linhas.
  BarChart, // Gráfico de barras.
  Bar, // Barras para o gráfico de barras.
  XAxis, // Eixo X.
  YAxis, // Eixo Y.
  CartesianGrid, // Grade do gráfico.
  Tooltip, // Balão de informação ao passar o mouse.
  Legend, // Legenda do gráfico.
  ResponsiveContainer, // Contêiner que torna o gráfico responsivo.
  PieChart, // Gráfico de pizza.
  Pie, // Fatias do gráfico de pizza.
} from "recharts";
// Importa o tipo 'Dado' para tipagem.
import type { Dado } from "../types";

// Define a interface para as propriedades do componente.
interface Props {
  // `dados` é o array de objetos que contém as informações para os gráficos.
  dados: Dado[];
}

// O componente 'ChartsSection' é responsável por exibir uma série de gráficos.
function ChartsSection({ dados }: Props) {
  // Obtém uma lista de anos únicos a partir dos dados e os ordena.
  const anos = [...new Set(dados.map((d) => d.ano))].sort();

  // Prepara os dados para o gráfico de comparação.
  // Agrupa os dados por ano e calcula a soma do rendimento médio para lavouras
  // temporárias e permanentes.
  const dadosAgrupados = anos.map((ano) => {
    // Filtra e soma o rendimento médio das lavouras temporárias para o ano atual.
    const temporarias = dados
      .filter(
        (d) => d.ano === ano && d.produto.toLowerCase().includes("temporária")
      )
      .reduce((acc, d) => acc + d.rendimentoMedio, 0);

    // Filtra e soma o rendimento médio das lavouras permanentes para o ano atual.
    const permanentes = dados
      .filter(
        (d) => d.ano === ano && d.produto.toLowerCase().includes("permanente")
      )
      .reduce((acc, d) => acc + d.rendimentoMedio, 0);

    // Retorna um novo objeto com o ano e os totais calculados.
    return { ano, temporarias, permanentes };
  });

  // Retorna a estrutura JSX para a seção de gráficos.
  return (
    <div className="charts-section">
      <h3>Dashboard de Análise Agrícola</h3>

      {/* Grid para organizar os gráficos. */}
      <div className="charts-grid">
        {/* Gráfico de barras: Produção por cultura */}
        <div className="chart card">
          <h4>Produção por cultura</h4>
          {/* Contêiner responsivo para o gráfico. */}
          <ResponsiveContainer width="100%" height={200}>
            {/* O componente `BarChart` recebe os dados completos. */}
            <BarChart data={dados}>
              <CartesianGrid strokeDasharray="3 3" />
              {/* Eixo X exibe o nome do produto/cultura. */}
              <XAxis dataKey="produto" />
              {/* Eixo Y exibe o valor (produção). */}
              <YAxis />
              <Tooltip />
              <Legend />
              {/* As barras do gráfico, com a cor da marca Jacto. */}
              <Bar dataKey="valor" fill="#f37021" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de linha: Evolução temporal do Rendimento Médio */}
        <div className="chart card">
          <h4>Evolução temporal do Rendimento Médio</h4>
          <ResponsiveContainer width="100%" height={200}>
            {/* O componente `LineChart` recebe os dados. */}
            <LineChart data={dados}>
              <CartesianGrid strokeDasharray="3 3" />
              {/* Eixo X exibe o ano. */}
              <XAxis dataKey="ano" />
              {/* Eixo Y exibe o rendimento médio. */}
              <YAxis />
              <Tooltip />
              <Legend />
              {/* A linha do gráfico com a cor da marca. */}
              <Line
                type="monotone"
                dataKey="rendimentoMedio"
                stroke="#f37021"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Exporta o componente para uso em outros arquivos.
export default ChartsSection;