(function() {
  var Egg, canvas, clear_the_screen, context, countdown, draw_chicken, draw_egg, draw_instructions, draw_menu_line, egg_lay_sound, eggs, mrs_chicken_image, paint_world, seconds_left;

  canvas = $('#peppa')[0];

  context = canvas.getContext('2d');

  mrs_chicken_image = new Image();

  mrs_chicken_image.src = 'mrs-chicken.svg';

  egg_lay_sound = new Audio("egg.m4a");

  clear_the_screen = function() {
    context.fillStyle = "white";
    return context.fillRect(0, 0, canvas.width, canvas.height);
  };

  draw_chicken = function() {
    return context.drawImage(mrs_chicken_image, canvas.width / 2 - 334 / 4, canvas.height / 2 - 255 / 4, 334 / 2, 255 / 2);
  };

  draw_egg = function(egg) {
    context.fillStyle = "FF9933";
    context.save();
    context.beginPath();
    context.translate(egg.x - egg.width, egg.y - egg.height);
    context.scale(egg.width, egg.height);
    context.arc(1, 1, 1, 0, 2 * Math.PI, false);
    context.fillStyle = "FFFFCC";
    context.fill();
    context.restore();
    return context.stroke();
  };

  draw_instructions = function() {
    context.font = '20px Times New Roman';
    context.textAlign = 'center';
    context.fillStyle = 'green';
    context.fillText("Press 's' to start!", canvas.width / 2, canvas.height - 10);
    context.textAlign = 'center';
    context.fillStyle = 'green';
    return context.fillText("Pressing <space> lays an egg, you have 5 seconds to lay as many as possible!", canvas.width / 2, 20);
  };

  draw_menu_line = function(score, time_left) {
    context.font = '20px Times New Roman';
    context.clearRect(0, canvas.height - 30, canvas.width, 30);
    context.fillStyle = 'green';
    context.textAlign = 'left';
    context.fillText("Score: " + score, 20, canvas.height - 10);
    context.fillStyle = 'red';
    context.textAlign = 'right';
    if (time_left === 0) {
      return context.fillText("Game Over!", canvas.width - 20, canvas.height - 10);
    } else {
      return context.fillText("Time Left: " + time_left, canvas.width - 20, canvas.height - 10);
    }
  };

  eggs = [];

  seconds_left = 5;

  Egg = (function() {

    function Egg() {
      this.width = 10;
      this.height = 20;
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * canvas.height - 30);
    }

    return Egg;

  })();

  paint_world = function() {
    var egg, _i, _len;
    clear_the_screen();
    for (_i = 0, _len = eggs.length; _i < _len; _i++) {
      egg = eggs[_i];
      draw_egg(egg);
    }
    draw_chicken();
    return draw_menu_line(eggs.length, seconds_left);
  };

  countdown = function() {
    if (seconds_left > 0) {
      return seconds_left -= 1;
    }
  };

  mrs_chicken_image.onload = function() {
    draw_chicken();
    return draw_instructions();
  };

  Mousetrap.bind('s', function() {
    Mousetrap.bind('space', function() {
      if (seconds_left > 0) {
        eggs.push(new Egg());
        return egg_lay_sound.play();
      }
    });
    setInterval(paint_world, 50);
    return setInterval(countdown, 1000);
  });

}).call(this);
