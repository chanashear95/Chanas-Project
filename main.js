"use strict";

//Variables

var imgLinks = ["styles/imgs/scorpion.jpeg", "styles/imgs/flamingo.jpeg", "styles/imgs/spider.jpeg", "styles/imgs/butterfly.jpg", "styles/imgs/babymonkey.jpeg", "styles/imgs/moose.jpeg","styles/imgs/sloth.jpeg", "styles/imgs/frog2.jpeg", "styles/imgs/whitedog.jpg", "styles/imgs/jaguar.jpg", "styles/imgs/mice.jpg", "styles/imgs/horse3.jpg", "styles/imgs/penguins.jpg", "styles/imgs/camel.jpg", "styles/imgs/rhino.jpg", "styles/imgs/racoon.jpg", "styles/imgs/goldfish.jpg", "styles/imgs/horse2.jpg", "styles/imgs/timon.jpg", "styles/imgs/pig.jpeg", "styles/imgs/turtle.jpg", "styles/imgs/snak.jpg", "styles/imgs/lion.jpg","styles/imgs/wolf2.jpeg","styles/imgs/sphynx.jpg","styles/imgs/cow.jpg","styles/imgs/bear.jpeg", "styles/imgs/whale.jpg","styles/imgs/rooster.jpg","styles/imgs/camels.jpg","styles/imgs/baby.jpg","styles/imgs/beagle.jpg","styles/imgs/tucan.jpg","styles/imgs/cats.jpeg", "styles/imgs/frog.jpg","styles/imgs/koala2.jpg","styles/imgs/bird2.jpeg","styles/imgs/monkey.jpg","styles/imgs/panda.jpg","styles/imgs/kitten.jpeg","styles/imgs/dingo.jpg","styles/imgs/tiger2.jpg","styles/imgs/zebra.jpg","styles/imgs/tiger.jpeg","styles/imgs/WhiteTiger.jpeg","styles/imgs/sheep.jpeg","styles/imgs/squirrel.jpg","styles/imgs/cheetah.jpeg","styles/imgs/elephant.jpg","styles/imgs/bird.jpg"];
var cardArray = [];

var boardDiv = document.getElementById("game-board");
var gameTable = document.createElement("table");
gameTable.border = "4";
var tableBody = document.createElement("tbody");

var cardArray4x4 = [];
var cardArray6x6 = [];
var cardArray8x8 = [];
var cardArray10x10 = [];

var boxes = document.getElementsByTagName("td");

var totalMatchesFound = 0;
var twoCardsFlipped = [];

// Buttons
var easyGame = document.getElementById("4X4-game-btn");
var mediumGame = document.getElementById("6X6-game-btn");
var hardGame = document.getElementById("8X8-game-btn");
var extraHardGame = document.getElementById("10X10-game-btn");
var newGameBtn = document.getElementById("start-new-btn");

easyGame.addEventListener("click",GameBoard4x4);
mediumGame.addEventListener("click",GameBoard6x6);
hardGame.addEventListener("click",GameBoard8x8);
extraHardGame.addEventListener("click",GameBoard10x10);
newGameBtn.addEventListener("click",StartGameOver);



//Game Start

// Adding Images To Game Array - Initial Set Up
function AddingPicsToArray(array, array2){
    for(var i= 0; i < array.length; i++){
        array2[i] = [];
        var img = document.createElement("img");
        var imgMatch = document.createElement("img");
    img.src = imgLinks[i];
    imgMatch.src = imgLinks[i];
    array2[i].push(img,imgMatch);
    }
}

AddingPicsToArray(imgLinks, cardArray);

// Easy
function GameBoard4x4(){
    CreateGameTable(4);
    RandomCardPairSelection(cardArray, cardArray4x4, 8);
    AssigningCellsPictures(cardArray4x4);
    GameTimer(120,"countdown");


}

// Medium
function GameBoard6x6(){
    CreateGameTable(6);
    RandomCardPairSelection(cardArray, cardArray6x6, 18);
    AssigningCellsPictures(cardArray6x6);
    GameTimer(300,"countdown");


}

// Hard
function GameBoard8x8(){
    CreateGameTable(8);
    RandomCardPairSelection(cardArray, cardArray8x8, 32);
    AssigningCellsPictures(cardArray8x8);
    GameTimer(480,"countdown");

}

// Extra Hard
function GameBoard10x10(){
    CreateGameTable(10);
    RandomCardPairSelection(cardArray, cardArray10x10, 50);
    AssigningCellsPictures(cardArray10x10);
    GameTimer(600,"countdown");

}

//Functions

// Game Board-Table Set Up
function CreateGameTable(size){
    var numOfMatchesInGame = (size*size) / 2;

    document.getElementById("first-page").style.display = "none";
    document.getElementById("game-score").style.display = "initial";
    document.getElementById("buzzer").style.display = "initial";
    document.getElementById("start-new-btn").style.display = "initial";
    document.getElementById("number-of-matches").innerHTML = totalMatchesFound + " / " + numOfMatchesInGame;
    gameTable.appendChild(tableBody);


    for(var i = 0; i < size; i++){
        var tr = document.createElement("tr");
        tableBody.appendChild(tr);
        tr.id = "row" + i;

        for(var j = 0; j < size; j++){
            var td = document.createElement("td");
            tr.appendChild(td);
        }
    }boardDiv.appendChild(gameTable);
}

// Different Boards Set Up
function RandomCardPairSelection(array, array2, matches){
    ShuffleCards(cardArray);

    for(var i = 0; i < matches; i++){;
        var matchOne  = array[i][0];
        var matchTwo = array[i][1];
        
        array2.push(matchOne,matchTwo);

    }    ShuffleCards(array2); 
}

// Card Array Shuffle

function ShuffleCards(array){
       
    for(var i = array.length -1; i >= 0; i--){
        var randomIndx = Math.floor(Math.random() * (i+1));
        var elemAtIndx = array[randomIndx];

        array[randomIndx] = array[i];
        array[i] = elemAtIndx;

    }  

}

// Assigning Cards Pictures
function AssigningCellsPictures(array){
    for(var i = 0; i < array.length; i++){
        var elem = array[i];
        elem.id = "img" + i;
        boxes[i].appendChild(elem).style.display = "none";
        boxes[i].id = "cell" + i;
        var cardBack = document.createElement("img");
        cardBack.src = "styles/imgs/card.jpg"; 
        cardBack.id = "back-of-card" + i;
        boxes[i].appendChild(cardBack);   
        boxes[i].addEventListener("click",CardFlip); 

    }
    console.log(boxes);
}

// Card Flip
function CardFlip(){
var indx = this.id.slice(4);
if(twoCardsFlipped.length < 2){
document.getElementById("back-of-card" + indx).style.display = "none";
document.getElementById("img" + indx).style.display = "initial";
twoCardsFlipped.push(document.getElementById("img" + indx));
}
if(twoCardsFlipped.length === 2){
    if(twoCardsFlipped[0].id === twoCardsFlipped[1].id){
        twoCardsFlipped.pop();
    }
    document.getElementById("img" + twoCardsFlipped[0].id.slice(3)).style.display = "initial";
    document.getElementById("img" + twoCardsFlipped[1].id.slice(3)).style.display = "initial";

    setTimeout(MatchCheck, 1000);
}
}


function MatchCheck(){
     if(twoCardsFlipped[0].src === twoCardsFlipped[1].src){
        totalMatchesFound += 1;
        document.getElementById("number-of-matches").innerHTML = totalMatchesFound + " / " + boxes.length / 2;

        //img 1
        document.getElementById("back-of-card" + twoCardsFlipped[0].id.slice(3)).style.display= "none";   
        document.getElementById("img" + twoCardsFlipped[0].id.slice(3)).style.display = "none";
        document.getElementById("back-of-card" + twoCardsFlipped[0].id.slice(3)).id = "match" + twoCardsFlipped[0].id.slice(3);
        document.getElementById("img" + twoCardsFlipped[0].id.slice(3)).id = "match" + twoCardsFlipped[0].id.slice(3);
        //img 2
        document.getElementById("back-of-card" + twoCardsFlipped[1].id.slice(3)).style.display= "none";  
        document.getElementById("img" + twoCardsFlipped[1].id.slice(3)).style.display = "none";
        document.getElementById("back-of-card" + twoCardsFlipped[1].id.slice(3)).id = "match" + twoCardsFlipped[1].id.slice(3);
        document.getElementById("img" + twoCardsFlipped[1].id.slice(3)).id = "match" + twoCardsFlipped[1].id.slice(3);

        twoCardsFlipped = [];
    }     
    else if(twoCardsFlipped[0].src != twoCardsFlipped[1].src){
        FlipBackOver();
    }
}

function FlipBackOver(){
    //img 1
document.getElementById("back-of-card" + twoCardsFlipped[0].id.slice(3)).style.display = "initial";
document.getElementById("img" + twoCardsFlipped[0].id.slice(3)).style.display = "none";
    //img2
document.getElementById("back-of-card" + twoCardsFlipped[1].id.slice(3)).style.display = "initial";
document.getElementById("img" + twoCardsFlipped[1].id.slice(3)).style.display = "none";

twoCardsFlipped = [];
}


// Game Timer
function GameTimer(secondsOfGame,buzzerId){
    var minutes = Math.floor(secondsOfGame/60);
    var seconds = secondsOfGame % 60;
    var buzzer = document.getElementById(buzzerId);
    buzzer.innerHTML = minutes + " : " + seconds;
    if(seconds < 0) {
        clearTimeout(timer);
        buzzer.innerHTML = " 0 : 0 ";

        if(alert("Time is up! You lose!")){}
        else    
        window.location.reload();
        }

    else if(seconds > 0 && totalMatchesFound === boxes.length/2){
        clearTimeout(timer);
        buzzer.innerHTML = minutes + " : " + (seconds+1);
        if(alert("You Won!!")){}
        else window.location.reload();
    }
    secondsOfGame --;
    var timer = setTimeout(function(){GameTimer(secondsOfGame,buzzerId)},1000);
}


// Restart
function StartGameOver(){
    location.reload();
}






