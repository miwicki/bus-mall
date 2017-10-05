'use strict';

Product.allItems = [];
Product.lastDisplayed = [];
Product.totalClicks = 0;
Product.section = document.getElementById('product-section');
Product.resultsList = document.getElementById('results');

function Product(name, filepath){
  this.name = name;
  this.filepath = filepath;
  this.timesDisplayed = 0;
  this.votes = 0;
  Product.allItems.push(this);
};
var chartNames = [];
var chartVotes = [];

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
//
// function updateChart(){
// }

var imgEl1 = document.getElementById('item1');
var imgEl2 = document.getElementById('item2');
var imgEl3 = document.getElementById('item3');
function randomProduct(){
  var randomIndex1 = Math.floor(Math.random() * Product.allItems.length);
  var randomIndex2 = Math.floor(Math.random() * Product.allItems.length);
  var randomIndex3 = Math.floor(Math.random() * Product.allItems.length);
  while(Product.lastDisplayed.includes(randomIndex1) || Product.lastDisplayed.includes(randomIndex2) || Product.lastDisplayed.includes(randomIndex3) || randomIndex1 === randomIndex2 || randomIndex1 === randomIndex3 || randomIndex2 === randomIndex3){
    randomIndex1 = Math.floor(Math.random() * Product.allItems.length);
    randomIndex2 = Math.floor(Math.random() * Product.allItems.length);
    randomIndex3 = Math.floor(Math.random() * Product.allItems.length);
  }

  imgEl1.src = Product.allItems[randomIndex1].filepath;
  imgEl1.id = Product.allItems[randomIndex1].name;
  imgEl2.src = Product.allItems[randomIndex2].filepath;
  imgEl2.id = Product.allItems[randomIndex2].name;
  imgEl3.src = Product.allItems[randomIndex3].filepath;
  imgEl3.id = Product.allItems[randomIndex3].name;
  Product.allItems[randomIndex1].timesDisplayed += 1;
  Product.allItems[randomIndex2].timesDisplayed += 1;
  Product.allItems[randomIndex3].timesDisplayed += 1;
  Product.lastDisplayed[0] = randomIndex1;
  Product.lastDisplayed[1] = randomIndex2;
  Product.lastDisplayed[2] = randomIndex3;
};

function handleClick(e) {
  if(e.target.id === 'product-section') {
    return alert('Please click on a product to choose it!');
  }

  Product.totalClicks += 1;

  for(var i = 0; i < Product.allItems.length; i++) {
    if(e.target.id === Product.allItems[i].name) {
      Product.allItems[i].votes += 1;
      updateChart();
      // console.log(Product.allItems[i].votes, 'votes');
    }
  }
  drawChart();

  if(Product.totalClicks > 24) {
    Product.section.removeEventListener('click', handleClick);
    console.log('NAMES', chartNames);
    console.log('votes', chartVotes);
    showResults();
  }
  randomProduct();
}

function showResults() {
  for(var i = 0; i < Product.allItems.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = Product.allItems[i].name + ' has ' + Product.allItems[i].votes + ' votes in ' + Product.allItems[i].timesDisplayed + ' times shown.';
    Product.resultsList.appendChild(liEl);
  }
  for (var j = 0; j < Product.allItems.length; j++){
    chartNames[j] = Product.allItems[j].name;
    chartVotes[j] = Product.allItems[j].votes;
  }
}
//
//
var data = {
  labels: chartNames, // titles array we declared earlier
  datasets: [
    {
      data: chartVotes, // votes array we declared earlier
    }
  ]
};
function drawChart(){
  var ctx = document.getElementById('bus-chart').getContext('2d');
  busChart = new Chart(ctx,{
    type: 'bar',
    data: data,
    options: {
      legend: {
        display: false,
        labels: {
          fontColor: 'green',
          fontSize: 10,
        }
      },
      responsive: false,
    },
    scales: {
      yAxes: [{
        ticks:{
          stepSize: 1
        }
      }]
    }
  });
}
Product.section.addEventListener('click', handleClick);
randomProduct();
