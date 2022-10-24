// Constants and variables
const API_KEY = "23c0ec5940a86db6d722eb2e4bdcd508"
const BASE_URL = 
    "https://api.openweathermap.org/data/2.5/weather?"
const GEO_URL = "http://api.openweathermap.org/geo/1.0/direct?q="

const CITY_DOM = $(".city")
const TEMP_DOM = $(".temp")
const FEELS_DOM = $(".feels")

const F_DEGREE_CHAR = `\u2109`
const C_DEGREE_CHAR = `\u2103`


// Event Listeners

// Listening to the click/submit event
$("input[type=submit]").on("click", (event) => {
    //don't forget to prevent the refresh
    event.preventDefault()

    // set a variable for the user input
    const inputText = $("input[type=text]").val()

    // feed input into main function of the site.
    citySearch(inputText)
})

// Functions
function getJSON(url){ // returns a promise
    return  fetch(url).then((response) => response.json())
}

// function that does the city search
function citySearch(city){
    // create a variable for the url to be inserted into the AJAX JQuery
    console.log(city)

    // use getJSON function w/ city name
    getJSON(`${GEO_URL}${city}&limit=1&appid=${API_KEY}`)
    .then(
        function (location) {
            let lat = ""
            let lon = ""
            try {
                lat = location[0].lat
                lon = location[0].lon
            }
            catch {
                alert("Sorry, that might not be a city.")
            }
            const new_url = `${BASE_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`
            getJSON(new_url)
                .then(
                    function (weather) {
                        console.log(weather)
                        // convert to Farenheit
                        const far = (weather.main.temp - 273.15) * 9/5 + 32
                        const feels_far = (weather.main.feels_like - 273.15) * 9/5 + 32
                        // empty the element(s)
                        CITY_DOM.text(`The weather in ${weather.name} is ${weather.weather[0].description}`)
                        TEMP_DOM.text(`The Temperature is ${Math.floor(far)} ${F_DEGREE_CHAR}`)
                        FEELS_DOM.text(`But it feels like it's ${Math.floor(feels_far)} ${F_DEGREE_CHAR}`)
                    }
                )
        }
    )
}

// Run the function (for testing)
// getJSON(`${GEO_URL}Boston&limit=1&appid=${API_KEY}`)
// .then(
//     function (location) {
//         const lat = location[0].lat
//         const lon = location[0].lon
//         const new_url = `${BASE_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`
//         getJSON(new_url)
//         .then(
//             function (weather) {
//                 console.log(weather)
//             }
//         )
//     })