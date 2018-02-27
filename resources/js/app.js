/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, roundScore2, activePlayer, gamePlaying, prevRoll, playerTarget;



init();


document.querySelector('.btn-roll').addEventListener('click',function(){

  if(gamePlaying){
  document.querySelector('.scoreGoal').style.display = 'none';

  prevRoll = (dice + dice2);
  //1. Random number
  var dice = Math.floor( Math.random() * 6) + 1;
  var dice2 = Math.floor( Math.random() * 6) + 1;

  //2. Display result

  var diceDOM =   document.querySelector('.dice');
  var diceDOM2 =   document.querySelector('.dice2');
  diceDOM.style.display = 'block';
  diceDOM2.style.display = 'block';
  diceDOM.src = './resources/images/dice-' + dice + '.png';
  diceDOM2.src = './resources/images/dice-' + dice2 + '.png';

  roundScore += dice;
  roundScore2 += dice2;

  //3. Update the round score IF the rolled number was not a 1
  if(!((dice === 1) && (dice2 === 1))) {

    // if one of the dice is equal to 1, then no score is earned and next player rolls
    if (dice=== 1 || dice2 === 1){
       //Player keeps loses his score and turn
       scores[activePlayer] = 0;
       document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
       nextPlayer();
    }else{

      // first check that prev and current rolls are not 12
      if((roundScore + roundScore2 ===12) && (prevRoll === 12)){
          // Player loses turn
          nextPlayer();

      }else{
        if((scores[activePlayer] + (roundScore + roundScore2))  >= playerTarget){
          scores[activePlayer] += (roundScore + roundScore2);
          displayWinner();
        }else{
          document.getElementById('current-'+ activePlayer).textContent = (roundScore + roundScore2);
          document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        }
      }
    } //end else clause
  }else{
    //document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    displayWinner();
  }
}
});

 document.querySelector('.btn-hold').addEventListener('click',function(){
   // Add current score to global score
  if(gamePlaying){
    document.querySelector('.scoreGoal').style.display = 'none';
   //scores[activePlayer] += roundScore;
   scores[activePlayer] += (roundScore + roundScore2);

   // Update the UI
   //document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
   document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
   if(gamePlaying){
     document.querySelector('.scoreGoal').style.display = 'none';


   //Check if player won game
   if( scores[activePlayer] >= playerTarget){
     displayWinner();


   }else{

    nextPlayer();
   }


 }
}
 });




function nextPlayer(){

      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
      roundScore = 0;
      roundScore2 = 0;

      document.getElementById('current-0').textContent = '0';
      document.getElementById('current-1').textContent = '0';

      document.querySelector('.player-0-panel').classList.toggle('active');
      document.querySelector('.player-1-panel').classList.toggle('active');

      //document.querySelector('.player-0-panel').classList.remove('active');
      //document.querySelector('.player-1-panel').classList.add('active');

    //  document.querySelector('.dice').style.display = 'none';
    //  document.querySelector('.dice2').style.display = 'none';


}

document.querySelector('.btn-new').addEventListener('click', init);
document.querySelector('#submitScore').addEventListener('click', init);

function init(){



  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  roundScore2 = 0;
  gamePlaying = true;
  document.querySelector('.scoreGoal').style.display = 'none';
  document.querySelector('.scoreGoal').style.display = 'block';


  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-' + '0').textContent =  'Player 1';
  document.getElementById('name-' + '1').textContent =  'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';



  document.querySelector('#scoreTarget').style.display = 'inline-block';




   var tempplayerTarget = document.querySelector('#scoreTarget').value === undefined  ?100:document.querySelector('#scoreTarget').value;

  console.log(tempplayerTarget);
  //document.querySelector('#scoreTarget').style.display = 'none';
  playerTarget = tempplayerTarget;




}


function displayWinner(){
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
  gamePlaying = false;

}
