//global scope variables
var scoreBtn = document.querySelector("#highscores");
var timeDisplay = document.querySelector("#timer-count");
var startBtn = document.querySelector("#start-button");
var displayQuestion = document.querySelector("#questions");
var answer = document.querySelector("#answers");
var btnA = document.querySelector("#a");
var btnB = document.querySelector("#b");
var btnC = document.querySelector("#c");
var btnD = document.querySelector("#d");
var answerVer = document.querySelector("#answer-type");
var finalScore = document.querySelector("#final-score");
var highscoreEntry = document.querySelector("#initials-score");
var restartBtn = document.querySelector("#restart");
var clearHighscores = document.querySelector("#clear-highscores");
var startPage = document.querySelector(".start-page");
var quizPage = document.querySelector(".quiz-page");
var userScorePage = document.querySelector(".user-score-page");
var highscorePage = document.querySelector(".highscore-page")

var timer;
var timerCount;
var currentQuestionIndex = 0;

var quizBanks = [{
    question: "1. Commonly used  data types DO NOT include: ",
    options: ["A. strings", "B. booleans", "C. alerts", "D. numbers",
],
answer: "C. alerts",
},
{
    question: "2. The condition in an if / else statement is enclosed within ______.",
    options: ["A. quotes", "B. curly brackets", "C. parentheses", "D. square brackets",
],
answer: "C. parentheses",
},
{
    question: "3. Arrays in JavaScript can be used to store ________.",
    options: ["A. numbers and strings", "B. other arrays", "C. booleans", "D. all of the above",
],
answer: "D. all of the above",
},
{
    question: "4. String values must be enclosed within ________ when being assigned to variables",
    options: ["A. commas", "B. curly brackets", "C. quotes", "D. parentheses",
],
answer: "C. quotes",
},
{
    question: "5. A very useful tool used during development and debugging for printing content to the debugger is: ",
    options: ["A. JavaScript", "B. terminal / bash", "C. for loops", "D. console log",
],
answer: "D. console log",
},
];
var finalQuestionIndex = quizBanks.length

function startQuiz() {
    timerCount = 75;
    scoreBtn.disabled = true;
    showQuiz();
    startTimer();
}

//The setTimer function starts and stops the timer
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timeDisplay.textContent = timerCount;
        if (timerCount <= 0 ) {
            // Clears interval
            clearInterval(timer);
            scoreBtn.disabled = false;
            gameOver();
        }
    }, 1000);
}

function viewHighscores() {
    highscorePage.setAttribute("style", "display: flex");
    startPage.setAttribute("style", "display: none");
    quizPage.setAttribute("style", "display: none");
    userScorePage.setAttribute("style", "display: none");
    
    //when click restart button go back to homescreen
    restartBtn.addEventListener("click", function() {
        startPage.setAttribute("style", "display: flex");
        quizPage.setAttribute("style", "display: none");
        userScorePage.setAttribute("style", "display: none");
        highscorePage.setAttribute("style", "display: none");
    }
    );
}

//displays quiz container
function showQuiz() {
    quizPage.setAttribute("style", "display: flex");
    startPage.setAttribute("style", "display: none");
    userScorePage.setAttribute("style", "display: none");
    highscorePage.setAttribute("style", "display: none");

    showQuestions();
}

//displays questions/answer options and triggers verifyAnswer function
function showQuestions() {
    var currentQuestion = quizBanks[currentQuestionIndex].question
    displayQuestion.textContent = currentQuestion;

    btnA.innerHTML = quizBanks[currentQuestionIndex].options[0];
    btnB.innerHTML = quizBanks[currentQuestionIndex].options[1];
    btnC.innerHTML = quizBanks[currentQuestionIndex].options[2];
    btnD.innerHTML = quizBanks[currentQuestionIndex].options[3];

    verifyAnswer();
}
 
//verifies that the answer clicked is the correct answer and triggers the next showQuestion
function verifyAnswer() {
    
    answer.addEventListener("click",function(event) {  
    answer = event.target;

    console.log ("answer", answer);
    console.log("quizBanks[currentQuestionIndex].answer", quizBanks[currentQuestionIndex].answer);

    if(answer.innerHTML === quizBanks[currentQuestionIndex].answer && currentQuestionIndex !== finalQuestionIndex) {
     answerVer.textContent = "Correct!";
     currentQuestionIndex += 1;
     console.log("currentQuestionIndex", currentQuestionIndex);
     answer = ""
     showQuestions();

   } else if (answer.innerHTML !== quizBanks[currentQuestionIndex].answer && currentQuestionIndex !== finalQuestionIndex){
    answerVer.textContent = "Wrong Answer!";
    timerCount -= 10;
    timeDisplay.textContent = timerCount;  
    } else {
        clearInterval(timer);
        gameOver();
    }  
});
}


function gameOver() {
    userScorePage.setAttribute("style", "display: flex");
    startPage.setAttribute("style", "display: none");
    quizPage.setAttribute("style", "display: none");
    highscorePage.setAttribute("style", "display: none");

}
scoreBtn.addEventListener("click", viewHighscores)

startBtn.addEventListener("click", startQuiz);




