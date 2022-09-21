function readfileautomatically () {
        var client = new XMLHttpRequest();
        client.open('GET', '/data.txt');
        client.onreadystatechange = function() {
            if( client.responseText != '' ) {
                var txt = client.responseText.split("\n");
                
                document.getElementByClassName("1k").innerHTML = '<b>' + txt[0] + '<sup>' + txt[1] + '</sup></b>';
                document.getElementByClassName("1v").innerHTML = '<b>' + txt[2] + '<sup>' + txt[3] + '</sup></b>';
                document.getElementByClassName("1h").innerHTML = txt[4];
                document.getElementByClassName("1e").innerHTML = txt[5];
            }
        }
        client.send();
    }
