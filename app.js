'use strict';

Product.allItems = [];

function Product(name, filepath){
// function Product(name, filepath, votes, views){
  this.name = name;
  this.filepath = filepath;
  // this.votes = userClicks;
  // this.views = userViews;
  Product.allItems.push(this);
};

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
// new Product('bag', 'img/bag.jpg', userClicks, userViews);
// new Product('banana', 'img/banana.jpg', userClicks, userViews);
// new Product('bathroom', 'img/bathroom.jpg', userClicks, userViews);
// new Product('boots', 'img/boots.jpg', userClicks, userViews);
// new Product('breakfast', 'img/breakfast.jpg', userClicks, userViews);
// new Product('bubblegum', 'img/bubblegum.jpg', userClicks, userViews);
// new Product('chair', 'img/chair.jpg', userClicks, userViews);
// new Product('cthulhu', 'img/cthulhu.jpg', userClicks, userViews);
// new Product('dog-duck', 'img/dog-duck.jpg', userClicks, userViews);
// new Product('dragon', 'img/dragon.jpg', userClicks, userViews);
// new Product('pen', 'img/pen.jpg', userClicks, userViews);
// new Product('pet-sweep', 'img/pet-sweep.jpg', userClicks, userViews);
// new Product('scissors', 'img/scissors.jpg', userClicks, userViews);
// new Product('shark', 'img/shark.jpg', userClicks, userViews);
// new Product('sweep', 'img/sweep.jpg', userClicks, userViews);
// new Product('tauntaun', 'img/tauntaun.jpg', userClicks, userViews);
// new Product('unicorn', 'img/unicorn.jpg', userClicks, userViews);
// new Product('usb', 'img/usb.jpg', userClicks, userViews);
// new Product('water-can', 'img/water-can.jpg', userClicks, userViews);
// new Product('water-glass', 'img/water-glass.jpg', userClicks, userViews);

function randomProduct(){
  var randomIndex = Math.floor(Math.random() * Product.allItems.length);
  imgEl.src = Product.allItems[randomIndex].filepath;
};

var imgEl = document.getElementById('item');
imgEl.addEventListener('click', randomProduct);

randomProduct();
