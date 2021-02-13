const sideButton = document.querySelector('#jsSideButton');
const sideBar = document.querySelector('#jsSide');
const stick1 = document.querySelector('#jsStick1');
const stick2 = document.querySelector('#jsStick2');
const stick3 = document.querySelector('#jsStick3');

const kakaoIcon = document.querySelector('#jsKakaoIcon');
const kakaoApp = document.querySelector('#jsAppKakao');

const calculatorIcon = document.querySelector('#jsCalculatorIcon');
const calculatorApp = document.querySelector("#jsAppCalculator");

const weatherIcon = document.querySelector('#jsWeatherIcon');
const weatherApp = document.querySelector("#jsAppWeather");

const paintIcon = document.querySelector('#jsPaintIcon');
const paintApp = document.querySelector("#jsAppPaint");

function init(){
    sideButton.addEventListener('click', openSideBar);
    calculatorIcon.addEventListener('click', toggleCalculator);
    weatherIcon.addEventListener('click', toggleWeather);
    paintIcon.addEventListener('click', togglePaint);
}

const openSideBar = () => {
    sideBar.style.transform = 'translateX(0)';
    sideButton.removeEventListener('click', openSideBar);
    sideButton.addEventListener('click', closeSideBar);
    stick1.style.transform = 'rotateZ(48deg)';
    stick2.style.display = "none";
    stick3.style.transform = "rotateZ(-48deg)";
}

const closeSideBar = () => {
    sideBar.style.transform = 'translateX(-100%)';
    sideButton.removeEventListener('click', closeSideBar);
    sideButton.addEventListener('click', openSideBar);
    stick1.style.transform = 'rotateZ(0)';
    stick2.style.display = "block";
    stick3.style.transform = "rotateZ(0)";
}
const toggleKakao = () => {
    kakaoApp.classList.toggle('active');
}

const toggleCalculator = () => {
    calculatorApp.classList.toggle('active'); 
}

const toggleWeather = () => {
    weatherApp.classList.toggle('active'); 
}
const togglePaint = () => {
    paintApp.classList.toggle('active');
}

init();
