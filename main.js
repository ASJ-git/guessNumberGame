// DOM Elements
const guess = document.getElementById('guessNo');
const result = document.getElementById('result');
const btn = document.querySelector('button.btn');
const btnPlay = document.querySelector('.btn.play');

// Game State
const randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// Helpers
function showResult(message, color, autoClear = true) {
  result.innerHTML = message;
  result.style.backgroundColor = color;

  if (autoClear) {
    setTimeout(() => {
      result.innerHTML = '';
      result.style.backgroundColor = '';
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
