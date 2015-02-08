
var Shoe = function (shoeSize) {
  'use strict';

  // Initialize parameters.
  shoeSize = shoeSize || 1;

  // Multiply a single deck by the size of the shoe.
  this.cards = myLib.arrayMultiplier(game.deck.cards, shoeSize);

  // Use a Fisher-Yates random shuffle algorithm
  // http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  this.cards = _.shuffle(this.cards);

};

Shoe.prototype.dealCardTo = function (player) {
  'use strict';
  game.players[player].addCard(this.cards.pop());
};

Shoe.prototype.dealAround = function (num) {
  'use strict';
  for (var n in _.range(num)) {
    for (var p in game.players) {
      game.players[p].addCard(this.cards.pop());
    }
  }
};

Shoe.prototype.count = function () {
  'use strict';
  return this.cards.length;
};

