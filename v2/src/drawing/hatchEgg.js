module.exports = function() {

    d3.selectAll("#peppa image")
        .transition()
        .attr("xlink:href", "../egg-cracked.svg")
        .duration(1000)
        .transition()
        .attr("xlink:href", "../baby-chick-left.svg")
        .attr('x', -30)
        .each("start", function() { console.log("start music")})
        .each("end", function() { console.log("stop music")})
        .duration(3000)
}