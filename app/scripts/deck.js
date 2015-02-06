
// TEMP
String.prototype.chars = function () {
  return this.split('');
};

var Deck = function (jokers) {
  this.rankString = 'A23456789TJQK';  // Ace through King
  this.suitString = 'CDHS';           // Clubs, Diamonds, Hearts, Spades
  this.ranks = this.rankString.chars();
  this.suits = this.suitString.chars();

  // Initialize and build this.cardImageMap
  // i.e. {'2C': '0px, 0px', ... 'AS': '-948px, -369px'}
  this.cardImageMap = {};
  // Initialize and build this.cards array
  // i.e. ['2C', '3C', ... 'QS', 'KS', 'AS']
  this.cards = [];

  this.init = function () {
    for (var s in this.suits) {
      for (var r in this.ranks) {
        // Build image location map (to pull a single card image from sprite).
        var cardName = this.ranks[r] + this.suits[s],
            cardWidth = 1027 / 13,  // 79px wide
            cardHeight = 615 / 5,  // 123px tall
            x = -(r * cardWidth) + 'px',
            y = -(s * cardHeight) + 'px';
        this.cardImageMap[cardName] = x + ' ' + y;
        // Build standard 52-card deck.
        this.cards.push(cardName);
      }
    }
    if (jokers) {
      this.cards.push('?B');  // Black Joker
      this.cards.push('?R');  // Red Joker
    }
  };
};

