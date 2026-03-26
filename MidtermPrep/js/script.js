// event listeners
document.querySelector("#btnDisplayAuthor").addEventListener("click", getAuthorInfo);
document.querySelector("#btnGetQuotes").addEventListener("click", getQuotes);

async function getRandomBackground() {
    let url = `https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=flowers`;
    let response = await fetch(url);
    let data = await response.json();
    let randomIndex = Math.floor(Math.random() * data.hits.length);
    let imageURL = data.hits[randomIndex].largeImageURL;
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
    currentQuote = data;
    document.querySelector("#randomQuote").innerHTML = "\"" +data.quoteText+ "\"" + " -" + data.firstName + " " + data.lastName;
}
getRandomQuote();

async function getAuthorInfo() {
    let author = document.querySelector("#authorResults");
    if (author.innerHTML !== "") {
        author.innerHTML = "";
        return;
    }

    if (currentQuote) {
        author.innerHTML = `<img src="${currentQuote.picture}" alt="Author photo" width="200"><br>
        ${currentQuote.bio}`;
    } 
}

async function getQuotes() {
    let numQuotes = document.querySelector("#numOfQuotes").value;

    if (numQuotes < 1 || numQuotes > 5 || numQuotes === "") {
        document.querySelector("#numOfQuotesError").innerHTML = "Please enter a number between 1 and 5."
        document.querySelector("#numOfQuotesError").style.color = "red";
        document.querySelector("#quoteResults").innerHTML = "";
        return;
    }

    document.querySelector("#numOfQuotesError").innerHTML = "";

    let url = `https://csumb.space/api/famousQuotes/getQuotes.php?n=${numQuotes}`;
    let response = await fetch(url);
    let data = await response.json();
    let output = ""

    for (let i = 0; i < numQuotes; i++) {
        output += "\""+ data[i].quoteText + " -" + data[i].firstName + " " + data[i].lastName + "<br><br>";
    }
    document.querySelector("#quoteResults").innerHTML = output;
}