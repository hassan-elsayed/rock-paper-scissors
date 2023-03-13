// GAME

let playerScore = 0
let ultronScore = 0
let roundWinner = ''

function playRound(playerSelection, ultronSelection) {
  if (playerSelection === ultronSelection) {
    roundWinner = 'tie'
  }
  if (
    (playerSelection === 'ROCK' && ultronSelection === 'SCISSORS') ||
    (playerSelection === 'SCISSORS' && ultronSelection === 'PAPER') ||
    (playerSelection === 'PAPER' && ultronSelection === 'ROCK')
  ) {
    playerScore++
    roundWinner = 'player'
  }
  if (
    (ultronSelection === 'ROCK' && playerSelection === 'SCISSORS') ||
    (ultronSelection === 'SCISSORS' && playerSelection === 'PAPER') ||
    (ultronSelection === 'PAPER' && playerSelection === 'ROCK')
  ) {
    ultronScore++
    roundWinner = 'ultron'
  }
  updateScoreMessage(roundWinner, playerSelection, ultronSelection)
}

function getRandomChoice() {
  let randomNumber = Math.floor(Math.random() * 3)
  switch (randomNumber) {
    case 0:
      return 'ROCK'
    case 1:
      return 'PAPER'
    case 2:
      return 'SCISSORS'
  }
}

function isGameOver() {
  return playerScore === 5 || ultronScore === 5
}

// UI

const scoreInfo = document.getElementById('scoreInfo')
const scoreMessage = document.getElementById('scoreMessage')
const playerScorePara = document.getElementById('playerScore')
const ultronScorePara = document.getElementById('ultronScore')
const playerSign = document.getElementById('playerSign')
const ultronSign = document.getElementById('ultronSign')
const rockBtn = document.getElementById('rockBtn')
const paperBtn = document.getElementById('paperBtn')
const scissorsBtn = document.getElementById('scissorsBtn')
const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')
const overlay = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')

rockBtn.addEventListener('click', () => handleClick('ROCK'))
paperBtn.addEventListener('click', () => handleClick('PAPER'))
scissorsBtn.addEventListener('click', () => handleClick('SCISSORS'))
restartBtn.addEventListener('click', restartGame)
overlay.addEventListener('click', closeEndgameModal)

function handleClick(playerSelection) {
  if (isGameOver()) {
    openEndgameModal()
    return
  }

  const ultronSelection = getRandomChoice()
  playRound(playerSelection, ultronSelection)
  updateChoices(playerSelection, ultronSelection)
  updateScore()

  if (isGameOver()) {
    openEndgameModal()
    setFinalMessage()
  }
}

function updateChoices(playerSelection, ultronSelection) {
  switch (playerSelection) {
    case 'ROCK':
      playerSign.querySelector('img').setAttribute('src', './imgs/rock-img.png');
      break
    case 'PAPER':
      playerSign.querySelector('img').setAttribute('src', './imgs/paper-img.png');
      break
    case 'SCISSORS':
      playerSign.querySelector('img').setAttribute('src', './imgs/scissors-img.png');
      break
  }

  switch (ultronSelection) {
    case 'ROCK':
      ultronSign.querySelector('img').setAttribute('src', './imgs/rock-img.png');
      break
    case 'PAPER':
      ultronSign.querySelector('img').setAttribute('src', './imgs/paper-img.png');
      break
    case 'SCISSORS':
      ultronSign.querySelector('img').setAttribute('src', './imgs/scissors-img.png');
      break
  }
}

function updateScore() {
  if (roundWinner === 'tie') {
    scoreInfo.textContent = "It's a tie!"
  } else if (roundWinner === 'player') {
    scoreInfo.textContent = 'You won!'
  } else if (roundWinner === 'ultron') {
    scoreInfo.textContent = 'You lost!'
  }

  playerScorePara.textContent = `Player: ${playerScore}`
  ultronScorePara.textContent = `Ultron: ${ultronScore}`
}

function updateScoreMessage(winner, playerSelection, ultronSelection) {
  if (winner === 'player') {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} beats ${ultronSelection.toLowerCase()}`
    return
  }
  if (winner === 'ultron') {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} is beaten by ${ultronSelection.toLowerCase()}`
    return
  }

  scoreMessage.textContent = `${capitalizeFirstLetter(
    playerSelection
  )} ties with ${ultronSelection.toLowerCase()}`
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function openEndgameModal() {
  endgameModal.classList.add('active')
  overlay.classList.add('active')
}

function closeEndgameModal() {
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}

function setFinalMessage() {
  return playerScore > ultronScore
    ? (endgameMsg.textContent = 'You won!')
    : (endgameMsg.textContent = 'You lost...')
}

function restartGame() {
  playerScore = 0
  ultronScore = 0
  scoreInfo.textContent = 'Choose your weapon'
  scoreMessage.textContent = 'First to score 5 KOs wins the game'
  playerScorePara.textContent = 'Player: 0'
  ultronScorePara.textContent = 'Ultron: 0'
  playerSign.querySelector('img').setAttribute('src', './imgs/qMark.png');
  ultronSign.querySelector('img').setAttribute('src', './imgs/qMark.png');
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}