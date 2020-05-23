const startButton= document.getElementById('start-btn')
const endloop = document.getElementById('answer-buttons')
const nextButton= document.getElementById('next-btn')
const endofgamebutton = document.getElementById('endgame')
const showResultbutton = document.getElementById('showresult')

const questionContainerElements= document.getElementById('question_container')
const questionElement = document.getElementById('question')
questionElement.style.fontSize = "150%" ; 
const answerButtonsElment = document.getElementById('answer-buttons')
answerButtonsElment.style.fontSize = "150%" ; 
var score = 0

// set the question randomly

var shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', ()=>{
    currentQuestionIndex++
    setNextQuestion()
})

function startGame(){
startButton.classList.add('hide');
shuffledQuestions = questions.sort(()=> Math.random() - .5)
shuffledQuestions = shuffledQuestions.slice(0,8)
console.log(shuffledQuestions.length);

currentQuestionIndex = 0
questionContainerElements.classList.remove('hide');

setNextQuestion();


}

function setNextQuestion(){
    resetState()
    shuffledQuestions[currentQuestionIndex].number = currentQuestionIndex+1;
showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
questionElement.innerText = question.number+". "+question.question
question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct){
        button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElment.appendChild(button)
})
}
        

function resetState(){
clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElment.firstChild){
        answerButtonsElment.removeChild
        (answerButtonsElment.firstChild)
    }
}

function selectAnswer(e){
const selectedButton = e.target
const correct = selectedButton.dataset.correct
setScore(document.body, correct)
Array.from(answerButtonsElment.children).forEach(button=>{
    setStatusClass(button, button.dataset.correct)
})
if(shuffledQuestions.length > currentQuestionIndex +1){

    nextButton.classList.remove('hide')
}else{
    endloopMethod();
}
}

function endloopMethod(){
    endloop.classList.add('hide')
    document.getElementById('question').innerHTML="Congragulations! Game Finished. Your Score is <strong>"+score+"</strong> out of 8" 
    endofgamebutton.classList.remove('hide')
    process.exit(1)
}



function setStatusClass(element, correct){

    clearStatusClass(element)
    if (correct){
        element.classList.add('correct') 
    }
    else{
        element.classList.add('wrong')       
    }
}

function setScore(element, correct){

    clearStatusClass(element)
    console.log(correct)
    if (correct){
        //element.classList.add('correct')
        score  = score+1;
        console.log("The current score is: " +score);  
    }
    else{
        element.classList.add('wrong')
        //score = score;
        console.log("The current score is: " +score); 
       
    }
}

function clearStatusClass(element){
element.classList.remove('correct')
element.classList.remove('wrong')

}

$(document).ready(function(){
    $(document).on("click", "#endgame", function() {
        $.post("/set_game_score", {game_score: parseInt(score)}, function(){
            window.location = "/home";
        });
    });
});

$(document).ready(function(){
    $(document).on("click", "#showresult", function() {
        $.post("/set_game_score", {game_score: parseInt(score)}, function(){
            window.location = "/home";
        });
    });
});

const questions = [
    {QID: "1",
        number: 0,
        question: "I use (below) to brush teeth",
      answers: [
          {text: 'Tooth Brush', correct: true},
          {text: 'Glasses', correct: false},
          {text: 'Hair Brush', correct: false},
          {text: 'tissue', correct: false},]
    },
    {QID: "2",
    number: 0,
        question: "Apple is a",
    answers: [
        {text: 'car', correct: false},
        {text: 'fruit', correct: true},
        {text: 'bed', correct: false},
        {text: 'toaster', correct: false},]
    },
    {QID: "3",
    number: 0,
        question: "Kitchen is where I can",
    answers: [
      {text: 'withdraw money', correct: false},
      {text: 'take a shower', correct: false},
      {text: 'wash my car', correct: false},
      {text: 'cook dinner', correct: true},]
    },
    {QID: "4",
    number: 0,
    question: "Animal name beginning with the letter S",
    answers: [
    {text: 'Tigar', correct: false},
    {text: 'Sugar', correct: false},
    {text: 'Spoon', correct: false},
    {text: 'Skunk', correct: true},]
    },
    {QID: "5", 
    number: 0,
    question: "40 * 50 = ",
    answers: [
    {text: '40', correct: false},
    {text: '50', correct: false},
    {text: '300', correct: false},
    {text: '2000', correct: true},]
    },
    {QID: "6",
    number: 0,
    question: "Which one is the largest number?",
    answers: [
    {text: '456', correct: true},
    {text: '123', correct: false},
    {text: '111', correct: false},
    {text: '340', correct: false},]
    },
    {QID: "7",
    number: 0,
    question: "what the missing number at the end of the series. 5, 12, 19, 26,?",
    answers: [
    {text: '31', correct: false},
    {text: '32', correct: false},
    {text: '33', correct: true},
    {text: '34', correct: false},]
    },
    {QID: "8",
    number: 0,
    question: "5 + 2 = ",
    answers: [
    {text: '5', correct: false},
    {text: '7', correct: true},
    {text: '52', correct: false},
    {text: '12', correct: false},]
    },
    {QID: "9",
    number: 0,
    question: "I go to a bank to",
    answers: [
    {text: 'Deposit money', correct: true},
    {text: 'Watch a movie', correct: false},
    {text: 'Cook dinner', correct: false},
    {text: 'cut my hair', correct: false},]
    }, 
    {QID: "10",
    number: 0,
    question: "33 / 11 =",
    answers: [
    {text: '33', correct: false},
    {text: '3', correct: true},
    {text: '11', correct: false},
    {text: 'unknown', correct: false},]
    },
    {QID: "11",
    number: 0,
    question: "What to bring on a rainning day?",
    answers: [
    {text: 'umbrella', correct: true},
    {text: 'instant noodle', correct: false},
    {text: 'labtop', correct: false},
    {text: 'sunscreen', correct: false},]
    },
    {QID: "12",
    number: 0,
    question: "Which of the following is the opposite of the word dark?",
    answers: [
    {text: 'Gloomy', correct: false},
    {text: 'Happy', correct: false},
    {text: 'Day', correct: false},
    {text: 'Light', correct: true},]
    },
    {QID: "13",
    number: 0,
    question: "which number is the smallest?",
    answers: [
    {text: '67', correct: false},
    {text: '90', correct: false},
    {text: '16.5', correct: true},
    {text: '34', correct: false},]
    },
    {QID: "14",
    number: 0,
    question: "Country name beginning with the letter A",
    answers: [
    {text: 'Adelaide', correct: false},
    {text: 'Australia', correct: true},
    {text: 'India', correct: false},
    {text: 'China', correct: false},]
    },
    {QID: "15",
    number: 0,
    question: "Letter is to word as house is to",
    answers: [
    {text: 'mansion', correct: false},
    {text: 'room', correct: true},
    {text: 'hospital', correct: false},
    {text: 'homeless', correct: false},]
    },
    {QID: "16",
    number: 0,
    question: "Which one is a city?",
    answers: [
    {text: 'Victoria', correct: false},
    {text: 'Queensland', correct: false},
    {text: 'Sydney', correct: true},
    {text: 'New South Wales', correct: false},]
    },
  ];
