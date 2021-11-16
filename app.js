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
    console.log(topFiftyData);
    // set the dimensions and margins of the graph
    const margin = {
            top: 100,
            right: 30,
            bottom: 90,
            left: 100
        },
        width = 1920 - margin.left - margin.right,
        height = 1080 - margin.top - margin.bottom;

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
        .domain([0, 7500000])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Bars
    svg.selectAll("mybar")
        .data(topFiftyData)
        .join("rect")
        .attr("x", d => x(d.artist))
        .attr("width", x.bandwidth())
        .attr("fill", "#69b3a2")
        // no bar at the beginning thus:
        .attr("height", d => height - y(0)) // always equal to 0
        .attr("y", d => y(0))

    // Animation
    svg.selectAll("rect")
        .transition()
        .ease(d3.easeQuadOut)
        .duration(800)
        .attr("y", d => y(d.listeners))
        .attr("height", d => height - y(d.listeners))
        .delay((d, i) => {
            console.log(i);
            return i * 100
        })

}