
var Game = function (options) {
  // Initialize options object and default options
  options = options || {};
  this.playerName = options.playerName || 'Leisure Suit Larry';
  this.variant = options.variant || '5 Card Draw';
  this.numCompetitors = options.numCompetitors || 2;
  this.dealSpeed = options.dealSpeed || 'fast';
  this.decksInShoe = options.decksInShoe || 1;
  this.jokers = options.jokers || false;

  if (this.variant === '5 Card Draw') {
    this.numCardsInit = 5;
    this.decksInShoe = 1;
    this.jokers = false;
  }

  this.numPlayers = this.numCompetitors + 1;
  this.players = {};

  // Initialize this.players.Player1 = Player(),
  //            this.players.Player2 = Player()...
  this.initializePlayers = function () {
    var game = this;
    _.range(this.numPlayers).forEach(function (i) {
      var name = 'Player' + String(i + 1);
      game.players[name] = new Player({name: name});
    });
    // Give the human player a real name and position in the middle.
    var playerPosition = Math.round(this.numPlayers / 2);
    game.players['Player' + playerPosition].name = this.playerName;
    console.log(this.players);
  };

  // Initialize the gameDeck (could be multiple decks in a shoe).
  this.initializeShoe = function (decksInShoe, jokers) {
    this.gameDeck = new Shoe({
      decksInShoe: decksInShoe,
      jokers: jokers
    });
    this.gameDeck.init();
    // this.gameDeck.shuffle();
    console.log(this.gameDeck.cards);
  };

  // Initialize the game.
  this.init = function () {
    var deck;
    this.initializePlayers();
    deck = new Deck(this.jokers);
    this.initializeShoe(this.decksInShoe, this.jokers);
  };
};

Game.prototype.dealCards = function () {
  for (var n in _.range(this.numCardsInit)) {
    for (var p in this.players) {
      this.players[p].addCard(this.gameDeck.dealCard());
    }
  }
};


