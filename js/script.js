const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting-container");
const greetingSpam = document.querySelector(".greeting");
const greetingName = document.querySelector(".name");
const body = document.querySelector("body");
const prev = document.querySelector(".slide-prev");
const next = document.querySelector(".slide-next");
const city = document.querySelector(".city");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const changeQuote = document.querySelector(".change-quote");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");

// Time
const newDate = new Date();

const getTime = () => {
  const newDate = new Date();
  let currentTime = newDate.toLocaleTimeString();
  return currentTime;
};
const getDate = () => {
  const newDate = new Date();
  let currentDate = newDate.toLocaleDateString();
  return currentDate;
};
function showTime() {
  time.textContent = getTime();
  setTimeout(showTime, 1000);
}
function showDate() {
  date.textContent = getDate();
  setTimeout(showDate, 1000);
}
showTime();
showDate();

// Greeting
const hours = newDate.getHours();
const getTimeOfDay = () => {
  if (hours < 6) return "night";
  else if (hours < 12) return "morning";
  else if (hours < 18) return "afternoon";
  else if (hours < 24) return "evening";
  else if (hours < 25) return "night";
  setTimeout(getTimeOfDay, 1000);
};
const timeOfDay = getTimeOfDay();
greetingText = `Good ${timeOfDay},`;
greetingSpam.textContent = greetingText;

// Background
let randomNum;
const getRandomNum = () => {
  randomNum = Math.floor(Math.random() * 11 + 1).toString();
};
getRandomNum();
let bgNum;
const getBgNum = () => {
  bgNum = randomNum.padStart(2, "0");
};
getBgNum();

console.log(bgNum);
bgNum = Number(bgNum)

const setBg = () => {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.background = `url('${img.src}')`;
  };
};
setBg();

// body.style.background = `url("${bgUrl}")`;
const getSlideNext = () => {
  if (bgNum < 20) {
    bgNum++;
  } else if (bgNum > 19) {
    bgNum = 1;
  }
  console.log(`bgNum:${bgNum}
  randomNum:${randomNum}`);
  setBg();
};
 
const getSlidePrev = () => {
  if (bgNum > 1 && bgNum < 21) {
    bgNum -= 1;
  } else if (bgNum == 1) {
    bgNum = 20;
  }
  console.log(`bgNum:${bgNum}
  randomNum:${randomNum}`);
  setBg();
};
next.addEventListener("click", getSlideNext);
prev.addEventListener("click", getSlidePrev);

// Weather

city.addEventListener("change", getWeather);
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=eng&appid=c27add33ef06ad17067ba5752f760c3b&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}
getWeather();

// Quotes

async function getQuotes() {
  const quotes = "data.json";
  const res = await fetch(quotes);
  const data = await res.json();

 let n = Math.floor(Math.random() * 11);
  
  quote.textContent = `"${data[n].text}"`;
  author.textContent = `${data[n].author}`;
}
getQuotes();

changeQuote.addEventListener("click", getQuotes)
