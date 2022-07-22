//global scope variables, getting elements from HTML
var scoreBtn = document.querySelector("#highscores");
var timeDisplay = document.querySelector("#timer-count");
var startBtn = document.querySelector("#start-button");
var displayQuestion = document.querySelector("#questions");
var answerContainer = document.querySelector("#answers");
var btnA = document.querySelector("#a");
var btnB = document.querySelector("#b");
var btnC = document.querySelector("#c");
var btnD = document.querySelector("#d");
var answerVer = document.querySelector("#answer-type");
var scoreMsg = document.querySelector("#score-message");
var finalScore = document.querySelector("#final-score");
var initialsForm = document.querySelector("#initials-form");
var initialsInput = document.querySelector("#initials");
var submitScoreBtn = document.querySelector("#submit-score");
var highscoreEntry = document.querySelector("#stored-initials-score");
var restartBtn = document.querySelector("#restart");
var clearHighscoresBtn = document.querySelector("#clear-highscores");
var startPage = document.querySelector(".start-page");
var quizPage = document.querySelector(".quiz-page");
var userScorePage = document.querySelector(".user-score-page");
var highscorePage = document.querySelector(".highscore-page")

var timer;
var timerCount;
var currentQuestionIndex = 0;
var storedInitials =[];

//object that holds all of our questions, answers and correct answer
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
var finalQuestionIndex = quizBanks.length - 1;

//displays the timer at 75, invokes showQuiz and startTimer functions
function startQuiz() {
    timerCount = 75;
    //disables the viewhighscore button until the end of the quiz
    scoreBtn.disabled = true;
    showQuiz();
    startTimer();
}

//starts the timer and clears the timer once it gets to or below 0
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timeDisplay.textContent = timerCount;
        //makes time displayed red and bigger when get below 10 seconds left
        if (timerCount <= 10) {
            timeDisplay.setAttribute("style", "color: red; font-size: 30px;");
        }
        if (timerCount <= 0 ) {
            // stops timer if time runs out and goes to game over page
            clearInterval(timer);
            //enables the highscore button
            scoreBtn.disabled = false;
            //invokes gameOver function to take user to initials page
            gameOver();
        }
    }, 1000);
}


//displays quiz container, invokes showQuestions function
function showQuiz() {
    quizPage.setAttribute("style", "display: flex");
    startPage.setAttribute("style", "display: none");
    userScorePage.setAttribute("style", "display: none");
    highscorePage.setAttribute("style", "display: none");
    
    showQuestions();
}

//populates questions/answer options into corresponding buttons
function showQuestions() {
    var currentQuestion = quizBanks[currentQuestionIndex].question
    displayQuestion.textContent = currentQuestion;
    
    btnA.innerHTML = quizBanks[currentQuestionIndex].options[0];
    btnB.innerHTML = quizBanks[currentQuestionIndex].options[1];
    btnC.innerHTML = quizBanks[currentQuestionIndex].options[2];
    btnD.innerHTML = quizBanks[currentQuestionIndex].options[3];
    
}

//displays initials-page that shows users score and a form for initials
function gameOver() {
    //resets the currentQuestionIndex to 0 so that when you restart quiz it starts from the first question
    currentQuestionIndex = 0;

    userScorePage.setAttribute("style", "display: flex");
    startPage.setAttribute("style", "display: none");
    quizPage.setAttribute("style", "display: none");
    highscorePage.setAttribute("style", "display: none");
    
    //enables highscore button
    scoreBtn.disabled = false;
    
    if (timeDisplay.innerHTML > 0) {
        scoreMsg.innerHTML = "Great Job!"
        finalScore.innerHTML = timeDisplay.innerHTML 
    } else {
        scoreMsg.innerHTML = "Game over! Try Again!"
        finalScore.innerHTML = 0 
        timeDisplay.innerHTML = 0
    }
}

//displays highscore-page
function viewHighscores() {
    highscorePage.setAttribute("style", "display: block");
    startPage.setAttribute("style", "display: none");
    quizPage.setAttribute("style", "display: none");
    userScorePage.setAttribute("style", "display: none");
    //resets timer back to 0, black and font size 20px
    timerCount = 0;
    timeDisplay.textContent = timerCount;
    timeDisplay.setAttribute("style", "color: black; font-size: 20px")
    //disables highscore button when already on highscore page
    scoreBtn.disabled = true;

    
    //when click restart button go back to homescreen
    restartBtn.addEventListener("click", function() {
        startPage.setAttribute("style", "display: flex");
        quizPage.setAttribute("style", "display: none");
        userScorePage.setAttribute("style", "display: none");
        highscorePage.setAttribute("style", "display: none");
        //enables highscore button when brought back to startquiz page
        scoreBtn.disabled = false;
    
    }
    );

    //gets array from local storage
    var savedInitials = JSON.parse(localStorage.getItem("storedInitials"));
    if (savedInitials !== null) {
        storedInitials = savedInitials;
    }

}

//for every array index (users stored initials and score) in storedInitials, creates an li that is appended to the parent ul
function renderScores() {
    highscoreEntry.innerHTML = "";
    
    for (var i = 0; i < storedInitials.length; i++) {
        var storedInitial = storedInitials[i];
        var li = document.createElement("li");
        li.textContent = storedInitial;

        highscoreEntry.appendChild(li);
    }
   
}

//stores initials and scores into local storage
function storeScores() {
    localStorage.setItem("storedInitials",JSON.stringify(storedInitials));
}

//on form submit, push a users initials and score into the storedInitials array, and invokes functions that store and retrieve from local storage, brings user to highscore page
initialsForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var inputText = finalScore.innerHTML + " " + initialsInput.value;

    storedInitials.push(inputText);
    //sorts the array from lowscores to highscores, without function scores sort just by first number so a score of 8 will display higher than a score of 65 for example
    storedInitials.sort(function(scorea, scoreb){
        return scorea.split(" ")[0] - scoreb.split(" ")[0];
    });
    //reverses array order to store scores from highscores to lowscores
    storedInitials.reverse();
    //clears the users input from the form
    initialsInput.value = "";

    storeScores();
    renderScores();
    viewHighscores();
});

//clears scores from local storage and from the highscore page
function clearHighScores (){

    localStorage.removeItem("storedInitials");

    
    while (highscoreEntry.firstChild) {
        highscoreEntry.removeChild(highscoreEntry.firstChild);
    };
    storedInitials = [];
}

//click listeners for highscore button, when user clicks on the highscore button shows high score page and local storage saved initials/scores
scoreBtn.addEventListener("click", viewHighscores);
scoreBtn.addEventListener("click", renderScores);

//click listener for starting the quiz
startBtn.addEventListener("click", startQuiz);

//click listener for clearing the highscores
clearHighscoresBtn.addEventListener("click", clearHighScores);

//click listener for verifying an answer
answerContainer.addEventListener("click", function(event) {  
    //where user clicks
    var answerBtn = event.target;
    //if user clicks right answer and its not the last question, it goes on to the next question
    if(answerBtn.innerHTML === quizBanks[currentQuestionIndex].answer && currentQuestionIndex !== finalQuestionIndex) {
        answerVer.textContent = "Correct!";
        currentQuestionIndex += 1;
        answerContainer = ""
        showQuiz();
    // if user clicks wrong answer and its not the last question, decrease time by 10 seconds    
    } else if (answerBtn.innerHTML !== quizBanks[currentQuestionIndex].answer && currentQuestionIndex !== finalQuestionIndex){
    answerVer.textContent = "Wrong Answer!";
        timerCount -= 10;
        timeDisplay.textContent = timerCount;  
    // if user clicks wrong answer and it is the last question, decrease time by 10 seconds
    } else if (answerBtn.innerHTML !== quizBanks[currentQuestionIndex].answer && currentQuestionIndex === finalQuestionIndex) {
        answerVer.textContent = "Wrong Answer!";
        timerCount -= 10;
        timeDisplay.textContent = timerCount; 
    // if user clicks the right answer and it is the last question stop the timer and go to gameover page
    }  else {
        answerVer.textContent = "Correct!";
        clearInterval(timer);
        gameOver();
    }
});


