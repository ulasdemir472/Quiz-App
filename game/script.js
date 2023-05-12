const question = document.querySelector(".question"); //soru yazılan yer
const choices = Array.from(document.querySelectorAll(".choice-text")); //şıklar
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
let time = 180;

//önce soru eklenir sonra local storage a kaydedilip gösterilir.
let questions = JSON.parse(localStorage.getItem("questions")) || [];

const SCORE_POINTS = 100;
const MAX_QUESTION = questions.length;

const startGame = () => {
  questionCounter = 0;
  score = 0;
  setInterval(timerFunction, 1000);
  getNextQuestion();
};

const getNextQuestion = () => {
  questionCounter++;

  let unansweredQuestions = questions.filter((question) => !question.answered);

  if (unansweredQuestions.length === 0) {
    //soru bittiğinde oyunu bitir
    localStorage.setItem("score", score);
    return (window.location.href = "/gameEnd/end.html");
  }

  currentQuestion = unansweredQuestions[questionCounter - 1];
  question.innerText = currentQuestion.question;

  progressText.innerText = `Question ${currentQuestion.number} of ${MAX_QUESTION}`;
  progressBarFull.style.width = `${
    (currentQuestion.number / MAX_QUESTION) * 100
  }%`;

  if (currentQuestion.number === MAX_QUESTION) {
    //son soruya gelince next butonu disable et dolaşırken
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }

  if (unansweredQuestions.length === 1) {
    //son soruda butonları kapat
    nextBtn.disabled = true;
    prevBtn.disabled = true;
  }

  if (unansweredQuestions.shift() === currentQuestion) {
    //ilk eleman şuanki soruysa prev disabled
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  acceptAnswers = true;
};

const getPreviousQuestion = () => {
  questionCounter--;

  let unansweredQuestions = questions.filter((question) => !question.answered);

  currentQuestion = unansweredQuestions[questionCounter - 1];
  question.innerText = currentQuestion.question;

  progressText.innerText = `Question ${currentQuestion.number} of ${MAX_QUESTION}`;
  progressBarFull.style.width = `${
    (currentQuestion.number / MAX_QUESTION) * 100
  }%`;

  if (currentQuestion.number === MAX_QUESTION) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }

  if (unansweredQuestions.length === 1) {
    //son soruda butonları kapat
    nextBtn.disabled = true;
    prevBtn.disabled = true;
  }

  if (unansweredQuestions.shift() === currentQuestion) {
    //öncesinde soru yoksa prev button disabled
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

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

    currentQuestion.answered = true; //şık işaretlendiğinde soru cevaplandı olarak görünür
    if (currentQuestion.number === MAX_QUESTION) {
      questionCounter = 0;
    } else {
      questionCounter--;
    }

    const selectedChoice = e.target;
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
      getNextQuestion();
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
