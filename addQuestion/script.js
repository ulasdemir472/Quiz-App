const question = document.querySelector("#question");
const choice1 = document.querySelector("#choice1");
const choice2 = document.querySelector("#choice2");
const choice3 = document.querySelector("#choice3");
const choice4 = document.querySelector("#choice4");
const answer = document.querySelector("#answer");
const questions = JSON.parse(localStorage.getItem("questions")) || [];

const addQuestion = (e) => {
  e.preventDefault();
  const newQuestion = {
    question: question.value,
    choice1: choice1.value,
    choice2: choice2.value,
    choice3: choice3.value,
    choice4: choice4.value,
    answer: answer.value,
  };
  questions.push(newQuestion);
  localStorage.setItem("questions", JSON.stringify(questions));
  window.location.href = "/";
};
