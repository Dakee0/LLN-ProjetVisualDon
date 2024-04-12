// import LocomotiveScroll from 'locomotive-scroll';

// document.addEventListener('DOMContentLoaded', () => {
//     const scroll = new LocomotiveScroll({
//         el: document.querySelector('[data-scroll-container]'),
//         smooth: true
//     });

// });

import { drawMultilineChart } from './js/d3.js';
import data from './data/avalanches.json'

drawMultilineChart(data);
console.warn(data);
