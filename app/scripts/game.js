
var Game = function (opt) {
  'use strict';

  // Initialize parameters.
  opt = opt || {};
  var options = {
    playerName: opt.playerName || 'Leisure Suit Larry',
    variant: opt.variant || '5 Card Draw',
    numPlayers: opt.numPlayers || 3,
    dealSpeed: opt.dealSpeed || 'fast',
    decksInShoe: opt.decksInShoe || 1,
    jokers: opt.jokers || false
  };
  if (options.variant === '5 Card Draw') {
    options.decksInShoe = 2;
    options.jokers = false;
  }

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
    // Give the human player a real name and position in the middle.
    var playerPosition = Math.round(options.numPlayers / 2);
    game.players['player' + playerPosition].name = options.playerName;

    // Initialize a single deck of cards.
    this.deck = new Deck(options.jokers);

    // Initialize the gameDeck (could be multiple decks in a shoe).
    this.gameDeck = new Shoe(options.decksInShoe);
  };
};

