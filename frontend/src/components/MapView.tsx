import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Dado } from "../types";

interface Props {
  dados: Dado[];
}

function MapView({ dados }: Props) {
  return (
    <div className="map" style={{ height: "400px", width: "100%" }}>
      <MapContainer center={[-14.235, -51.9253]} zoom={4} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {dados.map((d, i) => (
          <Marker
            key={i}
            position={[-14 + Math.random() * 10, -51 + Math.random() * 10]} //Exemplo: posição fake
          >
            <Popup>
              <b>{d.localidade}</b> <br />
              {d.produto}: {d.valor}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
