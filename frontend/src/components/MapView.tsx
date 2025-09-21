import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

// Importa os tipos de dados personalizados.
// `Dado` é o tipo para os dados de cada ponto no mapa.
// `stateCenters` provavelmente é um objeto que mapeia as siglas dos estados para suas coordenadas.
import type { Dado } from "../types";
import { stateCenters } from "../types";

// Importa o hook `useEffect` do React, que executa efeitos colaterais.
import { useEffect } from "react";

// Define a interface para as props do componente `MapView`.
// `dados` é um array de objetos do tipo `Dado` para serem exibidos.
// `estadoSelecionado` é uma string opcional para centralizar o mapa em um estado.
interface Props {
  dados: Dado[];
  estadoSelecionado?: string;
}

// O componente `ChangeView` é responsável por atualizar a visualização do mapa.
// Ele não renderiza nada, apenas usa o `useEffect` para manipular o mapa.
function ChangeView({ estado }: { estado?: string }) {
  // Obtém a instância do mapa usando o hook `useMap`.
  const map = useMap();

  // O `useEffect` é executado sempre que o `estado` ou o `map` mudam.
  useEffect(() => {
    // Verifica se um estado foi selecionado e se suas coordenadas existem no objeto `stateCenters`.
    if (estado && stateCenters[estado]) {
      // Usa o método `setView` para mover o centro do mapa para as coordenadas do estado
      // e define o nível de zoom para 6.
      map.setView(stateCenters[estado], 6);
    }
  }, [estado, map]); // As dependências garantem que o efeito só seja reexecutado quando `estado` ou `map` mudarem.

  // O componente não renderiza nada.
  return null;
}

// O componente `MapView` é o principal e renderiza o mapa completo.
function MapView({ dados, estadoSelecionado }: Props) {
  return (
    // Contêiner principal do mapa, com estilos definidos.
    <div className="map" style={{ height: "400px", width: "100%" }}>
      {/* O componente `MapContainer` inicia o mapa. */}
      <MapContainer
        // Define a posição inicial do centro do mapa.
        center={[-14.235, -51.9253]}
        // Define o zoom inicial.
        zoom={4}
        // Estilos para ocupar 100% do contêiner pai.
        style={{ height: "100%", width: "100%" }}
      >
        {/* Adiciona a camada base do mapa (`TileLayer`). */}
        <TileLayer
          // Atribuição de direitos autorais, conforme exigido pelo OpenStreetMap.
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          // URL do serviço de telhas do OpenStreetMap.
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* // O componente `ChangeView` é renderizado dentro do `MapContainer`
          // para ter acesso à instância do mapa. Ele centraliza a visualização
          // quando um novo estado é selecionado.
        */}
        <ChangeView estado={estadoSelecionado} />

        {/* // Mapeia os dados recebidos para criar um marcador para cada ponto.
          // O `key` é importante para a performance do React.
        */}
        {dados.map((d, i) => (
          <Marker key={i} position={[d.latitude, d.longitude]}>
            {/* O `Popup` é o balão de informação que aparece ao clicar no marcador. */}
            <Popup>
              {/* Exibe a localidade em negrito. */}
              <b>{d.localidade}</b> <br />
              {/* Exibe a cultura e o valor do dado. */}
              {d.cultura}: {d.valor}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

// Exporta o componente `MapView` para ser usado em outros arquivos.
export default MapView;