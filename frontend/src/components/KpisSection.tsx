import type { Dado } from "../types";
import "../styles/kpi.css";

interface Props {
  dados: Dado[];
}

function KpisSection({ dados }: Props) {
  // Filtra os dados para obter apenas o "Valor da produção"
  const dadosValorProducao = dados.filter(
    (d) => d.variavel === "Valor da produção"
  );

  // Filtra os dados para obter apenas o "Rendimento médio da produção"
  const dadosRendimentoMedio = dados.filter(
    (d) => d.variavel === "Rendimento médio da produção"
  );

  // 1. KPI: Valor Total da Produção (soma dos anos)
  const valorTotalProducao = dadosValorProducao.reduce(
    (acc, d) => acc + d.valor,
    0
  );

  // 2. KPI: Rendimento Médio (média dos anos)
  const rendimentoMedioTotal =
    dadosRendimentoMedio.reduce((acc, d) => acc + d.valor, 0) /
      dadosRendimentoMedio.length || 0;

  // 3. KPI: Taxa de Crescimento Anual do Valor da Produção
  const anos = [...new Set(dadosValorProducao.map((d) => d.ano))].sort();
  const anoMaisRecente = anos[anos.length - 1];
  const anoAnterior = anos[anos.length - 2];

  const valorAnoMaisRecente = dadosValorProducao.find(
    (d) => d.ano === anoMaisRecente
  )?.valor;
  const valorAnoAnterior = dadosValorProducao.find(
    (d) => d.ano === anoAnterior
  )?.valor;

  let taxaCrescimentoAnual = 0;
  if (valorAnoMaisRecente && valorAnoAnterior && valorAnoAnterior > 0) {
    taxaCrescimentoAnual =
      ((valorAnoMaisRecente - valorAnoAnterior) / valorAnoAnterior) * 100;
  }

  return (
    <div className="kpis">
      {/* KPI 1: Valor Total da Produção */}
      <div className="kpi card">
        <h4>Valor Total da Produção</h4>
        <p>
          {valorTotalProducao.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>

      {/* KPI 2: Rendimento Médio */}
      <div className="kpi card">
        <h4>Rendimento Médio</h4>
        <p>{rendimentoMedioTotal.toFixed(2)} kg/ha</p>
      </div>

      {/* KPI 3: Taxa de Crescimento Anual */}
      <div className="kpi card">
        <h4>Crescimento Anual (Valor)</h4>
        <p>{taxaCrescimentoAnual.toFixed(2)}%</p>
      </div>
    </div>
  );
}

export default KpisSection;