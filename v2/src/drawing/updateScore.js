require('d3')

module.exports = function () {

    d3.select("#peppa").append("text")
        .enter().
        append("text")
        .attr('y', Math.random() * (page_height - egg_height))
        .attr('x', Math.random() * (page_width - egg_width))
}