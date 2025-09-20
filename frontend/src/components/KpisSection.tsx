import type { Dado } from "../types";
import "../styles/kpi.css";

interface Props {
  dados: Dado[];
}

function KpisSection({ dados }: Props) {
  const valorTotalProducao = dados.reduce((acc, d) => acc + d.valor, 0);

  const rendimentoMedioTotal =
    dados.reduce((acc, d) => acc + d.rendimentoMedio, 0) / dados.length || 0;

  const anos = [...new Set(dados.map((d) => d.ano))].sort();
  const anoMaisRecente = anos[anos.length - 1];
  const anoAnterior = anos[anos.length - 2];

  const valorAnoMaisRecente = dados
    .filter((d) => d.ano === anoMaisRecente)
    .reduce((acc, d) => acc + d.valor, 0);

  const valorAnoAnterior = dados
    .filter((d) => d.ano === anoAnterior)
    .reduce((acc, d) => acc + d.valor, 0);

  const taxaCrescimentoAnual =
    valorAnoAnterior > 0
      ? ((valorAnoMaisRecente - valorAnoAnterior) / valorAnoAnterior) * 100
      : 0;

  return (
    <div className="kpis">
      <div className="kpi card">
        <h4>Valor Total da Produção</h4>
        <p>
          {valorTotalProducao.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
      <div className="kpi card">
        <h4>Rendimento Médio Total</h4>
        <p>{rendimentoMedioTotal.toFixed(2)} kg/ha</p>
      </div>
      <div className="kpi card">
        <h4>Taxa de Crescimento Anual</h4>
        <p>{taxaCrescimentoAnual.toFixed(2)}%</p>
      </div>
    </div>
  );
}

export default KpisSection;
