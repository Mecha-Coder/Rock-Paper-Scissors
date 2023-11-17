// Initialized
let score ={};
let line1 = document.querySelector('.who-win');
let line2 = document.querySelector('.who-pick-what');
let line3 = document.querySelector('.game-stat');
let autoButton = document.querySelector('.auto-play')
let autoPress = false;
let intervalID ; 

//SYMBOL CONSTANT
let ROCK = decodeHTMLEntities('&#128074;');
let PAPER = decodeHTMLEntities('&#128400;');
let SCISSOR = decodeHTMLEntities('&#9996;');


// Add event listener
document.querySelector('.js-rock').addEventListener('click',() =>
{Player_Clicked(ROCK)})

document.querySelector('.js-paper').addEventListener('click',() =>
{Player_Clicked(PAPER)})

document.querySelector('.js-scissor').addEventListener('click',() =>
{Player_Clicked(SCISSOR)})

document.body.addEventListener('keydown',(event) => {

    event.key==='r' && Player_Clicked(ROCK)
    event.key==='p' && Player_Clicked(PAPER)
    event.key==='s' && Player_Clicked(SCISSOR)

})

// Check if have game data ----------------------------------

if(localStorage.getItem('score')){
  
  score = JSON.parse(localStorage.getItem('score')) 
  
}else{ 
    score.win =  0;
    score.lose = 0;
    score.tie=  0;
  }

UpdateScore()


// Main logic ----------------------------------------------

function Player_Clicked(Player_Pick){

  const Opponent_Pick =  BOT()
  const Display_Winner = How_Win(Player_Pick,Opponent_Pick)


  line1.innerText = Display_Winner
  line2.innerText = `You ${Player_Pick} - ${Opponent_Pick} Computer`
  UpdateScore()

  localStorage.setItem('score',JSON.stringify(score))

}


// Auto play ---------------------------------------------

function AutoPlay(){

  if (!autoPress){
    intervalID = setInterval(function() {Player_Clicked(BOT())},1000);

    autoPress = true;
    alert('Auto play will start now. Press "OK"')
    autoButton.innerHTML = 'Stop Playing'

  } else {

      clearInterval(intervalID);
      autoPress = false;
      alert('Auto play stopped')
      autoButton.innerHTML = 'Auto Play'
  }

}

// Game logic ---------------------------------------------

function How_Win(Player_Pick,Opponent_Pick){

  if  (Player_Pick === Opponent_Pick){
    score.tie++;
    return 'Tie';
  }
  
  else if(Player_Pick===ROCK && Opponent_Pick===PAPER){
    score.lose++;
    return 'You Lose';
  }
  
  else if(Player_Pick===PAPER && Opponent_Pick===SCISSOR){
    score.lose++;
    return 'You Lose'
  }
  
  else if(Player_Pick===SCISSOR && Opponent_Pick===ROCK){
    score.lose++;
    return 'You Lose';
  }
  
  else{
    score.win++;
    return "You Win";
  }

}

function BOT(){
  const randomNum = Math.random();

  if     (randomNum <= 1/3){return ROCK}
  else if(randomNum <= 2/3){return PAPER}
  else                     {return SCISSOR}
}

function decodeHTMLEntities(text) {
  var textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;

}

function UpdateScore(){
  
  line3.innerText = `Win: [${score.win}] Loss: [${score.lose}] Tie: [${score.tie}]`;
}

function Reset(){
  localStorage.removeItem('score');

  score.win =  0;
  score.lose = 0;
  score.tie =  0;

  UpdateScore()
}