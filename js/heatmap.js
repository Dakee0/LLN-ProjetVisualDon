import mapboxgl from 'mapbox-gl';
//import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { Deck } from '@deck.gl/core';
import {HeatmapLayer} from '@deck.gl/aggregation-layers';

function createHeatmap(div) {
  //Données fictives
  const data = [
    { position: [46.8182, 8.2275], weight: 1000000 },
    { position: [46.948, 7.4474], weight: 50000 },
    { position: [46.2044, 6.1432], weight: 80000 },
  ];

  console.warn(data);

  // Création d'une map Mapbox centrée sur la Suisse
  mapboxgl.accessToken = 'pk.eyJ1IjoibG9tbzcyIiwiYSI6ImNsdTJmNjRsNzBzZ3AybXBkMHd6dHpwbTcifQ.8pzD5-cs1icWO3_DfCQHvg';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/lomo72/clu2h0bro000n01pqal0fcarg', // Le style de map
    center: [8.2275, 46.8182],
    zoom: 6.9
  });

 /* map.on('load', () => {
    const heatmapLayer = new HeatmapLayer({
      id: 'heatmap',
      data: data,
      getPosition: d => d.position,
      getWeight: d => d.weight,
      aggregation: 'SUM'


    });

  });*/
  getDeckGLMap = (layers, pitch) =>{
    let deckgl = new Deck({
      container: div,
      map: map,
      mapboxAcessToken: '',
      mapboxApiAcessToken: 'pk.eyJ1IjoibG9tbzcyIiwiYSI6ImNsdTJmNjRsNzBzZ3AybXBkMHd6dHpwbTcifQ.8pzD5-cs1icWO3_DfCQHvg',
      mapStyle: 'mapbox://styles/mapbox/dark-v9',
      layers: layers,
      initialViewState: {
        longitude: 8.2275,
        latitude: 46.8182,
        zoom: 6.9,
        pitch: pitch,
      },
      controller:true

    });
  };

  getDeckGLMap([
    new HeatmapLayer({
    id: 'heatmap',
    data: data,
    getPosition: d => d.position,
    getWeight: d => d.weight,
    aggregation: 'SUM',
    radiusPixels: 10,
    colorDomain: [100, 1000]
  })
]);

  return map; // Retourne l'objet map pour une utilisation ultérieure si nécessaire
}

export { createHeatmap };