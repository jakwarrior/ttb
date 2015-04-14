function swap_spoiler_states(obj){
  var div=obj.getElementsByTagName('div');
  if(div[0]){
    if(div[0].style.visibility === "visible"){
      div[0].style.visibility='hidden';
    }
    else if(div[0].style.visibility === "hidden" || !div[0].style.visibility){
      div[0].style.visibility='visible';
    }
  }
}

function parallax(){
  var scrolled = $(window).scrollTop();
  $('h3.game').css('background-position-y',50-(scrolled*0.11)+'%');
}

$(window).scroll(function(e){
  parallax();
});

//Remplace les gifs sur imgur dans des balises img par leur équivalent gifv
function imgur() {
    var links = document.querySelectorAll('img');
    for (var i = 0; i < links.length; i++) {

        var a = links.item(i);
        var b = a.src.indexOf("i.imgur.com");
        if (a.src && b > -1 && a.src.match(/\.gif$/i))
        {
            var parent = a.parentElement;

            var video = document.createElement('video');
            video.src = a.src.replace("gif", "mp4");
            video.autoplay = false;
            video.loop = true;
            video.muted = true;
            video.controls= false;

            parent.replaceChild(video, a);
        }
    }
}

//Vidéos HTML5
function html5()
{
    var videos = document.querySelectorAll('a');

    for (var i = 0; i < videos.length; i++)
    {
        var link = videos[i].href;
        var reg=/\.[0-9a-z]+$/i;
        var extension = reg.exec(link);

        if (extension)
        {
            if (extension[0] === ".webm" || extension[0] === ".mp4" || extension[0] === ".ogv")
            {
                var video = document.createElement('video');
                video.src = link;
                video.autoplay = false;
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
                video.autoplay= false;
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
                video.autoplay= false;
                video.loop = true;
                video.muted = true;
                video.controls= true;

                var source = document.createElement('source');
                source.src = "http://zippy.gfycat.com/" + res[res.length-1] + ".webm";
                source.type = "video/webm";
                video.appendChild(source);

                var source2 = document.createElement('source');
                source2.src = "http://fat.gfycat.com/" + res[res.length-1] + ".webm";
                source2.type = "video/webm";
                video.appendChild(source2);

                var source3 = document.createElement('source');
                source3.src = "http://giant.gfycat.com/" + res[res.length-1] + ".webm";
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

    var myVideos = document.querySelectorAll('video');
    global = myVideos;

    for (var i = 0; i < myVideos.length; i++)
    {
        if (myVideos[i]) {
            myVideos[i].addEventListener('loadedmetadata', naturalSize, false);
        }
    }

    imgur();
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

window.onload = html5;
