// event listener
document.querySelector("#perfectMatchForm").addEventListener("submit", findMyDog);
document.querySelector("#reset").addEventListener("click", resetForm)

async function findMyDog(event) {
    event.preventDefault();
    let energyLevel = document.querySelector("#energyLevel").value;
    let size = document.querySelector("#size").value;
    let livingSpace = document.querySelector('input[name="livingSpace"]:checked');
    let personality = document.querySelector('input[name="personality"]:checked')

    // validation to check if they left something blank
    if (energyLevel === "" || size === "" || livingSpace === null || personality === null) {
        document.querySelector("#result").innerHTML = "Please answer all questions first."
        result.style.color = "red";
        document.querySelector("#result").style.display = "block";
        return;
    }

    livingSpace = livingSpace.value;
    personality = personality.value;
    let breedName = "";

    // Size: Small, Medium, and Large
    // Energy Level: Low, Medium, High
    // Living Space: Apartment or House
    // Personality: Playful, Protective, Easygoing

    switch (size) {
        case "small":
            if (energyLevel === "low" && personality === "playful") {
                breedName = (livingSpace === "apartment") ? "pug" : "shih tzu";
            } else if (energyLevel === "high" && personality === "protective") {
                breedName = (livingSpace === "apartment") ? "miniature pinscher" : "australian terrier";
            } else if (energyLevel === "medium" && personality === "easygoing") {
                breedName = (livingSpace === "apartment") ? "french bulldog" : "cavalier king charles spaniel";
            } else {
                breedName = "pomeranian";
            }
            break;
        
        case "medium":
            if (energyLevel === "low" && personality === "playful") {
                breedName = (livingSpace === "apartment") ? "french bulldog" : "basset hound";
            } else if (energyLevel === "high" && personality === "protective") {
                breedName = (livingSpace === "apartment") ? "staffordshire bull terrier" : "border collie";
            } else if (energyLevel === "medium" && personality === "easygoing") {
                breedName = (livingSpace === "apartment") ? "whippet" : "american bulldog";
            } else {
                breedName = "poodle";
            }
            break;

        case "large":
            if (energyLevel === "low" && personality === "playful") {
                breedName = (livingSpace === "apartment") ? "greyhound" : "bernese mountain dog";
            } else if (energyLevel === "high" && personality === "protective") {
                breedName = (livingSpace === "apartment") ? "doberman pinscher" : "german shepherd";
            } else if (energyLevel === "medium" && personality === "easygoing") {
                breedName = (livingSpace === "apartment") ? "greyhound" : "golden retriever";
            } else {
                breedName = "great dane";
            }
            break;
    }

    let breedData = await getBreedData(breedName);

    // display the results
    if (!breedData[0].life_span) {
        breedData[0].life_span = "Many";
    }
    document.querySelector("#result").innerHTML = `
    <h2>Your dog match is: ${breedData[0].name}</h2>
    <img src="${breedData[0].image.url}" alt="${breedData[0].name}" width="300"><br>
    <p><strong>Temperament:</strong> ${breedData[0].temperament}</p>
    <p><strong>Life Span:</strong> ${breedData[0].life_span} years</p>
    <p><strong>History:</strong> ${breedData[0].history}</p>
    `;
    document.querySelector("#result").style.display = "block";
    document.querySelector("#result").style.color = "black";
}

async function getBreedData(breedName) {
    let url =`https://api.thedogapi.com/v1/breeds/search?q=${breedName}`;
    let response = await fetch(url, 
        {
            headers: {"x-api-key": "live_U4KK7Hp2yyWuNArhz4D88j46P5NQRnR0XsHvkMHkUvBvRgR4hwSjO6H4Z1oRmsne"}
        });
    let data = await response.json();
    return data;
}

function resetForm() {
    document.querySelector("#result").innerHTML = "";
    document.querySelector("#result").style.display = "none";
}
