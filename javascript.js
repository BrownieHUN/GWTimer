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


//var is_mav = false;
var is_mav = true;

function readFile() {
    const d = new Date();
    var client = new XMLHttpRequest();
    if(is_mav) {
        client.open('GET', 'https://raw.githubusercontent.com/BrownieHUN/GWTimer/main/data_mav.txt')
        //client.open('GET', '/static/data_mav.txt');
    }
    else {
	    //client.open('GET', '/static/data' + d.getDay() + '.txt');
        client.open('GET', 'https://i.gonda.dev/y2krlx0v99v6.txt')
    }
    client.onreadystatechange = function() {
        if( client.responseText != '' ) {
            txt = client.responseText.split("\n");
            if(is_mav == false) {
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
            else {
                for(i = 0; i < txt.length - 1; i++) {
                    starth[i] = parseInt(txt[i].split("\t")[2].split(":")[0]);
                    startm[i] = parseInt(txt[i].split("\t")[2].split(":")[1]);
                    endh[i] = parseInt(txt[i+1].split("\t")[1].split(":")[0]);
                    endm[i] = parseInt(txt[i+1].split("\t")[1].split(":")[1]);
                    dur[i] = (starth[i] != endh[i]) ? 60 - startm[i] + (endh[i] - starth[i] - 1) * 60 + endm[i] : endm[i] - startm[i];
                    loc[i] = txt[i+1].split("\t")[0];
                    other[i] = "";
                    if(i < txt.length - 2) {
                        pause[i] = Math.abs((starth[i+1] != endh[i]) ? 60 - startm[i+1] + (endh[i] - starth[i+1] - 1) * 60 + endm[i] : endm[i] - startm[i+1]);
                    }
                }
            }
        }
    }
	client.send();
}


sec_cont = false;

async function secClock() {
    const sec_time = new Date();
    if(sec_cont) {console.log()}
    else {
        document.getElementById("sec").style.transform = "rotate(" + sec_time.getSeconds() * 6 + "deg)";
        setTimeout(secClock, 1000);
    }
}

async function clock() {
    const clock_time = new Date();
    cur_min = (clock_time.getMinutes() > 9) ? clock_time.getMinutes() : "0"  + clock_time.getMinutes();
    cur_hrs = clock_time.getHours();

    document.getElementById("time").innerHTML = cur_hrs + ":" + cur_min;
    setTimeout(clock, 1000);    
}

/*function changeToMav() {
    document.getElementById("tcontent").remove();
    is_mav = !is_mav;
    run();
}*/

function insertTable() {
    cell = [];
    ctable = document.createElement("TABLE");
    ctable.setAttribute("id", "tcontent");
    document.body.appendChild(ctable);
    
    if(is_mav == false) {
        for(i = 0; i < txt.length / 6; i++) {  
            row = ctable.insertRow(i);
            for(j = 0; j < 4; j++) {
                cell[j+1] = row.insertCell(j);
            }
            cell[1].innerHTML = starth[i] + "<b><sup>" + startm[i] + "</sup></b>";
            cell[2].innerHTML = endh[i] + "<b><sup>" + endm[i] + "</sup></b>";
            cell[3].innerHTML = loc[i];
            cell[4].innerHTML = other[i];
        }
	}
    else {
        for(i = 0; i < txt.length - 1; i++) {
            row = ctable.insertRow(i);
            for(j = 0; j < 3; j++) {
                cell[j+1] = row.insertCell(j);
            }
            cell[1].innerHTML = starth[i] + "<b><sup>" + startm[i] + "</sup></b>";
            cell[2].innerHTML = endh[i] + "<b><sup>" + endm[i] + "</sup></b>";
            cell[3].innerHTML = "→ " + loc[i];
        }
    }
}

function getDelay() {
    console.log(document.getElementById("delayinput").value);
    document.getElementById("delayinput").value = 20;
}

var n = 0;
var tlen = [];
var deg_elapsed = 0;
var t_remain = 0;
var cur_pause = false;

async function start() {
    const d = new Date();
    //az első időponttól eltelt idő (másodpercek)
    var elapsed = (starth[0] != d.getHours()) ? (60 - startm[0] + (d.getHours() - starth[0] - 1) * 60 + d.getMinutes()) * 60 + d.getSeconds() : (d.getMinutes() - startm[0]) * 60 + d.getSeconds();
    console.log(elapsed)
    //mínusz, ha még nem indult el
    if(elapsed < 0) {
        t_remain = starth[0] * 60 * 60 + startm[0] * 60 - d.getHours() * 60 * 60 - d.getMinutes() * 60 - d.getSeconds();

        document.getElementById("k1").innerHTML = "";
        document.getElementById("v1").innerHTML = starth[i] + "<b><sup>" + startm[i] + "</sup></b>";
        document.getElementById("h1").innerHTML = loc[i];
        document.getElementById("e1").innerHTML = other[i];
        r.style.setProperty('--circlecolor', 'var(--inactivecolor)');

    	r.style.animation = "rinactive " + t_remain + "s 1 linear";
        await delay(t_remain);

        cur_pause = false;
        n = 0;
    }
    else {
        if (is_mav == false) {
            for(i = 0; i <= txt.length / 6; i++) {
                //minden óra és az utána következő szünet hossza (már ha van), plusz az előzők
                tlen[i] = (i > 0) ? (i != txt.length / 6 - 1) ? tlen[i-1] + (dur[i] + pause[i]) * 60 : tlen[i-1] + dur[i] * 60 : (dur[i] + pause[i]) * 60;
                if(tlen[i] < elapsed) { n++; continue; }
                else {
                    n = i;
                    //ha van még maradék letelni való óra
                    if(elapsed < tlen[i] - pause[i] * 60) {
                        deg_elapsed = (tlen[i-1]) ? 2 * 760 * Math.PI * ((elapsed - tlen[i-1]) / (dur[i] * 60)) : 2 * 760 * Math.PI * (elapsed / (dur[i] * 60));
                        r.style.setProperty('--startdeg', deg_elapsed);
                        //vonja ki az eltelt időt az aktuális kezdetéből ,ezzel megkapva, hogy mennyi telt el, majd ossza el az aktuális rész hosszával
                        t_remain = (pause[i]) ? tlen[i] - elapsed - pause[i] * 60 : tlen[i] - elapsed;
                        cur_pause = false;
                    }
                    else {
                        deg_elapsed = (tlen[i-1]) ? 2 * 760 * Math.PI * ((elapsed - tlen[i-1] - dur[i] * 60) / (pause[i] * 60)) : 2 * 760 * Math.PI * ((elapsed - dur[i] * 60) / (pause[i] * 60));
                        r.style.setProperty('--startdeg', deg_elapsed);
                        t_remain = tlen[i] - elapsed;
                        cur_pause = true;
                    }
                }
                break;
            }
        }
        else {
            for(i = 0; i < txt.length - 1; i++) {
                //minden óra és az utána következő szünet hossza (már ha van), plusz az előzők
                tlen[i] = (i > 0) ? (i != txt.length - 2) ? tlen[i-1] + (dur[i] + pause[i]) * 60 : tlen[i-1] + dur[i] * 60 : (dur[i] + pause[i]) * 60;
                if(tlen[i] < elapsed) { n++; continue; }
                else {
                    n = i;
                    //ha van még maradék letelni való óra
                    if(elapsed < tlen[i] - pause[i] * 60) {
                        deg_elapsed = (tlen[i-1]) ? 2 * 760 * Math.PI * ((elapsed - tlen[i-1]) / (dur[i] * 60)) : 2 * 760 * Math.PI * (elapsed / (dur[i] * 60));
                        r.style.setProperty('--startdeg', deg_elapsed);
                        //vonja ki az eltelt időt az aktuális kezdetéből ,ezzel megkapva, hogy mennyi telt el, majd ossza el az aktuális rész hosszával
                        t_remain = (pause[i]) ? tlen[i] - elapsed - pause[i] * 60 : tlen[i] - elapsed;
                        cur_pause = false;
                    }
                    else {
                        deg_elapsed = (tlen[i-1]) ? 2 * 760 * Math.PI * ((elapsed - tlen[i-1] - dur[i] * 60) / (pause[i] * 60)) : 2 * 760 * Math.PI * ((elapsed - dur[i] * 60) / (pause[i] * 60));
                        r.style.setProperty('--startdeg', deg_elapsed);
                        t_remain = tlen[i] - elapsed;
                        cur_pause = true;
                    }
                }
                break;
            }
        }
    }
}

function writeData() {
    if(!cur_pause) {
        document.getElementById("k1").innerHTML = starth[i] + "<b><sup>" + startm[i] + "</sup></b>";
        document.getElementById("v1").innerHTML = endh[i] + "<b><sup>" + endm[i] + "</sup></b>";
        document.getElementById("h1").innerHTML = loc[i];
        document.getElementById("e1").innerHTML = (other[i]) ? other[i] : "";
        if(is_mav) {
            document.getElementById("h1").colSpan = "3";
            document.getElementById("h1").innerHTML = "→ " + loc[i];
            document.getElementById("upDiv").style.visibility = "hidden";
        }
    }
    else {
        document.getElementById("k1").innerHTML = (endh[i]) ? endh[i] + "<b><sup>" + endm[i] + "</sup></b>" : "";
    	document.getElementById("v1").innerHTML = (starth[i+1]) ? starth[i+1] + "<b><sup>" + startm[i+1] + "</sup></b>" : "";
    	document.getElementById("h1").innerHTML = (loc[i+1]) ? "→ " + loc[i+1] : "";
        document.getElementById("e1").innerHTML = "";
        if(is_mav) {
            document.getElementById("h1").colSpan = "3";
            document.getElementById("h1").innerHTML = loc[i];
            document.getElementById("upDiv").style.visibility = "hidden";
        }
    }
    document.getElementById("k2").innerHTML = (starth[i+1]) ? starth[i+1] + "<b><sup>" + startm[i+1] + "</sup></b> ― " + endh[i+1] + "<b><sup>" + endm[i+1] + "</sup></b>" : "";    
    document.getElementById("h2").innerHTML = (loc[i+1]) ? (is_mav) ? "→ " + loc[i+1] : loc[i+1] + " " + other[i+1] : "";
    document.getElementById("k3").innerHTML = (starth[i+2]) ? starth[i+2] + "<b><sup>" + startm[i+2] + "</sup></b> ― " + endh[i+2] + "<b><sup>" + endm[i+2] + "</sup></b>" : "";
    document.getElementById("h3").innerHTML = (loc[i+2]) ? (is_mav) ? "→ " + loc[i+2] : loc[i+2] + " " + other[i+2] : "";
}

async function play() {
    start();
    if(is_mav == false) {
        for(i = n; i <= txt.length / 6; i++) {
            if(cur_pause == false) {
                r.style.setProperty('--circlecolor', 'var(--activecolor)');
                writeData();
                r.style.animation = "ractive " + t_remain + "s 1 linear";
                await delay(t_remain);
                t_remain = pause[i] * 60;
                cur_pause = !cur_pause;
                r.style.setProperty('--startdeg', 0);
            }

            if(cur_pause == true && i+1 != txt.length / 6) {
                if(pause[i] != 0) {
                    r.style.setProperty('--circlecolor', 'var(--inactivecolor)');
                    r.style.animation = "rinactive " + t_remain + "s 1 linear";
                    writeData();
                    await delay(t_remain);
                }
                t_remain = dur[i+1] * 60;
                cur_pause = !cur_pause;
                r.style.setProperty('--startdeg', 0);
            }
        }
    }
    else {
        for(i = n; i <= txt.length - 1; i++) {
            if(cur_pause == false) {
                r.style.setProperty('--circlecolor', 'var(--activecolor)');
                writeData();
                r.style.animation = "ractive " + t_remain + "s 1 linear";
                await delay(t_remain);

                t_remain = pause[i] * 60;
                cur_pause = !cur_pause;
                r.style.setProperty('--startdeg', 0);
            }

            if(cur_pause == true && i+1 != txt.length - 2) {
                if(pause[i] != 0) {
                    r.style.setProperty('--circlecolor', 'var(--inactivecolor)');
                    r.style.animation = "rinactive " + t_remain + "s 1 linear";
                    writeData();
                    await delay(t_remain);
                }
                t_remain = dur[i+1] * 60;
                cur_pause = !cur_pause;
                r.style.setProperty('--startdeg', 0);
            }
        }
    }
}

function delay(n) {
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

async function run() {
    document.getElementById("delayinput").value = 0;
    readFile();
    await delay(0.5);
    insertTable();
    secClock();
    clock();
    play();
}
