import React, { useState } from "react";
import type { Filtros } from "../types";
import '../styles/filters.css'

interface Props {
  filtros: Filtros;
  aplicarFiltros: (f: Filtros) => void;
}

function Filters({ filtros, aplicarFiltros }: Props) {
  const [localFiltros, setLocalFiltros] = useState<Filtros>(filtros);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setLocalFiltros({ ...localFiltros, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    aplicarFiltros(localFiltros);
  };

  return (
    <div className="filters card">

      <label>Tabela</label>
      <select name="tabela" value={localFiltros.tabela} onChange={handleChange}>
        <option value="1612">1612 – Lavouras temporárias</option>
        <option value="1613">1613 – Lavouras permanentes</option>
        <option value="5457">5457 – Consolidação</option>
      </select>

      <label>Ano</label>
      <input
        type="text"
        name="ano"
        value={localFiltros.ano}
        onChange={handleChange}
        placeholder="Ex: 2020"
      />

      <label>Cultura</label>
      <input
        type="text"
        name="cultura"
        value={localFiltros.cultura}
        onChange={handleChange}
        placeholder="Ex: Milho"
      />

      <label>Região</label>
      <input
        type="text"
        name="regiao"
        value={localFiltros.regiao}
        onChange={handleChange}
        placeholder="Ex: São Paulo"
      />

      <button className="apply-btn" onClick={handleSubmit}>
        Aplicar Filtros
      </button>
    </div>
  );
}

export default Filters;