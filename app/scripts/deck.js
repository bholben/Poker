
// TEMP
String.prototype.chars = function () {
  return this.split('');
};

var Deck = function (jokers) {
  this.rankString = '23456789TJQKA';
  this.suitString = 'CDHS';
  this.ranks = this.rankString.chars();  // Ace is high
  this.suits = this.suitString.chars();  // Clubs, Diamonds, Hearts, Spades

  // Initialize and build this.cardImageMap
  // i.e. {'2C': '0px, 0px', ... 'AS': '-948px, -369px'}
  this.cardImageMap = {};
  // Initialize and build this.cards array
  // i.e. ['2C', '3C', ... 'QS', 'KS', 'AS']
  this.cards = [];

  this.init = function () {
    for (var s in this.suits) {
      for (var r in this.ranks) {
        // Build image map - used to pull a single card from sprite.
        var cardName = this.ranks[r] + this.suits[s];
        var x = -(79 * r) + 'px';
        var y = -(123 * s) + 'px';
        this.cardImageMap[cardName] = x + ', ' + y;
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

Deck.prototype.showCard = function (cardName) {
  // Show the sprite zone
  var background = 'background: url(../images/cards_1027x615.png) ';
  // console.log(background + this.cardImageMap[cardName] + ';');
  $('.card').attr('style', background + this.cardImageMap[cardName] + ';');
  // return background + this.cardImageMap[cardName] + ';';
};

var d = new Deck();
d.init();
console.log(d.cardImageMap);
d.showCard('QH');




