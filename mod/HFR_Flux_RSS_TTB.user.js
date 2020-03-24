// ==UserScript==
// @name          [HFR] Flux RSS TTB Edition
// @version       1.0.3
// @description   permet d'avoir les infos de son choix en direct
// @icon          http://reho.st/self/40f387c9f48884a57e8bbe05e108ed4bd59b72ce.png
// @downloadURL   http://www.thetartuffebay.org/mod/HFR_Flux_RSS_TTB.user.js
// @updateURL     http://www.thetartuffebay.org/mod/HFR_Flux_RSS_TTB.user.js
// @include       https://forum.hardware.fr/*
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
// ==/UserScript==

// GM_deleteValue("TTBRSS_activation");
// GM_deleteValue("TTBRSS_fontSize");
// GM_deleteValue("TTBRSS_flux");
// GM_deleteValue("TTBRSS_fluxActif");
// GM_deleteValue("TTBRSS_speed");
// GM_deleteValue("TTBRSS_icon");

/* options par défaut */
if (typeof GM_getValue("TTBRSS_activation") === 'undefined') {
	GM_setValue("TTBRSS_activation", true);
}

if (typeof GM_getValue("TTBRSS_fontSize") === 'undefined') {
	GM_setValue("TTBRSS_fontSize", 12);
}

if (typeof GM_getValue("TTBRSS_flux") === 'undefined') {
	GM_setValue("TTBRSS_flux", {
		"The Tartuffe Bay"     : "http://www.thetartuffebay.org/rss/all",
		"Gamekult"             : "http://www.gamekult.com/feeds/actu.html",
		"DSOGaming"            : "http://www.dsogaming.com/feed/",
		"Eurogamer"            : "http://www.eurogamer.net/?format=rss&platform=PC",
	});
}

if (typeof GM_getValue("TTBRSS_fluxActif") === 'undefined') {
	GM_setValue("TTBRSS_fluxActif", "The Tartuffe Bay");
}

if (typeof GM_getValue("TTBRSS_speed") === 'undefined') {
	GM_setValue("TTBRSS_speed", "30");
}

if (typeof GM_getValue("TTBRSS_icon") === 'undefined') {
	GM_setValue("TTBRSS_icon", "https://forum-images.hardware.fr/icones/redface.gif");
}

var getElementByXpath = function(path, element) {
	var arr = Array(),
		xpr = document.evaluate(path, element, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	for(; item = xpr.iterateNext();) arr.push(item);
	return arr;
};

var cssManager = {
	cssContent: "",

	addCssProperties: function(properties) {
		cssManager.cssContent += properties;
	},

	insertStyle: function() {
		GM_addStyle(cssManager.cssContent);
		cssManager.cssContent = "";
	}
};

var cmScript = {
	backgroundDiv: null,

	configDiv: null,

	timer: null,

	setDivsPosition: function() {
		cmScript.setBackgroundPosition();
		cmScript.setConfigWindowPosition();
	},

	setBackgroundPosition: function() {
		cmScript.backgroundDiv.style.width = document.documentElement.clientWidth + "px";
		cmScript.backgroundDiv.style.height = document.documentElement.clientHeight + "px";
		cmScript.backgroundDiv.style.top = window.scrollY + "px";
	},

	setConfigWindowPosition: function() {
		cmScript.configDiv.style.left = (document.documentElement.clientWidth / 2) -
			(parseInt(cmScript.configDiv.style.width) / 2) + window.scrollX + "px";
		cmScript.configDiv.style.top = (document.documentElement.clientHeight / 2) -
			(parseInt(cmScript.configDiv.clientHeight) / 2) + window.scrollY + "px";
	},

	disableKeys: function(event) {
		var key = event.which;
		if(key == 27) {
			clearInterval(cmScript.timer);
			cmScript.hideConfigWindow();
		} else if(event.altKey || (event.target.nodeName.toLowerCase() != "input" && key >= 33 && key <= 40)) {
			event.preventDefault();
		}
	},

	disableTabUp: function(elt) {
		elt.addEventListener("keydown", function(event) {
			var key = event.which;
			if(key == 9 && event.shiftKey) event.preventDefault();
		}, false);
	},

	disableTabDown: function(elt) {
		elt.addEventListener("keydown", function(event) {
			var key = event.which;
			if(key == 9 && !event.shiftKey) event.preventDefault();
		}, false);
	},

	disableScroll: function() {
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", cmScript.disableKeys, false);
	},

	enableScroll: function() {
		document.body.style.overflow = "visible";
		window.removeEventListener("keydown", cmScript.disableKeys, false);
	},

	alterWindow: function(opening) {
		if(opening) {
			cmScript.disableScroll();
			window.addEventListener("resize", cmScript.setDivsPosition, false);
			getElementByXpath("//iframe", document.body).forEach(function(iframe) {
				iframe.style.visibility = "hidden";
			});
		} else {
			cmScript.enableScroll();
			window.removeEventListener("resize", cmScript.setDivsPosition, false);
			getElementByXpath("//iframe", document.body).forEach(function(iframe) {
				iframe.style.visibility = "visible";
			});
		}
	},

	buildBackground: function() {
		if(!document.getElementById("TTBRSS_back")) {
			cmScript.backgroundDiv = document.createElement("div");
			cmScript.backgroundDiv.id = "TTBRSS_back";
			cmScript.backgroundDiv.addEventListener("click", function() {
				clearInterval(cmScript.timer);
				cmScript.hideConfigWindow();
			}, false);
			cssManager.addCssProperties("#TTBRSS_back{display:none;position:absolute;left:0px;top:0px;" +
										"background-color:#242424;z-index:1001;}");
			document.body.appendChild(cmScript.backgroundDiv);
		}
	},

	buildConfigWindow: function() {
		if(top.location != self.document.location) {
			return;
		}

		if(!document.getElementById("TTBRSS_front")) {
			cmScript.configDiv = document.createElement("div");
			cmScript.configDiv.id = "TTBRSS_front";
			cmScript.configDiv.style.width = "400px";
			cssManager.addCssProperties("#TTBRSS_front{display:none;vertical-align:bottom;position:absolute;" +
										"background-color:#F7F7F7;z-index:1003;border:1px dotted #000;" +
										"padding:16px;text-align:center;font-family:Verdana;font-size:14px;}");
			cssManager.addCssProperties("#TTBRSS_front span.sTTBRSS_title{font-size:16px;}");
			cssManager.addCssProperties("#TTBRSS_front input,#TTBRSS_front textarea{font-family:Verdana;font-size:13px;}");
			cssManager.addCssProperties("#TTBRSS_front div{margin-top:16px;text-align:right;}");
			cssManager.addCssProperties("#TTBRSS_front div input[type=image]{margin-left:8px;cursor:pointer;}");

			var label = document.createElement("span");
			label.setAttribute("class", "sTTBRSS_title");
			label.innerHTML = "<b>Conf du script [HFR] Flux RSS TTB Edition</b>";
			cmScript.configDiv.appendChild(label);

			var activationContainer = document.createElement("p");
			var activationLabel = document.createElement("span");
			activationLabel.innerHTML = "Activation du script : ";
			activationContainer.appendChild(activationLabel);
			var inputActivation = document.createElement("input");
			inputActivation.type = "checkbox";
			inputActivation.spellcheck = false;
			inputActivation.id = "TTBRSS_activation";
			activationContainer.appendChild(inputActivation);
			cmScript.configDiv.appendChild(activationContainer);

			var fontSizeContainer = document.createElement("p");
			var fontSizeLabel = document.createElement("span");
			fontSizeLabel.innerHTML = "Taille de la police : ";
			fontSizeContainer.appendChild(fontSizeLabel);
			var inputfontSize = document.createElement("input");
			inputfontSize.type = "number";
			inputfontSize.spellcheck = false;
			inputfontSize.id = "TTBRSS_fontSize";
			inputfontSize.size = "2";
			inputfontSize.min = "0";
			inputfontSize.style.width = "40px";
			fontSizeContainer.appendChild(inputfontSize);
			cmScript.configDiv.appendChild(fontSizeContainer);

			var fluxListContainer = document.createElement("p");
			var fluxListLabel = document.createElement("span");
			fluxListLabel.innerHTML = "Liste des flux : ";
			fluxListContainer.appendChild(fluxListLabel);
			var selectfluxList = document.createElement ("select");
			selectfluxList.spellcheck = false;
			selectfluxList.id = "TTBRSS_fluxList";
			fluxListContainer.appendChild(selectfluxList);
			var btnDel = document.createElement("input");
			btnDel.type = "button";
			btnDel.value = "Supprimer";
			btnDel.style.marginLeft = "10px";
			fluxListContainer.appendChild(btnDel);
			cmScript.configDiv.appendChild(fluxListContainer);

			var flux = GM_getValue("TTBRSS_flux");

			for (var key in flux) {
				var option = document.createElement ("option");
				option.setAttribute ("data-id", key);
				option.innerText = key;
				if (key.length > 22) {
					option.innerText = key.substring (0, 20) + "...";
				}
				option.setAttribute ("value", flux[key]);
				option.setAttribute ("title", key);
				selectfluxList.appendChild(option);
			}

			btnDel.addEventListener("click", function() {
				var flux = GM_getValue("TTBRSS_flux");
				var fluxToDelete = selectfluxList.options[selectfluxList.selectedIndex].title;

				delete flux[fluxToDelete];
				GM_setValue("TTBRSS_flux", flux);

				if (GM_getValue("TTBRSS_fluxActif") === fluxToDelete) {
					GM_setValue("TTBRSS_fluxActif", Object.keys(flux)[0]);
				}

				//on vide les options
				selectfluxList.options.length = 0;

				for (var key in flux) {
					var option = document.createElement ("option");
					option.setAttribute ("data-id", key);
					option.innerText = key;
					if (key.length > 22) {
						option.innerText = key.substring (0, 20) + "...";
					}
					option.setAttribute ("value", flux[key]);
					option.setAttribute ("title", key);
					selectfluxList.appendChild(option);
				}
			}, false);

			var addFluxContainer = document.createElement("p");
			var addFluxLabel = document.createElement("span");
			addFluxLabel.innerHTML = "Ajouter un flux : ";
			addFluxContainer.appendChild(addFluxLabel);
			var inputNameFlux = document.createElement("input");
			inputNameFlux.type = "text";
			inputNameFlux.spellcheck = false;
			inputNameFlux.id = "TTBRSS_nameFlux";
			inputNameFlux.style.width = "200px";
			inputNameFlux.placeholder = "nom du flux";
			addFluxContainer.appendChild(inputNameFlux);
			var inputURLFlux = document.createElement("input");
			inputURLFlux.type = "text";
			inputURLFlux.spellcheck = false;
			inputURLFlux.id = "TTBRSS_URLFlux";
			inputURLFlux.style.width = "200px";
			inputURLFlux.placeholder = "URL du flux";
			inputURLFlux.style.marginLeft = "10px";
			addFluxContainer.appendChild(inputURLFlux);
			var btnAdd = document.createElement("input");
			btnAdd.type = "button";
			btnAdd.value = "Ajouter";
			btnAdd.style.marginLeft = "10px";
			addFluxContainer.appendChild(btnAdd);
			cmScript.configDiv.appendChild(addFluxContainer);

			btnAdd.addEventListener("click", function() {
				var name = document.getElementById("TTBRSS_nameFlux").value;
				var url = document.getElementById("TTBRSS_URLFlux").value;
				var flux = GM_getValue("TTBRSS_flux");
				flux[name] = url;
				GM_setValue("TTBRSS_flux", flux);

				//on vide les options
				selectfluxList.options.length = 0;

				for (var key in flux) {
					var option = document.createElement ("option");
					option.setAttribute ("data-id", key);
					option.innerText = key;
					if (key.length > 22) {
						option.innerText = key.substring (0, 20) + "...";
					}
					option.setAttribute ("value", flux[key]);
					option.setAttribute ("title", key);
					selectfluxList.appendChild(option);
				}
			}, false);

			var speedContainer = document.createElement("p");
			var speedLabel = document.createElement("span");
			speedLabel.innerHTML = "Vitesse de défilement (diminuer pour accélérer) : ";
			speedContainer.appendChild(speedLabel);
			var inputSpeed = document.createElement("input");
			inputSpeed.type = "number";
			inputSpeed.spellcheck = false;
			inputSpeed.id = "TTBRSS_speed";
			inputSpeed.size = "3";
			inputSpeed.min = "1";
			inputSpeed.style.width = "40px";
			speedContainer.appendChild(inputSpeed);
			cmScript.configDiv.appendChild(speedContainer);

			var iconContainer = document.createElement("p");
			var iconLabel = document.createElement("span");
			iconLabel.innerHTML = "Icône : ";
			iconContainer.appendChild(iconLabel);
			var inputIcon = document.createElement("input");
			inputIcon.type = "text";
			inputIcon.spellcheck = false;
			inputIcon.id = "TTBRSS_icon";
			inputIcon.style.width = "300px";
			iconContainer.appendChild(inputIcon);
			cmScript.configDiv.appendChild(iconContainer);

			var buttonsContainer = document.createElement("div");
			var inputOk = document.createElement("input");
			inputOk.type = "image";
			inputOk.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKfSURBVDjLpZPrS1NhHMf9O3bOdmwDCWREIYKEUHsVJBI7mg3FvCxL09290jZj2EyLMnJexkgpLbPUanNOberU5taUMnHZUULMvelCtWF0sW%2Fn7MVMEiN64AsPD8%2Fn83uucQDi%2Fid%2FDBT4Dolypw%2Fqsz0pTMbj%2FWHpiDgsdSUyUmeiPt2%2BV7SrIM%2BbSss8ySGdR4abQQv6lrui6VxsRonrGCS9VEjSQ9E7CtiqdOZ4UuTqnBHO1X7YXl6Daa4yGq7vWO1D40wVDtj4kWQbn94myPGkCDPdSesczE2sCZShwl8CzcwZ6NiUs6n2nYX99T1cnKqA2EKui6%2BTwphA5k4yqMayopU5mANV3lNQTBdCMVUA9VQh3GuDMHiVcLCS3J4jSLhCGmKCjBEx0xlshjXYhApfMZRP5CyYD%2BUkG08%2Bxt%2B4wLVQZA1tzxthm2tEfD3JxARH7QkbD1ZuozaggdZbxK5kAIsf5qGaKMTY2lAU%2FrH5HW3PLsEwUYy%2BYCcERmIjJpDcpzb6l7th9KtQ69fi09ePUej9l7cx2DJbD7UrG3r3afQHOyCo%2BV3QQzE35pvQvnAZukk5zL5qRL59jsKbPzdheXoBZc4saFhBS6AO7V4zqCpiawuptwQG%2BUAa7Ct3UT0hh9p9EnXT5Vh6t4C22QaUDh6HwnECOmcO7K%2B6kW49DKqS2DrEZCtfuI%2B9GrNHg4fMHVSO5kE7nAPVkAxKBxcOzsajpS4Yh4ohUPPWKTUh3PaQEptIOr6BiJjcZXCwktaAGfrRIpwblqOV3YKdhfXOIvBLeREWpnd8ynsaSJoyESFphwTtfjN6X1jRO2%2BFxWtCWksqBApeiFIR9K6fiTpPiigDoadqCEag5YUFKl6Yrciw0VOlhOivv%2FFf8wtn0KzlebrUYwAAAABJRU5ErkJggg%3D%3D";
			inputOk.alt = "Valider";
			inputOk.addEventListener("click", cmScript.validateConfig, false);

			var inputCancel = document.createElement("input");
			inputCancel.type = "image";
			inputCancel.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184%2Bd18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX%2BAv2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30%2BNlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2%2BDl1h7IdA%2Bi97A%2FgeP65WhbmrnZZ0GIJpr6OqZqYAd5%2FgJpKox4Mg7pD2YoC2b0%2F54rJQuJZdm6Izcgma4TW1WZ0h%2By8BfbyJMwBmSxkjw%2BVObNanp5h%2FadwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1%2FvwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY%2BP8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok%2BnsNTipIEVnkywo%2FFHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa%2BDt9XfxoFSNYF%2FBh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs%2FQZyu6TH2%2B2%2BFAAAAABJRU5ErkJggg%3D%3D";
			inputCancel.alt = "Annuler";
			inputCancel.addEventListener("click", cmScript.hideConfigWindow, false);
			cmScript.disableTabDown(inputCancel);

			buttonsContainer.appendChild(inputOk);
			buttonsContainer.appendChild(inputCancel);
			cmScript.configDiv.appendChild(buttonsContainer);

			document.body.appendChild(cmScript.configDiv);
		}
	},

	validateConfig: function() {
		getElementByXpath(".//*[starts-with(@id, 'TTBRSS_')]", document.getElementById("TTBRSS_front")).forEach(function(input) {
			if (input.id === "TTBRSS_activation") {
				GM_setValue("TTBRSS_activation", input.checked);
			}

			if (input.id === "TTBRSS_fontSize") {
				GM_setValue("TTBRSS_fontSize", input.value);
			}

			if (input.id === "TTBRSS_speed") {
				GM_setValue("TTBRSS_speed", input.value);
			}

			if (input.id === "TTBRSS_icon") {
				GM_setValue("TTBRSS_icon", input.value);
			}
		});
		cmScript.hideConfigWindow();
	},

	initBackAndFront: function() {
		if(document.getElementById("TTBRSS_back")) {
			cmScript.setBackgroundPosition();
			cmScript.backgroundDiv.style.opacity = 0;
			cmScript.backgroundDiv.style.display = "block";
		}
	},

	showConfigWindow: function() {
		cmScript.alterWindow(true);
		cmScript.initBackAndFront();
		var opacity = 0;
		cmScript.timer = setInterval(function() {
			opacity = Math.round((opacity + 0.1) * 100) / 100;
			cmScript.backgroundDiv.style.opacity = opacity;
			if(opacity >= 0.8) {
				clearInterval(cmScript.timer);
				cmScript.configDiv.querySelector("#TTBRSS_activation").checked = GM_getValue("TTBRSS_activation");
				cmScript.configDiv.querySelector("#TTBRSS_fontSize").value = GM_getValue("TTBRSS_fontSize");
				cmScript.configDiv.querySelector("#TTBRSS_speed").value = GM_getValue("TTBRSS_speed");
				cmScript.configDiv.querySelector("#TTBRSS_icon").value = GM_getValue("TTBRSS_icon");
				cmScript.configDiv.style.display = "block";
				cmScript.setConfigWindowPosition();
			}
		}, 1);
	},

	hideConfigWindow: function() {
		cmScript.configDiv.style.display = "none";
		var opacity = cmScript.backgroundDiv.style.opacity;
		cmScript.timer = setInterval(function() {
			opacity = Math.round((opacity - 0.1) * 100) / 100;
			cmScript.backgroundDiv.style.opacity = opacity;
			if(opacity <= 0) {
				clearInterval(cmScript.timer);
				cmScript.backgroundDiv.style.display = "none";
				cmScript.alterWindow(false);
			}
		}, 1);
		if (GM_getValue("TTBRSS_activation")){
			main();
		} else {
			if (document.getElementById("rssroot") !== null) {
				document.getElementById("rssroot").remove();
			}
		}
	},

	setUp: function() {
		cmScript.buildBackground();
		cmScript.buildConfigWindow();
		cssManager.insertStyle();
	},

	createConfigMenu: function() {
		GM_registerMenuCommand("[HFR] Flux RSS TTB Edition -> configuration", this.showConfigWindow);
	}
};

cmScript.setUp();
cmScript.createConfigMenu();

var Rss = function (uri) {
	this.uri = uri;

	this.load = function (handler) {
		GM_xmlhttpRequest({
			method      : "GET",
			url         : uri,
			synchronous : true,
			onload      : function (response) {
				var doc = new DOMParser().parseFromString (response.responseText, "text/xml");
				this.title = doc.querySelector ("title").childNodes[0].data;
				this.description = doc.querySelector ("description").childNodes[0].data;
				this.items = [];
				var nodes = doc.getElementsByTagName ("item");
				for (var i = 0; i < nodes.length; i++) {
					var item = {
						title       : nodes[i].getElementsByTagName ("title")[0].textContent,
						link        : nodes[i].getElementsByTagName ("link")[0].textContent,
						description : nodes[i].getElementsByTagName ("description")[0].textContent
					};
					this.items.push (item);
				}
				handler (this.items);
			}
		});
	};
};

function load_rss (marquee, uri) {
	var flux = new Rss (uri);
	flux.load (function (items) {
		while (marquee.firstChild)
			marquee.removeChild (marquee.firstChild);
		for (var i = 0; i < items.length; i++) {
			var a = document.createElement ("span");
			a.setAttribute ("class", "cHeader");
			a.setAttribute ("onclick", "var win = window.open ('" + items[i].link + "', '_blank'); win.focus();");
			a.innerText = items[i].title;
			if (i !== 0) {
				var img = document.createElement ("img");
				img.setAttribute ("src", GM_getValue("TTBRSS_icon"));
				marquee.appendChild (document.createTextNode (" "));
				marquee.appendChild (img);
				marquee.appendChild (document.createTextNode (" "));
			}
			marquee.appendChild (a);
		}
	});
}

function main() {

	if (document.getElementById("rssroot") !== null) {
		document.getElementById("rssroot").remove();
	}

	var select = document.createElement ("select");
	var tr = document.createElement ("tr");
	tr.setAttribute ("id", "rssroot");
	tr.setAttribute ("class", "message cBackHeader fondForum2PagesBas");
	var td1 = document.createElement ("td");
	var td2 = document.createElement ("td");
	td1.setAttribute ("class", "rss-menu");
	td1.setAttribute ("colspan", "2");
	td1.appendChild (select);
	tr.appendChild (td1);
	var marquee = document.createElement ("div");
	marquee.setAttribute ("id", "rss-marquee");

	var span = document.createElement("span");
	span.setAttribute ("class", "marqueeSpan");
	marquee.appendChild(span);

	select.onchange = function() {
		GM_setValue("TTBRSS_fluxActif", select.options[select.selectedIndex].title);
		load_rss (span, select.options[select.selectedIndex].value);
	};

	var indexFluxActif = 0, tmpIndex = 0;
	var flux = GM_getValue("TTBRSS_flux");
	var fluxActif = GM_getValue("TTBRSS_fluxActif");

	for (var key in flux) {
		var option = document.createElement ("option");
		option.setAttribute ("data-id", key);
		option.innerText = key;
		if (key.length > 22) {
			option.innerText = key.substring (0, 20) + "...";
		}
		option.setAttribute ("value", flux[key]);
		option.setAttribute ("title", key);
		select.appendChild (option);
		if (key === fluxActif) {
			indexFluxActif = tmpIndex;
		}
		tmpIndex++;
	}
	select.selectedIndex = indexFluxActif;

	var w0 = document.getElementsByClassName ("message")[0].getBoundingClientRect().width;
	var w1 = document.getElementsByClassName ("messCase1")[0].getBoundingClientRect().width;
	var w2 = document.getElementsByClassName ("messCase2")[0].getBoundingClientRect().width;

	var css = ".banniere { width: " + w2 + "px; margin: 0 auto; white-space: nowrap; overflow: hidden; box-sizing: border-box; }" + 
		".banniere .marqueeSpan { display: inline-block; padding-left: 100%; animation: banniere " + GM_getValue("TTBRSS_speed") + "s linear infinite; }" +
		".banniere .marqueeSpan:hover { animation-play-state: paused }" +
		"@keyframes banniere { 0%   { transform: translate(0, 0); } 100% { transform: translate(-100%, 0); } }" +
		".cHeader:hover { cursor: pointer; }";

	var style = document.createElement ("style");
	style.innerText = css;
	document.head.appendChild (style);

	var header = document.querySelector(".fondForum2PagesBas");
	if (header !== null) {
		header.firstChild.setAttribute ("colspan", 3);
		var parent = header.parentNode;
		marquee.setAttribute ("class", "banniere");
		td2.appendChild (marquee);
		tr.appendChild (td2);
		parent.insertBefore(tr, header.nextSibling);
	} else {
		var table = document.getElementsByClassName("messagetable");
		var tableElt = table[table.length- 1];
		var tableTmp = document.createElement("table");
		tableTmp.setAttribute ("cellspacing", 0);
		tableTmp.setAttribute ("cellpadding", 4);
		tableTmp.setAttribute ("width", "100%");
		var parentTable = tableElt.parentNode;
		marquee.setAttribute ("class", "banniere");
		td2.appendChild (marquee);
		tr.appendChild (td2);
		var tbody = document.createElement("tbody");
		tbody.appendChild(tr);
		tableTmp.appendChild(tbody);
		parentTable.insertBefore(tableTmp, tableElt.nextSibling);
	}

	if (fluxActif !== null && flux[fluxActif] !== null) {
		load_rss (span, flux[fluxActif]);
	}
}

if (GM_getValue("TTBRSS_activation")){
	main();
}
