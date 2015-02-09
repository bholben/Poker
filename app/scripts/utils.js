
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
  }
};

