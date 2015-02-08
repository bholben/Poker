
var getChair = function (n) {
  'use strict';

  var left = function (x) { return x + 'px; '; };
  var bottom = function (y) { return (y - 123) + 'px; '; };
  var rotate = function (angle) { return 'rotate(' + angle + 'deg);'; };

  var locations = [
    'left: ' + left(850) + 'bottom: ' + bottom(200) + 'transform: ' + rotate(-80),
    'left: ' + left(800) + 'bottom: ' + bottom(-30) + 'transform: ' + rotate(-35),
    'left: ' + left(450) + 'bottom: ' + bottom(-50) + 'transform: ' + rotate(0),
    'left: ' + left(85) + 'bottom: ' + bottom(80) + 'transform: ' + rotate(35),
    'left: ' + left(5) + 'bottom: ' + bottom(360) + 'transform: ' + rotate(80),
  ];

  return locations[n - 1];
};

var c = getChair(3);
console.log(c);

