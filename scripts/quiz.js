document.addEventListener("DOMContentLoaded", () => {
    
    var questionIndex = 0;
    var questionData = null;

    const questionLabel = document.getElementById("question-label");
    const questionNumberDisplay = document.getElementById("question-index-span");
    const button = document.getElementById("answer-button");
    button.addEventListener(("click"), () => nextQuestion());

    // Function to load all questions in to an object from json file
    async function loadQuestionsFromJsonFile() {
        const response = await fetch('/quiz/quizQuestions.json');
        const questionData = await response.json();
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

    function nextQuestion(){

        questionIndex ++

        displayQuestion();
    }

    displayQuestion();
});
