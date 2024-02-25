const scoreElement = document.querySelector(".game__score span");

let sequence = [];
let playerSequence = [];
let score = 0;
let newGame = false;

const setStartButtonClick = () => {
  const button = document.querySelector(".button__start");

  button.addEventListener("click", startGame);
};

const startGame = () => {
  if (newGame) {
    resetGame();
  }
  setSequence();
};

const getRandomColor = () => {
  const colorsList = ["yellow", "green", "blue", "red"];

  return colorsList[Math.floor(Math.random() * colorsList.length)];
};

const setSequence = () => {
  const randomColor = getRandomColor();

  sequence.push(randomColor);
  playerSequence = [];

  removeBlockClick();
  updateStatusMessage("Observe");
  displaySequence(sequence);
};

const displaySequence = (sequence) => {
  sequence.forEach((color, index) => {
    const boxElement = getBoxElement(color);

    setBoxStyle(boxElement, index + 1);
  });

  setPlayersTurn(sequence);
};

const setPlayersTurn = (sequence) => {
  setTimeout(() => {
    setBlockClick();
    updateStatusMessage("Reproduza");
  }, sequence.length * 1400);
};

const handleBlockClick = (e) => {
  playerSequence.push(e.target.id);

  setBoxStyle(e.target, 0);
  checkSequence();
};

const setBoxStyle = (boxElement, index) => {
  const props = {
    element: boxElement,
    audio: new Audio(getBlockAudio(boxElement)),
    timeOn: index * 1200 - 400,
    timeOff: index * 1200 + 300,
  };

  highlightBlock(props);
};

const highlightBlock = (props) => {
  setTimeout(() => {
    props.element.style.opacity = "1";
    props.audio.play();
  }, props.timeOn);

  setTimeout(() => {
    props.element.style.opacity = ".3";
  }, props.timeOff);
};

const updateStatusMessage = (message) => {
  const statusElement = document.querySelector(".game__status");
  const colors = {
    Reproduza: "#a9f1e5",
    Observe: "aliceblue",
    Erro: "red",
  };

  statusElement.style.backgroundColor = colors[message] || "red";
  statusElement.style.color = message === "Erro" ? "white" : "black";
  statusElement.textContent = message;
};

const getBoxElement = (color) => {
  return document.getElementById(color);
};

const getBlockAudio = (element) => {
  return `../assets/${element.id}.mp3`;
};

const checkSequence = () => {
  const index = playerSequence.length - 1;

  if (playerSequence[index] !== sequence[index]) {
    endGame();
  }
  if (playerSequence.length === sequence.length) {
    nextRound();
  }
};

const nextRound = () => {
  score++;
  setTimeout(() => {
    scoreElement.textContent = score;
    startGame();
  }, 600);
};

const endGame = () => {
  newGame = true;

  updateStatusMessage(`ERROU\nScore: ${score}`);
  removeBlockClick();
};

const resetGame = () => {
  sequence = [];
  playerSequence = [];
  score = 0;
  newGame = false;
  scoreElement.textContent = score;
  updateStatusMessage("Observe");
};

const setBlockClick = () => {
  document.querySelectorAll(".block").forEach((block) => {
    block.addEventListener("click", handleBlockClick);
  });
};

const removeBlockClick = () => {
  document.querySelectorAll(".block").forEach((block) => {
    block.removeEventListener("click", handleBlockClick);
  });
};

window.addEventListener("DOMContentLoaded", setStartButtonClick);
