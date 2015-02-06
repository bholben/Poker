

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

// var gameDeck;
var game = new Game();
game.init();

game.dealCards();

console.log(game.gameDeck.cards);

console.log(game.players.Player2.hand);




