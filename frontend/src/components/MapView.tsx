import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { Dado } from "../types";
import { stateCenters } from "../types";
import { useEffect } from "react";

interface Props {
  dados: Dado[];              // Lista de dados que serão exibidos no mapa
  estadoSelecionado?: string; // Estado (UF) selecionado, opcional
}

/**
 * Componente auxiliar que muda a visão do mapa
 * sempre que o `estado` selecionado mudar.
 */
function ChangeView({ estado }: { estado?: string }) {
  const map = useMap(); // Hook do react-leaflet para acessar a instância do mapa

  useEffect(() => {
    // Se existe um estado selecionado e ele tem coordenadas cadastradas em stateCenters
    if (estado && stateCenters[estado]) {
      // Centraliza o mapa nesse estado, com zoom 6
      map.setView(stateCenters[estado], 6);
    }
  }, [estado, map]);

  return null; // Não renderiza nada, apenas executa o efeito colateral
}

function MapView({ dados, estadoSelecionado }: Props) {
  /**
   * Reduz a lista de `dados` em um objeto no formato:
   * { [regiao]: dado }
   *
   * Isso garante que só haja **um dado por região**,
   * evitando múltiplos marcadores no mesmo estado.
   */
  const dadosPorRegiao = dados.reduce((acc, d) => {
    if (!acc[d.regiao]) {
      acc[d.regiao] = d; // Usa a chave 'regiao' para agrupar
    }
    return acc;
  }, {} as Record<string, Dado>);

  // Converte o objeto novamente para um array, mas agora sem duplicatas
  const dadosUnicosPorRegiao = Object.values(dadosPorRegiao);

  return (
    <div className="map" style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={[-14.235, -51.9253]} // Coordenadas iniciais (centro aproximado do Brasil)
        zoom={4}                     // Zoom inicial (nível de detalhe)
        style={{ height: "100%", width: "100%" }}
      >
        {/* Camada de tiles do OpenStreetMap (mapa base) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Atualiza a visão do mapa quando o estadoSelecionado mudar */}
        <ChangeView estado={estadoSelecionado} />

        {/* Renderiza os marcadores (um por estado) */}
        {dadosUnicosPorRegiao.map((d, i) => {
          // Obtém as coordenadas da região (estado)
          const coords = stateCenters[d.regiao];

          // Só cria marcador se existir coordenada cadastrada
          if (coords) {
            return (
              <Marker key={i} position={coords}>
                <Popup>
                  {/* Exibe informações do dado dentro do popup */}
                  <b>{d.regiao}</b> <br />
                  {d.cultura}: {d.valor}
                </Popup>
              </Marker>
            );
          }

          // Caso não exista coordenada para a região, não renderiza nada
          return null;
        })}
      </MapContainer>
    </div>
  );
}

export default MapView;
