
var Shoe = function (decksInShoe) {
  // Initialize options object and defaults

  this.cards = [];

  this.init = function () {
    // Convert cards array into a string.
    var cardsStr = game.deck.cards.join(',') + ',';
    // Multiply the cards string by the number of decks in the shoe.
    var shoe = Array(decksInShoe + 1).join(cardsStr);
    // Convert back to an array and remove the last trailing comma item.
    this.cards = shoe.split(',').slice(0, -1);
  };
};

Shoe.prototype.shuffle = function () {
  // http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  this.cards = _.shuffle(this.cards);
};

Shoe.prototype.dealCard = function () {
  return this.cards.pop();
};

Shoe.prototype.count = function () {
  return this.cards.length;
};

