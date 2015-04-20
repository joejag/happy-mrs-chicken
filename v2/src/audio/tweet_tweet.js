var tweet_sound = new Audio("../tweet.m4a")

module.exports = {
    play: function () {
        tweet_sound.loop = true
        tweet_sound.play()
    },

    stop: function () {
        console.log('stopping sounds')
        tweet_sound.pause()
    }
}