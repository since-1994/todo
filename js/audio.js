const audio = document.querySelector('#jsPlayerAudio');
const playBtn = document.querySelector('#jsPlayBtn');
const timeline = document.querySelector('#jsTimeline');
const volume = document.querySelector('#jsVolume');
const currentTime = document.querySelector('#jsCurrentTime');
const totalTime = document.querySelector('#jsTotalTime');
const forward= document.querySelector('#jsForward');
const backward= document.querySelector('#jsBackward');

const musics = [
    {
        id:0,
        artist: "규현(KYUHYUN)",
        title: "광화문에서",
        cover: "http://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/080/476/538/80476538_1415780235463_1_600x600.JPG"
    },
    {
        id:1,
        artist: "아이유(IU)",
        title: "Celebrity",
        cover: "http://image.genie.co.kr/Y/IMAGE/IMG_ALBUM/081/867/444/81867444_1611726218872_1_600x600.JPG"
    }
]
let nowPlaying = musics[0];

function init(){
    playBtn.addEventListener('click', handlePlayClick);
    forward.addEventListener('click', handlePlayList);
    backward.addEventListener('click', handlePlayList);
    timeline.addEventListener('input', handleTimeline);
    volume.addEventListener('input', handleVolume);
    setInterval(checkCurrentTime);
    audio.addEventListener('loadedmetadata', setAudio);
    audio.addEventListener('play', setAudio);
}
const handlePlayList = () => {
    nowPlaying = musics[1-nowPlaying.id];
    console.log(nowPlaying);
    audio.src = `./audio/music${nowPlaying.id+1}.mp3`;
    const album = document.querySelector('#jsAlbum');
    const title = document.querySelector('#jsTitle');
    const artist = document.querySelector('#jsArtist');

    album.src = nowPlaying.cover;
    title.innerText = nowPlaying.title;
    artist.innerText = nowPlaying.artist;
    handlePlayClick();
}

function checkCurrentTime(){
    currentTime.innerHTML = formatDate(Math.floor(audio.currentTime));
    const value = Math.floor((audio.currentTime/audio.duration)*100);
    timeline.value= value;
    timeline.style.background = `linear-gradient( to right, white 0%, white ${value}%, #545454 ${value}%, #545454 100%)`;
}
function setAudio(e){
    totalTime.innerHTML = formatDate(audio.duration);
    audio.volume = volume.value/100;
}

function handleTimeline(e){
    console.log(audio.duration);
    const value = this.value;
    audio.currentTime = Math.floor(value*audio.duration/100);
    this.style.background = `linear-gradient( to right, white 0%, white ${value}%, #545454 ${value}%, #545454 100%)`;
}

function handleVolume(e){
    let value = this.value;
    this.style.background = `linear-gradient( to right, white 0%, white ${value}%, #545454 ${value}%, #545454 100%)`;
    audio.volume = value/100;
}

const handlePlayClick = () => {
    if(audio.paused){
        audio.play();
        playBtn.innerHTML = '<i class ="fas fa-pause"></i>'
    }
    else {
        audio.pause();
        playBtn.innerHTML = '<i class ="fas fa-play"></i>'
    }
}

function formatDate(seconds){
    const secondsNumber = parseInt(seconds, 10);
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

    if (totalSeconds < 10) {
      totalSeconds = `0${totalSeconds}`;
    }	
    return `${minutes}:${totalSeconds}`;
  };

init();