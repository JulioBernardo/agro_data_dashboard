import React, { useState } from "react";

interface FiltersProps {
  anos: number[];
  culturas: string[];
  setFiltros: React.Dispatch<React.SetStateAction<{ ano: string; cultura: string }>>;
}

function Filters({ anos, culturas, setFiltros }: FiltersProps) {
  const [ano, setAno] = useState<string>("");
  const [cultura, setCultura] = useState<string>("");

  const aplicarFiltros = () => {
    setFiltros({ ano, cultura });
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>Filtros</h3>

      <label>Ano</label>
      <select value={ano} onChange={(e) => setAno(e.target.value)}>
        <option value="">Selecione...</option>
        {anos.map((a) => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>

      <br /><br />

      <label>Cultura</label>
      <select value={cultura} onChange={(e) => setCultura(e.target.value)}>
        <option value="">Selecione...</option>
        {culturas.map((c, idx) => (
          <option key={idx} value={c}>{c}</option>
        ))}
      </select>

      <br /><br />

      <button onClick={aplicarFiltros}>Aplicar</button>
    </div>
  );
}

export default Filters;
