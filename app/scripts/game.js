
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

  this.slots = {
    slot2: 'left: $pageWidth - $maxCardsWidth - 50px; ' +
           'bottom: -$cardHeight - 30px; ' +
           'transform: rotate(-35deg);'
  };

};


