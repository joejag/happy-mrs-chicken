canvas = $('#peppa')[0]
context = canvas.getContext('2d')

mrs_chicken_image = new Image()
mrs_chicken_image.src =  'mrs-chicken.svg'

egg_lay_sound = new Audio("egg.m4a")

clear_the_screen = ->
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)

draw_chicken = ->
    context.drawImage(mrs_chicken_image, canvas.width / 2 - 334 / 4, canvas.height / 2 - 255 / 4, 334 / 2, 255 /2 )

draw_egg = (egg) ->
    context.fillStyle = "FF9933"

    context.save()
    context.beginPath()

    context.translate(egg.x - egg.width, egg.y - egg.height)
    context.scale(egg.width, egg.height)
    context.arc(1, 1, 1, 0, 2 * Math.PI, false)
    context.fillStyle = "FFFFCC"
    context.fill()

    context.restore()
    context.stroke()

draw_instructions = ->
    context.font = '20px Times New Roman'

    context.textAlign = 'center'
    context.fillStyle = 'green'
    context.fillText("Press 's' to start!", canvas.width / 2, canvas.height-10)

    context.textAlign = 'center'
    context.fillStyle = 'green'
    context.fillText("Pressing <space> lays an egg, you have 5 seconds to lay as many as possible!", canvas.width / 2, 20)

draw_menu_line = (score, time_left) ->
    context.font = '20px Times New Roman'
    context.clearRect(0, canvas.height-30, canvas.width, 30)
    
    context.fillStyle = 'green'
    context.textAlign = 'left'
    context.fillText("Score: #{score}", 20, canvas.height-10)
    
    context.fillStyle = 'red'
    context.textAlign = 'right'
    if time_left == 0
      context.fillText("Game Over!", canvas.width - 20, canvas.height-10)
    else
      context.fillText("Time Left: #{time_left}", canvas.width - 20, canvas.height-10)

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

    for egg in eggs
      draw_egg(egg)

    draw_chicken()
    draw_menu_line(eggs.length, seconds_left)

countdown = () ->
    seconds_left -= 1 if seconds_left > 0

mrs_chicken_image.onload = ->
    draw_chicken()
    draw_instructions()

Mousetrap.bind('s', ->
    Mousetrap.bind('space', ->
        if seconds_left > 0
            eggs.push(new Egg()) 
            egg_lay_sound.play())

    setInterval paint_world, 50
    setInterval countdown, 1000)

