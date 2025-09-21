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
  dados: Dado[]; // Lista de dados filtrados que alimentam os gráficos
}

function ChartsSection({ dados }: Props) {
  /**
   * Filtra dados para o gráfico de Quantidade Produzida
   * - Apenas registros cuja variável seja "Quantidade produzida"
   */
  const dadosQuantidadeProduzida = dados.filter(
    (d) => d.variavel === "Quantidade produzida"
  );

  /**
   * Filtra dados para o gráfico de Rendimento Médio
   * - Apenas registros cuja variável seja "Rendimento médio da produção"
   */
  const dadosRendimentoMedio = dados.filter(
    (d) => d.variavel === "Rendimento médio da produção"
  );

  return (
    <div className="charts-section">
      <h3>Dashboard de Análise Agrícola</h3>
      <div className="charts-grid">
        {/* 
          Gráfico 1: Evolução da Produção (Toneladas)
          - Linha laranja (#f37021)
          - Baseado nos dados de "Quantidade produzida"
        */}
        <div className="chart card">
          <h4>Evolução da Produção (Toneladas)</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dadosQuantidadeProduzida}>
              <CartesianGrid strokeDasharray="3 3" /> {/* Grade do gráfico */}
              <XAxis dataKey="ano" />                 {/* Eixo X = Ano */}
              <YAxis />                               {/* Eixo Y = Valores */}
              <Tooltip />                             {/* Tooltip ao passar o mouse */}
              <Legend />                              {/* Legenda da linha */}
              <Line
                type="monotone"
                dataKey="valor"     // Campo do objeto Dado usado como valor
                name="Quantidade Produzida"
                stroke="#f37021"   // Cor da linha
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 
          Gráfico 2: Evolução do Rendimento Médio (kg/ha)
          - Linha azul (#0088fe)
          - Baseado nos dados de "Rendimento médio da produção"
        */}
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
