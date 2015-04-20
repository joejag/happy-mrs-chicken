module.exports = function(ee) {

    d3.selectAll("#peppa image")
        .transition()
        .attr("xlink:href", "../egg-cracked.svg")
        .duration(1000)
        .transition()
        .attr("xlink:href", "../baby-chick-left.svg")
        .attr('x', -30)
        .each("start", function() { ee.emit('chicks_leaving')})
        .each("end", function() { ee.emit('chicks_gone')})
        .duration(3000)
}