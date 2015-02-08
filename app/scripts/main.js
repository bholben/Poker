
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
$('#newGame').on('click', function () {

  // Initialize and start the game.
  game = new Game(options);
  game.init();

  // Show each player's hand.
  for (var i = 1; i <= game.numPlayers; i++) {
    $('.pokerTable').append('<div class="player player' + i + '"></div>');
    game.players['player' + i].showHand();
    console.log(game.players['player' + i].hand);
  }

});

