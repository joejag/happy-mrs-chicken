(function() {
  var Egg, baby_left_image, baby_right_image, canvas, clear_the_screen, context, countdown, draw_baby, draw_chicken, draw_cracked_egg, draw_egg, draw_end, draw_instructions, draw_menu_line, egg_cracked_image, egg_image, egg_lay_sound, eggs, game_over, mrs_chicken_image, paint_world, seconds_left, tweet_sound;

  canvas = $('#peppa')[0];

  context = canvas.getContext('2d');

  mrs_chicken_image = new Image();

  mrs_chicken_image.src = 'mrs-chicken.svg';

  egg_image = new Image();

  egg_image.src = 'egg-perfect.svg';

  egg_cracked_image = new Image();

  egg_cracked_image.src = 'egg-cracked.svg';

  baby_left_image = new Image();

  baby_left_image.src = 'baby-chick-left.svg';

  baby_right_image = new Image();

  baby_right_image.src = 'baby-chick-right.svg';

  egg_lay_sound = new Audio("egg.m4a");

  tweet_sound = new Audio("tweet.m4a");

  clear_the_screen = function() {
    context.fillStyle = "white";
    return context.fillRect(0, 0, canvas.width, canvas.height);
  };

  draw_chicken = function() {
    return context.drawImage(mrs_chicken_image, canvas.width / 2 - 334 / 4, canvas.height / 2 - 255 / 4, 334 / 2, 255 / 2);
  };

  draw_egg = function(egg) {
    return context.drawImage(egg_image, egg.x + 20 / 2, egg.y + 40 / 2, 20, 40);
  };

  draw_cracked_egg = function(egg) {
    return context.drawImage(egg_cracked_image, egg.x, egg.y, 20, 40);
  };

  draw_baby = function(egg) {
    if (egg.flipped === true) {
      return context.drawImage(baby_right_image, egg.x, egg.y, 334 / 10, 260 / 10);
    } else {
      return context.drawImage(baby_left_image, egg.x, egg.y, 334 / 10, 260 / 10);
    }
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
      this.cracked = false;
      this.hatched = false;
      this.flipped = false;
    }

    Egg.prototype.crack = function() {
      var egg;
      this.cracked = true;
      egg = this;
      return setTimeout((function() {
        return egg.hatch();
      }), 1000);
    };

    Egg.prototype.hatch = function() {
      return this.hatched = true;
    };

    Egg.prototype.run_away = function() {
      var direction;
      if (this.x > canvas.width / 2) {
        direction = 5;
        this.flipped = true;
      } else {
        direction = -5;
        this.flipped = false;
      }
      return this.x = this.x + direction;
    };

    return Egg;

  })();

  game_over = false;

  draw_end = function() {
    var egg, eggs_left_on_screen, _i, _len;
    if (game_over) {
      return;
    }
    clear_the_screen();
    eggs_left_on_screen = false;
    for (_i = 0, _len = eggs.length; _i < _len; _i++) {
      egg = eggs[_i];
      if (egg.x > 0 - (334 / 10) && egg.x - (334 / 10) < canvas.width) {
        eggs_left_on_screen = true;
      }
      egg.crack();
      if (egg.cracked && !egg.hatched) {
        draw_cracked_egg(egg);
      } else {
        tweet_sound.play();
        egg.run_away();
        draw_baby(egg);
      }
    }
    draw_chicken();
    draw_menu_line(eggs.length, seconds_left);
    if (eggs_left_on_screen === false) {
      return game_over = true;
    }
  };

  paint_world = function() {
    var egg, _i, _len;
    if (seconds_left <= 0) {
      return draw_end();
    }
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
