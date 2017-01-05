// ==UserScript==
// @name        HFR HTML5 viewer
// @description webm embed
// @include     http://forum.hardware.fr/*
// @version     1.1.6
// @grant       none
// @icon        http://reho.st/self/40f387c9f48884a57e8bbe05e108ed4bd59b72ce.png
// @downloadURL http://www.thetartuffebay.org/mod/HFR_HTML5_viewer.user.js
// @updateURL   http://www.thetartuffebay.org/mod/HFR_HTML5_viewer.user.js
// ==/UserScript==

//Version 1 : affichage directement dans HFR des liens vers des fichiers webm/mp4/gifv/ogv |  S'il y a un lien qui pointe sur des gif sur imgur, le script remplace automatiquement le gif par le gifv plus rapide à télécharger.
//Version 1.1 : auto-mute de toutes les vidéos | les vidéos ne sont plus affichées dans les citations | tous les gif sur imgur dans les balises "img" sont automatiquement remplacés par leur équivalent gifv plus rapide à télécharger
//   | support direct de gfycat | ajout d'un saut de ligne avant et après les vidéos
//Version 1.1.1 : correction d'un bug sous FF
//Version 1.1.2 : correction d'un bug dans le cas où l'url contiendrait "webm" ou une autre extension
//Version 1.1.3 : ajout de @downloadURL et @updateURL
//Version 1.1.4 : affichage de la source de la vidéo sous celle-ci | si une vidéo est plus large que la largeur de la page, elle est redimensionnée à la taille max de la page
//Version 1.1.5 : le calcul se fait sur le nodeValue et non le href pour éviter un bug
//Version 1.1.6 : correction bug gfycat

"use strict";

var global;

function main()
{
    var videos = document.querySelectorAll('.spoiler a, .messCase2 > div[id] > p > a');

    for (var i = 0; i < videos.length; i++)
    {
        var link = videos[i].href;
        var link2 = videos[i].firstChild.nodeValue;
        var reg=/\.[0-9a-z]+$/i;
        var extension = reg.exec(link2);

        if (link.length > 0) {
            if (extension)
            {
                if (extension[0] === ".webm" || extension[0] === ".mp4" || extension[0] === ".ogv")
                {
                    var video = document.createElement('video');
                    video.src = link;
                    video.autoplay = true;
                    video.loop = true;
                    video.muted = true;
                    video.controls= true;

                    videos[i].parentNode.replaceChild(video, videos[i]);
                    video.parentNode.insertBefore(document.createElement('br'), video);
                    video.parentNode.insertBefore(document.createElement('br'), video.nextSibling);
                    var node = document.createTextNode(link);
                    video.parentNode.insertBefore(node, video.nextSibling.nextSibling);
                    video.parentNode.insertBefore(document.createElement('br'),node.nextSibling);
                }
                else if (extension[0] === ".gifv")
                {
                    var video = document.createElement('video');
                    video.autoplay= true;
                    video.src = link.replace("gifv", "mp4");
                    video.loop = true;
                    video.muted = true;
                    video.controls= true;

                    videos[i].parentNode.replaceChild(video, videos[i]);
                    video.parentNode.insertBefore(document.createElement('br'), video);
                    video.parentNode.insertBefore(document.createElement('br'), video.nextSibling);
                    var node = document.createTextNode(link);
                    video.parentNode.insertBefore(node, video.nextSibling.nextSibling);
                    video.parentNode.insertBefore(document.createElement('br'),node.nextSibling);
                }
            } else
            {
                if ((link.indexOf("//gfycat.com/") > -1))
                {
                    var res = link.split("/");

                    var video = document.createElement('video');
                    video.autoplay= true;
                    video.loop = true;
                    video.muted = true;
                    video.controls= true;

                    var source = document.createElement('source');
                    source.src = "https://zippy.gfycat.com/" + res[res.length-1] + ".webm";
                    source.type = "video/webm";
                    video.appendChild(source);

                    var source2 = document.createElement('source');
                    source2.src = "https://fat.gfycat.com/" + res[res.length-1] + ".webm";
                    source2.type = "video/webm";
                    video.appendChild(source2);

                    var source3 = document.createElement('source');
                    source3.src = "https://giant.gfycat.com/" + res[res.length-1] + ".webm";
                    source3.type = "video/webm";
                    video.appendChild(source3);

                    videos[i].parentNode.replaceChild(video, videos[i]);
                    video.parentNode.insertBefore(document.createElement('br'), video);
                    video.parentNode.insertBefore(document.createElement('br'), video.nextSibling);
                    var node = document.createTextNode(link);
                    video.parentNode.insertBefore(node, video.nextSibling.nextSibling);
                    video.parentNode.insertBefore(document.createElement('br'),node.nextSibling);
                }
            }
        }
    }

    var myVideos = document.querySelectorAll('video');
    global = myVideos;

    for (var i = 0; i < myVideos.length; i++)
    {
        if (myVideos[i]) {
            myVideos[i].addEventListener('loadedmetadata', naturalSize, false);
        }
    }
}

function naturalSize() {
    for (var i = 0; i < global.length; i++)
    {
        if (global[i] && global[i].videoWidth > 0)
        {
            if (global[i].videoWidth >= global[i].parentNode.offsetWidth) {
                global[i].style.width = "100%";
                global[i].style.height = "auto";
            }
        }
    }
}

window.onload = main;

// Affiche un lien qui pointe sur un gif sur imgur par le gifv correspondant
(function imgur() {
  var links = document.querySelectorAll('a');
  for (var i = 0; i < links.length; i++) {
    var a = links.item(i);
    if (a.hostname && a.hostname == "i.imgur.com" && a.pathname.match(/\.gif$/i)) {
      a.pathname += "v";
      a.firstChild.nodeValue += "v";
    }
  }
})();

//Remplace les gifs sur imgur dans des balises img par leur équivalent gifv
(function imgur2() {
  var links = document.querySelectorAll('img');
  for (var i = 0; i < links.length; i++) {

    var a = links.item(i);
    var b = a.src.indexOf("i.imgur.com");
    if (a.src && b > -1 && a.src.match(/\.gif$/i))
    {
        var parent = a.parentElement;

        var video = document.createElement('video');
        video.src = a.src.replace("gif", "mp4");
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.controls= false;

        parent.replaceChild(video, a);
    }
  }
})();