(function() {
  var Egg, canvas, clear_the_screen, context, countdown, draw_egg, draw_menu_line, eggs, paint_world, seconds_left;

  canvas = $('#peppa')[0];

  context = canvas.getContext('2d');

  clear_the_screen = function() {
    context.fillStyle = "white";
    return context.fillRect(0, 0, canvas.width, canvas.height);
  };

  draw_egg = function(cx, cy, rx, ry) {
    context.fillStyle = "FF9933";
    context.save();
    context.beginPath();
    context.translate(cx - rx, cy - ry);
    context.scale(rx, ry);
    context.arc(1, 1, 1, 0, 2 * Math.PI, false);
    context.fillStyle = "FFFFCC";
    context.fill();
    context.restore();
    return context.stroke();
  };

  draw_menu_line = function(score, time_left) {
    context.font = '20px Times New Roman';
    context.clearRect(0, canvas.height - 30, canvas.width, 30);
    context.fillStyle = 'green';
    context.fillText("Score: " + score, 10, canvas.height - 10);
    context.fillStyle = 'red';
    if (time_left === 0) {
      return context.fillText("Game Over!", canvas.width - 120, canvas.height - 10);
    } else {
      return context.fillText("Time Left: " + time_left, canvas.width - 120, canvas.height - 10);
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
      draw_egg(egg.x, egg.y, egg.width, egg.height);
    }
    return draw_menu_line(eggs.length, seconds_left);
  };

  countdown = function() {
    if (seconds_left > 0) {
      return seconds_left -= 1;
    }
  };

  Mousetrap.bind('space', function() {
    if (seconds_left > 0) {
      return eggs.push(new Egg());
    }
  });

  setInterval(paint_world, 10);

  setInterval(countdown, 1000);

}).call(this);
