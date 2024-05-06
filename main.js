import { drawMultilineChart } from "./js/d3.js";
import "./js/heatmap";
import data from "./data/avalanches.json";
import "./js/locomotiveScroll.js";

drawMultilineChart(data);
let pourcentage = document.querySelectorAll("#sec5 > div > div");
pourcentage.forEach(function (div) {
  div.addEventListener("mouseenter", (e) => {
    if (!e.target.classList.contains("active")) {
      document.querySelectorAll(".active").forEach((e)=>{
        e.classList.remove('active')
      })
      setTimeout(() => {
        e.target.classList.add("active");
      }, 500);
    }
  });
});

