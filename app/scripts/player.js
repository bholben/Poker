
var Player = function (options) {
  'use strict';

  options = options || {};
  this.name = options.name;
  this.hand = [];
  this.num = Number(this.name.slice(6));

  this.chairLocation = function (n) {
    var left = function (x) { return x + 'px; '; };
    var bottom = function (y) { return (y - 123) + 'px; '; };
    var rotate = function (angle) { return 'rotate(' + angle + 'deg);'; };

    // Locations have been manually set based on a ~horseshoe shape, but
    // it would be nice to set up an algorithm based on number of players
    // and desired shape.
    var locations = [
      'left: ' + left(850) + 'bottom: ' + bottom(200) + 'transform: ' + rotate(-80),
      'left: ' + left(800) + 'bottom: ' + bottom(-30) + 'transform: ' + rotate(-35),
      'left: ' + left(450) + 'bottom: ' + bottom(-50) + 'transform: ' + rotate(0),
      'left: ' + left(85) + 'bottom: ' + bottom(80) + 'transform: ' + rotate(35),
      'left: ' + left(5) + 'bottom: ' + bottom(360) + 'transform: ' + rotate(80),
    ];

    return locations[n - 1];
  };

  this.assignChair = function () {
    return (game.numPlayers == 3) ? this.chairLocation(this.num + 1) : this.chairLocation(this.num);
  };
};

Player.prototype.addCard = function (card) {
  this.hand.push(card);
};

Player.prototype.showCard = function (cardPosn, cardName) {
  // Lots going on here...
  //   - Slice up the cards sprite to pull the correct card image
  //   - Position the card in the correct slot for the correct player
  var chairClass = '.chair' + this.num,
      // playerClass = ('.' + this.name).toLowerCase(),
      selector = chairClass + ' ' + '.card' + (cardPosn + 1),
      background = 'background: url(../images/cards_1027x615.png) ',
      spriteOffset = game.deck.cardImageMap[cardName],
      fannedSpacing = '; left: ' + 20 * cardPosn + 'px;',
      style = background + spriteOffset + fannedSpacing;

  $(selector).attr('style', style);
};

Player.prototype.showHand = function () {
  var player = this,
      // playerClass = ('.' + this.name).toLowerCase(),
      chairClass = '.chair' + this.num;
  console.log(chairClass);
  this.hand.forEach(function (_, i) {
    // Construct a div to hold the card view.
    $(chairClass).append('<div class="card card' + (i + 1) + '"></div>');
    // Add the image to this div with a CSS background image.
    player.showCard(i, player.hand[i]);
  });
};

