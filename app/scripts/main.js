// Goal is to handle all DOM interactions from this file.
// Exceptions: game.playerX.showCard(), game.playerX.showHand()

var options = {},
    game,
    selectOptions = $('#gameVariant, #shoeSize'),
    radioOptions = $('#isJokers, #numPlayers, #dealSpeed'),
    newGame = $('#newGame'),
    pokerTable = $('#pokerTable'),
    summary = $('#summary');


// Adjust game options based on user input.
selectOptions.on('change', function (e) {
  options[e.target.id] = e.target.value;
  console.log(options);
});

radioOptions.on('click', 'label', function (e) {
  options[e.target.parentNode.id] = e.target.innerText;
  console.log(options);
});

// Start the game.
newGame.on('click', function () {

  // Clear the table of any previous game.
  pokerTable.html('');

  // Initialize a new game instance.
  game = new Game(options);
  game.init();

  // Show each player's hand.
  for (var i = 1; i <= game.numPlayers; i++) {
    // Set the players' chairs up in a symmetric horseshoe pattern
    if (game.numPlayers === 3) {
      pokerTable.append('<div class="player chair' + (i + 1) + '"></div>');
      game.players['player' + i].showHand();
    } else {
      pokerTable.append('<div class="player chair' + i + '"></div>');
      game.players['player' + i].showHand();
    }
    // console.log(game.players['player' + i].hand);
  }

  var myScore = game.players.player2.showScore()[0],
      msg = '';

  if (myScore === 0) {
    msg = "Pretty lame.  You should save your cash on this one.";
  } else if (myScore === 1) {
    msg = "Hey, you've got a pair.  That's not bad.";
  } else if (myScore === 2) {
    msg = "Two pair.  Not bad.  This could win something.";
  } else if (myScore === 3) {
    msg = "Three of a Kind.  Time to up your bet!";
  } else if (myScore >= 4) {
    msg = "Rock on!  This is a killer hand!";
  }

  summary.html('')
         .append('<h2> </h2>')
         .append('<h2>' + msg + '</h2>');


  // console.log(game.highScore());


});

