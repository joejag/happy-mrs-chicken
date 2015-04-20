$ = require('jquery')

module.exports = function (ee) {
    $(document).keyup(function (e) {
        if (e.which == 32) { ee.emit('space_bar_pressed') }
        if (e.which == 83) { ee.emit('s_pressed') }
    })
}
