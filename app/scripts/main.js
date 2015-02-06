

// var form = $('form'),
//     table = $('.table');

// form.on('submit', function (e) {

//   e.preventDefault();

//   var options = $(this).serialize(),
//       game = new Game(options);

//   game.init();
//   form.addClass('hide');
//   table.removeClass('hide');

// });

var game = new Game();
game.init();

console.log(game.playersArray());

console.log(game.players);

