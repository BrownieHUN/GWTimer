var txt;
var r = document.querySelector(':root');
var starth = [];
var startm = [];
var endh = [];
var endm = [];
var dur = [];
var duration = 0;
var loc = [];
var other = [];
const d = new Date();

function readFileAutomatically() {
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
                    dur[i] = parseInt(txt[i * 7 + 4]);
                    loc[i] = txt[i * 7 + 5];
                    other[i] = txt[i * 7 + 6];
                }
            }
        }
        client.send();
    }

function teszt() {
    if(starth[0] != endh[0]) {
        duration = 60 - startm[0] + (endh[0] - starth[0] - 1) * 60 + endm[0];
    }
    else {
        duration = endm - startm;
    }
    console.log(duration)
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
