
var Deck = function (jokers) {
  var ranks = 'A23456789TJQK'.chars(),  // Ace through King
      suits = 'CDHS'.chars();           // Clubs, Diamonds, Hearts, Spades

  // Initialize and build this.cards array
  // i.e. ['AC', '2C', ... 'QS', 'KS']
  this.cards = [];
  // Initialize and build this.cardImageMap
  // i.e. {'AC': '0px 0px', ... 'KS': '-948px -369px'}
  this.cardImageMap = {};

  this.init = function () {
    for (var s in suits) {
      for (var r in ranks) {
        // Build image location map (to pull a single card image from sprite).
        var cardName = ranks[r] + suits[s],
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

