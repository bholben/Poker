
var Player = function (options) {
  'use strict';

  options = options || {};
  this.name = options.name;
  this.hand = [];
  this.num = Number(this.name.slice(6));

  // This is the key to setting up 3 or 5 chairs.
  this.chairClass = function () {
    return (game.numPlayers === 3) ? '.chair' + (this.num + 1) : '.chair' + this.num;
  };
};

Player.prototype.addCard = function (card) {
  this.hand.push(card);
};

Player.prototype.showCard = function (cardPosn, cardName) {
  // Lots going on here...
  //   - Slice up the cards sprite to pull the correct card image
  //   - Position the card in the correct slot for the correct player
  var selector = this.chairClass() + ' ' + '.card' + (cardPosn + 1),
      background = 'background: url(../images/cards_1027x615.png) ',
      spriteOffset = game.deck.cardImageMap[cardName],
      fannedSpacing = '; left: ' + 20 * cardPosn + 'px;',
      style = background + spriteOffset + fannedSpacing;

  $(selector).attr('style', style);
};

Player.prototype.showHand = function () {
  var player = this,
      chairClass = $(player.chairClass());
  this.hand.forEach(function (_, i) {
    // Construct a div to hold the card view.
    chairClass.append('<div class="card card' + (i + 1) + '"></div>');
    // Add the image to this div with a CSS background image.
    player.showCard(i, player.hand[i]);
  });
};

Player.prototype.showScore = function () {
  console.log('me: ', this.hand);
  var myHand = new Hand(this.hand);
      myScore = myHand.score();

  console.log(myScore);

  return myScore;

};


