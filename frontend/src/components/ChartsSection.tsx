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
  ResponsiveContainer
} from "recharts";
import type { Dado } from "../types";

interface Props {
  dados: Dado[];
}

function ChartsSection({ dados }: Props) {
  return (
    <div className="charts-section">
      <h3>Gráficos analíticos</h3>
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
          <h4>Evolução temporal</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dados}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ano" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="valor" stroke="#f37021" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Espaços reservados */}
        <div className="chart card">Gráfico 3</div>
        <div className="chart card">Gráfico 4</div>
      </div>
    </div>
  );
}

export default ChartsSection;
