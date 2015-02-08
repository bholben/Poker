
var options = {},
    game;

// Adjust game options based on user input.
$('#gameVariant, #shoeSize').on('change', function (e) {
  options[e.target.id] = e.target.value;
  console.log(options);
});

$('#isJokers, #numPlayers, #dealSpeed').on('click', 'label', function (e) {
  options[e.target.parentNode.id] = e.target.innerText;
  console.log(options);
});

// Start the game.
$('#new-game').on('click', function () {

  game = new Game(options);
  game.init();
  game.gameDeck.dealAround(5);

  var player1Hand = game.players.player1.hand;
  var player2Hand = game.players.player2.hand;
  var player3Hand = game.players.player3.hand;

  game.players.player1.showCard('.player1', '.card1', player1Hand[0]);
  game.players.player1.showCard('.player1', '.card2', player1Hand[1]);
  game.players.player1.showCard('.player1', '.card3', player1Hand[2]);
  game.players.player1.showCard('.player1', '.card4', player1Hand[3]);
  game.players.player1.showCard('.player1', '.card5', player1Hand[4]);
  game.players.player1.showCard('.player1', '.card6', player1Hand[5]);
  game.players.player1.showCard('.player1', '.card7', player1Hand[6]);

  game.players.player2.showCard('.player2', '.card1', player2Hand[0]);
  game.players.player2.showCard('.player2', '.card2', player2Hand[1]);
  game.players.player2.showCard('.player2', '.card3', player2Hand[2]);
  game.players.player2.showCard('.player2', '.card4', player2Hand[3]);
  game.players.player2.showCard('.player2', '.card5', player2Hand[4]);
  game.players.player2.showCard('.player2', '.card6', player2Hand[5]);
  game.players.player2.showCard('.player2', '.card7', player2Hand[6]);

  game.players.player3.showCard('.player3', '.card1', player3Hand[0]);
  game.players.player3.showCard('.player3', '.card2', player3Hand[1]);
  game.players.player3.showCard('.player3', '.card3', player3Hand[2]);
  game.players.player3.showCard('.player3', '.card4', player3Hand[3]);
  game.players.player3.showCard('.player3', '.card5', player3Hand[4]);
  game.players.player3.showCard('.player3', '.card6', player3Hand[5]);
  game.players.player3.showCard('.player3', '.card7', player3Hand[6]);

  console.log(player1Hand);
  console.log(player2Hand);
  console.log(player3Hand);

});
