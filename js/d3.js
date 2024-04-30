import * as d3 from 'd3';

function drawMultilineChart(data) {
    const svg = d3.select('#sec4 svg');
    const margin = { top: 20, right: 10, bottom: 30, left: 30 };

    // Dynamically adjust width and height based on the SVG container's dimensions.
    const svgWidth = svg.node().getBoundingClientRect().width;
    const svgHeight = svg.node().getBoundingClientRect().height;

    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleTime().range([0, width]);
    const yScale = d3.scaleLinear().range([height, 0]);

    let summaryData = d3.group(data, d => d['hydrological.year']);
    let chartData = [];

    summaryData.forEach((values, key) => {
        // Créer un objet Date au niveau du chartData
        const yearDate = new Date(key.substring(0, 4), 0, 1);
        chartData.push({
            year: key,
            yearDate: yearDate,
            avalanches: values.length,
            caught: d3.sum(values, d => d['number.caught']),
            dead: d3.sum(values, d => d['number.dead'])
        });
    });

    chartData.sort((a, b) => a.yearDate - b.yearDate);
    xScale.domain(d3.extent(chartData, d => d.yearDate));
    yScale.domain([0, d3.max(chartData, d => Math.max(d.avalanches, d.caught, d.dead))]);

    // Définir un formatteur custom
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(function (d) {
            const nextYear = (d.getFullYear() + 1).toString().slice(-2);
            return `${d.getFullYear()}/${nextYear}`;
        });
    const yAxis = d3.axisLeft(yScale);

    const lineAvalanches = d3.line()
        .x(d => xScale(d.yearDate))
        .y(d => yScale(d.avalanches));
    const lineCaught = d3.line()
        .x(d => xScale(d.yearDate))
        .y(d => yScale(d.caught));
    const lineDead = d3.line()
        .x(d => xScale(d.yearDate))
        .y(d => yScale(d.dead));

    g.append("g").attr("transform", `translate(0,${height})`).call(xAxis);
    g.append("g").call(yAxis);

    g.append("path")
        .data([chartData])
        .attr("class", "line line-avalanches")
        .attr("d", lineAvalanches)
        .style("stroke", "#3C8DBC");

    g.append("path")
        .data([chartData])
        .attr("class", "line line-caught")
        .attr("d", lineCaught)
        .style("stroke", "#f6be2f");

    g.append("path")
        .data([chartData])
        .attr("class", "line line-dead")
        .attr("d", lineDead)
        .style("stroke", "#7b7b7b");

    // Fonction pour mettre en gras la légende associée et épaissir la ligne
    function highlightLineAndLegend(selectedClass) {
        d3.selectAll(".line").classed("line-hover", false);
        d3.selectAll(".legend-item").classed("legend-bold", false);

        // Highlight la ligne sélectionnée et la légende
        d3.selectAll("." + selectedClass).classed("line-hover", true);
        d3.selectAll(".legend-item[data-line='" + selectedClass.split("-")[1] + "']")
            .classed("legend-bold", true);
    }

    // Fonction pour réinitialiser les lignes et les légendes à leur état normal
    function resetLinesAndLegends() {
        d3.selectAll(".line").classed("line-hover", false);
        d3.selectAll(".legend-item").classed("legend-bold", false);
    }

    // Gestionnaire d'événements pour les lignes
    d3.selectAll(".line")
        .on("mouseover", function () {
            const selectedClass = d3.select(this).attr("class").split(" ")[1];
            highlightLineAndLegend(selectedClass);
        })
        .on("mouseout", resetLinesAndLegends);

    // Gestionnaire d'événements pour les légendes
    d3.selectAll(".legend-item")
        .on("mouseover", function () {
            const lineClass = "line-" + d3.select(this).attr("data-line");
            highlightLineAndLegend(lineClass);
        })
        .on("mouseout", resetLinesAndLegends);

    // Création des bulles avec les données exactes en fonction de la position du la ligne    
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("padding", "8px")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("pointer-events", "none");

    // Gestionnaire d'évènements pour la bulle en fonction de la ligne    
    d3.selectAll(".line")
        .on("mouseover", function (event, d) {
            const selectedClass = d3.select(this).attr("class").split(" ")[1];
            highlightLineAndLegend(selectedClass);
            const yValue = yScale.invert(d3.pointer(event, this)[1]).toFixed(0);
            const metric = selectedClass.split("-")[1];
            let label;
            let borderColor = "#000"; // Couleur par défaut
            if (metric === "avalanches") {
                label = `Nombre d'avalanches: ${yValue}`;
                borderColor = "#3C8DBC"; // Bleu
            }
            if (metric === "caught") {
                label = `Nombre de personnes emportées: ${yValue}`;
                borderColor = "#f6be2f"; // Jaune
            }
            if (metric === "dead") {
                label = `Nombre de morts: ${yValue}`;
                borderColor = "#7b7b7b"; // Gris
            }
            tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
            tooltip.html(label)
                .style("border-color", borderColor)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function () {
            resetLinesAndLegends();
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
}


export { drawMultilineChart };
