var playerScore = 0;
var computerScore = 0;
var result = ""
var readoutString = ""
var playerMoves = []
var computerMoves = []
var winHistory = []
var playerWinPercentage = []
var computerWinPercentage = []
var computerWin
var playerWins
var computerWins
var playerWPCA = []




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
  var node = document.createElement("P")
  var textnode = document.createTextNode(readoutString)
  node.appendChild(textnode)
  //console.log(readoutString)
  //console.log(playerWinPercentage)
  readoutText.appendChild(node)
  updateGameStatistics()

  updateChartArrays()

  //stats development will remove later
  console.log(gameArray(1,1,0))

}

function scoreGame (a , b) {
  //a is player, b is computer
  //Updates Statistics
  playerMoves.push(a)
  computerMoves.push(b)

  //Calculates the winner of the game using modular arithmetic
  var RPSHash = {"ROCK":-1, "PAPER":0, "SCISSORS":1}
  A = RPSHash[a]
  B = RPSHash[b]
  if ((A - B) == 0) {
    winHistory.push(0)
    return "Draw. Well Played."
  } else if ((A - B + 3) % 3 == 1) {
    winHistory.push(1)
    playerScore = playerScore + 1
    playerScoreText.innerHTML = "Player : " + playerScore
    return (a + " beats " + b + ". Player wins.")
  } else {
    winHistory.push(-1)
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

function getSum(total, num) {
    return total + num
}

function getWinPercentage(scoreArray, agent) {
  if (agent == 1) {
    playerWins = scoreArray.filter(num => num > 0).length
    return (playerWins / scoreArray.length ) * 100
  }
  if (agent == 2) {
    computerWins = scoreArray.filter(num => num < 0).length
    return (computerWins / scoreArray.length) * 100
  }
}

function updateGameStatistics() {
  playerWinPercentage.push(getWinPercentage(winHistory, 1))
  computerWinPercentage.push(getWinPercentage(winHistory, 2))
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

function updateChartArrays() {
  //Converts each of the individual chart arrays into a format accepted by chart.js

  playerWPCA.push({x: playerWinPercentage.length, y: playerWinPercentage[playerWinPercentage.length -1]})
  chart.update()
}

//Code for displaying charts

var ctx = document.getElementById('gameChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'scatter',

    // The data for our dataset
    data: {

        datasets: [{
            label: "Win Percentage",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: playerWPCA

        }]
      },

    // Configuration options go here
    options: {
      scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }

    }
});

var basisArray = []
var percentageArray = []
var chartHistoryArray = []
var chartOutputArray = []
var calcWins = []
var calcWinsFiltered = []
var winCalc
function createChartArray(inputScoreArray) {

    inputScoreArray.forEach(collapsePercentage)
    return chartOutputArray
}

function collapsePercentage(element, index, array) {
    //onsole.log("Index: " + index.toString() + "Element: " + element.toString())
    calcWins = array.slice(0, index + 1)

    calcWinsFiltered = calcWins.filter(x => x > 0)
    //console.log(calcWins)
    winCalc = calcWinsFiltered.length
    //console.log("Total wins: " + winCalc.toString())


    chartOutputArray[index] = (winCalc / calcWins.length * 100)
}

function gameArray(agent, condition, move) {
  //Returns the desired chart array based on the following conditions:
    // agent (0) = overall , (1) = player, (2) = computer
    // condition (1) = win (2) = loss (3) = selection
    // move (0) = overall (1) = rock (2) = paper (3) = scissors

    if (agent == 1) {
      basisArray = playerMoves;
      if (condition == 2) {
        chartHistoryArray = winHistory.map(x => x * -1)
      } else if (condition == 1) {
        chartHistoryArray = winHistory
      }
    } else if (agent == 2) {
      basisArray = computerMoves;
      if (condition == 1) {
        chartHistoryArray = winHistory.map(x => x * -1)
      } else if (condition == 2) {
        chartHistoryArray = winHistory
      }
    } else {
      //basisArray = Need to think about how to encode overall array
    }

    switch(move) {
      case 0:
            return createChartArray(chartHistoryArray);
            break;
      case 1:
            return createChartArray(condenseHistoryArray(chartHistoryArray, "ROCK"))
            break;
      case 2:
            return createChartArray(condenseHistoryArray(chartHistoryArray, "PAPER"))
            break;
      case 3:
            return createChartArray(condenseHistoryArray(chartHistoryArray, "SCISSORS"))
            break;


    }




}

function count(array, item) {
  if (typeof(array) == "string") {
      array = array.split("");
  }
  return array.filter(x => x == item).length

}
var historyArray = []
function condenseHistoryArray(array, move) {
    historyArray = []
    array.forEach(function(value, index) {
      if (basisArray[index] == move) {
        historyArray.push(value)
      }
    })
  console.log("History array size: " + historyArray.length)
  return historyArray
}
