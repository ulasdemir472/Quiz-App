const question = document.querySelector(".question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector(".progressText");
const scoreText = document.querySelector(".score");
const progressBarFull = document.querySelector(".progressBarFull");
const timer = document.querySelector(".clock");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentQuestion = {};
let acceptAnswers = true;
let score = 0;
let questionCounter = 0;
let time = 300;
// let questions = [
//   {
//     question: "What is my age?",
//     choice1: "2",
//     choice2: "12",
//     choice3: "22",
//     choice4: "21",
//     answer: "4",
//   },
//   {
//     question: "How are you?",
//     choice1: "Good",
//     choice2: "Bad",
//     choice3: "Idk",
//     choice4: "What",
//     answer: "3",
//   },
//   {
//     question: "5+6?",
//     choice1: "2",
//     choice2: "11",
//     choice3: "22",
//     choice4: "31",
//     answer: "2",
//   },
//   {
//     question: "6+6?",
//     choice1: "2",
//     choice2: "11",
//     choice3: "12",
//     choice4: "31",
//     answer: "3",
//   },
//   {
//     question: "7+6?",
//     choice1: "2",
//     choice2: "11",
//     choice3: "22",
//     choice4: "13",
//     answer: "4",
//   },
// ];
let questions = JSON.parse(localStorage.getItem("questions")) || [];

const SCORE_POINTS = 100;
const MAX_QUESTION = questions.length;

const startGame = () => {
  questionCounter = 0;
  score = 0;
  localStorage.setItem("questions", JSON.stringify(questions));
  //setInterval(timerFunction, 1000);
  getNewQuestion();
};

const getNewQuestion = () => {
  questionCounter++;
  if (questionCounter > MAX_QUESTION) {
    localStorage.setItem("score", score);
    return (window.location.href = "/gameEnd/end.html");
  }

  if (questionCounter === 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  if (questionCounter === MAX_QUESTION) {
    nextBtn.disabled = true;
  }

  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTION}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`;

  currentQuestion = questions[questionCounter - 1];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  acceptAnswers = true;
};

const getPreviousQuestion = () => {
  questionCounter--;

  if (questionCounter === 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  if (questionCounter === MAX_QUESTION) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }

  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTION}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`;

  currentQuestion = questions[questionCounter - 1];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  acceptAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptAnswers) return;
    acceptAnswers = false;

    const selectedChoice = e.target;
    console.log(selectedChoice.parentElement);
    const selectedAnswer = selectedChoice.dataset["number"];

    const correctChoice = choices[Number(currentQuestion.answer) - 1];

    let toApply = selectedAnswer == currentQuestion.answer ? "true" : "false";
    if (toApply === "true") {
      score = score + SCORE_POINTS;
      scoreText.innerText = score;
      selectedChoice.parentElement.classList.add(toApply);
    } else {
      selectedChoice.parentElement.classList.add(toApply);
      correctChoice.parentElement.classList.add("true");
    }

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(toApply);
      correctChoice.parentElement.classList.remove("true");
      getNewQuestion();
    }, 1000);
  });
});

const timerFunction = () => {
  if (time <= 0) {
    timer.innerHTML = "Süre Doldu";
    localStorage.setItem("score", score);
    setTimeout(() => {
      return (window.location.href = "/gameEnd/end.html");
    }, 3000);
  } else {
    let minute = Math.floor(time / 60);
    let seconds = time % 60;
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    timer.innerHTML = `${minute}:${seconds}`;
    time--;
  }
};

startGame();
