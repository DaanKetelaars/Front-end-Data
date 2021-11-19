let listenersArr = [];
let artistArr = [];
// Get data
d3.json('http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=netherlands&api_key=7ebc4d450f175fa75d3260763df487fb&format=json').then((data) => {
    let getData = data.topartists.artist;
    let showArtists = getData.map((data) => data);
    showArtists.map(artist => {
        const listeners = artist.listeners;
        const artistName = artist.name;
        if (typeof listeners === 'string' || typeof artistName === 'string') {
            listenersArr.push(listeners);
            artistArr.push(artistName);
        }
    });
    const combinedArr = artistArr.map((artist, index) => {
        return {
            artist: artist,
            listeners: listenersArr[index],
        }
    });
    let selectNum = combinedArr.map((x) => {
        return x.listeners = +x.listeners;
    });
    combinedArr.sort((a, b) => b.listeners - a.listeners);
    let topFiftyData = combinedArr;
    update(topFiftyData)
});


function update(topFiftyData) {
    // set the dimensions and margins of the graph
    const margin = {
            top: 100,
            right: 0,
            bottom: 0,
            left: 0
        },
        width = 1280 - margin.left - margin.right,
        height = 720 - margin.top - margin.bottom,
        innerRadius = 90,
        outerRadius = Math.min(width, height) / 2; // the outerRadius goes from the middle of the SVG area to the border

    // append the svg object
    const svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${width/2+margin.left}, ${height/2+margin.top})`);


    // Scales
    const x = d3.scaleBand()
        .range([0, 2 * Math.PI]) // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .align(0) // This does nothing
        .domain(topFiftyData.map(d => d.artist)); // The domain of the X axis is the list of states.
    const y = d3.scaleRadial()
        .range([innerRadius, outerRadius]) // Domain will be define later.
        .domain([0, 7500000]); // Domain of Y is from 0 to the max seen in the data

    // Add the bars
    svg.append("g")
        .selectAll("path")
        .data(topFiftyData)
        .join("path")
        .attr("fill", "#69b3a2")
        .attr("d", d3.arc() // imagine your doing a part of a donut plot
            .innerRadius(innerRadius)
            .outerRadius(d => y(d.listeners))
            .startAngle(d => x(d.artist))
            .endAngle(d => x(d.artist) + x.bandwidth())
            .padAngle(0.01)
            .padRadius(innerRadius))
        .on("mouseover", function (d, i) {
            tooltip.html(`Listeners: ${d.srcElement.__data__.listeners}`).style("visibility", "visible")
            d3.select(this)
                .attr("fill", ("#69b3a2", -15));
        }).on("mousemove", function () {
            tooltip
                .style("top", (event.y - 10) + "px")
                .style("left", (event.x + 10) + "px");
        }).on("mouseout", function () {
            tooltip.html(``).style("visibility", "hidden");
            d3.select(this).attr("fill", "#69b3a2");
        })

    // Animation
    // const rect = svg.selectAll("path")
    //     .attr("y", innerHeight) //setting y at the bottom for the transition effect
    //     .attr("height", 0) //setting height 0 for the transition effect
    //     .attr("width", x.bandwidth())
    //     .style("fill", "rgb(234, 229, 229)")
    //     .transition()
    //     .duration(1000)
    //     .ease(d3.easeQuadOut)
    //     .attr("height", calcBarHeight)
    //     .attr("y", function (d) {
    //         return y(d.listeners);
    //     })
    //     .style("fill", "rgb(70, 130, 180)");

    // Add the labels
    svg.append("g")
        .selectAll("g")
        .data(topFiftyData)
        .join("g")
        .attr("text-anchor", function (d) {
            return (x(d.artist) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start";
        })
        .attr("transform", function (d) {
            return "rotate(" + ((x(d.artist) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")" + "translate(" + (y(d.listeners) + 10) + ",0)";
        })
        .append("text")
        .text(function (d) {
            return (d.artist)
        })
        .attr("transform", function (d) {
            return (x(d.artist) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)";
        })
        .style("font-size", "11px")
        .attr("alignment-baseline", "middle")

    // create tooltip element  
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "d3-tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("padding", "15px")
        .style("background", "rgba(0,0,0,0.6)")
        .style("border-radius", "5px")
        .style("color", "#fff")
        .text("a simple tooltip");
}