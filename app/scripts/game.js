
var Game = function (opt) {
  'use strict';

  // Initialize game options.
  opt = opt || {};
  var options = {
    variant: opt.variant || 'Five Card Draw',
    numPlayers: Number(opt.numPlayers) || 3,
    initialDeal: 5,
    dealSpeed: opt.dealSpeed || 'Instant',  // TODO
    shoeSize: Number(opt.shoeSize) || 1,
    isJokers: opt.isJokers === 'Yes' ? true : false
  };
  if (options.variant === 'Five Card Draw') {
    // If we are conforming to strict poker standards...
    // (better approach is to hide these settings when 5-card draw)
    // options.shoeSize = 1;
    // options.isJokers = false;
    options.initialDeal = 5;
  }

  this.numPlayers = options.numPlayers;

  this.players = {};

  // Initialize a game with players and a deck shoe.
  this.init = function () {
    // Initialize this.players.player1 = Player(),
    //            this.players.player2 = Player()...
    var game = this;
    _.range(options.numPlayers).forEach(function (i) {
      var name = 'Player' + String(i + 1);
      game.players[name.toLowerCase()] = new Player({name: name});
    });
    // Position the human player in the middle.
    var playerPosition = Math.round(options.numPlayers / 2);

    // Initialize a single deck of cards.
    this.deck = new Deck(options.isJokers);

    // Initialize the gameDeck and make initial deal.
    this.gameDeck = new Shoe(options.shoeSize);
    this.gameDeck.dealAround(options.initialDeal);
  };
};

Game.prototype.highScore = function (scores) {

  // Temporoary test array...
  scores = [
    [6,  0, 0, 12, 11, 6, 4, 2],
    [0, 11, 4, 11, 11, 4, 4, 4],
    [1,  0, 0,  9,  6, 4, 4, 3]
  ];

  var byIndex = myLib.arrayTransform(scores),
      finalists = _.range(scores.length),  // .map(function (val) { return val + 1; }),
      winner;

  console.log(byIndex);
  console.log(finalists);

  for (var i = 0; i < 8; i++) {

    var max = _.max(byIndex[i]);

    console.log(max);
    console.log(byIndex[i].indexOf(max));
    console.log(byIndex[i].lastIndexOf(max));

    var winningIndex = byIndex[i].indexOf(max),
        winningConfirm = byIndex[i].lastIndexOf(max);


    if ((finalists.indexOf(winningIndex) !== -1) &&
        (winningIndex === winningConfirm)) {
      winner = game.players['player' + (winningIndex + 1)].name;

      console.log('We have a winner!......');

      return winner;
    } else {
      finalists = [];
      for (var j = 0, len = byIndex[i].length; j < len; j++) {
        if (byIndex[i][j] === max) {
          finalists.push(j);

          // TODO - finish figuring out how to handle column ties.
        }
      }
    }
  }
};

