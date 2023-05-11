const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const answer = document.querySelector("#answer");
const questions = JSON.parse(localStorage.getItem("questions")) || [];

const addQuestion = (e) => {
  e.preventDefault();
  const newQuestion = {
    question: question.value,
    choice1: choices[0].value,
    choice2: choices[1].value,
    choice3: choices[2].value,
    choice4: choices[3].value,
    answer: answer.value,
    number: questions.length + 1,
    answered: false,
  };
  questions.push(newQuestion);
  localStorage.setItem("questions", JSON.stringify(questions));
  window.location.href = "/";
};
