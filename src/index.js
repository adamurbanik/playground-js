// const util = require('./util')
import util from './util'

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