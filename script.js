
import words from "./word.js";

const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
const inputField = document.querySelector("input");
const timerText = document.querySelector(".time span b");

let selectedword, timer;

const timeLeft = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      timerText.innerText = maxTime;
    } else {
      clearInterval(timer);
      alert(`Time's up! The correct word was "${selectedword}"`);
      startGame();
    }
  }, 1000);
};

const startGame = () => {
  clearInterval(timer);
  timeLeft(30);
  const randomObj = words[Math.floor(Math.random() * words.length)];
  selectedword = String(randomObj.word);
  const hint = randomObj.hint;
  const wordArray = selectedword.split("");

  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }

  wordText.innerHTML = wordArray.join("");
  hintText.innerHTML = hint;
  inputField.value = "";
};

const checkWord = () => {
  let userWord = inputField.value.toLowerCase();
  if (!userWord) return alert("Please enter a word");
  if (userWord !== selectedword.toLowerCase()) {
    return alert(`Oops, "${userWord}" is incorrect`);
  }
  alert(`Congratulations! "${userWord}" is correct`);
  startGame();
};

checkBtn.addEventListener("click", checkWord);
refreshBtn.addEventListener("click", startGame);
startGame();
