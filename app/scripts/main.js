
var options = {},
    game;

// Adjust game options based on user input.
$('.num-competitors').on('click', 'label', function (e) {
  options.numCompetitors = Number($(this)[0].innerText);
});

$('#new-game').on('click', function () {

  console.log('Hello');

  game = new Game(options);
  game.init();
  var freshDeck = game.gameDeck.cards;
  game.dealCards(7);

  var remainingDeck = game.gameDeck.cards;
  var myHand = game.players.player2.hand;


  game.players.player1.showCard('.player1', '.card1', myHand[0]);
  game.players.player1.showCard('.player1', '.card2', myHand[1]);
  game.players.player1.showCard('.player1', '.card3', myHand[2]);
  game.players.player1.showCard('.player1', '.card4', myHand[3]);
  game.players.player1.showCard('.player1', '.card5', myHand[4]);
  game.players.player1.showCard('.player1', '.card6', myHand[5]);
  game.players.player1.showCard('.player1', '.card7', myHand[6]);

  console.log(myHand);

});
