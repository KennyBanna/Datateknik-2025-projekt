document.addEventListener("DOMContentLoaded", () => {
    
    console.log(questions);

    var questionIndex = 0;
    var userAnwers = [];
    
    // questions kommer ifrån questions.js- filen
    const questionData = questions;
    const amountOfQuestions = questions.length;

    // References to DOM elements
    const questionLabel = document.getElementById("question-label");
    const questionNumberDisplay = document.getElementById("question-index-span");
    const button = document.getElementById("answer-button");
    
    button.addEventListener(("click"), () => answerQuestion());
    
    function displayQuestion(){

        questionData = questions;

        const question = questionData[questionIndex].question;
        const options = questionData[questionIndex].options;

        questionLabel.innerHTML = question;
        questionNumberDisplay.innerHTML = questionIndex + 1;
        
        for(key in options){
            var element = document.getElementById(`label-${key}`);
            element.innerHTML = key + ": " + options[key];
        }
    }

    function answerQuestion(){

        var radionButtons = document.getElementsByName("answer");
        var answer = '';
        for(i = 0; i < 4; i++){
            if(radionButtons[i].checked){
                answer = radionButtons[i].value;
                break;
            }   
        }
        
        userAnwers.push(answer);
        questionIndex ++

        //När alla frågor är besvarade
        if(questionIndex == amountOfQuestions){
            correctQuiz();
            return;
        }

        displayQuestion();
    }

    // Rättar frågorna, visar resultat och går tillbaks till index.html
    function correctQuiz(){

        var correctAnswers = 0;

        for(i = 0; i < amountOfQuestions; i++){

            if(userAnwers[i] == questionData[i].correctAnswer){
                correctAnswers ++;
            }

        }

        alert("You had " + correctAnswers + " out of " + amountOfQuestions + " correct answers");
        open("index.html")
    }

    displayQuestion();
});
