
var Player = function (options) {

  options = options || {};
  this.name = options.name;
  this.hand = [];

};


Player.prototype.addCard = function (card) {
  this.hand.push(card);
};


Player.prototype.showCard = function (player, cardLoc, cardName) {
  // Show the sprite zone
  var background = 'background: url(../images/cards_1027x615.png) ',
      spriteOffset = game.deck.cardImageMap[cardName];
  $(player + ' ' + cardLoc).attr('style', background + spriteOffset);
};


