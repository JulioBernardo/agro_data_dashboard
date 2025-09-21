// Importa o tipo 'Dado' do arquivo 'types.ts', garantindo a tipagem dos dados.
import type { Dado } from "../types";

// Importa o arquivo CSS para estilizar os componentes.
import "../styles/kpi.css";

// Define a interface para as propriedades (props) do componente.
// Ele espera um array de objetos do tipo 'Dado'.
interface Props {
  dados: Dado[];
}

// Componente funcional 'KpisSection' que exibe Indicadores Chave de Performance (KPIs).
function KpisSection({ dados }: Props) {
  // Calcula o valor total da produção somando a propriedade 'valor' de todos os dados.
  // O método 'reduce' itera sobre o array e acumula a soma.
  const valorTotalProducao = dados.reduce((acc, d) => acc + d.valor, 0);

  // Calcula o rendimento médio total.
  // Primeiro, soma todos os valores de 'rendimentoMedio'.
  // Depois, divide pela quantidade de itens no array para obter a média.
  // O '|| 0' é um fallback caso o array esteja vazio para evitar divisão por zero.
  const rendimentoMedioTotal =
    dados.reduce((acc, d) => acc + d.rendimentoMedio, 0) / dados.length || 0;

  // Extrai todos os anos únicos dos dados, ordena-os em ordem crescente e os armazena em um array.
  // `new Set` garante que cada ano apareça apenas uma vez.
  const anos = [...new Set(dados.map((d) => d.ano))].sort();

  // Obtém o ano mais recente, que é o último elemento do array 'anos' ordenado.
  const anoMaisRecente = anos[anos.length - 1];
  
  // Obtém o ano anterior ao mais recente, que é o penúltimo elemento.
  const anoAnterior = anos[anos.length - 2];

  // Filtra os dados para incluir apenas os do ano mais recente e soma seus valores.
  const valorAnoMaisRecente = dados
    .filter((d) => d.ano === anoMaisRecente)
    .reduce((acc, d) => acc + d.valor, 0);

  // Filtra os dados para incluir apenas os do ano anterior e soma seus valores.
  const valorAnoAnterior = dados
    .filter((d) => d.ano === anoAnterior)
    .reduce((acc, d) => acc + d.valor, 0);

  // Calcula a taxa de crescimento anual com base nos valores dos dois últimos anos.
  // A fórmula é (Valor Mais Recente - Valor Anterior) / Valor Anterior * 100.
  // Verifica se 'valorAnoAnterior' é maior que 0 para evitar divisão por zero.
  const taxaCrescimentoAnual =
    valorAnoAnterior > 0
      ? ((valorAnoMaisRecente - valorAnoAnterior) / valorAnoAnterior) * 100
      : 0;

  // A seção de renderização do componente.
  return (
    // Contêiner principal para os KPIs.
    <div className="kpis">
      {/* KPI 1: Valor Total da Produção */}
      <div className="kpi card">
        <h4>Valor Total da Produção</h4>
        <p>
          {/* Formata o número para moeda brasileira (BRL) usando toLocaleString(). */}
          {valorTotalProducao.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>

      {/* KPI 2: Rendimento Médio Total */}
      <div className="kpi card">
        <h4>Rendimento Médio Total</h4>
        {/* Exibe o rendimento médio com duas casas decimais e a unidade de medida. */}
        <p>{rendimentoMedioTotal.toFixed(2)} kg/ha</p>
      </div>

      {/* KPI 3: Taxa de Crescimento Anual */}
      <div className="kpi card">
        <h4>Taxa de Crescimento Anual</h4>
        {/* Exibe a taxa de crescimento com duas casas decimais e o símbolo de porcentagem. */}
        <p>{taxaCrescimentoAnual.toFixed(2)}%</p>
      </div>
    </div>
  );
}

// Exporta o componente para que ele possa ser usado em outros arquivos.
export default KpisSection;