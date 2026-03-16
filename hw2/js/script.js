document.querySelector("button").addEventListener("click", gradeQuiz);

function gradeQuiz() {
    console.log("Grading quiz...");
    let q1Response = document.querySelector("#q1").value;
    console.log(q1Response);
}