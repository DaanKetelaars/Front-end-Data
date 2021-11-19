// empty array's being used later on
let listenersArr = [];
let artistArr = [];

// fetch data with d3.json
d3.json('http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=netherlands&api_key=7ebc4d450f175fa75d3260763df487fb&format=json').then((data) => {
    let getData = data.topartists.artist; // get the correct array
    console.log(getData);
    let showArtists = getData.map((data) => data); // map over this array and find the specific keys
    showArtists.map(artist => {
        const listeners = artist.listeners;
        const artistName = artist.name;
        // push keys in 2 separate array's
        if (typeof listeners === 'string' || typeof artistName === 'string') {
            listenersArr.push(listeners);
            artistArr.push(artistName);
        }
    });
    // combine these 2 separate array's to 1 array.
    // change the key name so it's easier to find and use later on
    const combinedArr = artistArr.map((artist, index) => {
        return {
            artist: artist,
            listeners: listenersArr[index],
        }
    });
    // numbers as string values to return as number values
    let selectNum = combinedArr.map((x) => {
        return x.listeners = +x.listeners;
    });
    // sort the array based on number value - high to low
    combinedArr.sort((a, b) => b.listeners - a.listeners);
    let topFiftyData = combinedArr;
    barChart(topFiftyData)
});

// create a function to get data from .then above
function barChart(topFiftyData) {
    // set the dimensions and margins of the graph
    const margin = {
            top: 50,
            right: 100,
            bottom: 100,
            left: 100
        },
        width = 1280 - margin.left - margin.right,
        height = 720 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis
    const x = d3.scaleBand()
        .range([0, width])
        .domain(topFiftyData.map(d => d.artist))
        .padding(0.2);
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 6500000])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Bars
    svg.selectAll("bars")
        .data(topFiftyData)
        .join("rect")
        .attr("x", d => x(d.artist))
        .attr("width", x.bandwidth())
        .attr("fill", "#1ed760")
        .attr("height", d => height - y(0)) // always equal to 0
        .attr("y", d => y(0))
        .attr("data-amount", d => (d.listeners))
        // on mouse effects to create interactivity
        .on("mouseover", function (d, i) {
            tooltip.html(`${d.srcElement.__data__.artist}: ${d.srcElement.dataset.amount}`).style("visibility", "visible")
            console.log(d);
            d3.select(this)
                .attr("fill", ("#1ed760", "#1db954"));
        }).on("mousemove", function () {
            tooltip
                .style("top", (event.y - 10) + "px")
                .style("left", (event.x + 10) + "px");
        }).on("mouseout", function () {
            tooltip.html(``).style("visibility", "hidden");
            d3.select(this).attr("fill", "#1ed760");
        })

    // Animation
    svg.selectAll("rect")
        .transition()
        .ease(d3.easeQuadOut)
        .duration(800)
        .attr("y", d => y(d.listeners))
        .attr("height", d => height - y(d.listeners))
        .delay((d, i) => {
            return i * 100
        })

    // create tooltip element  
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "d3-tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("padding", "15px")
        .style("background", "#3860be")
        .style("border-radius", "5px")
        .style("color", "#fff")
        .style("font-family", "sans-serif")

}