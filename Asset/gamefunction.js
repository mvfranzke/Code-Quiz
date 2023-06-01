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

/* function to terminate the game if user run out of time or have completed answering all question on the questionnaire js list */
function quizEnd() {
  /* terminates the timer */
  clearInterval(timerId);

  /* once timer terminates, the time left will appear on the screen */
  let endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  /* will count users correct answer against the total question and returns it on the page as 100% */
  let scorePercentage = (correctCount / questions.length) * 100;
  finalScoreEl.textContent = scorePercentage + "%";

  /* hides the question section of the page to reveal saveHighscore */
  questionsEl.setAttribute("class", "hide");
}


/* function to keep track of remaining time while user is answering the quiz */
function clockTick() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

/* save score in window local storage */
function saveHighscore() {
  /* get text value when user enters their name, set trim to remove spaces */
  let initials = initialsEl.value.trim();

  /* prevents user from not entering any name */
  if (initials !== "") {
    /* returns previous saved values */
    let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: finalScoreEl.textContent,
      initials: initials,
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "index.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}



//Initiators