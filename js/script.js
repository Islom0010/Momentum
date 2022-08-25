const body = document.querySelector("body");
const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const sliderNext = document.querySelector(".slide-next");
const sliderPrev = document.querySelector(".slide-prev");
const weatherError = document.querySelector(".weather-error");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const city = document.querySelector(".city");
const quote = document.querySelector(".quote");
const quoteAuthor = document.querySelector(".author");
const btnChangeQuote = document.querySelector(".change-quote");

// Time
let currentDate = new Date();

const showTime = () => {
  currentDate = new Date();
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  time.textContent = currentDate.toLocaleTimeString("en-US", options);
  setTimeout(showTime, 1000);
  showDate();
};
function showDate() {
  currentDate = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  date.textContent = currentDate.toLocaleDateString("en-US", options);
}
const hours = currentDate.getHours();
const timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay}`;
greeting.textContent = greetingText;

showTime();

// Greeting
// const hours = currentDate.getHours();
function getTimeOfDay() {
  if (hours < 6) return "night";
  else if (hours < 12) return "morning";
  else if (hours < 18) return "afternoon";
  else if (hours < 24) return "evening";
  else if (hours < 25) return "night";
}

// Background
let randomNum;
const getRandomNum = () => {
  randomNum = Math.floor(Math.random() * 19) + 1;
  setBg()
};
getRandomNum();

function setBg() {
  let bgNum;
  let timeOfDay = getTimeOfDay();
  bgNum = randomNum < 10 ? "0" + randomNum : randomNum;
  const img = new Image();
  let urlImage = `https://raw.githubusercontent.com/bajik/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.src = urlImage;
  img.onload = () => {
    body.style.backgroundImage = "url(" + img.src + ")";
  };
}
setBg();

// body.style.background = `url("${bgUrl}")`;
function getSlideNext() {
  randomNum = randomNum < 20 ? randomNum + 1 : 1;
  setBg();
}

function getSlidePrev() {
  randomNum = randomNum > 1 ? randomNum - 1 : 20;
  setBg();
}

sliderNext.addEventListener("click", getSlideNext);
sliderPrev.addEventListener("click", getSlidePrev);

// Weather

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=b249d67fef70757426186ad63ba0c6da&units=metric&lang=uk`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod == "200") {
    weatherError.textContent = "";
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${Math.round(data.main.humidity)} %`;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
  } else {
    weatherIcon.className = "weather-icon owf";
    weatherError.textContent = `${data.cod}: ${data.message}`;
    temperature.textContent = "";
    weatherDescription.textContent = "";
    humidity.textContent = "";
    wind.textContent = "";
  }
}
getWeather();
function setCity(event) {
  getWeather();
  city.blur();
}

// Quotes

async function getQuotes() {
  const quotes = "data.json";
  const res = await fetch(quotes);
  const data = await res.json();

  let n = Math.floor(Math.random() * 11);

  quote.textContent = `"${data[n].text}"`;
  quoteAuthor.textContent = `${data[n].author}`;
}
getQuotes();

btnChangeQuote.addEventListener("click", getQuotes);

// Sounds

const song = document.querySelector("#song");
const playPrev = document.querySelector(".play-prev");
const playNext = document.querySelector(".play-next");
const Play = document.querySelector(".play");
const playList = document.querySelector(".play-list");
