// DOM Elements
const guess = document.getElementById('guessNo');
const result = document.getElementById('result');
const resetBtn = document.querySelector('button.resetBtn');
const btn = document.querySelector('button.guessBtn');
const btnPlay = document.querySelector('.btn.play');
const highestScore = document.querySelector('.high');
const prevScore = document.querySelector('.prev');

// Game State
const randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

//  LocalStorage
highestScore.innerHTML = `Highest Score: ${localStorage.getItem('high') ?? 0}`;
prevScore.innerHTML = `Previous Score: ${localStorage.getItem('prev') ?? 0}`;

function calculateScore() {
  let newScore = 100 - attempts;
  let storedHigh = Number(localStorage.getItem('high'));

  prevScore.innerHTML = `Previous Score: ${newScore}`;
  localStorage.setItem('prev', newScore);

  if (storedHigh && storedHigh > newScore) {
    highestScore.innerHTML = `Highest Score: ${storedHigh}`;
  } else {
    localStorage.setItem('high', newScore);
    highestScore.innerHTML = `Highest Score: ${newScore}`;
  }
}

function resetLocalStorage() {
  localStorage.removeItem('high');
  localStorage.removeItem('prev');

  // highestScore.innerHTML = `Highest Score: 0`;
  // prevScore.innerHTML = `Previous Score: 0`;

  location.reload();
}

// Helpers
function showResult(message, color, autoClear = true) {
  result.innerHTML = message;
  result.style.backgroundColor = color;

  if (autoClear) {
    setTimeout(() => {
      result.innerHTML = '';
      result.style.backgroundColor = '';
      // clear input
      guess.value = '';
    }, 1000);
  }
}

function getHint(diff, direction) {
  return diff > 10 ? `Too ${direction}! Try again` : `${direction}! Try again`;
}

// Main Logic
function compareNumber() {
  const guessNumber = parseInt(guess.value);

  if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
    return showResult(
      'Please enter a valid number from 1 to 100',
      'rgba(250, 0, 0, 0.5)',
    );
  }

  attempts++;

  if (guessNumber === randomNumber) {
    guess.disabled = true; // disable input
    btn.disabled = true; // disable input
    calculateScore();
    btnPlay.classList.add('show');
    return showResult(
      `🎉 Correct! You guessed it in ${attempts} ${attempts > 1 ? 'attempts' : 'attempt'}!`,
      'rgba(0, 252, 0, 0.5)',
      false,
    );
  }

  const diff = Math.abs(guessNumber - randomNumber);
  const direction = guessNumber < randomNumber ? 'Low' : 'High';
  showResult(getHint(diff, direction), 'rgba(252, 0, 0, 0.5)');
}

// Event Listeners
btn.addEventListener('click', compareNumber);
guess.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') compareNumber();
});

resetBtn.addEventListener('click', (e) => {
  const userConfirms = window.confirm(
    '⚠️ This will erase all your scores. Continue?',
  );

  if (userConfirms) {
    resetLocalStorage();
  }
});
