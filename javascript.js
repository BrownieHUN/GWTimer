var txt;
var r = document.querySelector(':root');
var starth = [];
var startm = [];
var endh = [];
var endm = [];
var dur = [];
var loc = [];
var other = [];
const d = new Date();

function readFile() {
    var client = new XMLHttpRequest();
    client.open('GET', 'https://raw.githubusercontent.com/BrownieHUN/GWTimer/main/data.txt');
    client.onreadystatechange = function() {
        if( client.responseText != '' ) {
            txt = client.responseText.split("\n");
            for(i = 0; i < txt.length / 7; i++) {
                starth[i] = parseInt(txt[i * 7]);
                startm[i] = parseInt(txt[i * 7 + 1]);
                endh[i] = parseInt(txt[i * 7 + 2]);
                endm[i] = parseInt(txt[i * 7 + 3]);
                //dur[i] = (starth[i] != endh[i]) ? 60 - startm[i] + (endh[i] - starth[i] - 1) * 60 + endm[i] : endm[i] - startm[i];
                loc[i] = txt[i * 7 + 5];
                other[i] = txt[i * 7 + 6];
            }
        }
    }
    client.send();
}

async function play() {
	for(i = 0; i < txt.length / 7; i++) {
        document.getElementById("k1").innerHTML = starth[i] + "<b><sup>" + startm[i] + "</sup></b>";
        document.getElementById("v1").innerHTML = endh[i] + "<b><sup>" + endm[i] + "</sup></b>";
        document.getElementById("h1").innerHTML = loc[i];
        document.getElementById("e1").innerHTML = other[i];
        r.style.setProperty('--rtime', dur[i]);
        document.getElementById("k2").innerHTML = (starth[i+1] != undefined) ? starth[i+1] + "<b><sup>" + startm[i+1] + "</sup></b> ― " + endh[i+1] + "<b><sup>" + endm[i+1] + "</sup></b>" : "";
        document.getElementById("h2").innerHTML = (loc[i+1]) ? loc[i+1] + " " + other[i+1] : "";
        document.getElementById("k3").innerHTML = (starth[i+2] != undefined) ? starth[i+2] + "<b><sup>" + startm[i+2] + "</sup></b> ― " + endh[i+2] + "<b><sup>" + endm[i+2] + "</sup></b>" : "";
        document.getElementById("h3").innerHTML = (loc[i+2]) ? loc[i+2] + " " + other[i+2] : "";
        //r.style.animation = "rotate --var(rtime)s infinite linear";
        r.style.animation = "rotate 2s infinite linear";
        await delay(2);
    }
    r.style.animation = "none";
}

function delay(n) {
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

async function setRotationSpeed() {
    r.style.setProperty('--rtime', '100s');
    console.log("asd");
/*    await delay(duration.substring(0, duration.length - 1));
    r.style.setProperty('--rtime', '3s');*/
}
