import React, { useState, useEffect } from "react";
import type { Filtros } from "../types";
import "../styles/filters.css";

interface Props {
  filtros: Filtros; // Filtros iniciais vindos do componente pai
  aplicarFiltros: (f: Filtros) => void; // Função para aplicar filtros no pai
}

function Filters({ filtros, aplicarFiltros }: Props) {
  // Estado para armazenar o intervalo de anos selecionado no slider
  const [anoIntervalo, setAnoIntervalo] = useState({ anoMin: 1974, anoMax: 2024 });

  // Estado local que guarda os filtros atuais
  // Caso o filtro de ano não venha preenchido, inicializa com "1974-2024"
  const [localFiltros, setLocalFiltros] = useState<Filtros>({
    ...filtros,
    ano: filtros.ano || "1974-2024",
  });

  // Listas de opções que serão populadas a partir da API
  const [anos, setAnos] = useState<string[]>([]);
  const [culturas, setCulturas] = useState<string[]>([]);
  const [regioes, setRegioes] = useState<string[]>([]);

  /**
   * Atualiza o intervalo de anos (min e max) ao mexer no slider
   * - Garante que anoMin <= anoMax
   * - Atualiza automaticamente o filtro de ano em localFiltros
   */
  const handleChangeAno = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnoIntervalo((prev) => {
      const novos = { ...prev };

      if (name === "anoMin") 
        novos.anoMin = Math.min(Number(value), prev.anoMax);

      if (name === "anoMax") 
        novos.anoMax = Math.max(Number(value), prev.anoMin);

      // Atualiza também o filtro de ano no formato "min-max"
      setLocalFiltros((prevFiltros) => ({
        ...prevFiltros,
        ano: `${novos.anoMin}-${novos.anoMax}`,
      }));

      return novos;
    });
  };

  /**
   * Atualiza filtros genéricos (cultura, região, tabela etc.)
   * Sempre que algum campo mudar, atualiza o estado localFiltros
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFiltros((prevFiltros) => ({ ...prevFiltros, [name]: value }));
  };

  /**
   * Efeito que dispara sempre que localFiltros mudar
   * - Aplica os filtros no componente pai chamando aplicarFiltros
   */
  useEffect(() => {
    aplicarFiltros(localFiltros);
  }, [localFiltros]);

  /**
   * Efeito que busca opções de anos, culturas e regiões
   * - Só roda quando a tabela muda
   * - Consulta a API backend `/api/filtros/:tabela`
   */
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
      {/* Seleção da tabela */}
      <label>Tabela</label>
      <select name="tabela" value={localFiltros.tabela} onChange={handleChange}>
        <option value="">Selecione...</option>
        <option value="1612">1612 – Lavouras temporárias</option>
        <option value="1613">1613 – Lavouras permanentes</option>
      </select>

      {/* Filtro de Ano com range slider */}
      <label>Ano</label>
      <div className="range-slider">
        <div className="range-values">
          <span>{anoIntervalo.anoMin}</span>
          <span>{anoIntervalo.anoMax}</span>
        </div>
        <input 
          type="range" 
          name="anoMin" 
          min={1974} 
          max={2024} 
          value={anoIntervalo.anoMin} 
          onChange={handleChangeAno} 
          className="slider slider-min" 
        />
        <input 
          type="range" 
          name="anoMax" 
          min={1974} 
          max={2024} 
          value={anoIntervalo.anoMax} 
          onChange={handleChangeAno} 
          className="slider slider-max" 
        />
        {/* Track do slider */}
        <div className="range-track"></div>
        {/* Parte selecionada do slider */}
        <div 
          className="range-selected" 
          style={{ 
            left: `${((anoIntervalo.anoMin - 1974)/(2024-1974))*100}%`, 
            width: `${((anoIntervalo.anoMax - anoIntervalo.anoMin)/(2024-1974))*100}%` 
          }}
        ></div>
      </div>

      {/* Seleção de Cultura */}
      <label>Cultura</label>
      <select name="cultura" value={localFiltros.cultura} onChange={handleChange}>
        <option value="">Selecione...</option>
        {culturas.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      {/* Seleção de Região */}
      <label>Estado</label>
      <select name="regiao" value={localFiltros.regiao} onChange={handleChange}>
        <option value="">Selecione...</option>
        {regioes.map((r) => <option key={r} value={r}>{r}</option>)}
      </select>
    </div>
  );
}

export default Filters;
