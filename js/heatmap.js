import mapboxgl from "mapbox-gl";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { ScatterplotLayer } from "@deck.gl/layers";
import { MapboxOverlay } from "@deck.gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import data from "./../data/avalanches.json";
console.warn(data);
// Données fictives
const dataTest = [
  { position: [8.2275, 46.8182], weight: 10000 }, // Modification de la structure des données pour correspondre à la position [longitude, latitude]
  { position: [7.4474, 46.948], weight: 10000 },
  { position: [6.1432, 46.2044], weight: 20000 },
];

// Crée un nouvel objet pour stocker les données et les coordonnées
const newDataObject = {
  data: [],
};

// Parcours les 100 premières données de jsonData.data
for (let i = 0; i < data.length; i++) {
  const dataEntry = data[i];
  // Crée un objet pour chaque entrée de données avec les valeurs de latitude et de longitude
  const entryObject = {
    id: dataEntry.id,
    weight: 5,
    position: [dataEntry.longitude, dataEntry.latitude],
  };
  // Ajoute l'objet de données à newDataObject
  newDataObject.data.push(entryObject);
}
console.warn(newDataObject.data);

const containerId = document.getElementById("map");

const map = new mapboxgl.Map({
  container: containerId,
  style: "mapbox://styles/mapbox/light-v9",
  accessToken:
    "pk.eyJ1IjoibG9tbzcyIiwiYSI6ImNsdTJmNjRsNzBzZ3AybXBkMHd6dHpwbTcifQ.8pzD5-cs1icWO3_DfCQHvg",
  center: [8.2275, 46.8182],
  zoom: 6.9,
});
map.once("load", () => {
  const deckOverlay = new MapboxOverlay({
    interleaved: true,
    layers: [
      new HeatmapLayer({
        id: "deckgl-circle",
        data: newDataObject.data,
        getPosition: (d) => d.position, // Utilisation de la position
        getWeight: (d) => d.weight,
        aggregation: "SUM",
        radiusPixels: 100,
        colorDomain: [1, 10],
      }),
    ],
  });
  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(deckOverlay);
});
