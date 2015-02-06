
var Player = function (options) {

  options = options || {};
  this.name = options.name;
  this.hand = [];

};


Player.prototype.addCard = function (card) {
  this.hand.push(card);
};





