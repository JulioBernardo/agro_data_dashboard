import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Filters from "./Filters";
import MapView from "./MapView";
import ChartsSection from "./ChartsSection";
import KpisSection from "./KpisSection";

import type { Filtros, Dado } from "../types";

function Dashboard() {
  /**
   * Estado que armazena os filtros aplicados no dashboard.
   * - tabela: ID da tabela do IBGE (1612 ou 1613)
   * - ano: intervalo de anos (ex: "1974-2024")
   * - cultura: cultura selecionada (ex: soja, milho etc.)
   * - regiao: estado/região selecionado
   */
  const [filtros, setFiltros] = useState<Filtros>({
    tabela: "1612",
    ano: "1974-2024",
    cultura: "",
    regiao: ""
  });
  
  // Estado que armazena os dados retornados pela API, após aplicar os filtros
  const [dados, setDados] = useState<Dado[]>([]);

  /**
   * Função responsável por aplicar os filtros:
   * 1. Atualiza o estado local `filtros`.
   * 2. Verifica se todos os filtros obrigatórios foram preenchidos.
   * 3. Caso estejam completos, faz uma requisição GET para o backend.
   * 4. Salva os dados retornados em `dados`.
   */
  const aplicarFiltros = async (novosFiltros: Filtros) => {
    setFiltros(novosFiltros);

    // Se os filtros estiverem incompletos, não faz a requisição
    if (!novosFiltros.tabela || !novosFiltros.ano || !novosFiltros.cultura || !novosFiltros.regiao) {
      console.log("Filtros incompletos, não requisitando:", novosFiltros);
      return;
    }

    try {
      // Faz chamada ao backend passando os filtros como parâmetros de query
      const response = await axios.get("http://localhost:5000/api/dados", {
        params: novosFiltros
      });

      // Atualiza os dados no estado com a resposta da API
      setDados(response.data);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    }
  };

  return (
    <div className="dashboard">
      {/* Cabeçalho fixo da aplicação */}
      <Header />
      
      <div className="content">
        {/* Barra lateral esquerda: filtros */}
        <aside className="sidebar">
          <Filters filtros={filtros} aplicarFiltros={aplicarFiltros} />
        </aside>

        {/* Área principal: mapa e gráficos */}
        <main className="main">
          <div className="map-section">
            {/* Passa os dados para o mapa e destaca o estado selecionado */}
            <MapView dados={dados} estadoSelecionado={filtros.regiao} />
          </div>
          {/* Gráficos dinâmicos baseados nos dados filtrados */}
          <ChartsSection dados={dados} />
        </main>

        {/* Painel lateral direito: KPIs numéricos */}
        <aside className="kpis-panel">
          <KpisSection dados={dados}/>
        </aside>
      </div>
    </div>
  );
}

export default Dashboard;
