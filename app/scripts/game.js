
var Game = function (options) {
  // Initialize options object and defaults
  options = options || {};
  var game = options.game || '5 Card Draw',
      numCompetitors = options.numCompetitors || 2,
      dealSpeed = options.dealSpeed || 'fast',
      decksInShoe = options.decksInShoe || 1,
      jokers = options.jokers || false;

  // Public variables
  this.playerName = options.playerName || 'Leisure Suit Larry';
  this.numPlayers = numCompetitors + 1;
  this.players = {};

  if (game === '5 Card Draw') {
    this.numCardsInit = 5;
  }

  this.init = function () {
    this.initializePlayers();
    this.initializeShoe(decksInShoe, jokers);
  };

};

Game.prototype.initializePlayers = function () {
  var game = this;
  _.range(this.numPlayers).forEach(function (i) {
    var name = 'Player' + String(i + 1);
    game.players[name] = new Player({name: name});
  });
  game.players['Player' + this.playerPosition()].name = this.playerName;
  console.log(this.players);
};


Game.prototype.initializeShoe = function (decksInShoe, jokers) {
  this.gameDeck = new Shoe({
    decksInShoe: decksInShoe,
    jokers: jokers
  });
  this.gameDeck.init();
  // this.gameDeck.shuffle();
  console.log(this.gameDeck.cards);
};


Game.prototype.playerPosition = function () {
  return Math.round(this.numPlayers / 2);
};


Game.prototype.dealCards = function () {
  for (var n in _.range(this.numCardsInit)) {
    for (var p in this.players) {
      this.players[p].addCard(this.gameDeck.dealCard());
    }
  }
};


