import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// 1. Definição de tipos
interface MunicipioData {
  localidade: string;
  valor: number;
}

interface FeatureProperties {
  nome: string;
  [key: string]: any;
}

interface GeoJSONFeature {
  type: "Feature";
  properties: FeatureProperties;
  geometry: {
    type: string;
    coordinates: any[];
  };
}

interface GeoJSONData {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

interface MapViewProps {
  dados: MunicipioData[];
}

// 2. Componente com tipos
const MapView: React.FC<MapViewProps> = ({ dados }) => {
  const [geoData, setGeoData] = useState<GeoJSONData | null>(null);

  // Carregar shapefile simplificado dos municípios (exemplo SP = 35)
  useEffect(() => {
    async function fetchGeoJSON() {
      try {
        const res = await axios.get<GeoJSONData>(
          "https://servicodados.ibge.gov.br/api/v2/malhas/35?formato=application/vnd.geo+json"
        );
        setGeoData(res.data);
      } catch (err) {
        console.error("Erro ao carregar GeoJSON:", err);
      }
    }
    fetchGeoJSON();
  }, []);

  // Função para definir estilo dos polígonos
  const getStyle = (feature: GeoJSONFeature) => {
    const municipio = feature.properties.nome;
    const registro = dados.find((d) => d.localidade === municipio);

    let color = "#ccc";
    if (registro) {
      const valor = registro.valor || 0;
      if (valor > 1000000) color = "#08519c";
      else if (valor > 500000) color = "#3182bd";
      else if (valor > 100000) color = "#6baed6";
      else color = "#bdd7e7";
    }

    return {
      fillColor: color,
      weight: 1,
      opacity: 1,
      color: "white",
      fillOpacity: 0.7,
    };
  };

  return (
    <div style={{ height: "400px", marginBottom: "1rem" }}>
      <MapContainer center={[-22, -48]} zoom={6} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {geoData && (
          <GeoJSON
            data={geoData as any}
            style={getStyle}
            onEachFeature={(feature: GeoJSONFeature, layer: L.Layer) => {
              const municipio = feature.properties.nome;
              const registro = dados.find((d) => d.localidade === municipio);
              const valor = registro ? registro.valor : "Sem dados";
              layer.bindTooltip(
                `<b>${municipio}</b><br/>Produção: ${valor}`,
                { permanent: false }
              );
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;