import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Dado } from "../types";

interface Props {
  dados: Dado[];
}

function ChartsSection({ dados }: Props) {
  // Filtra dados para o gráfico de Quantidade Produzida
  const dadosQuantidadeProduzida = dados.filter(
    (d) => d.variavel === "Quantidade produzida"
  );

  // Filtra dados para o gráfico de Rendimento Médio
  const dadosRendimentoMedio = dados.filter(
    (d) => d.variavel === "Rendimento médio da produção"
  );

  return (
    <div className="charts-section">
      <h3>Dashboard de Análise Agrícola</h3>
      <div className="charts-grid">
        {/* Gráfico de linha: Evolução da Quantidade Produzida (Toneladas) */}
        <div className="chart card">
          <h4>Evolução da Produção (Toneladas)</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dadosQuantidadeProduzida}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ano" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="valor"
                name="Quantidade Produzida"
                stroke="#f37021"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de linha: Evolução do Rendimento Médio (kg/ha) */}
        <div className="chart card">
          <h4>Evolução do Rendimento Médio (kg/ha)</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dadosRendimentoMedio}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ano" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="valor"
                name="Rendimento Médio"
                stroke="#0088fe"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ChartsSection;