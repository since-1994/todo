const API_KEY = "31915121998549551a1877a9d3843c64";
let user__position = {
  lat: 0,
  lon: 0,
};
const LOCATION = "user__position";

const week = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

const curTemperature = document.querySelector("#jsTemperature");
const minTemperature = document.querySelector("#jsMinTemperature");
const maxTemperature = document.querySelector("#jsMaxTemperature");
const city = document.querySelector("#jsCity");
const weatherCondition = document.querySelector("#jsWeatherCondition");
const dailyWeatherContainer = document.querySelector(".weather__daily");
const hourlyWeatherContainer = document.querySelector(".weather__hourly");

const loadLocation = () => {
  if (localStorage.getItem(LOCATION)) {
    user__position = JSON.parse(localStorage.getItem(LOCATION));
    setWeather();
  } else {
    navigator.geolocation.getCurrentPosition(success);
  }
};
const success = (position) => {
  console.log(position);
  (user__position.lat = position.coords.latitude),
    (user__position.lon = position.coords.longitude);
  setWeather();
  localStorage.setItem(LOCATION, JSON.stringify(user__position));
};
const setWeather = async () => {
  const res = await axios({
    url: `https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${user__position.lat}&lon=${user__position.lon}&appid=${API_KEY}`,
    method: "GET",
  });
  const {
    data: {
      timezone_offset,
      timezone,
      current: { temp },
      daily,
      hourly,
    },
  } = res;
  city.innerText = timezone.split("/")[1];
  curTemperature.innerText = Math.floor(temp);
  minTemperature.innerText = Math.floor(daily[0].temp.min);
  maxTemperature.innerText = Math.floor(daily[0].temp.max);
  for (let i = 1; i <= 7; i++) {
    console.log(daily[i].weather[0].icon);
    const div = document.createElement("div");
    div.classList.add("weather__daily__item");
    const day = document.createElement("span");
    const img = document.createElement("img");
    img.src = `http://openweathermap.org/img/wn/${daily[i].weather[0].icon}.png`;
    day.innerText = week[new Date(daily[i].dt * 1000).getDay()];
    const temperature__max = document.createElement("span");
    const temperature__min = document.createElement("span");
    temperature__max.innerText = Math.floor(daily[i].temp.max);
    temperature__min.innerText = Math.floor(daily[i].temp.min);
    const div2 = document.createElement("div");
    div2.classList.add("weather__daily__minMax");
    div2.appendChild(temperature__max);
    div2.appendChild(temperature__min);

    div.appendChild(day);
    div.appendChild(img);
    div.appendChild(div2);
    dailyWeatherContainer.appendChild(div);
  }
  for (let i = 1; i <= 20; i += 2) {
    const hour = document.createElement("span");
    const temperature = document.createElement("span");
    const hour24 = new Date(hourly[i].dt * 1000).getHours();
    hour.innerText = hour24 >= 12 ? `오후${hour24 - 12}시` : `오전${hour24}시`;
    temperature.innerText = Math.floor(hourly[i].temp) + "°";

    const div1 = document.createElement("div");
    div1.classList.add("weather__hourly__item");
    div1.appendChild(hour);
    div1.appendChild(temperature);
    hourlyWeatherContainer.appendChild(div1);
  }
};

function init() {
  window.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("http://ip-api.com/json");
    const data = await response.json();
    const { lat, lon } = data;
    user__position = { lat, lon };
    setWeather();
  });
}

init();
