/**
 * Created by gouravjeet on 2/6/15.
 */
window.onload=function() {
    displayVideosData();
};
    var displayVideosData = function () {
        var xmlhttp;
        var text = "";
        text = document.getElementById('search').value;
        document.getElementById('search').value = "";
        var url = "http://api.5min.com/search/";
        url = url + text + "/videos.xml";
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var response = xmlhttp.responseXML;
                    createTableData(response);
                }
                else if (xmlhttp.status == 400) {
                    alert('There was an error 400')
                }
                else {
                    alert("abc");
                    alert('something else other than 200 was returned')
                }
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

    };
    var loadVideo = function (id) {
        console.log(id);
        document.getElementById("searchVideo").setAttribute("src", id);
        var myVideo = document.getElementsByTagName("video")[0];

        myVideo.load();
        myVideo.muted=false;
        myVideo.play();

    };
    var createTableData = function (response) {
        if (document.getElementById("bodyLeftTable").firstChild) {
            while (document.getElementById("bodyLeftTable").firstChild) {
                document.getElementById("bodyLeftTable").removeChild(document.getElementById("bodyLeftTable").firstChild);

            }
        }
        var names = response.getElementsByTagName("item");
        for (var i = 0; i < names.length; i++) {
            var parent = document.createElement("div");
            parent.className = "tableRow";
            var child1 = document.createElement("div");
            child1.className = "tableRowChild1";
            child1.id = "ch";
            var child2 = document.createElement("div");
            child2.className = "tableRowChild2";
            var subchild1 = document.createElement("div");
            var description = names[i].getElementsByTagName("description");
            var ids = names[i].getElementsByTagName("id")[0].innerHTML;
            var urlValue = (names[i].getElementsByTagName("media:content")[0]).getAttribute("url");
            console.log(urlValue);

            child2.setAttribute("id", urlValue);
            child2.addEventListener("click", function () {
                loadVideo(this.id);
            });
            var descriptHTML = description[0].childNodes[0].nodeValue;
            var el = document.createElement('div');
            el.innerHTML = descriptHTML;
            var desc = el.getElementsByTagName('p')[0].childNodes[0].nodeValue;
            console.log(desc.length);

            var g = el.getElementsByTagName('a')[0];
            el.getElementsByTagName('a')[0].childNodes[0].setAttribute("height", "100%");
            el.getElementsByTagName('a')[0].childNodes[0].setAttribute("width", "100%");
            var child1Text = document.createTextNode("Image");
            child1.appendChild(g);
            var duration = names[i].getElementsByTagName("enclosure")[0].getAttribute("duration");
            var ownerInfo = names[i].getElementsByTagName("videoOwner")[0].childNodes[0].nodeValue;

            var subchild1Text = document.createTextNode("Description : " + desc);
            subchild1.className = "newsItemsDescription";
            subchild1.appendChild(subchild1Text);

            var subchild2 = document.createElement("div");
            var duration = calculateTime(duration);
            var subchild2Text = document.createTextNode("Duration : " + duration);
            subchild2.className = "tableRowsubChild";
            subchild2.appendChild(subchild2Text);

            var subchild3 = document.createElement("div");
            var subchild3Text = document.createTextNode("by " + ownerInfo);
            subchild3.className = "tableRowsubChild";
            subchild3.appendChild(subchild3Text);

            child2.appendChild(subchild1);
            child2.appendChild(subchild2);
            child2.appendChild(subchild3);
            parent.appendChild(child1);
            parent.appendChild(child2);
            document.getElementById("bodyLeftTable").appendChild(parent);
        }
    };
    var search = function (elem) {
        if (event.keyCode == 13) {
            displayVideosData();
        }
    };

    var calculateTime = function (duration) {
        var text = "";
        console.log(duration);
        var minutes;
        var seconds;
        var hours;
        if (duration < 60) {
            if (duration < 10) {
                text = "0:0" + duration;
            }
            else {
                text = "0:" + duration;
            }
        }
        else if (duration >= 60 && duration < 3600) {
            minutes = Math.floor(duration / 60);
            seconds = duration % 60;
            if (seconds < 10) {
                text = minutes + ":0" + seconds;
            }
            else {
                text = minutes + ":" + seconds;
            }
        }
        else {
            hours = Math.floor(duration / 3600);
            minutes = Math.floor((duration % 3600) / 60);
            seconds = (duration % 3600) % 60;
            text = hours + ":" + minutes + ":" + seconds;
        }
        return text;
    };
    var myVideo = document.getElementById("videoId");
    var playPause=function() {
            if (myVideo.paused){
                myVideo.muted=false;
                myVideo.play();
            }

            else
                myVideo.pause();
    };
    var videoHover=function(){
        if (myVideo.paused){
            myVideo.muted=true;
            myVideo.play();
        }
        else{
            myVideo.muted=false;
        }

    };










