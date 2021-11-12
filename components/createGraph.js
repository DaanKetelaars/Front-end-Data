function createGraph(data) {
    // // set margins and dimensions
    // const margin = {
    //         top: 20,
    //         right: 20,
    //         bottom: 30,
    //         left: 40
    //     },
    //     width = 960 - margin.left - margin.right,
    //     height = 500 - margin.top - margin.bottom;

    // // set scales
    // const xscale = d3.scaleLinear().range([0, width]);
    // const yscale = d3.scaleBand().rangeRound([0, height]).paddingInner(0.1);

    // update(data);

    // // append SVG element
    // const svg = d3.select("body").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform",
    //     "translate(" + margin.left + "," + margin.top + ")")

    // // Add group to SVG
    // const g = svg.append('g')
    //     .attr('transform', `translate(${margin.left},${margin.top})`);

    // //Axis setup
    // const xaxis = d3.axisTop().scale(xscale);
    // const g_xaxis = g.append('g').attr('class', 'x axis');
    // const yaxis = d3.axisLeft().scale(yscale);
    // const g_yaxis = g.append('g').attr('class', 'y axis');



    // function update(new_data) {
    //     //update the scales
    //     xscale.domain([0, d3.max(new_data, (d) => d.temperature)]);
    //     yscale.domain(new_data.map((d) => d.location.city));
    //     //render the axis
    //     g_xaxis.transition().call(xaxis);
    //     g_yaxis.transition().call(yaxis);


    //     // Render the chart with new data

    //     // DATA JOIN use the key argument for ensurign that the same DOM element is bound to the same data-item
    //     const rect = g.selectAll('rect').data(new_data, (d) => d.location.city).join(
    //         // ENTER 
    //         // new elements
    //         (enter) => {
    //             const rect_enter = enter.append('rect').attr('x', 0);
    //             rect_enter.append('title');
    //             return rect_enter;
    //         },
    //         // UPDATE
    //         // update existing elements
    //         (update) => update,
    //         // EXIT
    //         // elements that aren't associated with data
    //         (exit) => exit.remove()
    //     );

    //     // ENTER + UPDATE
    //     // both old and new elements
    //     rect.transition()
    //         .attr('height', yscale.bandwidth())
    //         .attr('width', (d) => xscale(d.temperature))
    //         .attr('y', (d) => yscale(d.location.city));

    //     rect.select('title').text((d) => d.location.city);
    // }

    // //interactivity
    // d3.select('#filter-us-only').on('change', function () {
    //     // This will be triggered when the user selects or unselects the checkbox
    //     const checked = d3.select(this).property('checked');
    //     if (checked === true) {
    //         // Checkbox was just checked

    //         // Keep only data element whose country is US
    //         const filtered_data = data.filter((d) => d.location.country === 'US');

    //         update(filtered_data); // Update the chart with the filtered data
    //     } else {
    //         // Checkbox was just unchecked
    //         update(data); // Update the chart with all the data we have
    //     }
    // });
}

export default createGraph;