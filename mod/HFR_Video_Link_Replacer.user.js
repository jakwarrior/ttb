// ==UserScript==
// @name HFR_Video_Link_Replacer_TTB_Edition
// @version 0.1.8
// @namespace http://noledgedis.com/
// @description Replace a youtube, dailymotion or vimeo link by an embed video
// @include http://forum.hardware.fr/*
// @grant GM_info
// @grant GM_deleteValue
// @grant GM_getValue
// @grant GM_listValues
// @grant GM_setValue
// @grant GM_getResourceText
// @grant GM_getResourceURL
// @grant GM_addStyle
// @grant GM_log
// @grant GM_openInTab
// @grant GM_registerMenuCommand
// @grant GM_setClipboard
// @grant GM_xmlhttpRequest
// @downloadURL http://www.thetartuffebay.org/mod/HFR_Video_Link_Replacer.user.js
// @updateURL   http://www.thetartuffebay.org/mod/HFR_Video_Link_Replacer.user.js
// ==/UserScript==

(function() {
  var SELECTOR = '.spoiler .cLink, .messCase2 > div[id] > p > .cLink';
  var HEIGHT = 315;
  var WIDTH = 560;
  var HASH = /#.*$/;

  var matchers = [
    /http(?:s)?\:\/\/(?:www\.)?(youtu)be\.com\/.+v=([\w\-_]+)/,
    /http(?:s)?\:\/\/(youtu)\.be\/([\w\-_]+)/,
    /http(?:s)?\:\/\/(?:www\.)?(dailymotion)\.com(\/video\/[\w\-_]+)/,
    /http\:\/\/(vimeo)\.com\/([\w\-_]+)/
  ];

  var roots = {
    youtu:  'http://www.youtube.com/embed/',
    dailymotion: 'http://www.dailymotion.com/embed/',
    vimeo: 'http://player.vimeo.com/video/'
  };

  function onClickReplaceWith(el, iframe) {
    el.addEventListener('click', function(e) {
      el.parentNode.replaceChild(iframe, el);
      e.preventDefault();
    });
  }

  var i, l, link, links = document.querySelectorAll(SELECTOR);

  for(i = 0, l = links.length; i < l; i += 1) {
    link = links[i];
    var href = link.href;
    var img = link.querySelector('img');
    var text = link.textContent;
    var h = href.match(HASH);

    matchers.forEach(function(matcher) {
      if(matcher.test(href)) {
        var tokens = href.match(matcher);
        var name = tokens[1]
        var src = tokens[2];
        var hash = h ? h[0] : '';

        var iframe = document.createElement('iframe');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('webkitAllowFullScreen', '');
        iframe.setAttribute('mozallowfullscreen', '');
        iframe.setAttribute('src', roots[name] + src + hash);
        iframe.setAttribute('width', WIDTH);
        iframe.setAttribute('height', HEIGHT);

        if(text.indexOf('http') === 0) {
          link.parentNode.replaceChild(iframe, link);
        } else {
          onClickReplaceWith(img || link, iframe);
        }
        iframe.parentNode.insertBefore(document.createElement('br'), iframe);
        iframe.parentNode.insertBefore(document.createElement('br'), iframe.nextSibling);
      }
    });
  }
}());


// ============ Module d'auto update du script ============
({
	check4Update : function()
	{
		var autoUpdate = this;
		var mirrorUrl = GM_getValue('mirrorUrl', 'null');
		if (mirrorUrl == 'null') autoUpdate.retrieveMirrorUrl();

		var currentVersion = GM_getValue('currentVersion', '0.1.8');
		// On met éventuellement la version stockée à jour avec la version courante, si la version courante est plus récente
		if (autoUpdate.isLater('0.1.8', currentVersion))
		{
			GM_setValue('currentVersion', '0.1.8');
			currentVersion = '0.1.8';
		}			
		// Par contre, si la version stockée est plus récente que la version courante -> création un menu d'update pour la dernière version
		else if (autoUpdate.isLater(currentVersion, '0.1.8'))
		{
			GM_registerMenuCommand("[Mes Discussions] Video Link Replacer -> Installer la version " + currentVersion, function()
			{
				GM_openInTab(mirrorUrl + 'others/youtube_link_replacement.user.js');
			}
			);
		}
		// Si la version courante et la version stockée sont identiques, on ne fait rien

		if (GM_getValue('lastVersionCheck') == undefined || GM_getValue('lastVersionCheck') == '') GM_setValue('lastVersionCheck', new Date().getTime() + '');
		// Pas eu de check depuis 24h, on vérifie...
		if ((new Date().getTime() - GM_getValue('lastVersionCheck')) > 86400000 && mirrorUrl != 'null')
		{
			var checkUrl = mirrorUrl + 'getLastVersion.php5?name=' + encodeURIComponent('[Mes Discussions] Video Link Replacer');
			if (isNaN(currentVersion.substring(currentVersion.length - 1))) checkUrl += '&sversion=' + currentVersion.substring(currentVersion.length - 1);

			GM_xmlhttpRequest({
				method: "GET",
				url: checkUrl,
				onload: function(response)
				{
					var regExpVersion = new RegExp('^[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}[a-zA-Z]?$');
					var lastVersion = response.responseText;
					// Pas d'erreur et nouvelle version plus récente
					if (lastVersion != '-1' && regExpVersion.test(lastVersion) && autoUpdate.isLater(lastVersion, currentVersion))
					{
						if (confirm('Une nouvelle version de [Mes Discussions] Video Link Replacer est disponible : ' + lastVersion + '\nVoulez-vous l\'installer ?'))
						{
							GM_openInTab(mirrorUrl + 'others/youtube_link_replacement.user.js');
						}
						else
						{
							// Mémorisation de la version refusée : elle servira de version de référence
							GM_setValue('currentVersion', lastVersion);
						}
					}
					GM_setValue('lastVersionCheck', new Date().getTime() + '');
				}
			});
		}
	},

	max : function(v1, v2)
	{
		var tabV1 = v1.split('.');
		var tabV2 = v2.split('.');
		
		if (isNaN(tabV1[2].substring(tabV1[2].length - 1))) tabV1[2] = tabV1[2].substring(0, tabV1[2].length - 1);
		if (isNaN(tabV2[2].substring(tabV2[2].length - 1))) tabV2[2] = tabV2[2].substring(0, tabV2[2].length - 1);

		if ((tabV1[0] > tabV2[0])
		|| (tabV1[0] == tabV2[0] && tabV1[1] > tabV2[1])
		|| (tabV1[0] == tabV2[0] && tabV1[1] == tabV2[1] && tabV1[2] > tabV2[2]))
		{
			return v1;
		}
		else
		{
			return v2;
		}		
	},

	isLater : function(v1, v2)
	{
		return v1 != v2 && this.max(v1, v2) == v1;
	},

	retrieveMirrorUrl : function()
	{	
		var mirrors = 'http://hfr.toyonos.info/gm/;http://hfr-mirror.toyonos.info/gm/'.split(';');
		var checkMirror = function (i)
		{
			var mirror = mirrors[i];
			GM_xmlhttpRequest({
				url: mirror + 'getLastVersion.php5',
				method: "HEAD",
				onload: function(response)
				{
					// Dès qu'un miroir répond, on le mémorise.
					if (response.status == 200)
					{
						GM_setValue('mirrorUrl', mirror);
					}
					else
					{
						// Sinon on test le prochain
						if ((i + 1) < mirrors.length)
						{
							checkMirror(i + 1);
						}
						else
						{
							GM_setValue('mirrorUrl', 'null');
						}
					}
				}
			});		
		};
		checkMirror(0);
	},
}).check4Update();