
var Shoe = function (options) {
  // Initialize options object and defaults
  options = options || {};
  options.decksInShoe = options.decksInShoe || 1;
  options.jokers = options.jokers || false;

  // Private variables
  var ranks = '23456789TJQKA'.chars(),  // Ace is high
      suits = 'CDSH'.chars();           // Clubs, Diamonds, Spades, Hearts

  // Public variables
  // Initialize and build this.cards array (could be multiple decks)
  // i.e. ['2C', '3C', ... 'QH', 'KH', 'AH']
  this.cards = [];
  this.init = function () {
    for (var d in _.range(options.decksInShoe)) {
      for (var s in suits) {
        for (var r in ranks) {
          this.cards.push(ranks[r] + suits[s]);
        }
      }
      if (options.jokers) {
        this.cards.push('?B');  // Black Joker
        this.cards.push('?R');  // Red Joker
      }
    }
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

