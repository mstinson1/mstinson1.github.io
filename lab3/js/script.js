// event listeners
document.querySelector("#zip").addEventListener("change", displayCity);

// functions

// Display city from Web API after entering a zip code
// async must be used in functions that use await (getting remote data)
async function displayCity() {
    // alert(document.querySelector("#zip").value);
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#latitude").innerHTML = data.latitude;
    document.querySelector("#longitude").innerHTML = data.longitude;
}