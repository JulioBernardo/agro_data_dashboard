// utils/transformarDados.ts
import type { Dado } from "../types";

// Função que recebe o JSON cru da API e devolve no formato que o KpisSection espera
export function transformarDados(apiData: any[]): Dado[] {
  const dadosPorAno: Record<number, Dado> = {};

  apiData.forEach(item => {
    const ano = parseInt(item.D2N, 10);
    const valorStr = item.V;

    // Ignora valores inválidos (".." ou "...")
    if (!valorStr || valorStr === ".." || valorStr === "...") {
      return;
    }

    const valorNumerico = parseFloat(valorStr.replace(",", ".")) || 0;

    // Garante que o objeto do ano existe
    if (!dadosPorAno[ano]) {
      dadosPorAno[ano] = { ano, valor: 0, rendimentoMedio: 0 };
    }

    // Quando for Valor da produção
    if (item.D3N === "Valor da produção") {
      dadosPorAno[ano].valor = valorNumerico;
    }

    // Quando for Rendimento médio da produção
    if (item.D3N === "Rendimento médio da produção") {
      dadosPorAno[ano].rendimentoMedio = valorNumerico;
    }
  });

  // Retorna como array ordenado por ano
  return Object.values(dadosPorAno).sort((a, b) => a.ano - b.ano);
}
