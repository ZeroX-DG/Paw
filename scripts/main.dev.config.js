var join = require('path').join;
var electron = require('electron');


var main = join(__dirname, '../src/main/main.js');

var watch = [
  join(__dirname, '../src/main'),
];

module.exports = {
  main,
  watch
}