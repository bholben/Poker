// Goal is to handle all DOM interactions from this file.
// Exceptions: game.playerX.showCard(), game.playerX.showHand()

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

  // Clear the table of any previous game.
  $('.pokerTable').html('');

  // Initialize a new game instance.
  game = new Game(options);
  game.init();

  // Show each player's hand.
  for (var i = 1; i <= game.numPlayers; i++) {
    // Set the players' chairs up in a symmetric horseshoe pattern
    if (game.numPlayers === 3) {
      $('.pokerTable').append('<div class="player chair' + (i + 1) + '"></div>');
      game.players['player' + i].showHand();
    } else {
      $('.pokerTable').append('<div class="player chair' + i + '"></div>');
      game.players['player' + i].showHand();
    }
    console.log(game.players['player' + i].hand);
  }

});

