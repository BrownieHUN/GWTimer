var txt;
var r = document.querySelector(':root');

function readFileAutomatically () {
        var client = new XMLHttpRequest();
        client.open('GET', 'https://raw.githubusercontent.com/BrownieHUN/GWTimer/main/data.txt');
        client.onreadystatechange = function() {
            if( client.responseText != '' ) {
                var txt = client.responseText.split("\n");
                
                document.getElementById("k1").innerHTML = txt[0] + '<b><sup>' + txt[1] + '</sup></b>';
                document.getElementById("v1").innerHTML = txt[2] + '<b><sup>' + txt[3] + '</sup></b>';
                document.getElementById("h1").innerHTML = txt[4];
                document.getElementById("e1").innerHTML = txt[6];
            }
        }
        client.send();
    }
function delay(n){
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
