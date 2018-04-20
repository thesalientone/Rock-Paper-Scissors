var playerScore = 0;
var computerScore = 0;
var result = ""
var readoutString = ""


var playerScoreText = document.getElementsByClassName('player-score')[0].children[0]
var compScoreText = document.getElementsByClassName('comp-score')[0].children[0]
var readoutText = document.getElementsByClassName('readouts-left')[0]

// This function executes the game of TicTacToe
function computerPlay(playerMove) {


  player = playerMove
  //console.log("You chose " + player)

  var rps = ['ROCK', 'PAPER', 'SCISSORS'];
  //Selects rock, paper, or scissors for the computer
  var computer = rps[Math.floor(Math.random() * rps.length)];
  var computerText = "images/" + computer.toLowerCase() + ".jpg";

  //console.log(computerText)
  document.getElementById('comp-image').setAttribute("src", computerText)
  //console.log("The computer chose: " + computer)
  result = scoreGame(player,computer)
  readoutString = "Game: " + (playerScore + computerScore) + " Player chose: " + player + " Computer chose: " + computer + " " + result 
  console.log(readoutString)
  readoutText.appendChild('<p>' + readoutString + '</p>')


}

function scoreGame (a , b) {
  //Calculates the winner of the game using modular arithmetic
  var RPSHash = {"ROCK":-1, "PAPER":0, "SCISSORS":1}
  A = RPSHash[a]
  B = RPSHash[b]
  if ((A - B) == 0) {
    return "Draw. Well Played."
  } else if ((A - B + 3) % 3 == 1) {
    playerScore = playerScore + 1
    playerScoreText.innerHTML = "Player : " + playerScore
    return (a + " beats " + b + ". Player wins.")
  } else {
    computerScore = computerScore + 1
    compScoreText.innerHTML = "Computer : " + computerScore
    return (b + " beats " + a + ". Computer wins.")
  }

}




function XOR(a, b) {
  //Function returns exclusive or. Only true when one of the arguments is true.
  if ((a && b) || !(a || b )) {
    return false
  } else {
    return true
  }

}


function rockClick() {

  computerPlay("ROCK")
  document.getElementById('player-image').setAttribute("src", "images/rock.jpg")

}

function paperClick() {
  computerPlay("PAPER")
  document.getElementById('player-image').setAttribute("src", "images/paper.jpg")
}

function scissorsClick() {
  computerPlay("SCISSORS")
  document.getElementById('player-image').setAttribute("src", "images/scissors.jpg")
}



var rockButton = document.getElementById('rockButton')
var paperButton = document.getElementById('paperButton')
var scissorsButton = document.getElementById('scissorsButton')
rockButton.onclick = function() {
  rockClick()

}
paperButton.onclick = function() {
  paperClick()
}
scissorsButton.onclick = function() {
  scissorsClick()
}
