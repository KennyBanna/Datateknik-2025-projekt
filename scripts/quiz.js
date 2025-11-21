document.addEventListener("DOMContentLoaded", () => {
    
    var questionIndex = 0;
    var questionData = null;
    var userAnwers = [];
    var amountOfQuestions;

    const questionLabel = document.getElementById("question-label");
    const questionNumberDisplay = document.getElementById("question-index-span");
    const button = document.getElementById("answer-button");
    button.addEventListener(("click"), () => answerQuestion());

    // Function to load all questions in to an object from json file
    async function loadQuestionsFromJsonFile() {
        const response = await fetch('/quiz/quizQuestions.json');
        const questionData = await response.json();

        amountOfQuestions = await questionData.length;

        return questionData;
    } 
    
    async function displayQuestion(){

        if(questionData == null){
            questionData = await loadQuestionsFromJsonFile();
        }

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

        //If its the final questions - Display result and bring user back to home
        if(questionIndex == amountOfQuestions){
            correctQuiz();
            return;
        }

        displayQuestion();
    }

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
