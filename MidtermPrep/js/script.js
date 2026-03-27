// event listeners
document.querySelector("#btnDisplayAuthor").addEventListener("click", getAuthorInfo);
document.querySelector("#btnGetQuotes").addEventListener("click", getQuotes);
document.querySelector("#btnTranslate").addEventListener("click", translateQuote);

// shuffle and display language radio buttons when page loads
shuffleLanguage();

async function translateQuote() {
    // gets selected radio button
    let selectedLanguage = document.querySelector('input[name="languages"]:checked');

    // validation
    if (!selectedLanguage) {
        alert("Please select a language.");
        return;
    }   

    // value is 2 letter language code req by API
    let lang = selectedLanguage.value;

    // data-name is used to update the flag image file name
    let languageName = selectedLanguage.dataset.name;

    let url = `https://csumb.space/api/famousQuotes/translateQuote.php?lang=${lang}&quoteId=${currentQuote.quoteId}`;
    let response = await fetch(url);
    let data = await response.json();
    let imageURL = selectedLanguage.value

    // update quote with translated version
    document.querySelector("#randomQuote").innerHTML = "\"" + data.translation + "\"" + " -" + currentQuote.firstName + " " + currentQuote.lastName;
    // update flag image to match selected language
    document.querySelector("#flagImg").src = `img/${languageName}_flag.png`;
    document.querySelector("#flagImg").alt = `${languageName} flag`;

}

async function getRandomBackground() {
    let url = `https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=flowers`;
    let response = await fetch(url);
    let data = await response.json();
    // pick random image from API results
    let randomIndex = Math.floor(Math.random() * data.hits.length);
    let imageURL = data.hits[randomIndex].largeImageURL;
    // apply background image to body
    let body = document.querySelector("#randomBackground");
    body.style.backgroundImage = `url(${imageURL})`;
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
}
getRandomBackground();

async function getRandomQuote() {
    let url = `https://csumb.space/api/famousQuotes/getRandomQuote.php`;
    let response = await fetch(url);
    let data = await response.json();

    // save so others an use later
    currentQuote = data;

    // display quote and author name
    document.querySelector("#randomQuote").innerHTML = "\"" + data.quoteText+ "\"" + " -" + data.firstName + " " + data.lastName;
}
getRandomQuote();

async function getAuthorInfo() {
    let author = document.querySelector("#authorResults");

    // toggle behavior
    if (author.innerHTML !== "") {
        author.innerHTML = "";
        return;
    }

    // this is the regular implementation
    // if (currentQuote) {
    //     author.innerHTML = `<img src="${currentQuote.picture}" alt="Author photo" width="200"><br>
    //     ${currentQuote.bio}`;
    // } 

    // this is the 2 column version
    if (currentQuote) {
        author.innerHTML = `
            <div class="authorFlex">
                <div class="authorImage">
                    <img src="${currentQuote.picture}" alt="Author photo" width="200">
                </div>
                <div class="authorBio">
                    ${currentQuote.bio}
                </div>
            </div>
        `;
    }
}

async function getQuotes() {
    // get user input from textbox
    let numQuotes = document.querySelector("#numOfQuotes").value;

    // validation number must be between 1-5
    if (numQuotes < 1 || numQuotes > 5 || numQuotes === "") {
        document.querySelector("#numOfQuotesError").innerHTML = "Please enter a number between 1 and 5."
        document.querySelector("#numOfQuotesError").style.color = "red";
        document.querySelector("#quoteResults").innerHTML = "";
        return;
    }

    // clear old error message if input is valid
    document.querySelector("#numOfQuotesError").innerHTML = "";

    let url = `https://csumb.space/api/famousQuotes/getQuotes.php?n=${numQuotes}`;
    let response = await fetch(url);
    let data = await response.json();
    let output = ""

    // loops through quotes and gets HTML output
    for (let i = 0; i < numQuotes; i++) {
        output += "\""+ data[i].quoteText + "\" -" + data[i].firstName + " " + data[i].lastName + "<br><br>";
    }

    // display quote on page
    document.querySelector("#quoteResults").innerHTML = output;
}

function shuffleLanguage() {
    // array of objects: each object has language name and code
    let shuffledLanguagesArray = [
        {name: "english", code: "EN"},
        {name: "french", code: "FR"},
        {name: "spanish", code: "SP"},
        {name: "esperanto", code: "ES"}
    ];

    // underscore function to shuffle array order randomly
    shuffledLanguagesArray = _.shuffle(shuffledLanguagesArray);
    // clears any existing radio buttons
    document.querySelector("#languageChoices").innerHTML = "";
    // loops through shuffled array and creates radio buttons
    for (let i = 0; i < shuffledLanguagesArray.length; i++) {
        // added this for styling, label wasn't required here
        document.querySelector("#languageChoices").innerHTML += `
        <label class="radioOption"> 
        <input type="radio" name="languages" 
            id="${shuffledLanguagesArray[i].code}" value="${shuffledLanguagesArray[i].code}" data-name="${shuffledLanguagesArray[i].name}"> 
            <label for="${shuffledLanguagesArray[i].code}"> ${shuffledLanguagesArray[i].name}
        </label>`;
    }
}