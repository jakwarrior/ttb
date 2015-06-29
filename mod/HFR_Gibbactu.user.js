// ==UserScript==
// @name        HFR_Gibbactu
// @description Les gibbactus, what else
// @include     http://forum.hardware.fr/*
// @version     1.0.0
// @grant       none
// @downloadURL http://www.thetartuffebay.org/mod/HFR_Gibbactu.user.js
// @updateURL   http://www.thetartuffebay.org/mod/HFR_Gibbactu.user.js
// ==/UserScript==

'use strict';

(function gibbactu() {
    var citation = document.querySelector('img[alt^="[quote]"]');
    var button = document.createElement("input");
    button.type = "button";
    button.value = "Gibbactu";

    button.style.marginTop = "3px";
    button.style.marginLeft = "10px";
    button.style.width = "100px";
    button.style.height = "23px";
    button.style.fontWeight = "bolder";
    
    var textarea = document.querySelector('textarea[id^="content_form"]');
    
    button.onclick = function(){
        insertTextAtCursor(textarea, '[:gibbactu]\n[#DEDEDE]Gibbactu[/#DEDEDE]\n[*]');
    };

    if (citation)
    {
        citation.parentNode.parentNode.insertBefore(button, citation.parentNode.nextSibling);
    }

})();

function insertTextAtCursor(el, text) {
    var val = el.value, endIndex, range;
    if (typeof el.selectionStart != "undefined" && typeof el.selectionEnd != "undefined") {
        endIndex = el.selectionEnd;
        el.value = val.slice(0, el.selectionStart) + text + val.slice(endIndex);
        el.selectionStart = el.selectionEnd = endIndex + text.length;
    } else if (typeof document.selection != "undefined" && typeof document.selection.createRange != "undefined") {
        el.focus();
        range = document.selection.createRange();
        range.collapse(false);
        range.text = text;
        range.select();
    }
}