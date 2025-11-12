const correctAnswers = {
    1: "a",
    2: "b",
    3: "a",
};

function isCorrect(question_id, answer) {
    if (answer === correctAnswers[question_id]) {
        return true;
    } else {
        return false;
    }
}
