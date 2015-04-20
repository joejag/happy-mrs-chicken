module.exports = function(ee) {
    ee.on('space_bar_pressed', function () {
        require('./drawing/layEgg')()
        require('./drawing/updateScore')()
    })

    ee.on('s_pressed', function () {
        require('./drawing/hatchEgg')()
    })
}
