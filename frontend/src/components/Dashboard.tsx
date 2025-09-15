import React, { useState } from "react";
import Header from "./Header";
import Filters from "./Filters";
import MapView from "./MapView";
import ChartsSection from "./ChartsSection";
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
        <aside className="sidebar">
          <Filters filtros={filtros} aplicarFiltros={aplicarFiltros} />
        </aside>
        <main className="main">
          <div className="map-section">
            <MapView dados={dados} />
          </div>
          <ChartsSection dados={dados} />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
