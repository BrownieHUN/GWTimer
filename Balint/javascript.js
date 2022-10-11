var txt;
var r = document.querySelector(':root');
var starth = [];
var startm = [];
var endh = [];
var endm = [];
var dur = [];
var loc = [];
var other = [];
var pause = [];
const d = new Date();


function readFile() {
    var client = new XMLHttpRequest();
	client.open('GET', '/assets/data' + d.getDay() + '.txt');
    client.onreadystatechange = function() {
        if( client.responseText != '' ) {
            txt = client.responseText.split("\n");
            for(i = 0; i < txt.length / 6; i++) {
                starth[i] = parseInt(txt[i * 6]);
                startm[i] = parseInt(txt[i * 6 + 1]);
                endh[i] = parseInt(txt[i * 6 + 2]);
                endm[i] = parseInt(txt[i * 6 + 3]);
                dur[i] = (starth[i] != endh[i]) ? 60 - startm[i] + (endh[i] - starth[i] - 1) * 60 + endm[i] : endm[i] - startm[i];
                loc[i] = txt[i * 6 + 4];
                other[i] = txt[i * 6 + 5];
                if(i < txt.length / 6 - 1) {
                    pause[i] = Math.abs((starth[i+1] != endh[i]) ? 60 - startm[i+1] + (endh[i] - starth[i+1] - 1) * 60 + endm[i] : endm[i] - startm[i+1]);
                }
            }
        }
    }
	client.send();
}

timer = false;

/*async function secClock() {
    time = d.getSeconds();
    if(timer == false) {
        document.getElementById("sec").style.visibility = "visible";
        timer = true;
        while(timer == true) {
            document.getElementById("sec").style.transform = "rotate(" + time * 6 + "deg)";
            time++;
            await delay(1);
        }
    }
    else {
        document.getElementById("sec").style.visibility = "hidden";
        timer = false;
    }

}*/

var n = 0;
var tlen = [];
var deg_elapsed = 0;
var t_remain = 0;
var cur_pause = false;

async function start() {
    //az első időponttól eltelt idő (másodpercek)
    var elapsed = (starth[0] != d.getHours()) ? (60 - startm[0] + (d.getHours() - starth[0] - 1) * 60 + d.getMinutes()) * 60 + d.getSeconds() : (d.getMinutes() - startm[0]) * 60 + d.getSeconds();
    //mínusz, ha még nem indult el
    for(i = 0; i < txt.length / 6; i++) {
        //minden óra és az utána következő szünet hossza (már ha van), plusz az előzők
        tlen[i] = (i > 0) ? (i != txt.length / 6 - 1) ? tlen[i-1] + (dur[i] + pause[i]) * 60 : tlen[i-1] + dur[i] * 60 : (dur[i] + pause[i]) * 60;
        if(tlen[i] < elapsed) { continue; }
        else {
            n = i;
            //ha van még maradék letelni való óra
            if(elapsed < tlen[i] - pause[i] * 60) {
                //r.style.setProperty('--circlecolor', 'var(--activecolor)');
                //deg_elapsed = 2 * 760 * Math.PI * (elapsed - tlen[i-1]) / (tlen[i] - tlen[i-1]);
                deg_elapsed = (tlen[i-1]) ? 2 * 760 * Math.PI * ((elapsed - tlen[i-1]) / (dur[i] * 60)) : 2 * 760 * Math.PI * (elapsed / (dur[i] * 60));
                r.style.setProperty('--startdeg', deg_elapsed);
                //vonja ki az eltelt időt az aktuális kezdetéből ,ezzel megkapva, hogy mennyi telt el, majd ossza el az aktuális rész hosszával
                t_remain = (pause[i]) ? tlen[i] - elapsed - pause[i] * 60 : tlen[i] - elapsed;
                //r.style.animation = "ractive " + t_remain + "s 1 linear";
                cur_pause = false;
            }
            else {
                //r.style.setProperty('--circlecolor', 'var(--inactivecolor)');
                deg_elapsed = (tlen[i-1]) ? 2 * 760 * Math.PI * ((elapsed - tlen[i-1] - dur[i] * 60) / (pause[i] * 60)) : 2 * 760 * Math.PI * ((elapsed - dur[i] * 60) / (pause[i] * 60));
                r.style.setProperty('--startdeg', deg_elapsed);
                t_remain = tlen[i] - elapsed;
                //r.style.animation = "rinactive " + t_remain + "s 1 linear";
                cur_pause = true;
            }
        }
        break;
    }
}

function writeData() {
    if(cur_pause == false) {
        document.getElementById("k1").innerHTML = starth[i] + "<b><sup>" + startm[i] + "</sup></b>";
        document.getElementById("v1").innerHTML = endh[i] + "<b><sup>" + endm[i] + "</sup></b>";
        document.getElementById("h1").innerHTML = loc[i];
        document.getElementById("e1").innerHTML = other[i];
    }
    else {
    	document.getElementById("k1").innerHTML = endh[i] + "<b><sup>" + endm[i] + "</sup></b>";
    	document.getElementById("v1").innerHTML = (starth[i+1]) ? starth[i+1] + "<b><sup>" + startm[i+1] + "</sup></b>" : "";
    	document.getElementById("h1").innerHTML = (loc[i+1]) ? "→ " + loc[i+1] : "";
    	document.getElementById("e1").innerHTML = "";
    }
    document.getElementById("k2").innerHTML = (starth[i+1]) ? starth[i+1] + "<b><sup>" + startm[i+1] + "</sup></b> ― " + endh[i+1] + "<b><sup>" + endm[i+1] + "</sup></b>" : "";
    document.getElementById("h2").innerHTML = (loc[i+1]) ? loc[i+1] + " " + other[i+1] : "";
    document.getElementById("k3").innerHTML = (starth[i+2]) ? starth[i+2] + "<b><sup>" + startm[i+2] + "</sup></b> ― " + endh[i+2] + "<b><sup>" + endm[i+2] + "</sup></b>" : "";
    document.getElementById("h3").innerHTML = (loc[i+2]) ? loc[i+2] + " " + other[i+2] : "";
}

async function play() {
    start();
<<<<<<< Updated upstream
	for(i = n; i <= txt.length / 6; i++) {
=======
	for(i = n; i < txt.length / 6; i++) {
>>>>>>> Stashed changes
        if(cur_pause == false) {
            r.style.setProperty('--circlecolor', 'var(--activecolor)');
            writeData();
            r.style.animation = "ractive " + t_remain + "s 1 linear";
            //r.style.animation = "ractive 4s 1 linear";
            await delay(t_remain);
            //await delay(4);
            t_remain = pause[i] * 60;
            cur_pause = !cur_pause;
            r.style.setProperty('--startdeg', 0);
        }
<<<<<<< Updated upstream

        if(cur_pause == true && i+1 != txt.length / 6) {
            if(pause[i] != 0) {
        		r.style.setProperty('--circlecolor', 'var(--inactivecolor)');
        		r.style.animation = "rinactive " + t_remain + "s 1 linear";
        		//r.style.animation = "rinactive 2s 1 linear";
        		writeData();
                await delay(t_remain);
    		    //await delay(2);
            }
=======
        if(cur_pause == true && i+1 != txt.length / 6) {
    		r.style.setProperty('--circlecolor', 'var(--inactivecolor)');
    		r.style.animation = "rinactive " + t_remain + "s 1 linear";
    		//r.style.animation = "rinactive 2s 1 linear";
    		writeData();
            await delay(t_remain);
		    //await delay(2);
>>>>>>> Stashed changes
            t_remain = dur[i+1] * 60;
            cur_pause = !cur_pause;
            r.style.setProperty('--startdeg', 0);
        }
    }
}

function delay(n) {
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}
