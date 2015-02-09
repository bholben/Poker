
var Hand = function (cards) {
  'use strict';
  var hand = this;

  this.cards = cards;

  // Build a 15-item rank map to be used for scoring hands
  // (the 0 and 1 keys are not used).
  this.ranks = '--23456789TJQKA';
  this.rankMap = {};
  this.ranks.chars().forEach(function (r, i) { hand.rankMap[i] = r; });
};

// Return an array of values matching each card, sorted descending.
Hand.prototype.sortedVals = function () {
  'use strict';
  var hand = this;
  // Swap out the rank number for a rank value.
  var rankVals = this.cards.map(function (card) {
    return hand.ranks.indexOf(card[0]);
  });
  // Sort rank values in descending order.
  rankVals = _.sortBy(rankVals, function(num){ return Math.max(num); }).reverse();
  // Keep ace high unless 'A2345' straight is encountered.
  return (rankVals === [14, 5, 4, 3, 2]) ? [5, 4, 3, 2, 1] : rankVals;
};

// Return highest rank if flush, else false.
Hand.prototype.straight = function () {
  // TODO
};

// Return true if flush, else false.
Hand.prototype.flush = function () {
  'use strict';
  // Create suits object with suit as key and qty as value.
  var suits = _.countBy(this.cards, function (card) { return card[1]; });
  // Flip the object and make a unique array with qty of each suit.
  var suitCounts = Object.keys(_.invert(suits));
  // Return true if any of the values are 5 or greater.
  return Boolean(suitCounts.filter(function (num) { return num >= 5; })[0]);
};

// Return lowest pair rank, else false.  Highest pair option is available.
Hand.prototype.ofAKind = function (n, highVal) {
  'use strict';
  var hand = this;
  // Build a 15-item array that counts how manu of each rank
  // (first two slots are not used).
  this.sortedCounts = myLib.arrayMultiplier([0], 15);
  this.sortedVals().forEach(function (val) { hand.sortedCounts[val]++; });

  if (highVal) {
    // Look for the highest card that has multiples
    var maxIndex = 14 - this.sortedCounts.reverse().indexOf(n);
    return this.rankMap[maxIndex] || false;
  } else {
    // Look for the lowest card that has multiples
    var minIndex = this.sortedCounts.indexOf(n);
    return this.rankMap[minIndex] || false;
  }
};

// Return an array of 2-pair ranks, else false.
Hand.prototype.twoPair = function () {
  'use strict';
  var lowPair = this.ofAKind(2),
      highPair = this.ofAKind(2, true),
      result = [highPair, lowPair];
  return (highPair && lowPair !== highPair) ? result : false;
};

// Return an score array for a given hand.
// For example, the score of a JJ444 full house is [6, 11, 4, 11, 11, 4, 4, 4];
//              the score of a QJ642 flush is      [5,  0, 0, 12, 11, 6, 4, 2].
// By comparing the values at each index, a winner can be determined.
// No need to increment to the next index if a winner is identified.
// All suits carry equal weight.
Hand.prototype.score = function () {
  'use strict';
  var kind4 =    Number(this.ofAKind(4)),
      kind3 =    Number(this.ofAKind(3)),
      kind2 =    Number(this.ofAKind(2)),
      kind1 =    Number(this.ofAKind(1)),
      twoPairH = Number(this.twoPair()[0]),
      twoPairL = Number(this.twoPair()[1]),
      straight =        this.straight(),
      flush =           this.flush(),
      vals =            this.sortedVals();

  if      (straight && flush) { return _.flatten([8,        0,        0, vals]); }
  else if (kind4)             { return _.flatten([7,    kind4,    kind1, vals]); }
  else if (kind3 && kind2)    { return _.flatten([6,    kind3,    kind2, vals]); }
  else if (flush)             { return _.flatten([5,        0,        0, vals]); }
  else if (straight)          { return _.flatten([4,        0,        0, vals]); }
  else if (kind3)             { return _.flatten([3,    kind3,        0, vals]); }
  else if (twoPairH)          { return _.flatten([2, twoPairH, twoPairL, vals]); }
  else if (kind2)             { return _.flatten([1,    kind2,        0, vals]); }
  else                        { return _.flatten([0,        0,        0, vals]); }
};

// var myHand = new Hand(["QD", "6C", "7H", "2S", "QC"]);
// // var myHand = new Hand(['5H', '5C', 'KH', '5S', 'KS']);
// // var myHand = new Hand(['AH', 'QS', 'QH']);
// console.log('My Cards: ', myHand.cards);
// console.log('Sorted Ranks: ', myHand.sortedVals());
// console.log('Flush: ', myHand.flush());
// console.log('Two of a kind: ', myHand.ofAKind(2));
// console.log('Three of a kind: ', myHand.ofAKind(3));
// console.log('Two Pair: ', myHand.twoPair());
// console.log('Score: ', myHand.score());


