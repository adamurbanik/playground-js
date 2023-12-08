// const util = require('./util')
import util from './util';
import './css/main.scss';   // we tell webpack we want to process this css file
// import './images/carved-rock-logo.png';
// @ts-ignore
// import msg from './message.txt';

// console.log(msg)

const cart = [];

function addToCart(item) {
  cart.push(item);
  util.log("added new item: " + item);
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  util.log("removed: " + idx);
}

addToCart("Waterproof Boots");

console.log('webpack works')