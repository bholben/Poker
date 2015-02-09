
var Game = function (opt) {
  'use strict';

  // Initialize game options.
  opt = opt || {};
  var options = {
    variant: opt.variant || 'Five Card Draw',
    numPlayers: Number(opt.numPlayers) || 3,
    initialDeal: 5,
    dealSpeed: opt.dealSpeed || 'Instant',
    shoeSize: Number(opt.shoeSize) || 1,
    isJokers: opt.isJokers === 'Yes' ? true : false
  };
  if (options.variant === 'Five Card Draw') {
    // If we are conforming to strict poker standards...
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

Game.prototype.highScore = function (scoresObj) {
  s = [
    [6, 11, 4, 11, 11, 4, 4, 4],
    [5,  0, 0, 12, 11, 6, 4, 2],
    [1,  0, 0,  9,  6, 4, 4, 3]
  ];

  s.forEach(function () {

  });

  for (var i in s) {
    console.log(i, s[i]);
  }

  console.log(_.max([5, 8, 2]));

  // if (s.player1[0] === 6) { }
};

var byPlayer = [
  [11, 12, 13, 14, 15],
  [21, 22, 23, 24, 25],
  [31, 32, 33, 34, 35]
];


var col1 = byPlayer.map(function(player) {
  return player[0];
});

var col2 = byPlayer.map(function(player) {
  return player[0], player[1];
});

var col3 = byPlayer.map(function(player) {
  return player[0], player[1], player[2];
});

var byIndex = [col1, col2, col3];
console.log(byIndex);






