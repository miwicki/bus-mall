'use strict';
//Global variable
var surveyImagesArray = [];
var totalClicks = 0;

//Object constructor
function SurveyImages(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.timesRendered = 0;
  this.timesClicked = 0;
  surveyImagesArray.push(this);
}

//function generates an array of random numbers within min and max values
function randomNoArray (min, max) {
  var getThreeIndex = [];
  for (var i = 0; i < 3; i++) {
    getThreeIndex.push(Math.floor(Math.random() * (max - min)) + min);
  }
  while (getThreeIndex[0] === getThreeIndex[1] || getThreeIndex[1] === getThreeIndex[2] || getThreeIndex[0] === getThreeIndex[2]) {
    getThreeIndex.splice(1, 2);
    getThreeIndex.push(Math.floor(Math.random() * (max - min)) + min);
    getThreeIndex.push(Math.floor(Math.random() * (max - min)) + min);
  }
  return getThreeIndex;
}

//function to clear elements from page
function clearBox(elementID) {
  document.getElementById(elementID).innerHTML = '';
}

//function to count number of clicks
function addClicks(id) {
  for (var i = 0; i < surveyImagesArray.length; i++) {
    if (surveyImagesArray[i].name == id) {
      surveyImagesArray[i].timesClicked ++;
      totalClicks ++;
      console.log('total clicks: ' + totalClicks);
      break;
    }
  }
}

//function to render three different random images to a page
function renderImages() {
  var getThreeIndex = randomNoArray(0, surveyImagesArray.length);
  var randomObject, elBody, elImg;
  elBody = document.getElementById('market-research');
  for (var i = 0; i < 3; i++) {
    randomObject = surveyImagesArray[getThreeIndex[i]];
    elImg = document.createElement('img');
    elImg.setAttribute('class', 'survey-display animated pulse');
    elImg.setAttribute('src', randomObject.filePath);
    elImg.setAttribute('id', randomObject.name);
    elBody.appendChild(elImg);
    randomObject.timesRendered ++;
  }
  eventListenerClickImage();
}

//create an instance of Survey Images for each product
new SurveyImages('bag', 'img/bag.jpg');
new SurveyImages('banana', 'img/banana.jpg');
new SurveyImages('bathroom', 'img/bathroom.jpg');
new SurveyImages('boots', 'img/boots.jpg');
new SurveyImages('breakfast', 'img/breakfast.jpg');
new SurveyImages('bubblegum', 'img/bubblegum.jpg');
new SurveyImages('chair', 'img/chair.jpg');
new SurveyImages('cthulhu', 'img/cthulhu.jpg');
new SurveyImages('dog-duck', 'img/dog-duck.jpg');
new SurveyImages('dragon', 'img/dragon.jpg');
new SurveyImages('pen', 'img/pen.jpg');
new SurveyImages('pet-sweep', 'img/pet-sweep.jpg');
new SurveyImages('scissors', 'img/scissors.jpg');
new SurveyImages('shark', 'img/shark.jpg');
new SurveyImages('sweep', 'img/sweep.png');
new SurveyImages('tauntaun', 'img/tauntaun.jpg');
new SurveyImages('unicorn', 'img/unicorn.jpg');
new SurveyImages('usb', 'img/usb.gif');
new SurveyImages('water-can', 'img/water-can.jpg');
new SurveyImages('wine-glass', 'img/wine-glass.jpg');

//event Handler for clicking an image
function handleImageClick(event) {
  var imgEl = event.target;
  var idEl = imgEl.id;
  addClicks(idEl);
  saveResultsToStorage();
  clearBox('market-research');
  if (totalClicks < 5) {
    renderImages();
  } else {
    createButton('more-tries', '10 more');
    eventListenerButtonTenMore();
    createButton('results', 'Click for results!');
    eventListenerResultsButton();
  }
}

function eventListenerClickImage() {
  var surveyDisplay = document.getElementsByClassName('survey-display');
  for (var i = 0; i < surveyDisplay.length; i++){
    surveyDisplay[i].addEventListener('click', handleImageClick);
  }
}

function eventListenerResultsButton() {
  var button = document.getElementById('results');
  button.addEventListener('click', generateGraphOfData);
}

function eventListenerButtonTenMore() {
  var button = document.getElementById('more-tries');
  button.addEventListener('click', addTenMoreClicks);
}

function addTenMoreClicks() {
  totalClicks -= 10;
  clearBox('market-research');
  clearBox('chart-area');
  renderImages();
}

function BarChartData () {
  this.labels = [];
  this.datasets = [];
}

function BarDataSet(labelName, color) {
  this.label = labelName;
  this.fillColor = color;
  this.strokeColor = color;
  this.highlightFill = color;
  this.highlightStroke = color;
  this.data = [];
}

BarDataSet.prototype.setFields = function (inputArray, field) {
  for (var i = 0; i < inputArray.length ; i++) {
    this.data.push(inputArray[i][field]);
  }
};

BarDataSet.prototype.setPercentClicked = function (inputArray, field1, field2) {
  var percentClicked;
  for (var i = 0; i < inputArray.length ; i++) {
    percentClicked = parseInt(inputArray[i][field1]) / parseInt(inputArray[i][field2]);
    if (isNaN(percentClicked)) {
      this.data.push(0);
    } else {
      this.data.push(percentClicked);
    }
  }
};

BarChartData.prototype.setLabels = function (inputArray, field) {
  for (var i = 0; i < inputArray.length ; i++) {
    this.labels.push(inputArray[i][field]);
  }
};

BarChartData.prototype.pushData = function(chartData) {
  this.datasets.push(chartData);
};

function generateGraphOfData(){
  clearBox('market-research');
  clearBox('chart-area');
  createButton('more-tries', '10 more');
  eventListenerButtonTenMore();
  var elChartArea = document.getElementById('chart-area');
  var chartHeading = document.createElement('h2');
  chartHeading.textContent = 'Survey Results';
  elChartArea.appendChild(chartHeading);
  var elCanvas = document.createElement('canvas');
  elCanvas.setAttribute('height', '450');
  elCanvas.setAttribute('width', '700');
  elCanvas.setAttribute('id', 'my-chart');
  elChartArea.appendChild(elCanvas);

  var clicksforgraph = new BarDataSet('clicks', 'rgba(207,70,71,1)');
  clicksforgraph.setFields(surveyImagesArray, 'timesClicked');
  console.log('clicksforgraph: ', clicksforgraph);

  var renderedforgraph = new BarDataSet('times displayed', 'rgba(0, 135, 204, 1)');
  renderedforgraph.setFields(surveyImagesArray, 'timesRendered');
  console.log('renederedforgraph: ', renderedforgraph);

  var percentClicks = new BarDataSet('ratio clicked to displayed', 'rgb(0,0,0)');
  percentClicks.setPercentClicked(surveyImagesArray, 'timesClicked', 'timesRendered');
  console.log('percentClicks: ', percentClicks);

  var setUpBarChart = new BarChartData();
  setUpBarChart.pushData(clicksforgraph);
  setUpBarChart.pushData(renderedforgraph);
  setUpBarChart.pushData(percentClicks);
  setUpBarChart.setLabels(surveyImagesArray, 'name');
  console.log('setUpBarChart, ', setUpBarChart);
  var ctx = document.getElementById('my-chart').getContext('2d');
  var myNewChart = new Chart(ctx).Bar(setUpBarChart);
}

function createButton (idName, buttonScript) {
  var button = document.createElement('button');
  button.setAttribute('id', idName);
  button.innerHTML = buttonScript;
  document.getElementById('market-research').appendChild(button);
}

function saveResultsToStorage(){
  localStorage.setItem('surveyImagesData', JSON.stringify(surveyImagesArray));
}

function fetchResultsFromStorage(){
  var surveyImagesData = JSON.parse(localStorage.getItem('surveyImagesData'));
  if (surveyImagesData){
    console.log('user has already saved their own prefs');
    surveyImagesArray = surveyImagesData;
  }
}

function clearLocalStorage(){
  localStorage.clear();
  surveyImagesArray = [];
}

var clearLsButton = document.getElementById('clear-ls');
clearLsButton.addEventListener('click', clearLocalStorage);

// function createButtonMoreClicks

//call render Images function
renderImages();
fetchResultsFromStorage();
