
var Game = function (options) {
  // Initialize options object and defaults
  options = options || {};
  var playerName = options.playerName || 'Leisure Suit Larry',
      game = options.game || '5 Card Draw',
      numCompetitors = options.numCompetitors || 2,
      dealSpeed = options.dealSpeed || 'fast',
      decksInShoe = options.decksInShoe || 1,
      jokers = options.jokers || false;

  this.numPlayers = numCompetitors + 1;

  this.players = {};

  this.init = function () {
    this.initializeShoe(decksInShoe, jokers);
  };

};

Game.prototype.initializeShoe = function (decksInShoe, jokers) {
  var gameDeck = new Shoe({
    decksInShoe: decksInShoe,
    jokers: jokers
  });
  gameDeck.init();
  // gameDeck.shuffle();
  console.log(gameDeck.cards);
};


Game.prototype.playerPosition = function () {
  return Math.round(this.numPlayers / 2);
};

Game.prototype.playersArray = function () {
  var game = this;
  return _.range(this.numPlayers).map(function (i) {
    var name = 'Player' + String(i + 1);
    game.players[name] = new Player();
    return name;
  });
};


Game.prototype.dealCards = function () {
  for (var p in this.playersArray()) {
    numPlayers();
  }
};

// var newCard = gameDeck.dealCard();
// console.log(newCard);
// console.log(gameDeck.cards);


