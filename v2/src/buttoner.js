module.exports = function (ee) {
    ee.on('space_bar_pressed', function () {
        require('./audio/egg_laying')()
        require('./drawing/layEgg')()
        require('./drawing/updateScore')()
    })

    ee.on('s_pressed', function () {
        require('./drawing/hatchEgg')(ee)
    })

    ee.on('chicks_leaving', function () {
        require('./audio/tweet_tweet').play()
    })

    ee.on('chicks_gone', function () {
        require('./audio/tweet_tweet').stop()
    })
}
