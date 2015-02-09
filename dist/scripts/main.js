
String.prototype.chars = function () {
  'use strict';
  return this.split('');
};

String.prototype.multiply = function (count) {
  'use strict';
  return new Array(count + 1).join(this);
};

// Extending the array prototype like this seems to tack this function
// on to all arrays in Chrome.  Seems strange...

// Array.prototype.multiply = function (count) {
//   'use strict';
//   var str = this.join(',') + ',',
//       repeatingString = str.multiply(count);
//   return repeatingString.slice(0, -1).split(',');
// };

var myLib = {
  arrayMultiplier: function (arr, count) {
    'use strict';
    var str = arr.join(',') + ',',
        repeatingString = str.multiply(count);
    var results = repeatingString.slice(0, -1).split(',');
    var item0 = results[0];
    if (!isNaN(Number(item0))) {
      // console.log('here');
      results = results.map(function (item) {
        return Number(item);
      });
    }
    // console.log(results);
    return results;
  },

  arrayTransform: function (inputArray) {

    // Transform an array of subarrays where each subarray has up to 8 values.

    // inputArray = [
    //   [11, 12, 13, 14, 15, 16, 17, 18],
    //   [21, 22, 23, 24, 25, 26, 27, 28],
    //   [31, 32, 33, 34, 35, 36, 37, 38]
    // ];

    // The resulting array will look like this...

    // transformedArray = [
    //   [11, 21, 31],
    //   [12, 22, 32],
    //   [13, 23, 33],
    //   [14, 24, 34],
    //   [15, 25, 35],
    //   [16, 26, 36],
    //   [17, 27, 37],
    //   [18, 28, 38],
    // ];

    // TODO: Find a cleaner way to do this!!!

    var col1 = inputArray.map(function (col) {
      return col[0];
    });

    var col2 = inputArray.map(function (col) {
      return col[0], col[1];
    });

    var col3 = inputArray.map(function (col) {
      return col[0], col[1], col[2];
    });

    var col4 = inputArray.map(function (col) {
      return col[0], col[1], col[2], col[3];
    });

    var col5 = inputArray.map(function (col) {
      return col[0], col[1], col[2], col[3], col[4];
    });

    var col6 = inputArray.map(function (col) {
      return col[0], col[1], col[2], col[3], col[4], col[5];
    });

    var col7 = inputArray.map(function (col) {
      return col[0], col[1], col[2], col[3], col[4], col[5], col[6];
    });

    var col8 = inputArray.map(function (col) {
      return col[0], col[1], col[2], col[3], col[4], col[5], col[6], col[7];
    });

    var transformedArray = [col1, col2, col3, col4, col5, col6, col7, col8];
    return transformedArray;
  }
};



var Deck = function (jokers) {
  'use strict';
  var ranks = 'A23456789TJQK'.chars(),  // Ace through King
      suits = 'CDHS'.chars();           // Clubs, Diamonds, Hearts, Spades

  // Initialize and build this.cards array
  // i.e. ['AC', '2C', ... 'QS', 'KS']
  this.cards = [];
  // Initialize and build this.cardImageMap
  // i.e. {'AC': '0px 0px', ... 'KS': '-948px -369px'}
  this.cardImageMap = {};

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




var Game = function (opt) {
  'use strict';

  // Initialize game options.
  opt = opt || {};
  var options = {
    variant: opt.variant || 'Five Card Draw',
    numPlayers: Number(opt.numPlayers) || 3,
    initialDeal: 5,
    dealSpeed: opt.dealSpeed || 'Instant',  // TODO
    shoeSize: Number(opt.shoeSize) || 1,
    isJokers: opt.isJokers === 'Yes' ? true : false
  };
  if (options.variant === 'Five Card Draw') {
    // If we are conforming to strict poker standards...
    // (better approach is to hide these settings when 5-card draw)
    // options.shoeSize = 1;
    // options.isJokers = false;
    options.initialDeal = 5;
  }

  this.numPlayers = options.numPlayers;

  this.players = {};

  // Initialize a game with players and a deck shoe.
  this.init = function () {
    // Initialize this.players.player1 = Player(),
    //            this.players.player2 = Player()...
    var game = this;
    _.range(options.numPlayers).forEach(function (i) {
      var name = 'Player' + String(i + 1);
      game.players[name.toLowerCase()] = new Player({name: name});
    });
    // Position the human player in the middle.
    var playerPosition = Math.round(options.numPlayers / 2);

    // Initialize a single deck of cards.
    this.deck = new Deck(options.isJokers);

    // Initialize the gameDeck and make initial deal.
    this.gameDeck = new Shoe(options.shoeSize);
    this.gameDeck.dealAround(options.initialDeal);

    this.players.player2.showScore();

  };
};

Game.prototype.highScore = function (scores) {

  // Temporoary test array...
  scores = [
    [6,  0, 0, 12, 11, 6, 4, 2],
    [0, 11, 4, 11, 11, 4, 4, 4],
    [1,  0, 0,  9,  6, 4, 4, 3]
  ];

  var byIndex = myLib.arrayTransform(scores),
      finalists = _.range(scores.length),  // .map(function (val) { return val + 1; }),
      winner;

  // console.log(byIndex);
  // console.log(finalists);

  for (var i = 0; i < 8; i++) {

    var max = _.max(byIndex[i]);

    // console.log(max);
    // console.log(byIndex[i].indexOf(max));
    // console.log(byIndex[i].lastIndexOf(max));

    var winningIndex = byIndex[i].indexOf(max),
        winningConfirm = byIndex[i].lastIndexOf(max);


    if ((finalists.indexOf(winningIndex) !== -1) &&
        (winningIndex === winningConfirm)) {
      winner = game.players['player' + (winningIndex + 1)].name;

      // console.log('We have a winner!......');

      return winner;
    } else {
      finalists = [];
      for (var j = 0, len = byIndex[i].length; j < len; j++) {
        if (byIndex[i][j] === max) {
          finalists.push(j);

          // TODO - finish figuring out how to handle column ties.
        }
      }
    }
  }
};


// Goal is to handle all DOM interactions from this file.
// Exceptions: game.playerX.showCard(), game.playerX.showHand()

var options = {},
    game,
    selectOptions = $('#gameVariant, #shoeSize'),
    radioOptions = $('#isJokers, #numPlayers, #dealSpeed'),
    newGame = $('#newGame'),
    pokerTable = $('#pokerTable'),
    summary = $('#summary');


// Adjust game options based on user input.
selectOptions.on('change', function (e) {
  options[e.target.id] = e.target.value;
  console.log(options);
});

radioOptions.on('click', 'label', function (e) {
  options[e.target.parentNode.id] = e.target.innerText;
  console.log(options);
});

// Start the game.
newGame.on('click', function () {

  // Clear the table of any previous game.
  pokerTable.html('');

  // Initialize a new game instance.
  game = new Game(options);
  game.init();

  // Show each player's hand.
  for (var i = 1; i <= game.numPlayers; i++) {
    // Set the players' chairs up in a symmetric horseshoe pattern
    if (game.numPlayers === 3) {
      pokerTable.append('<div class="player chair' + (i + 1) + '"></div>');
      game.players['player' + i].showHand();
    } else {
      pokerTable.append('<div class="player chair' + i + '"></div>');
      game.players['player' + i].showHand();
    }
    // console.log(game.players['player' + i].hand);
  }

  var myScore = game.players.player2.showScore()[0],
      msg = '';

  if (myScore === 0) {
    msg = "Pretty lame.  You should save your cash on this one.";
  } else if (myScore === 1) {
    msg = "Hey, you've got a pair.  That's not bad.";
  } else if (myScore === 2) {
    msg = "Two pair.  Not bad.  This could win something.";
  } else if (myScore === 3) {
    msg = "Three of a Kind.  Time to up your bet!";
  } else if (myScore >= 4) {
    msg = "Rock on!  This is a killer hand!";
  }

  summary.html('')
         .append('<h2> </h2>')
         .append('<h2>' + msg + '</h2>');


  // console.log(game.highScore());


});

