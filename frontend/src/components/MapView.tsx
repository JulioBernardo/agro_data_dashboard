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

        {/* Atualiza o centro do mapa conforme o estado */}
        <ChangeView estado={estadoSelecionado} />

        {dados.map((d, i) => (
          <Marker key={i} position={[d.latitude, d.longitude]}>
            <Popup>
              <b>{d.localidade}</b> <br />
              {d.cultura}: {d.valor}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
