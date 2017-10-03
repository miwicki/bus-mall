'use strict';

var counter = 0;
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
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

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
// new Product('sweep', 'img/sweep.png', userClicks, userViews);
// new Product('tauntaun', 'img/tauntaun.jpg', userClicks, userViews);
// new Product('unicorn', 'img/unicorn.jpg', userClicks, userViews);
// new Product('usb', 'img/usb.gif', userClicks, userViews);
// new Product('water-can', 'img/water-can.jpg', userClicks, userViews);
// new Product('wine-glass', 'img/wine-glass.jpg', userClicks, userViews);

var imgEl1 = document.getElementById('item1');
var imgEl2 = document.getElementById('item2');
var imgEl3 = document.getElementById('item3');
function randomProduct(){
  if (counter < 25){
    var randomIndex1 = Math.floor(Math.random() * Product.allItems.length);
    imgEl1.src = Product.allItems[randomIndex1].filepath;
    imgEl1.addEventListener('click', randomProduct);
    var randomIndex2 = Math.floor(Math.random() * Product.allItems.length);
    imgEl2.src = Product.allItems[randomIndex2].filepath;
    imgEl2.addEventListener('click', randomProduct);
    var randomIndex3 = Math.floor(Math.random() * Product.allItems.length);
    imgEl3.src = Product.allItems[randomIndex3].filepath;
    imgEl3.addEventListener('click', randomProduct);
    counter++;
  } else{
    console.log('Yeet');
  };
};
randomProduct();
