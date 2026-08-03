/* =========================
   LOAD NAVBAR
========================= */

fetch("components/navbar.html")
.then(response => response.text())
.then(data => {
const nav = document.getElementById("navbar");
if(nav) nav.innerHTML = data;
});


/* =========================
   LOAD FOOTER
========================= */

fetch("components/footer.html")
.then(response => response.text())
.then(data => {
const foot = document.getElementById("footer");
if(foot) foot.innerHTML = data;
});


/* =========================
   PAGE LOAD
========================= */

window.addEventListener("load", function(){

if(typeof CONFIG === "undefined"){
console.error("CONFIG file not loaded");
return;
}


/* Apply config text */

document.title = CONFIG.title;

const spaceBar = document.getElementById("spaceBar");
if(spaceBar) spaceBar.innerText = CONFIG.heading;

const popupText = document.getElementById("popupText");
if(popupText) popupText.innerHTML = CONFIG.popupText;

const popupButton = document.getElementById("popupButton");
if(popupButton) popupButton.innerText = CONFIG.popupButton;


/* =========================
   START PANORAMA VIEWER
========================= */

const pano = document.getElementById("panorama");

if(pano){

window.viewer = pannellum.viewer("panorama", {

type: "equirectangular",
panorama: CONFIG.panoramaImage,
autoLoad: true,
friction: CONFIG.dragFriction

});

}



/* =========================
   VR MODE
========================= */

function vrMode(){

if(!window.viewer) return;

if(document.fullscreenElement){

document.exitFullscreen();

}else{

window.viewer.toggleFullscreen();
window.viewer.startOrientation();

}

}





/* =========================
   MOBILE POPUP
========================= */

setTimeout(function(){

if(window.innerWidth < CONFIG.mobileWidth){

const popup = document.getElementById("mobilePopup");

if(popup) popup.style.display = "flex";

}

}, CONFIG.popupDelay);


/* =========================
   BACKGROUND MUSIC
========================= */

const music = document.getElementById("bgMusic");

if(music){

music.src = CONFIG.musicFile;
music.loop = true;
music.preload = "auto";

music.volume = CONFIG.musicVolume;   // set volume BEFORE play

music.load();

let started = false;

document.addEventListener("click", function(){

if(started) return;

music.play().then(()=>{
started = true;
}).catch(()=>{});

});

}
});





/* =========================
   MUSIC TOGGLE
========================= */

function toggleMusic(){

const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");

if(!music) return;

if(music.paused){

music.play();
btn.innerText = "🔊";

}else{

music.pause();
btn.innerText = "🔇";

}

}



/* =========================
   FULLSCREEN BUTTON
========================= */

function openFullscreen(){

const elem = document.getElementById("panorama");

if(elem && elem.requestFullscreen){
elem.requestFullscreen();
}

}


/* =========================
   DUMMY BUTTONS
========================= */

function arMode(){}
function vrMode(){}


/* =========================
   CLOSE POPUP
========================= */

function closePopup(){

const popup = document.getElementById("mobilePopup");

if(popup) popup.style.display = "none";

}