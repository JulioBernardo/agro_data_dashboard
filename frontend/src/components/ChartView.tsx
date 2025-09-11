import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Dado {
  ano: number;
  localidade: string;
  produto: string;
  valor: number;
}

interface ChartViewProps {
  dados: Dado[];
}

function ChartView({ dados }: ChartViewProps) {
  return (
    <div style={{ height: "300px" }}>
      <h3>Produção por Localidade</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dados.slice(0, 15)}>
          <XAxis dataKey="localidade" hide />
          <YAxis />
          <Tooltip />
          <Bar dataKey="valor" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartView;
