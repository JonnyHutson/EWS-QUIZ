const express = require('express');
const router = express.Router();

//User model
const Quiz = require('../models/Quiz');
const { db } = require('../models/Quiz');

router.get('/quiz',(req, res) => res.render('Quiz'));
//Login Page
router.get('/login', (req, res) => res.render('Login'));

//Register Page
router.get('/register', (req, res) => res.render('Register'));



//Update Page
router.get('/update',(req, res) => res.render('Update'));
// QUESTIONS
router.post('/quiz', (req,res) =>{
const questions = [
    {
        "question": "Do you want a pet to love and care for?",
        "answer1": "Yes",
        "answer1Total": "1",
        "answer2": "No",
        "answer2Total": "0"
    },
    {
        "question": "Are you likely to forget you have a pet?",
        "answer1": "Yes",
        "answer1Total": "1",
        "answer2": "No",
        "answer2Total": "0"
    },
    {
        "question": "For a really long time?",
        "answer1": "Yes",
        "answer1Total": "1",
        "answer2": "No",
        "answer2Total": "0"
    },
    {
        "question": "Do you want a creature that returns your affection?",
        "answer1": "Yes",
        "answer1Total": "1",
        "answer2": "No",
        "answer2Total": "0"
    },
    {
        "question": "Do you want to watch your pet do things?",
        "answer1": "Yes",
        "answer1Total": "1",
        "answer2": "No",
        "answer2Total": "0"
    },
    {
        "question": "Do you want your pet to follow instructions?",
        "answer1": "Yes",
        "answer1Total": "1",
        "answer2": "No",
        "answer2Total": "0"
    },
    {
        "question": "Do you have a field or zoo?",
        "answer1": "Yes",
        "answer1Total": "1",
        "answer2": "No",
        "answer2Total": "0"
    },
]


let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions =questions.length;

const container = document.quer;
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
//const option3 = document.querySelector('.option3');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');

//Function to generate question 
function generateQuestions (index) {
    //Select each question by passing it a particular index
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
   // const option3Total = questions[index].answer3Total;
    //Populate html elements 
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
   // option3.setAttribute('data-total', `${option3Total}`);
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
   // option3.innerHTML = `${question.answer3}`
}


function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    //Check if there is a radio input checked
    if(!selectedOption) {
        alert('Please select your answer!');
        return;
    }
    //Get value of selected radio
    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

    ////Add the answer score to the score array
    score.push(answerScore);

    selectedAnswersData.push()
    

    const totalScore = score.reduce((total, currentNum) => total + currentNum);

    //Finally we incement the current question number ( to be used as the index for each array)
    currentQuestion++;

        //once finished clear checked
        selectedOption.checked = false;
    //If quiz is on the final question
    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
        
    }
    //If the quiz is finished then we hide the questions container and show the results 
    if(currentQuestion == totalQuestions) {
      
        container.style.display = 'none';
        result.innerHTML =
         `<h1 class="final-score">Your score: ${totalScore}</h1>
         <div class="summary">
            <h1>Summary</h1>
            <p>Possible - Personality Traits, see below for a summary based on your results:</p>
            <p>0- Pet Rock</p>
            <p>1 - Good Soul</p>
            <p>5 - 10 - Meh </p>
            <p>5 - Are You Even Real</p>
        </div>
        <button class="restart">Restart Quiz</button>
         `;
        return;
    }
    generateQuestions(currentQuestion);
}

//Function to load previous question
function loadPreviousQuestion() {
    //Decrement quentions index
    currentQuestion--;
    //remove last array value;
    score.pop();
    //Generate the question
    generateQuestions(currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
    if(e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
    }

}


generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);
result.addEventListener('click',restartQuiz);
});