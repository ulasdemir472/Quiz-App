const username = document.querySelector("#username");
const save = document.querySelector(".save");
const finalScore = document.querySelector(".finalScore");
const score = localStorage.getItem("score");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

finalScore.innerText = `Your Score : ${score}`;

username.addEventListener("keyup", () => {
  save.disabled = !username.value;
});

const saveHighScore = (e) => {
  e.preventDefault();
  const user_score = {
    score: score,
    name: username.value,
  };

  highScores.push(user_score);
  highScores.sort((a, b) => {
    return b.score - a.score;
  });

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.alert("Your score is saved!");
};
