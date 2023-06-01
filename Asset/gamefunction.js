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

/* will initiate function startQuiz when user clicks the start quiz button   */
function startQuiz() {
  /* to hide the initial screen */
  let startScreenEl = document.getElementById("start-screen");
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
  let currentQuestion = questions[currentQuestionIndex];
  /* returns the question */
  let titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  /* clears previous question asked */
  choicesEl.innerHTML = "";

  /* for loop to go through all questions in questionnaire */
  for (let i = 0; i < currentQuestion.choices.length; i++){
   /* turns the choices into buttons user can select */
    let choice = currentQuestion.choices[i];
    let choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = i + 1 + ". " + choice;

   /* returns button created on the screen */
    choicesEl.appendChild(choiceNode);
  }
}

/* function to check if user selected the correct answer or not */
function questionClick(event) {
  let buttonEl = event.target;

  /* set to return if user does not select any answer */
  if (!buttonEl.matches(".choice")) {
    return;
  }

  /* if user selected incorrect answer, will be penalized by subtracting 10 seconds from the total time */
  if (buttonEl.value !== questions[currentQuestionIndex].answer) {
    time -= 10;

    /* prevent negative time */
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
  } else {
    /* user will receive 1 pts for every correct answer */
    correctCount++;
  }
  /* loads the next question on the screen */
  currentQuestionIndex++;

  /* if user have answered all question, quizEnd function to be initiated, otherwise the next question will load on the screen */
  if (time <= 0 || currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}





//Initiators