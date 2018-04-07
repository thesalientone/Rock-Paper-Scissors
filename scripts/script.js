function computerPlay() {

  introtext = "Rock, Paper, Scissors. Type your selected move below."
  console.log(introtext)
  player = prompt("Enter Move: ")
  while( !XOR(XOR(player.toUpperCase().includes("ROCK"), player.toUpperCase().includes("PAPER")), player.toUpperCase().includes("SCISSORS"))) {
    console.log("Error : Text did not contain a proper entry. Please enter 'rock', 'paper', or 'scissors'")
    player = prompt("Enter Move: ")
  }
  player = player.toUpperCase()

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
