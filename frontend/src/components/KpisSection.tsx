import type { Dado } from "../types";
import { FaSeedling, FaChartLine, FaMoneyBillWave, FaGlobe } from "react-icons/fa";
import "../styles/kpi.css";

interface Props {
  dados: Dado[];
}

function KpisSection({ dados }: Props) {
  const dadosValorProducao = dados.filter(d => d.variavel === "Valor da produção");
  const dadosRendimentoMedio = dados.filter(d => d.variavel === "Rendimento médio da produção");
  const dadosAreaPlantada = dados.filter(d => d.variavel === "Área plantada");

  // 1. Valor Total da Produção
  const valorTotalProducao = dadosValorProducao.reduce((acc, d) => acc + d.valor, 0);

  // 2. Rendimento Médio
  const rendimentoMedioTotal =
    dadosRendimentoMedio.reduce((acc, d) => acc + d.valor, 0) / (dadosRendimentoMedio.length || 1);

  // 3. Crescimento Anual
  const anos = [...new Set(dadosValorProducao.map(d => d.ano))].sort();
  const anoMaisRecente = anos[anos.length - 1];
  const anoAnterior = anos[anos.length - 2];

  const valorAnoMaisRecente = dadosValorProducao.find(d => d.ano === anoMaisRecente)?.valor;
  const valorAnoAnterior = dadosValorProducao.find(d => d.ano === anoAnterior)?.valor;

  let taxaCrescimentoAnual = 0;
  if (valorAnoMaisRecente && valorAnoAnterior && valorAnoAnterior > 0) {
    taxaCrescimentoAnual = ((valorAnoMaisRecente - valorAnoAnterior) / valorAnoAnterior) * 100;
  }

  // 4. Área Plantada Total
  const areaPlantadaTotal = dadosAreaPlantada.reduce((acc, d) => acc + d.valor, 0);

  return (
    <div className="kpis-grid">
      <div className="kpi card green">
        <FaMoneyBillWave className="icon" />
        <h4>Valor Total da Produção</h4>
        <p>{valorTotalProducao.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
      </div>

      <div className="kpi card blue">
        <FaSeedling className="icon" />
        <h4>Rendimento Médio</h4>
        <p>{rendimentoMedioTotal.toFixed(2)} kg/ha</p>
      </div>

      <div className={`kpi card ${taxaCrescimentoAnual >= 0 ? "orange" : "red"}`}>
        <FaChartLine className="icon" />
        <h4>Crescimento Anual</h4>
        <p>{taxaCrescimentoAnual.toFixed(2)}%</p>
      </div>

      {areaPlantadaTotal > 0 && (
        <div className="kpi card green">
          <FaGlobe className="icon" />
          <h4>Área Plantada</h4>
          <p>{areaPlantadaTotal.toLocaleString("pt-BR")} ha</p>
        </div>
      )}
    </div>
  );
}

export default KpisSection;
