
var Player = function (options) {
  'use strict';

  options = options || {};
  this.name = options.name;
  this.hand = [];

};

Player.prototype.addCard = function (card) {
  this.hand.push(card);
};

Player.prototype.showCard = function (cardPosn, cardName) {
  // Lots going on here...
  //   - Slice up the cards sprite to pull the correct card image
  //   - Position the card in the correct slot for the correct player
  var playerClass = ('.' + this.name).toLowerCase(),
      selector = playerClass + ' ' + '.card' + (cardPosn + 1),
      background = 'background: url(../images/cards_1027x615.png) ',
      spriteOffset = game.deck.cardImageMap[cardName],
      fannedSpacing = '; left: ' + 20 * cardPosn + 'px;',
      style = background + spriteOffset + fannedSpacing;

  $(selector).attr('style', style);
};

Player.prototype.showHand = function () {
  var player = this;
  this.hand.forEach(function (_, i) {
    var playerClass = '.' + player.name.toLowerCase();
    // Construct a div to hold the card view.
    $(playerClass).append('<div class="card card' + (i + 1) + '"></div>');
    // Add the image to this div with a CSS background image.
    player.showCard(i, player.hand[i]);
  });
};

