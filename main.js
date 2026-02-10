const guess = document.getElementById('guessNo');
const result = document.getElementById('result');
const btn = document.querySelector('.btn');
const btnPlay = document.querySelector('.btn.play');

const randomNumber = Math.floor(Math.random() * 100) + 1;

const setTime = () => {
  setTimeout(() => {
    result.innerHTML = '';
    result.style.backgroundColor = '';
  }, 1000);
};
let arr = [];
function addToArray() {
  const value = Number(guess.value);
  if (!isNaN(value)) {
    arr.push(value);
  }
}

function compareNumber() {
  addToArray();

  const guessNumber = parseInt(guess.value);
  if (isNaN(guessNumber) || guessNumber > 100 || guessNumber < 0) {
    result.innerHTML = 'Please enter a valid number from 1 to 100';
    result.style.backgroundColor = 'rgba(250, 0, 0, 0.5)';
    setTime();
  } else if (guessNumber === randomNumber) {
    result.innerHTML = ` Congratulations! You guessed the correct number in ${arr.length} ${arr.length > 1 ? 'attempts' : 'attempt'}!`;
    result.style.backgroundColor = 'rgba(0, 252, 0, 0.5)';
    btnPlay.classList.add('show');
  } else if (guessNumber < randomNumber) {
    result.style.backgroundColor = 'rgba(252, 0, 0, 0.5)';
    if (randomNumber - guessNumber > 10) {
      result.innerHTML = 'Too low! Try again';
    } else {
      result.innerHTML = 'Low! Try again';
    }
    setTime();
  } else {
    result.style.backgroundColor = 'rgba(252, 0, 0, 0.5)';
    if (guessNumber - randomNumber > 10) {
      result.innerHTML = 'Too high! Try again';
    } else {
      result.innerHTML = 'High! Try again';
    }
    setTime();
  }
}

btn.addEventListener('click', compareNumber);
guess.addEventListener('keyup', (e) => {
  if (e.keyCode == 13) {
    compareNumber();
  }
});
