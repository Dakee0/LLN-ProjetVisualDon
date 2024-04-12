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

    // Process and summarize data as before
    let summaryData = d3.group(data, d => d['hydrological.year']);
    let chartData = [];

    summaryData.forEach((values, key) => {
        const yearDate = parseInt(key.substring(0, 4));
        console.warn(key);
        chartData.push({
            year: key,
            yearDate: yearDate,
            avalanches: values.length,
            caught: d3.sum(values, d => d['number.caught']),
            dead: d3.sum(values, d => d['number.dead'])
        });
    });
    console.warn(chartData);
    // Sort, set domains, and append elements to the SVG as before
    chartData.sort((a, b) => a.yearDate - b.yearDate);
    xScale.domain(d3.extent(chartData, d => d.yearDate));
    yScale.domain([0, d3.max(chartData, d => Math.max(d.avalanches, d.caught, d.dead))]);

    const xAxis = d3.axisBottom(xScale);
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
        .attr("class", "line line-avalanches") // Ajoutez une classe spécifique
        .attr("d", lineAvalanches)
        .style("stroke", "#3C8DBC");

    g.append("path")
        .data([chartData])
        .attr("class", "line line-caught") // Ajoutez une classe spécifique
        .attr("d", lineCaught)
        .style("stroke", "#f6be2f");

    g.append("path")
        .data([chartData])
        .attr("class", "line line-dead") // Ajoutez une classe spécifique
        .attr("d", lineDead)
        .style("stroke", "#7b7b7b");

    // Fonction pour mettre en gras la légende associée et épaissir la ligne
    function highlightLineAndLegend(selectedClass) {
        // Reset all to normal state
        d3.selectAll(".line").classed("line-hover", false);
        d3.selectAll(".legend-item").classed("legend-bold", false);

        // Highlight the selected line and legend
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

}


export { drawMultilineChart };
