// Element reference variable
let questionsEl = document.getElementById("questions");
let timerEl = document.getElementById("time");
let choicesEl = document.getElementById("choices");
let submitBtn = document.getElementById("submit");
let startBtn = document.getElementById("start");
let initialsEl = document.getElementById("initials");
let feedbackEl = document.getElementById("feedback");
let finalScoreEl = document.getElementById("final-score");

// Global variable
let currentQuestionIndex = 0;
let time = questions.length * 12;
let timerId;
let correctCount = 0;
let scorePercentage = 0;

//Functions

/* will initiate function startQuiz when user clicks the start quiz button */
function startQuiz() {
  /* to hide the initial screen */
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
  /* to unhide portion of page */
  questionsEl.removeAttribute("class");
  /* initiate timer */
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;
  getQuestion();
}


/* function to loop the set of questions in questionnaire js   */
function getQuestion() {
  /* returns the questions from questionnaire js */
  var currentQuestion = questions[currentQuestionIndex];
  /* returns the question */
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  /* clears previous question asked */
  choicesEl.innerHTML = "";

  /* for loop to go through all questions in questionnaire */
  for (var i = 0; i < currentQuestion.choices.length; i++){
   /* turns the choices into buttons user can select */
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = i + 1 + ". " + choice;

   /* returns button created on the screen */
    choicesEl.appendChild(choiceNode);
  }
}





//Initiators