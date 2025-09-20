import React, { useState } from "react";
import Header from "./Header";
import Filters from "./Filters";
import MapView from "./MapView";
import ChartsSection from "./ChartsSection";
import KpisSection from "./KpisSection"; // ✅ Importando os KPIs
import type { Filtros, Dado } from "../types";
import api from "../services/api";

function Dashboard() {
  const [filtros, setFiltros] = useState<Filtros>({
    tabela: "1612",
    ano: "",
    cultura: "",
    regiao: ""
  });

  const [dados, setDados] = useState<Dado[]>([]);

  const aplicarFiltros = async (novosFiltros: Filtros) => {
    setFiltros(novosFiltros);
    try {
      const resp = await api.get(`/dados`, { params: novosFiltros });
      setDados(resp.data);
      console.log("Dados carregados:", resp.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="content">
        {/* Sidebar à esquerda */}
        <aside className="sidebar">
          <Filters filtros={filtros} aplicarFiltros={aplicarFiltros} />
        </aside>

        {/* Conteúdo principal */}
        <main className="main">
          <div className="map-section">
            <MapView dados={dados} estadoSelecionado={filtros.regiao}/>
          </div>
          <ChartsSection dados={dados} />
        </main>

        {/* KPIs à direita */}
        <aside className="kpis-panel">
          <KpisSection dados={dados} />
        </aside>
      </div>
    </div>
  );
}

export default Dashboard;
