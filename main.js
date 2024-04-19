
import { drawMultilineChart } from './js/d3.js';
import  { createHeatmap } from './js/heatmap';
import data from './data/avalanches.json'
import "./js/locomotiveScroll.js"

drawMultilineChart(data);
console.warn(data);
let pourcentage = document.querySelectorAll('#sec5 > div > div')
pourcentage.forEach(function(div) {
    div.addEventListener('mouseenter', (e)=>{
        if (!e.target.classList.contains('active')) {
            document.querySelector('.active').classList.remove('active')        
            e.target.classList.add("active");
        }
    });
});

function calculerHauteurTotale() {
    const elements = document.querySelectorAll('header, section, footer');
    
    const hauteurTotale = Array.from(elements).reduce((acc, el) => acc + el.offsetHeight, 0);
    
    console.log(`La hauteur totale est de ${hauteurTotale} pixels.`);
    
    return hauteurTotale;
  }


// Création de la heatmap et ajout à la section 3
const containerId = document.getElementById('map');
createHeatmap(containerId);
console.warn(map);

