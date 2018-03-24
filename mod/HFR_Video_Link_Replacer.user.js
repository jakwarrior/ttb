// ==UserScript==
// @name          HFR_Video_Link_Replacer_TTB_Edition
// @version       1.0.0
// @namespace     http://noledgedis.com/
// @description   Replace a youtube, dailymotion or vimeo link by an embed video
// @icon          http://reho.st/self/40f387c9f48884a57e8bbe05e108ed4bd59b72ce.png
// @include       https://forum.hardware.fr/*
// @author        shinuza
// @modifications mise à jour du support du start-time pour youtube, ajout du support pour les liens courts et le start-time pour dailymotion, mise à jour du support de vimeo (https), passage en https pour l'iframe quand proposé par l'hebergeur, ajout du support pour les vine.co et les clips.twtch.tv et ajout du lien à côté de la frame
// @modtype       évolution de fonctionnalités
// @noframes
// @grant         GM_info
// @grant         GM_deleteValue
// @grant         GM_getValue
// @grant         GM_listValues
// @grant         GM_setValue
// @grant         GM_getResourceText
// @grant         GM_getResourceURL
// @grant         GM_addStyle
// @grant         GM_log
// @grant         GM_openInTab
// @grant         GM_registerMenuCommand
// @grant         GM_setClipboard
// @grant         GM_xmlhttpRequest
// @downloadURL   http://www.thetartuffebay.org/mod/HFR_Video_Link_Replacer.user.js
// @updateURL     http://www.thetartuffebay.org/mod/HFR_Video_Link_Replacer.user.js
// ==/UserScript==

// modifications roger21 $Rev: 104 $

// historique :
// 2.1.2 (28/11/2017) :
// - passage au https
// 2.1.1 (29/12/2016) :
// - remplacement de l'espace entre la video et le lien par un espace insécable
// 2.1.0 (09/12/2016) :
// - ajout du lien vers le lien :o (à côté de la frame)
// - correction de la regexp du start time pour les liens youtube long
// - "meilleure" gestion du lien sur image
// 2.0.0 (06/08/2016) :
// - mise à jour du support du start-time dans les liens youtube
// - ajout du support pour les liens courts et du start-time pour dailymotion
// - mise à jour du support de vimeo (https)
// - passage en https pour l'iframe quand proposé par l'hebergeur
// - ajout du support pour les vine.co et les clips.twtch.tv
// - nettoyage des regexps
// - remplacement des ' par des " (pasque !)
// - génocide de lignes vides
// - reformatage du code (Online JavaScript beautifier : ->
// "2 spaces, unlimited newlines, do not wrap, braces with" et rien coché)
// - nouveau numéro de version : 0.1.7.5 -> 2.0.0
// - nouveau nom : [HFR] Video Link Replacer -> [HFR] video link replacer mod_r21
// - modification de l'année dans les dates de l'historique : passage de 2 a 4 chiffres
// - ajout de metadata pour la publication (@author, @modifications, @modtype)
// 0.1.7.5 (22/03/2015) :
// - ajout d'un vertical-align:bottom sur l'iframe (pour faire comme les images avec le style hfr images smileys)
// 0.1.7.4 (07/03/2015) :
// - ajout de la metadata @noframes (interdit l'execution du script dans une frame pour plus de sécurité)
// 0.1.7.3 (19/01/2015) :
// - léger reformatage du code par endroits
// - réduction de la taille de la video 560x315 -> 512x288
// 0.1.7.2 (27/03/2014) :
// - ajout d'une icone au script
// - ajout des dates dans l'historique
// 0.1.7.1 (18/03/2014) :
// - ajout d'un ; (pour une meilleur indentation auto)
// - changement du nom du script : [Mes Discussions] Video Link Replacer -> [HFR] Video Link Replacer
// - ajout des metadata @grant et indentation des metadata
// - ajout d'un .1 sur le numero de version

(function() {
    var ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAA8ElEQVR42mNgwAEcMx%2FKAfFrIP6OhL8i4c9AfJwBHwAq8ALin0D8Hwf%2BzkAIABX5APFvvAYAGQVAfBWInwPxSyhuhMrl4XUBkCiCcv5C%2FfUeiKcDMRMQ5%2BDRDDfgJtSfWmhOJ6QZbgAopF%2BiaY6CugiXxr%2FIBrzHYsBePJpnArEf1NU4DajAoXk2KGyQovg9VgOgCqZisRkcsEhqNHAaAFVQB8QXoTRIcxkoFaIrwmkAFgOfYzPgNQkGgBLYZ3TBu9AQVSCgWQaaoR6iS9RAAwmUwx7iwZ%2Bh6hrRDQAFTjMQP4Ua8h0L%2FgqVB6ljQdYPACFXiNVuDbLIAAAAAElFTkSuQmCC";
    var SELECTOR = ".spoiler .cLink, .messCase2 > div[id] > p > .cLink";
    var HEIGHT = 288;
    var WIDTH = 512;
    var STARTY = /(?:\?|&)t=(?:([0-9]+)h)?(?:([0-9]+)m)?([0-9]+)s$/;
    var STARTD = /\?start=[0-9]+$/;
    var matchers = [
        /^http(?:s)?:\/\/(?:www\.)?(youtu)be\.com\/.+v=([\w-]+)/,
        /^http(?:s)?:\/\/(youtu)\.be\/([\w-]+)/,
        /^http(?:s)?:\/\/(?:www\.)?(dai)lymotion\.com\/video\/([\w-]+)/,
        /^http(?:s)?:\/\/(dai)\.ly\/([\w-]+)/,
        /^http(?:s)?:\/\/(vimeo)\.com\/([\w]+)/,
        /^https:\/\/(clips)\.twitch\.tv\/([\w\/]+)/,
        /^https:\/\/(vine)\.co\/v\/([\w]+)/
    ];
    var roots = {
        youtu: "https://www.youtube.com/embed/",
        dai: "http://www.dailymotion.com/embed/video/",
        vimeo: "https://player.vimeo.com/video/",
        clips: "https://clips.twitch.tv/embed?autoplay=false&clip=",
        vine: "https://vine.co/v/"
    };
    var tails = {
        youtu: "",
        dai: "",
        vimeo: "",
        clips: "",
        vine: "/embed/simple"
    };

    function onClickReplaceWith(el, iframe, external_link) {
        el.addEventListener("click", function(e) {
            e.preventDefault();
            if(el.nodeName.toLowerCase() === "img") {
                el = el.parentElement;
            }
            el.parentNode.insertBefore(external_link, el.nextSibling);
            el.parentNode.insertBefore(document.createTextNode("\u00A0"), el.nextSibling);
            el.parentNode.replaceChild(iframe, el);
        });
    }

    var i, l, link, links = document.querySelectorAll(SELECTOR);
    for(i = 0, l = links.length; i < l; i += 1) {
        link = links[i];
        var href = link.href;
        var img = link.querySelector("img");
        var text = link.textContent;
        var start = "";
        var starty = href.match(STARTY);
        if(starty) {
            start = 0;
            start += starty[1] ? parseInt(starty[1], 10) * 3600 : 0;
            start += starty[2] ? parseInt(starty[2], 10) * 60 : 0;
            start += starty[3] ? parseInt(starty[3], 10) : 0;
            start = "?start=" + start;
        }
        var startd = href.match(STARTD);
        if(startd) {
            start = startd[0];
        }
        matchers.forEach(function(matcher) {
            if(matcher.test(href)) {
                var tokens = href.match(matcher);
                var name = tokens[1];
                var src = tokens[2];
                var iframe = document.createElement("iframe");
                iframe.setAttribute("frameborder", "0");
                iframe.setAttribute("allowfullscreen", "");
                iframe.setAttribute("webkitAllowFullScreen", "");
                iframe.setAttribute("mozallowfullscreen", "");
                iframe.setAttribute("src", roots[name] + src + tails[name] + start);
                iframe.setAttribute("width", WIDTH);
                iframe.setAttribute("height", HEIGHT);
                iframe.style.verticalAlign = "bottom";
                var external_link = document.createElement("a");
                external_link.setAttribute("href", href);
                external_link.setAttribute("title", href);
                external_link.setAttribute("class", "cLink");
                var img_external_link = document.createElement("img");
                img_external_link.setAttribute("src", ICON);
                img_external_link.style.verticalAlign = "bottom";
                external_link.appendChild(img_external_link);
                if(text.indexOf("http") === 0) {
                    link.parentNode.insertBefore(external_link, link.nextSibling);
                    link.parentNode.insertBefore(document.createTextNode("\u00A0"), link.nextSibling);
                    link.parentNode.replaceChild(iframe, link);
                } else {
                    onClickReplaceWith(img || link, iframe, external_link);
                }
            }
        });
    }
}());
