// call all variables
var questionBox = document.getElementById("question-box");
var containerGroup = document.getElementById("container-group");
var lastContainer = document.getElementById("last")
var scoreBoard = document.getElementById("scoreboard")
var initialsForm = document.getElementById("initials-form")
var highScoreBox = document.getElementById("highScore-box")
var highScores = document.getElementById("high-scores")
var listHigh = document.getElementById("high-list")
var correct = document.getElementById("correct")
var wrong = document.getElementById("wrong")
//buttons
var startButton = document.querySelector("#start-game");
var playAgain = document.querySelector("#play-again")
var reset = document.querySelector("#reset")
//questions/answers element
var questionEl = document.getElementById("question")
var ansBut = document.getElementById("answer-buttons")
var timer = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover
timer.innerText = 0;

//High Score Array
var HighScores = [];

 //assign array details for questions 
var arrayShuffledQuestions
var QuestionIndex = 0



// The array of questions for our quiz game.
var questions = [
  { q: 'What does HTML stand for?', 
    a: '3. HyperText Markup language', 
    choices: [{choice: '1. High times must leave'}, {choice: '2. Hit the magnetic lever'}, {choice: '3. HyperText Markup language'}, {choice: '4. Hyper type marking language'}]
  },
  { q: 'What does var stand for in Java Script?', 
    a: '1. variable', 
    choices: [{choice: '1. variable'}, {choice: '2. variety'}, {choice: '3. Value at risk '}, {choice: '4. video assistant recording'}]
  },
  { q: 'What can a function contain?', 
    a: '1. all the above', 
    choices: [{choice: '1. all the above'}, {choice: '2. arguments'}, {choice: '3. parameters'}, {choice: '4. parenthesis'}]
  },
  { q: 'Arrays use the following?', 
    a: '4. ()', 
    choices: [{choice: '1. []'}, {choice: '2. {}'}, {choice: '3. --'}, {choice: '4.()'}]
  },
  { q: 'What is DOM?', 
    a: '1. Document Object Model', 
    choices: [{choice: '1. Document Object Model'}, {choice: '2. Do more'}, {choice: '3. Domination'}, {choice: '4. Digital off mobile'}]
  },
  { q: 'What HTML element contains machine-readable information (metadata) about the document, like its title, scripts, and style sheets?', 
    a: '2. <head>', 
    choices: [{choice: '1. <html>'}, {choice: '2. <head>'}, {choice: '3. <base>'}, {choice: '4. <link>'}]
  },
  { q: 'What does word-spacing do?', 
    a: '2. properly increases or decreases the white space between words', 
    choices: [{choice: '1. nothing'}, {choice: '2. properly increases or decreases the white space between words'}, {choice: '3. presses enter'}, {choice: '4. creates color'}]
  },
];

  //if go back button is hit on high score page
var renderStartPage = function () {
  highScoreBox.classList.add("hide")
  highScoreBox.classList.remove("show")
  containerGroup.classList.remove("hide")
  containerGroup.classList.add("show")
  scoreBoard.removeChild(scoreBoard.lastChild)
  QuestionIndex = 0
  gameover = ""
  timer.textContent = 0 
  score = 0

  if (correct.className = "show") {
      correct.classList.remove("show");
      correct.classList.add("hide")
  }
  if (wrong.className = "show") {
      wrong.classList.remove("show");
      wrong.classList.add("hide");
  }
}

//every second, check if game-over is true, or if there is time left. Start time at 30. 
var setTime = function () {
  timeleft = 60;

var timercheck = setInterval(function() {
  timer.innerText = timeleft;
  timeleft--

  if (gameover) {
      clearInterval(timercheck)
  }
 
  if (timeleft < 0) {
      showScore()
      timer.innerText = 0
      clearInterval(timercheck)
  }

  }, 1000)
}

var startGame = function() {
  //add classes to show/hide start and quiz screen
  containerGroup.classList.add('hide');
  containerGroup.classList.remove('show');
  questionBox.classList.remove('hide');
  questionBox.classList.add('show');
  //Shuffle the questions so they show in random order
  arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
  setTime()
  setQuestion()
}

//set next question for quiz
var setQuestion = function() {
  resetAnswers()
  displayQuestion(arrayShuffledQuestions[QuestionIndex])
}

//remove answer buttons
var resetAnswers = function() {
  while (ansBut.firstChild) {
      ansBut.removeChild(ansBut.firstChild)
  };
};

//display question information (including answer buttons)
var displayQuestion = function(index) {
  questionEl.innerText = index.q
  for (var i = 0; i < index.choices.length; i++) {
      var answerbutton = document.createElement('button')
      answerbutton.innerText = index.choices[i].choice
      answerbutton.classList.add('btn')
      answerbutton.classList.add('answerbtn')
      answerbutton.addEventListener("click", answerCheck)
      ansBut.appendChild(answerbutton)
      }
  }


//display correct! on screen
var answerCorrect = function() {
  if (correct.className = "hide") {
      correct.classList.remove("hide")
      correct.classList.add("banner")
      wrong.classList.remove("banner")
      wrong.classList.add("hide")
      }
  }  
//display wrong! on screen
var answerWrong = function() {
  if (wrong.className = "hide") {
      wrong.classList.remove("hide")
      wrong.classList.add("banner")
      correct.classList.remove("banner")
      correct.classList.add("hide")
  }
}
//check if answer is correct    
var answerCheck = function(event) {
  var selectedanswer = event.target
      if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
          answerCorrect()
          score = score + 7
          console.log(arrayShuffledQuestions[QuestionIndex])
      }

      else {
        answerWrong()
        score = score - 1;
        timeleft = timeleft - 3;
    };

  //go to next question, check if there is more questions
    QuestionIndex++
      if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
          setQuestion()
      }   
      else {
         gameover = "true";
         showScore();
          }
}

  //Display total score screen at end of game
var showScore = function () {
  questionBox.classList.add("hide");
  lastContainer.classList.remove("hide");
  lastContainer.classList.add("show");

  var scoreDisplay = document.createElement("p");
  scoreDisplay.innerText = ("Your final score is " + score + "!");
  scoreBoard.appendChild(scoreDisplay);
}       

//create high score values
var createHighScore = function(event) { 
  event.preventDefault() 
  var initials = document.querySelector("#initials").value;
  if (!initials) {
    alert("Enter your intials!");
    return;
  }

initialsForm.reset();

var HighScore = {
initials: initials,
score: score
} 

//push and sort scores
HighScores.push(HighScore);
HighScores.sort((a, b) => {return b.score-a.score});

//clear visibile list to resort
while (listHigh.firstChild) {
 listHigh.removeChild(listHigh.firstChild)
}
//create elements in order of high scores
for (var i = 0; i < HighScores.length; i++) {
var highscoreEl = document.createElement("li");
highscoreEl.ClassName = "high-score";
highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
listHigh.appendChild(highscoreEl);
}

saveHighScore();
displayHighScores();

}
//save high score
var saveHighScore = function () {
  localStorage.setItem("HighScores", JSON.stringify(HighScores))
      
}

//load values/ called on page load
var loadHighScore = function () {
  var LoadedHighScores = localStorage.getItem("HighScores")
      if (!LoadedHighScores) {
      return false;
  }

  LoadedHighScores = JSON.parse(LoadedHighScores);
  LoadedHighScores.sort((a, b) => {return b.score-a.score})


  for (var i = 0; i < LoadedHighScores.length; i++) {
      var highscoreEl = document.createElement("li");
      highscoreEl.ClassName = "high-score";
      highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
      listHigh.appendChild(highscoreEl);

      HighScores.push(LoadedHighScores[i]);
      
  }
}  

//display high score screen from link or when intiials entered
var displayHighScores = function() {

  highScoreBox.classList.remove("hide");
  highScoreBox.classList.add("show");
  gameover = "true"

  if (lastContainer.className = "show") {
      lastContainer.classList.remove("show");
      lastContainer.classList.add("hide");
      }
  if (containerGroup.className = "show") {
      containerGroup.classList.remove("show");
      containerGroup.classList.add("hide");
      }
      
  if (questionBox.className = "show") {
      questionBox.classList.remove("show");
      questionBox.classList.add("hide");
      }

  if (correct.className = "show") {
      correct.classList.remove("show");
      correct.classList.add("hide");
  }

  if (wrong.className = "show") {
      wrong.classList.remove("show");
      wrong.classList.add("hide");
      }
  
}
//clears high scores
var clearScores = function () {
  HighScores = [];

  while (listHigh.firstChild) {
      listHigh.removeChild(listHigh.firstChild);
  }

  localStorage.clear(HighScores);

} 

loadHighScore()
  
//on start click, start game
startButton.addEventListener("click", startGame)
//on submit button -- enter or click
initialsForm.addEventListener("submit", createHighScore)
//when view high-scores is clicked
highScores.addEventListener("click", displayHighScores)
//Go back button
playAgain.addEventListener("click", renderStartPage)
//clear scores button
reset.addEventListener("click", clearScores)