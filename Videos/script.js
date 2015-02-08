/**
 * Created by gouravjeet on 2/6/15.
 */
/* Window On Load Function
This Function Will load when the main page will load
 */
window.onload=function() {
    var isFirefox = typeof InstallTrigger !== 'undefined';
    // Checking for browser since XML parsing is different for different browsers
    if(isFirefox){
       namespace="media:";
    }
    else {
        namespace="";
    }
    // It will load some videos for intial load
    displayVideosData();
};
/*This function will display the videos searches
* It makes an ajax request and adds the data to the div
* by making rows of the table.
*
* */
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
/*
* This function will load the video when user will click on the
* a table row .
* */
    var loadVideo = function (id) {
        document.getElementById("searchVideo").setAttribute("src", id);
        var myVideo = document.getElementsByTagName("video")[0];
        myVideo.load();
        myVideo.muted=false;
        myVideo.play();
    };
/*
* This function will load the table data in the respective div
* It takes XML response as a parameter.
* It includes Element creation in the DOM and adding styles to it
* */
    var createTableData = function (response) {
        if (document.getElementById("bodyLeftTable").firstChild) {
            while (document.getElementById("bodyLeftTable").firstChild) {
                document.getElementById("bodyLeftTable").removeChild(document.getElementById("bodyLeftTable").firstChild);
            }
        }
        var names = response.getElementsByTagName("item");
        // This for loop is for every row of the data received from the API
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
            var urlValue = (names[i].getElementsByTagName(namespace+"content")[0]).getAttribute("url");

            child2.setAttribute("id", urlValue);
            child2.addEventListener("click", function () {
                loadVideo(this.id);
            });
            var descriptHTML = description[0].childNodes[0].nodeValue;
            var el = document.createElement('div');
            el.innerHTML = descriptHTML;
            var desc = el.getElementsByTagName('p')[0].childNodes[0].nodeValue;

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
/*
* This function will be fired when user enters the value in the input box
* and press Enter. It will then call displayVideosData function.
* */
    var search = function (elem) {
        if (event.keyCode == 13) {
            displayVideosData();
        }
    };

/*
* This function will calculate the time in hours, minutes and seconds
* since it is given in seconds
* It takes duration in seconds as a paramter and returns duration in the form of string
* */
    var calculateTime = function (duration) {
        var text = "";
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
/*
* This will select the video element and playpause and videohover function will
* be called when the user will click on the video and hover on the video
* respectively
* */
    var myVideo = document.getElementById("videoId");
    var videoClick=function() {
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










