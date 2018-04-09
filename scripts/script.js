function computerPlay(playerMove) {


  player = playerMove
  console.log("You chose " + player)
  var rps = ['ROCK', 'PAPER', 'SCISSORS'];

  var computer = rps[Math.floor(Math.random() * rps.length)];

  console.log("The computer chose: " + computer)
  console.log(scoreGame(player,computer))




}

function scoreGame (a , b) {

  var RPSHash = {"ROCK":-1, "PAPER":0, "SCISSORS":1}
  A = RPSHash[a]
  B = RPSHash[b]
  if ((A - B) == 0) {
    return "Draw. Well Played."
  } else if ((A - B + 3) % 3 == 1) {
    return (a + " beats " + b + ". Player wins.")
  } else {
    return (b + " beats " + a + ". Computer wins.")
  }

}




function XOR(a, b) {

  if ((a && b) || !(a || b )) {
    return false
  } else {
    return true
  }

}


function rockClick() {
  computerPlay("ROCK")
}

function paperClick() {
  computerPlay("PAPER")
}

function scissorsClick() {
  computerPlay("SCISSORS")
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
