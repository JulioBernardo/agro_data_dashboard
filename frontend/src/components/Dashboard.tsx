import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Filters from "./Filters";
import MapView from "./MapView";
import ChartsSection from "./ChartsSection";
import KpisSection from "./KpisSection";

import type { Filtros, Dado } from "../types";

function Dashboard() {
  const [filtros, setFiltros] = useState<Filtros>({
    tabela: "1612",
    ano: "1974-2024",
    cultura: "",
    regiao: ""
  });

  const [dados, setDados] = useState<Dado[]>([]);

  // ✅ Atualiza filtros e dados da API
  const aplicarFiltros = async (novosFiltros: Filtros) => {
    // Atualiza o estado para refletir no MapView e KPIs
    setFiltros(novosFiltros);

    // Se algum filtro estiver incompleto, não requisitar ainda
    if (!novosFiltros.tabela || !novosFiltros.ano || !novosFiltros.cultura || !novosFiltros.regiao) {
      console.log("Filtros incompletos, não requisitando:", novosFiltros);
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/dados", {
        params: novosFiltros
      });
      setDados(response.data);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    }
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="content">
        <aside className="sidebar">
          <Filters filtros={filtros} aplicarFiltros={aplicarFiltros} />
        </aside>

        <main className="main">
          <div className="map-section">
            <MapView dados={dados} estadoSelecionado={filtros.regiao} />
          </div>
          <ChartsSection dados={dados} />
        </main>

        <aside className="kpis-panel">
          <KpisSection dados={dados} />
        </aside>
      </div>
    </div>
  );
}

export default Dashboard;
