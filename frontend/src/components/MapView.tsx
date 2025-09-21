import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { Dado } from "../types";
import { stateCenters } from "../types";
import { useEffect } from "react";

interface Props {
  dados: Dado[];
  estadoSelecionado?: string;
}

function ChangeView({ estado }: { estado?: string }) {
  const map = useMap();
  useEffect(() => {
    if (estado && stateCenters[estado]) {
      map.setView(stateCenters[estado], 6);
    }
  }, [estado, map]);

  return null;
}

function MapView({ dados, estadoSelecionado }: Props) {
  // Reduz o array de dados para um objeto com uma entrada por região (estado),
  // garantindo que não haja marcadores duplicados para a mesma localização.
  const dadosPorRegiao = dados.reduce((acc, d) => {
    if (!acc[d.regiao]) {
      // Usa a chave 'regiao' para agrupar.
      acc[d.regiao] = d;
    }
    return acc;
  }, {} as Record<string, Dado>);

  // Converte o objeto de volta para um array, com apenas um item por região.
  const dadosUnicosPorRegiao = Object.values(dadosPorRegiao);

  return (
    <div className="map" style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={[-14.235, -51.9253]}
        zoom={4}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ChangeView estado={estadoSelecionado} />

        {/* Mapeia os dados únicos para criar um marcador para cada região. */}
        {dadosUnicosPorRegiao.map((d, i) => {
          // Obtém as coordenadas do estado usando a propriedade `regiao` como chave.
          const coords = stateCenters[d.regiao];
          
          // Renderiza o marcador apenas se as coordenadas existirem.
          if (coords) {
            return (
              <Marker key={i} position={coords}>
                <Popup>
                  <b>{d.regiao}</b> <br />
                  {d.cultura}: {d.valor}
                </Popup>
              </Marker>
            );
          }
          // Retorna null para não renderizar nada caso as coordenadas não sejam encontradas.
          return null;
        })}
      </MapContainer>
    </div>
  );
}

export default MapView;