import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import type { Dado } from "../types";

interface Props {
  dados: Dado[];
}

function ChartsSection({ dados }: Props) {
  const anos = [...new Set(dados.map((d) => d.ano))].sort();

  const dadosAgrupados = anos.map((ano) => {
    const temporarias = dados
      .filter(
        (d) => d.ano === ano && d.produto.toLowerCase().includes("temporária")
      )
      .reduce((acc, d) => acc + d.rendimentoMedio, 0);

    const permanentes = dados
      .filter(
        (d) => d.ano === ano && d.produto.toLowerCase().includes("permanente")
      )
      .reduce((acc, d) => acc + d.rendimentoMedio, 0);

    return { ano, temporarias, permanentes };
  });

  return (
    <div className="charts-section">
      <h3>Dashboard de Análise Agrícola</h3>

      <div className="charts-grid">
        {/* Gráfico de barras */}
        <div className="chart card">
          <h4>Produção por cultura</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dados}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="produto" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="valor" fill="#f37021" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de linha */}
        <div className="chart card">
          <h4>Evolução temporal do Rendimento Médio</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dados}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ano" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="rendimentoMedio"
                stroke="#f37021"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de pizza */}
        <div className="chart card">
          <h4>Distribuição por região</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={dados}
                dataKey="valor"
                nameKey="regiao"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico agrupado */}
        <div className="chart card">
          <h4>Comparação: Lavouras Temporárias vs Permanentes</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dadosAgrupados}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ano" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="temporarias"
                stroke="#8884d8"
                name="Temporárias"
              />
              <Line
                type="monotone"
                dataKey="permanentes"
                stroke="#82ca9d"
                name="Permanentes"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ChartsSection;
