document.querySelector("button").addEventListener("click", gradeQuiz);
var score = 0;
var attempts = localStorage.getItem("total_attempts");
displayQ4Choices();

// Functions
function displayQ4Choices() {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
    for (let i =0; i < q4ChoicesArray.length; i++) {
        document.querySelector("#q4Choices").innerHTML += ` <input type="radio" name="q4" id= "${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`;
    }
}

function isFormValid() {
    let isValid = true;
    if(document.querySelector("#q1").value == ""){
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered.";
    }
    return isValid;
}

function rightAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='Checkmark'>";
    score += 10;
}

function wrongAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
}

function gradeQuiz() {
    console.log("Grading quiz...");
    document.querySelector("#validationFdbk").innerHTML = ""; //resets validation fdbk
    if (!isFormValid()) {
        return;
    }

    // variables
    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q4Response = document.querySelector("input[name=q4]:checked").value;
    console.log(q1Response);
    console.log(q2Response);
    console.log(q4Response);
    let q5Response = document.querySelector("#q5").value;
    console.log(q5Response);
    let q6Response = document.querySelector("#q6").value;
    console.log(q6Response);
    let q7Response = document.querySelector("#q7").value;
    console.log(q7Response);
    let q8Response = document.querySelector("#q8").value;
    console.log(q8Response);
    let q9Response = document.querySelector("input[name=q9]:checked").value;
    console.log(q9Response);


    // grading question 1
    if (q1Response == "sacramento") {
        rightAnswer(1);
    } else {
        wrongAnswer(1);
    }

    // grading question 2
    if (q2Response == "mo") {
        rightAnswer(2);
    } else {
        wrongAnswer(2);
    }

    // grading question 3
    if (document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked && !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked) {
        rightAnswer(3);
    } else {
        wrongAnswer(3);
    }

    // grading question 4
    if (q4Response == "Rhode Island") {
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }

    // grading question 5
    if (q5Response == "4") {
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }

    // grading question 6
    if (q6Response == "1850-09-09") {
        rightAnswer(6);
    } else {
        wrongAnswer(6);
    }

    // grading question 7
    if (q7Response == "50") {
        rightAnswer(7);
    } else {
        wrongAnswer(7);
    }

    // grading question 8
    if (q8Response == "ca") {
        rightAnswer(8);
    } else {
        wrongAnswer(8);
    }

    // grading question 9
    if (q9Response == "alaska") {
        rightAnswer(9);
    } else {
        wrongAnswer(9);
    }

    // grading question 10
    if (document.querySelector("#oregon").checked && document.querySelector("#nevada").checked &&
        document.querySelector("#arizona").checked && !document.querySelector("#texas").checked
    ) {
        rightAnswer(10);
    } else {
        wrongAnswer(10);
    }

    // total score color
    if (score < 80) {
        document.querySelector("#totalScore").className = "text-danger";
    } else {
        document.querySelector("#totalScore").className = "text-success";
    }

    // congratulatory message
    if (score > 80) {
        document.querySelector("#Congratulatory").className = "text-success";
        document.querySelector("#Congratulatory").innerHTML = "Congratulations!"
    }

    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
    localStorage.setItem("total_attempts", attempts);
}