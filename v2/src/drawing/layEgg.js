require('d3')

module.exports = function () {
    var egg_width = 30
    var egg_height = 40

    var page_width = 800
    var page_height = 400

    var egg = d3.select("#peppa").append("svg:image")
        .attr("xlink:href", "../egg-perfect.svg")
        .attr("width", egg_width)
        .attr("height", egg_height)
        .attr('y', Math.random() * (page_height - egg_height))
        .attr('x', Math.random() * (page_width - egg_width))
}