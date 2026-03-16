document.querySelector("button").addEventListener("click", gradeQuiz);

// Functions
function isFormValid() {
    let isValid = true;
    if(document.querySelector("#q1").value == ""){
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered.";
    }
    return isValid;
}

function gradeQuiz() {
    console.log("Grading quiz...");
    document.querySelector("#validationFdbk").innerHTML = ""; //resets validation fdbk
    if (!isFormValid()) {
        return;
    }

    // variables
    let score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    console.log(q1Response);

    // grading question 1
    if (q1Response == "sacramento") {
        document.querySelector("#q1Feedback").innerHTML = "Correct!";
        document.querySelector("#q1Feedback").className = "bg-success text-white";
        document.querySelector("#markImg1").innerHTML = "<img src='img/checkmark.png' alt='Checkmark'>";
        score += 20;
    } else {
        document.querySelector("#q1Feedback").innerHTML = "Incorrect!";
        document.querySelector("#q1Feedback").className = "bg-warning text-white";
        document.querySelector("#markImg1").innerHTML = "<img src='img/xmark.png' alt='xmark'>";
    }
    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
}