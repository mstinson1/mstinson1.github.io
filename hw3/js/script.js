// event listener
document.querySelector("#perfectMatchForm").addEventListener("submit", findMyDog);

async function findMyDog(event) {
    event.preventDefault();
    let energyLevel = document.querySelector("#energyLevel").value;
    let size = document.querySelector("#size").value;
    let livingSpace = document.querySelector('input[name="livingSpace"]:checked');
    let personality = document.querySelector('input[name="personality"]:checked')

    // check if they left something blank
    if (energyLevel === "" || size === "" || livingSpace === null || personality === null) {
        document.querySelector("#result").innerHTML = "Please answer all questions first."
        result.style.color = "red";
        return;
    }

    livingSpace = livingSpace.value;
    personality = personality.value;
    let breedName = "";

    if (energyLevel === "low" && size === "small" && personality === "cuddly" && livingSpace === "apartment") {
        breedName = "french bulldog";
    }
    else if (energyLevel === "low" && size === "small" && personality === "cuddly" && livingSpace === "house") {
        breedName = "cavalier king charles spaniel";
    }
    else if (energyLevel === "low" && size === "small" && personality === "playful" && livingSpace === "apartment") {
        breedName = "boston terrier";
    }
    else if (energyLevel === "low" && size === "small" && personality === "playful" && livingSpace === "house") {
        breedName = "beagle";
    }
    else if (energyLevel === "low" && size === "small" && personality === "easygoing" && livingSpace === "house") {
        breedName = "basset hound";
    }
    else if (energyLevel === "low" && size === "xlarge" && personality === "easygoing" && livingSpace === "house") {
        breedName = "irish wolfhound";
    } else if (energyLevel === "medium" && size === "small" && personality === "playful" && livingSpace === "apartment") {
        breedName = "australian terrier";
    } else if (energyLevel === "medium" && size === "small" && personality === "cuddly" && livingSpace === "house") {
        breedName = "bichon";
    } else if (energyLevel === "medium" && size === "medium" && personality === "cuddly" && livingSpace === "house") {
        breedName = "cocker spaniel";
    }
    else if (energyLevel === "medium" && size === "medium" && personality === "easygoing" && livingSpace === "house") {
        breedName = "olde english bulldog";
    }
    else if (energyLevel === "medium" && size === "large" && personality === "playful" && livingSpace === "house") {
        breedName = "labrador retriever";
    }
    else if (energyLevel === "medium" && size === "large" && personality === "protective" && livingSpace === "house") {
        breedName = "boxer";
    } else if (energyLevel === "high" && size === "small" && personality === "playful" && livingSpace === "apartment") {
    breedName = "miniature schnauzer";
    }
    else if (energyLevel === "high" && size === "medium" && personality === "playful" && livingSpace === "house") {
        breedName = "australian cattle dog";
    }
    else if (energyLevel === "high" && size === "medium" && personality === "protective" && livingSpace === "house") {
        breedName = "border collie";
    }
    else if (energyLevel === "high" && size === "large" && personality === "playful" && livingSpace === "house") {
        breedName = "labrador retriever";
    }
    else if (energyLevel === "high" && size === "large" && personality === "protective" && livingSpace === "house") {
        breedName = "german shepherd";
    } else {
        breedName = "golden retriever";
    }

    let breedData = await getBreedData(breedName);

    // display the results
    document.querySelector("#result").innerHTML = `
    <h2>Your dog match is: ${breedData[0].name}</h2>
    <img src="${breedData[0].image.url}" alt="${breedData[0].name}" width="300"><br>
    <p><strong>Temperament:</strong> ${breedData[0].temperament}</p>
    <p><strong>Life Span:</strong> ${breedData[0].life_span} years</p>
    <p><strong>History:</strong> ${breedData[0].history}</p>
    `;
    document.querySelector("#result").style.display = "block";
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
