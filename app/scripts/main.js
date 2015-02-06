

// var form = $('form'),
//     pokerTable = $('.poker-table');

// form.on('submit', function (e) {

//   e.preventDefault();

//   var options = $(this).serialize(),
//       game = new Game(options);

//   game.init();
//   form.addClass('hide');
//   pokerTable.removeClass('hide');
//   game.dealCards();

// });

// var gameDeck;
var game = new Game();
game.init();
var freshDeck = game.gameDeck.cards;
game.dealCards();

var remainingDeck = game.gameDeck.cards;
var myHand = game.players.Player2.hand;


game.players.Player1.showCard('.player1', '.card1', myHand[0]);
game.players.Player1.showCard('.player1', '.card2', myHand[1]);
game.players.Player1.showCard('.player1', '.card3', myHand[2]);
game.players.Player1.showCard('.player1', '.card4', myHand[3]);
game.players.Player1.showCard('.player1', '.card5', myHand[4]);


// console.log(game.players);
// console.log(freshDeck);
// console.log(remainingDeck);
console.log(myHand);




