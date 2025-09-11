import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import MapView from "./MapView";
import ChartView from "./ChartView";
import api from "../services/api";

interface Dado {
  ano: number;
  localidade: string;
  produto: string;
  valor: number;
}

function Dashboard() {
  const [anos, setAnos] = useState<number[]>([]);
  const [culturas, setCulturas] = useState<string[]>([]);
  const [filtros, setFiltros] = useState<{ ano: string; cultura: string }>({ ano: "", cultura: "" });
  const [dados, setDados] = useState<Dado[]>([]);

  // Buscar anos e culturas iniciais
  useEffect(() => {
    async function fetchInitialData() {
      try {
        const anosRes = await api.get<number[]>("/anos/temporarias");
        const culturasRes = await api.get<string[]>("/culturas/temporarias");
        setAnos(anosRes.data);
        setCulturas(culturasRes.data);
      } catch (err) {
        console.error("Erro ao carregar filtros:", err);
      }
    }
    fetchInitialData();
  }, []);

  // Buscar dados quando filtros mudam
  useEffect(() => {
    async function fetchData() {
      try {
        const query = `?ano=${filtros.ano}&produto=${filtros.cultura}`;
        const res = await api.get<Dado[]>(`/dados/temporarias${query}`);
        setDados(res.data);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }
    if (filtros.ano && filtros.cultura) {
      fetchData();
    }
  }, [filtros]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "1rem" }}>
      <Filters anos={anos} culturas={culturas} setFiltros={setFiltros} />
      <div>
        <MapView dados={dados} />
        <ChartView dados={dados} />
      </div>
    </div>
  );
}

export default Dashboard;
