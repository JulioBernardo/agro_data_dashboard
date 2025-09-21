import React, { useState, useEffect } from "react";
import type { Filtros } from "../types";
import "../styles/filters.css";

interface Props {
  filtros: Filtros;
  aplicarFiltros: (f: Filtros) => void;
}

function Filters({ filtros, aplicarFiltros }: Props) {
  const [anoIntervalo, setAnoIntervalo] = useState({ anoMin: 1974, anoMax: 2024 });
  const [localFiltros, setLocalFiltros] = useState<Filtros>({
    ...filtros,
    ano: filtros.ano || "1974-2024",
  });

  const [anos, setAnos] = useState<string[]>([]);
  const [culturas, setCulturas] = useState<string[]>([]);
  const [regioes, setRegioes] = useState<string[]>([]);

  const handleChangeAno = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnoIntervalo((prev) => {
      const novos = { ...prev };
      if (name === "anoMin") novos.anoMin = Math.min(Number(value), prev.anoMax);
      if (name === "anoMax") novos.anoMax = Math.max(Number(value), prev.anoMin);

      setLocalFiltros((prevFiltros) => ({
        ...prevFiltros,
        ano: `${novos.anoMin}-${novos.anoMax}`,
      }));

      return novos;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFiltros((prevFiltros) => ({ ...prevFiltros, [name]: value }));
  };

  // 🔥 Aplica filtros toda vez que localFiltros mudar
  useEffect(() => {
    aplicarFiltros(localFiltros);
  }, [localFiltros]);

  // Busca opções de anos, culturas e regiões ao mudar a tabela
  useEffect(() => {
    if (!localFiltros.tabela) return;

    fetch(`/api/filtros/${localFiltros.tabela}`)
      .then((res) => res.json())
      .then((data) => {
        setAnos(data.anos || []);
        setCulturas(data.culturas || []);
        setRegioes(data.regioes || []);
      })
      .catch((err) => console.error("Erro ao buscar filtros:", err));
  }, [localFiltros.tabela]);

  return (
    <div className="filters card">
      <label>Tabela</label>
      <select name="tabela" value={localFiltros.tabela} onChange={handleChange}>
        <option value="">Selecione...</option>
        <option value="1612">1612 – Lavouras temporárias</option>
        <option value="1613">1613 – Lavouras permanentes</option>
      </select>

      <label>Ano</label>
      <div className="range-slider">
        <div className="range-values">
          <span>{anoIntervalo.anoMin}</span>
          <span>{anoIntervalo.anoMax}</span>
        </div>
        <input type="range" name="anoMin" min={1974} max={2024} value={anoIntervalo.anoMin} onChange={handleChangeAno} className="slider slider-min" />
        <input type="range" name="anoMax" min={1974} max={2024} value={anoIntervalo.anoMax} onChange={handleChangeAno} className="slider slider-max" />
        <div className="range-track"></div>
        <div className="range-selected" style={{ left: `${((anoIntervalo.anoMin - 1974)/(2024-1974))*100}%`, width: `${((anoIntervalo.anoMax - anoIntervalo.anoMin)/(2024-1974))*100}%` }}></div>
      </div>

      <label>Cultura</label>
      <select name="cultura" value={localFiltros.cultura} onChange={handleChange}>
        <option value="">Selecione...</option>
        {culturas.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      <label>Região</label>
      <select name="regiao" value={localFiltros.regiao} onChange={handleChange}>
        <option value="">Selecione...</option>
        {regioes.map((r) => <option key={r} value={r}>{r}</option>)}
      </select>
    </div>
  );
}

export default Filters;
