canvas = $('#peppa')[0]
context = canvas.getContext('2d')

mrs_chicken_image = new Image()
mrs_chicken_image.src =  'mrs-chicken.svg'

egg_image = new Image()
egg_image.src =  'egg-perfect.svg'

egg_cracked_image = new Image()
egg_cracked_image.src =  'egg-cracked.svg'

baby_left_image = new Image()
baby_left_image.src =  'baby-chick-left.svg'

baby_right_image = new Image()
baby_right_image.src =  'baby-chick-right.svg'

egg_lay_sound = new Audio("egg.m4a")
tweet_sound = new Audio("tweet.m4a")

clear_the_screen = ->
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)

draw_chicken = ->
    context.drawImage(mrs_chicken_image, canvas.width / 2 - 334 / 4, canvas.height / 2 - 255 / 4, 334 / 2, 255 /2 )

draw_egg = (egg) ->
    context.drawImage(egg_image, egg.x + 20/2, egg.y + 40/2, 20, 40)

draw_cracked_egg = (egg) ->
    context.drawImage(egg_cracked_image, egg.x + 20/2, egg.y + 40/2, 20, 40)

draw_baby= (egg) ->
    if egg.flipped == true
      context.drawImage(baby_right_image, egg.x + (334/10/2), egg.y + (260/10/2), 334/10, 260/10)
    else
      context.drawImage(baby_left_image, egg.x + (334/10/2), egg.y + (260/10/2), 334/10, 260/10)

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
      @cracked = false
      @hatched = false
      @flipped = false
    crack: ->
      @cracked = true
      egg = @
      setTimeout(( -> egg.hatch()), 1000)
    hatch: ->
      @hatched = true
    run_away: ->
      if @x > canvas.width / 2
        direction = 5
        @flipped = true
      else
        direction = -5
        @flipped = false
      @x = @x + direction

game_over = false

draw_end = () ->
    return if game_over
    clear_the_screen()

    eggs_left_on_screen = false
    for egg in eggs
        eggs_left_on_screen = true if egg.x > 0 - (334 / 10) and egg.x - (334 / 10) < canvas.width
        egg.crack()
        if egg.cracked and not egg.hatched
          draw_cracked_egg(egg)
        else
          tweet_sound.play()
          egg.run_away()
          draw_baby(egg)

    draw_chicken()
    draw_menu_line(eggs.length, seconds_left)
    if eggs_left_on_screen == false
        game_over = true

paint_world = () ->
    return draw_end() if seconds_left <= 0

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

