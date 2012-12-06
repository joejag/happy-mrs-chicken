canvas = $('#peppa')[0]
context = canvas.getContext('2d')

clear_the_screen = ->
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)

draw_egg = (cx, cy, rx, ry) ->
        context.fillStyle = "FF9933"

        context.save()
        context.beginPath()

        context.translate(cx-rx, cy-ry)
        context.scale(rx, ry)
        context.arc(1, 1, 1, 0, 2 * Math.PI, false)
        context.fillStyle = "FFFFCC"
        context.fill()

        context.restore()
        context.stroke()

draw_menu_line = (score, time_left) ->
    context.font = '20px Times New Roman'
    context.clearRect(0, canvas.height-30, canvas.width, 30)
    
    context.fillStyle = 'green'
    context.fillText("Score: #{score}", 10, canvas.height-10)
    context.fillStyle = 'red'
    context.fillText("Time Left: #{time_left}", canvas.width-120, canvas.height-10)

eggs = []
seconds_left = 5

class Egg
    constructor: ->
      @width = 10
      @height = 20
      @x = Math.floor(Math.random() * canvas.width)
      @y = Math.floor(Math.random() * canvas.height - 30)

paint_world = () ->
    clear_the_screen()
    draw_menu_line(eggs.length, seconds_left)

    for egg in eggs
      draw_egg(egg.x, egg.y, egg.width, egg.height)

countdown = () ->
    seconds_left -= 1 if seconds_left > 0

Mousetrap.bind('space', -> eggs.push(new Egg()) if seconds_left > 0 )

setInterval paint_world, 10
setInterval countdown, 1000
