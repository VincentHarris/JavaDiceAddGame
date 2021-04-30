/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
//score array that's initialized at the bottom
init();


var x = document.querySelector('#score-0').textContent;// this is a getter
console.log(x);

document.querySelector('.btn-roll').addEventListener('click', function(){
    //Check to make sure the game isn't won yet
    if(gamePlaying){
      
        //1.Random Number
        //makes it so that you get a random whole number from 1-6
        var dice = Math.floor(Math.random() * 6) +1;
    
        //2.Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
    
    
        //3.Update the round score IF the rolled number !=1
        if(dice!==1){
            //Add Score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click',function() {
    if (gamePlaying){
        //Add currentscore to globalscore
        scores[activePlayer] += roundScore;
        //The above line is the same as scores[activePlayer] = scores[activePlayer + roundScore];
    
        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //Check if player won the game
        if(scores[activePlayer] >=100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }  
    }     
});

function nextPlayer(){
     //Next player
//same thing as  if(activePlayer === 0 ){
//                      activePlayer = 1;
//               } else{
//                  activePlayer =0;
//               }
    //if activeplayer is 0 then activeplayer should be 1 else activeplayer should be 0
        activePlayer === 0 ? activePlayer =1 : activePlayer =0;
        roundScore = 0;
        
        document.getElementById("current-0").textContent='0';
        document.getElementById("current-1").textContent='0';
        
        //Makes it so that whichever player is active, the gray background and red dot is on their side
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
//        document.querySelector('.player-0-panel').classList.remove('active');
//        document.querySelector('.player-1-panel').classList.add('active');
        
        document.querySelector('.dice').style.display = 'none';
    
}

//Makes it so that when the "new game" button is pressed it calls the 
//init function to reset the game
document.querySelector('.btn-new').addEventListener('click', init);

function init(){
scores=[0,0];
roundScore=0;
activePlayer=0;
gamePlaying = true;
    
//display is the css property that we set to 'none' so that it disappears at first
document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent ='0';
document.getElementById('score-1').textContent ='0';
document.getElementById('current-0').textContent ='0';
document.getElementById('current-1').textContent ='0';
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
}

//prints random number in either player 1's or player 2's current score section depending on if the 
//activePlayer is 0(left) or 1(right)

//this only sets text and not HTML
//document.querySelector('#current-' + activePlayer).textContent = dice; //this is a setter

//<em> + dice + </em> italicizes the current score 
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice +'</em>'
