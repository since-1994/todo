const deg = 6;
const colHours = document.querySelector("#jsColumbia #jsHours");
const colMinutes = document.querySelector("#jsColumbia #jsMinutes");
const colSeconds = document.querySelector("#jsColumbia #jsSeconds");

const korHours = document.querySelector("#jsKorea #jsHours");
const korMinutes = document.querySelector("#jsKorea #jsMinutes");
const korSeconds = document.querySelector("#jsKorea #jsSeconds");

setInterval(() => {
    let day_kor = new Date();
    let day_col = new Date(day_kor.getTime() - (840*60*1000));

    let h_kor = day_kor.getHours() * 30;
    let m_kor = day_kor.getMinutes() * deg;
    let s_kor = day_kor.getSeconds() * deg;

    let h_col = day_col.getHours() * 30;
    let m_col = day_col.getMinutes() * deg;
    let s_col = day_col.getSeconds() * deg;

    colHours.style.transform = `rotateZ(${h_col + m_col / 12}deg)`;
    colMinutes.style.transform = `rotateZ(${m_col}deg)`;
    colSeconds.style.transform = `rotateZ(${s_col}deg)`;

    korHours.style.transform = `rotateZ(${h_kor + m_kor / 12}deg)`;
    korMinutes.style.transform = `rotateZ(${m_kor}deg)`;
    korSeconds.style.transform = `rotateZ(${s_kor}deg)`;
});