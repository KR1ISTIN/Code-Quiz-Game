//i need a button to allow the user to start the game --
//when the user clicks on the button the game will begin --
//the button will need a addEventListener "click" and a function will be triggered--
//when the function gets triggered and the game begins, a timer will start (the timmer needs a variable for how long the clock to time down)--
//when the timer starts, a question will pop up with multi choice answer --
//when i click on the answer (will need a addEventLister so that way it knows to move to next question)
//IF correct, correcxt will display on screen 
//ELSE wrong will display on the screen and the time decreases by 10secs. 
//IF all questions are answered OR timer is 0
//THEN game is over
//will need a input to save my initals and score

// will need score variable
//will need increaments for score
//variable for timer - has id in html-need to display on UR corner- will need to getElementByID
// variable for initals
// will need prevent Default event on input initals 
//local stoarge for score to be kept 
//will need a bubbling function to prevent other div functions to be ran 

var timer = document.querySelector("#time");
var startQuiz = document.querySelector("#start");// grabs the button Start Quiz
var questionHeader = document.getElementById("question");
var welcome = document.getElementById("welcome");
var cardContainer = document.getElementById("container");
var input = document.getElementById('input');

var secondsLeft = 40; // amount of time for game 
var score = 0; // keeps track of user's score
var currentQuestion = 0; // starting postion of array[questions]

//var storedNames = [];

var questions = [
    { 
        Question: "What is Local Scope?",
        choices: ["An item anywhere in the program",
        "Variable avaible only to that method/function",
        "An object",
        "There is no such thing in Javascript"],
        answer: "Variable avaible only to that method/function"
    
    },
    {
        
        Question: "What are SOME Data Types?",
        choices: ["boolean",
         "string",
         "numbers",
         "all the above"],
        answer: "all the above"
    },
    {

        Question: "What is the THIS keyword?",
        choices: ["undefined",
        "evaluates to true",
         "refers to the object that the function is a property of",
         "Do I even know?"],
        answer: "refers to the object that the function is a property of"
    }, 
    {

        Question: "Difference between  == and  ===  operators?",
        choices: ["They perform the exact same",
        "assign a variable",
         "they are not in JS",
         "== is a loose comparison, === is a strict comparison"],
        answer: "== is a loose comparison, === is a strict comparison"
    }, 
    {

        Question: "What language is this written in?",
        choices: ["React",
        "Javascript",
         "Python",
         "Ruby"],
        answer: "Javascript"
    }, 
]

// this is going to display each question and answer choices on screen
function quizCard() {
    var list = document.querySelector("#list")
    var currentCard = questions[currentQuestion];
    console.log(currentCard) // this is equal to the array called questions with the index currentQuestion, which starts at index 0
    questionHeader.innerHTML = currentCard.Question; // targets the h2 (line 22) tag and injects currentCard whichis equal to the question and its following answer choice
    list.textContent = ""
    input.style.display = "none";
    for (var i = 0; i < questions[currentQuestion].choices.length; i++) {
        var listEl = document.createElement("button");
        var label = document.createElement("label");
        label.textContent = questions[currentQuestion].choices[i];
        label.setAttribute("data-answer", questions[currentQuestion].choices[i])
        label.addEventListener("click", answerSelected)
        list.appendChild(listEl);
        listEl.appendChild(label);
    }
    var countdown = setInterval(function() { // weird bug with making time subtract faster with each click
        if (secondsLeft <= 0 || currentQuestion >= questions.length) {
            clearInterval(countdown);
            secondsLeft = 0; // to make sure the timer does not go negative
            var list = document.querySelector("#list");
            list.style.display = "none";
            questionHeader.innerHTML = "Game Over";
            scoreboard();
            document.getElementById('time').remove(); 
            localStorage.setItem('score', score)
        } else {
            document.getElementById('time').innerHTML = secondsLeft + " seconds";
        }
        secondsLeft -= 1;
    }, 1000);
};

// answer selected functions
function answerSelected(){ 
    if(this.dataset.answer === questions[currentQuestion].answer) {
        currentQuestion++;
        score++;
        quizCard();
    } else {
        score--;
        if (secondsLeft <= 0) {
            secondsLeft = 0;
        } else {
            secondsLeft = secondsLeft - 10;
            if(score <= 0){
                score = 0;
            }
        }
        //quizCard()
    }
    console.log(score); 
}

function scoreboard() {
    var total = document.getElementById("total");

    for (var i = 0; i < 5; i++) { // show top 5 names and scores
        key = localStorage.key(i);
        val = localStorage.getItem(key);
    }
    localStorage.setItem(input.value, score);

    total.innerHTML = "Your score has been saved as: " + input.value + ", " + score;
}

// when start quiz button is clicked on this function will run. 
startQuiz.addEventListener("click", function() {
    cardContainer.setAttribute("style", "visibility: visible")
    welcome.setAttribute("style", "display: none");
    quizCard(); 
});















