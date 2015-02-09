
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

