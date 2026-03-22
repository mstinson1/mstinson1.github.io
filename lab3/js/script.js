// event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#signupForm").addEventListener("submit", function(event) { 
    validateForm(event);
});
document.querySelector("#password").addEventListener("click", displaySuggestedPswd);
document.querySelector("#password").addEventListener("change", clearSuggestedPswd);

// functions

// Display city from Web API after entering a zip code
// async must be used in functions that use await (getting remote data)
async function displayCity() {
    // alert(document.querySelector("#zip").value);
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    let zipError = document.querySelector("#zipError");
    // console.log(data);
    document.querySelector("#city").value = data.city;
    document.querySelector("#latitude").value = data.latitude;
    document.querySelector("#longitude").value = data.longitude;
    if (!data.city) {
        zipError.innerHTML = "Zip code not found!";
        zipError.style.color = "red";
    }
}

async function displayStates() {
    let url = `https://csumb.space/api/allStatesAPI.php`;
    let response = await fetch(url);
    let data = await response.json();
    let stateList = document.querySelector("#state");
    stateList.innerHTML = "<option> select state here</option>";
    for (let i = 0; i < data.length; i++) {
        stateList.innerHTML += `<option value="${data[i].usps.toLowerCase()}">${data[i].state}</option>`;
    }
}

displayStates();

// Document counties from Web API based on the two-letter abbreviation of a state
async function displayCounties() {
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option> select county here </option>";
    for (let i = 0; i < data.length; i++) {
        countyList.innerHTML += `<option> ${data[i].county} </option>`;
    }
}

// checking whether the username is available
async function checkUsername() {
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector("#usernameError");
    if (data.available) {
        usernameError.innerHTML = "Username available!";
        usernameError.style.color = "green";
    } else {
        usernameError.innerHTML = "Username taken!";
        usernameError.style.color = "red"; 
    }
}

// validating form data
function validateForm(e) {
    let isValid = true;
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let password2 = document.querySelector("#password2").value;
    if (username.length == 0) {
        document.querySelector("#usernameError").innerHTML = "Username Required!";
        usernameError.style.color = "red";
        isValid = false;
    }

    if (password.length < 6) {
        document.querySelector("#passwordError").innerHTML = "Password must be at least 6 characters!";
        passwordError.style.color = "red";
        isValid = false;
    }

    if (password != password2) {
        document.querySelector("#passwordError").innerHTML = "Passwords do not match!"
        passwordError.style.color = "red";
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
    }
}

function displaySuggestedPswd() {
    document.querySelector("#suggestedPwd").innerHTML = "Suggested Password: Password1";
}

function clearSuggestedPswd() {
    document.querySelector("#suggestedPwd").innerHTML = "";
}