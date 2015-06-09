//Youmax 6.0 - http://www.codehandling.com/2015/02/youmax-50-complete-solution-for.html
//Buy at http://codecanyon.net/item/youmax-youtube-channel-on-your-website/9989505

var youmaxLoggedInUser = {};

(function ($) {
	
	//get videos of any playlist using youtube API
	var getPlaylistVideos = function (playlistId,pageToken,$youmaxContainer) {
		//console.log('inside getPlaylistVideos');
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		var maxResults = youmax_global_options.maxResults;
		//console.log('getPlaylistVideos pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&pageToken="+pageToken;
			loadMoreFlag = true;
		}
		apiPlaylistVideosURL = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId="+playlistId+"&maxResults="+maxResults+pageTokenUrl+"&key="+apiKey;
		
		//console.log('getPlaylistVideos apiPlaylistVideosURL-'+apiPlaylistVideosURL);
		
		$.ajax({
			url: apiPlaylistVideosURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { insertPlaylistVideos(response,loadMoreFlag,$youmaxContainer);},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},

	getVideoComments = function (videoId,$youmaxContainer,pageToken) {
		//console.log('inside getVideoComments');
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		var maxResults = youmax_global_options.maxResults;
		//console.log('getVideoComments pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&pageToken="+pageToken;
			loadMoreFlag = true;
		}
		
		/*var startIndex = $youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button').data('start-index');
		if(startIndex>1) {
			loadMoreFlag = true;
		}*/
		
		apiVideoCommentsURL = "https://www.googleapis.com/youtube/v3/commentThreads?part=id%2Csnippet&videoId="+videoId+pageTokenUrl+"&maxResults="+maxResults+"&key="+apiKey+"&order="+youmax_global_options.commentOrder;
		
		//console.log('getVideoComments apiVideoCommentsURL-'+apiVideoCommentsURL);
		
		$.ajax({
			url: apiVideoCommentsURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { insertVideoComments(response,loadMoreFlag,$youmaxContainer);},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},
	
	//display youtube subscribe button
	renderSubscribeButton = function() {
	
		$.ajaxSetup({
		  cache: true
		});
		
		$.getScript("https://apis.google.com/js/platform.js")
		.done(function( script, textStatus ) {
			//alert( textStatus );
		})
		.fail(function( jqxhr, settings, exception ) {
			//alert( "Triggered ajaxError handler." );
		});
		

		
	},
	
	//get videos of any playlist using youtube API
	getChannelPlaylists = function (playlistTabId,pageToken,$youmaxContainer) {
		//console.log('inside getPlaylistVideos');
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		var maxResults = youmax_global_options.maxResults;
		//console.log('getPlaylistVideos pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&pageToken="+pageToken;
			loadMoreFlag = true;
		}
		var channelId = playlistTabId.substring(playlistTabId.indexOf("_")+1);
		apiChannelPlaylistsURL = "https://www.googleapis.com/youtube/v3/playlists?part=contentDetails,snippet&channelId="+channelId+"&maxResults="+maxResults+pageTokenUrl+"&key="+apiKey;
		
		//console.log('getPlaylistVideos apiChannelPlaylistsURL-'+apiChannelPlaylistsURL);
		
		$.ajax({
			url: apiChannelPlaylistsURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { insertChannelPlaylists(response,loadMoreFlag,$youmaxContainer);},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},
	
	//initialize youamx - add necessary HTML code
	initYoumax = function($youmaxContainer) {
	
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		//Empty the container - ajax compatibility
		$youmaxContainer.empty();
		
		//header + added in 6.0 - search!!
		$youmaxContainer.append('<div id="youmax-header"><div id="youmax-header-wrapper"></div></div>');
		
		//tabs
		$youmaxContainer.append('<div id="youmax-tabs"></div>');
				
		//select
		$youmaxContainer.append('<div id="youmax-select-box"><select id="youmax-select"></select></div>');
	
		if(youmax_global_options.displayVideo != 'popup') {
			//encloser video
			$youmaxContainer.append('<div id="youmax-encloser"><div class="fluid-width-video-wrapper" style="padding-top:'+(youmax_global_options.aspectRatio*100)+'%;"><iframe id="youmax-encloser-video" style="width:100%;" src="" frameborder="0" allowfullscreen></iframe></div><div id="youmax-encloser-comment-wrapper"><div class="youmax-encloser-comment-button youmax-show-button">Show Comments</div><div id="youmax-encloser-comment-holder"><div class="youmax-video-comment"><textarea class="youmax-comment-textbox" placeholder="Share your Thoughts..."></textarea><button type="button" class="youmax-add-comment-button">G+ Sign In</button></div><div id="youmax-encloser-comments"></div><div class="youmax-encloser-comment-button youmax-more-button">Load More Comments</div></div></div></div>');
		}
		
		
		//showing playlist xxxx
		$youmaxContainer.append('<div id="youmax-showing-title"></div>');
		
		//list
		$youmaxContainer.append('<div id="youmax-video-list-div"><ul id="tiles"></ul></div>');
		
		//load more
		$youmaxContainer.append('<button type="button" id="youmax-load-more-div">LOAD MORE</button>');
		$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
		
		$youmaxLoadMoreDiv.data('nextpagetoken','');
		
		$youmaxLoadMoreDiv.click(function(){
			loadMorePlaylistVideos($youmaxContainer);
		});
		
		$youmaxContainer.find('#youmax-tabs').on('click','.youmax-tab',function() {
			$youmaxContainer.find('#youmax-load-more-div').removeAttr('disabled');
			displayPlaylist(this.id,$youmaxContainer);
		});
		
		$youmaxContainer.find('#youmax-select').change(function() {
			var playlistId = $(this).find(":selected").val();
			displayPlaylist(playlistId,$youmaxContainer);
		});
		
		if(youmax_global_options.alwaysUseDropdown) {
			//console.log('options.alwaysUseDropdown-'+options.alwaysUseDropdown);	
			$youmaxContainer.find('#youmax-select-box').css('display','block');
			//$youmaxContainer.find('#youmax-select-box').show();
			$youmaxContainer.find('#youmax-tabs').hide();
		}
		
		//5.0 - show comments
		/*$youmaxContainer.find('.youmax-encloser-comment-button.youmax-show-button').click(function(){
			displayComments(this.id,$youmaxContainer);
		});	
		$youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button').click(function(){
			loadMoreComments($youmaxContainer);
		});	*/
		$youmaxContainer.on('click','.youmax-show-button',function(){
			displayComments(this.id,$youmaxContainer);
		});
		$youmaxContainer.on('click','.youmax-more-button',function(){
			loadMoreComments($youmaxContainer);
		});
		
		
		//console.log('init Google API');
		//load Google API for Login
		$.getScript("https://apis.google.com/js/client:platform.js").done(function(data, textStatus) {
			//console.log('Google API Loaded');
			$youmaxContainer.on('click','.youmax-add-comment-button',function(){
				handleComments(this,$youmaxContainer);
			});
			
		}).fail(function( jqxhr, settings, exception ) {
			//console.log( "Triggered ajaxError handler." );
		});
		
		//added in 6.0 
		$youmaxContainer.on('keyup','#youmax-search-box', function (e) {
			if (e.keyCode == 13) {
				searchText = "query_" + $(this).val();
				displayPlaylist(searchText,$youmaxContainer);
				return false;
			}
		});
	},
	
	handleComments = function(thisElement,$youmaxContainer) {
		
		//var $youmaxAddButton = $youmaxContainer.find('.youmax-add-comment-button');
		//$youmaxAddButton.text('posting..');
		//$youmaxAddButton.attr('disabled','disabled');
		$(thisElement).text('posting..').attr('disabled','disabled');
		//console.log('Button text - '+$(thisElement).text());
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');

		var youmaxAccessToken = youmaxLoggedInUser.youmaxAccessToken;
		if(null!=youmaxAccessToken && youmaxAccessToken!="") {
			//Token available
			//getLoggedInUserDetails($youmaxContainer,youmaxAccessToken,youmax_global_options.apiKey);
			
			var comment = $youmaxContainer.find('.youmax-comment-textbox').val();
			if(null==comment||comment.trim()=="") {
				alert("Please enter a valid comment..");
				$youmaxContainer.find('.youmax-add-comment-button').removeAttr('disabled').text('POST');
				return;
			} else {
				comment=comment.trim();
			}
			
			videoId = $youmaxContainer.find(".youmax-encloser-comment-button.youmax-show-button").attr('id');
			
			youmaxPostComment($youmaxContainer,videoId,youmaxAccessToken,youmax_global_options.apiKey,comment);
			
		} else {
			//Check if any Access Token persists
			/*youmaxAccessToken = gapi.auth.getToken();
			//console.log('Checking for persistent access token');
			//console.log(youmaxAccessToken);
			if(null!=youmaxAccessToken && null!=youmaxAccessToken.access_token) {
				youmaxAccessToken = youmaxAccessToken.access_token;
				handleComments($youmaxContainer);
			}*/
			//Initiate Login Workflow
			//console.log('Initiate Login Workflow');
			gapi.auth.signIn({
				'clientid' : youmax_global_options.clientId,
				'cookiepolicy' : 'single_host_origin',
				'callback' : 'youmaxSaveToken',
				'scope' : 'https://gdata.youtube.com'
			}); 
		
		}
	
	},
	
	/* Not needed as of now
	getLoggedInUserDetails = function($youmaxContainer,youmaxAccessToken,youmaxApiKey) {
		var loggedInUserApiURL = "https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true&key="+youmaxApiKey;
		
		//console.log();
		$.ajax({
			url: loggedInUserApiURL,
			type: 'get',
			crossDomain: true,
			beforeSend: function(xhr){
				xhr.setRequestHeader('Authorization','Bearer '+youmaxAccessToken);
			},
			success: function (response, status) {
				youmaxLoggedInUser.username = response.items[0].snippet.title;
				youmaxLoggedInUser.thumbnail = response.items[0].snippet.thumbnails.default.url;
				
				$youmaxContainer.find('#youmax_me .youmax-from-img').css('background-image','url('+youmaxLoggedInUser.thumbnail+')');
				$youmaxContainer.find('#youmax_me .youmax-from-name').text('background-image',youmaxLoggedInUser.username);
				
				//console.log("Success!!");
				//console.log(response);
				//console.log(status);
			},
			error: function (xhr, desc, err) {
				//console.log(xhr);
				//console.log("Desc: " + desc + "\nErr:" + err);
			}
		});
	},
	*/
	
	youmaxPostComment = function($youmaxContainer,videoId,youmaxAccessToken,apiKey,comment) {
		
		var postCommentURL = "https://gdata.youtube.com/feeds/api/videos/"+videoId+"/comments?alt=json";
		var xmlComment = '<?xml version="1.0" encoding="UTF-8"?><entry xmlns="http://www.w3.org/2005/Atom" xmlns:yt="http://gdata.youtube.com/schemas/2007"><content>'+comment+'</content></entry>';
		
		//console.log();
		$.ajax({
			url: postCommentURL,
			type: 'post',
			crossDomain: true,
			data:xmlComment,
			//contentType: "application/atom+xml",
			beforeSend: function(xhr){
				xhr.setRequestHeader('X-GData-Key','key='+apiKey);
				xhr.setRequestHeader('Authorization','Bearer '+youmaxAccessToken);
				xhr.setRequestHeader('GData-Version','2');
				xhr.setRequestHeader('Host','gdata.youtube.com');
				xhr.setRequestHeader('Content-Type','application/atom+xml');
				xhr.setRequestHeader('Content-Length',xmlComment.length);
			},
			success: function (data, status) {

				/*var authorId = data.entry.author[0].uri.$t;
				authorId = authorId.substring(authorId.lastIndexOf("/")+1); //.toLowerCase()*/
				
				var authorId = data.entry.author[0].yt$userId.$t;
				var authorName = data.entry.author[0].name.$t;
				var authorNameAsClass = authorName.replace(/\s+/g,"_").replace(/['|!|\.]/g,"").toLowerCase();
				var youmax_global_options = $youmaxContainer.data('youmax_global_options');
				//Display added comment
				//id="'+authorName+'"
				$youmaxContainer.find("#youmax-encloser-comments").prepend('<div class="youmax-video-comment '+authorNameAsClass+'"><div class="youmax-from"><div class="youmax-from-img" style="background-image:url(\''+youmax_global_options.imagesFolderPath+'/unknown.jpg\');"></div><div class="youmax-from-name">'+authorName+'</div><div class="youmax-published">just now</div></div><div class="youmax-comment"><span class="youmax-comment-content">'+comment+'</span><div></div>');

				getUserDetails(new Array(authorId),$youmaxContainer);
				
				$youmaxContainer.find('.youmax-add-comment-button').removeAttr('disabled').text('POST');
				$youmaxContainer.find('.youmax-comment-textbox').val('');
				//console.log("Success!!");
				//console.log(data);
				//console.log(status);
			},
			error: function (xhr, desc, err) {
				alert("Could not Post - "+err);
				//console.log(xhr);
				//console.log("Desc: " + desc + "\nErr:" + err);
			}
		});
	
	},
	
	//load more button functionality
	loadMorePlaylistVideos = function($youmaxContainer) {
		var $youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
		$youmaxLoadMoreDiv.text('LOADING...');
		$youmaxLoadMoreDiv.addClass('youmax-load-more-div-click');
		var playlistId = $youmaxContainer.find('.youmax-tab.youmax-tab-hover').attr('id');
		var nextPageToken = $youmaxLoadMoreDiv.data('nextpagetoken');
		//console.log('load more clicked : nextPageToken-'+nextPageToken);
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			if(playlistId.indexOf("search_")!=-1) {
				getSearchVideos(playlistId,nextPageToken,$youmaxContainer);
			} else if(playlistId.indexOf("playlists_")!=-1) {
				getChannelPlaylists(playlistId,nextPageToken,$youmaxContainer);
			} else if(playlistId.indexOf("query_")!=-1) {
				getUserSearchVideos(playlistId,nextPageToken,$youmaxContainer);
			} else {
				getPlaylistVideos(playlistId,nextPageToken,$youmaxContainer);
			}
		} else {
			$youmaxLoadMoreDiv.text('ALL DONE');
		}
	},
	
	//gets channel details using Youtube API
	getChannelDetails = function (channelId,$youmaxContainer) {
		//console.log('inside getChannelDetails');
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		youmax_global_options.channelId = channelId;
		
		apiUrl = "https://www.googleapis.com/youtube/v3/channels?part=brandingSettings%2Csnippet%2Cstatistics%2CcontentDetails&id="+channelId+"&key="+apiKey;
		//console.log('apiUrl-'+apiUrl);
		//showLoader();
		
		$.ajax({
			url: apiUrl,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { displayChannelHeader(response,$youmaxContainer);},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},
	
	//get channel Id if channel URL is of the form ....../user/Adele
	getChannelId = function (apiUrl,$youmaxContainer) {
		//console.log('inside getChannelId');
		//console.log('apiUrl-'+apiUrl);
		//showLoader();
		
		$.ajax({
			url: apiUrl,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { getChannelDetails(response.items[0].id,$youmaxContainer);},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},

	//get channel Id if channel URL is of the form ....../user/Adele and add it ot search tab's data
	getChannelIdForSearch = function (apiUrl,$searchTab) {
		//console.log('inside getChannelId');
		//console.log('apiUrl-'+apiUrl);
		//showLoader();
		
		$.ajax({
			url: apiUrl,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) {
						restrictedChannels = $searchTab.data("restrictToChannels");
						//console.log(restrictedChannels);
						restrictedChannels.push(response.items[0].id);
						$searchTab.data("restrictToChannels",restrictedChannels);
						//console.log(restrictedChannels);
						//console.log($searchTab.attr('id'));
			},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},

	//get details of all playlists mentioned in youmax options
	getPlaylistDetails = function (playlistIdArray,$youmaxContainer) {
		//console.log('inside getPlaylistDetails');
		//console.log(playlistIdArray);
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		
		apiPlaylistDetailsURL = "https://www.googleapis.com/youtube/v3/playlists?part=snippet&id="+playlistIdArray+"&key="+apiKey;
		$.ajax({
			url: apiPlaylistDetailsURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { displayTabs(response,$youmaxContainer);},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},
	
	//get video stats using Youtube API
	getVideoStats = function (videoIdList,$youmaxContainer) {
		//console.log('inside getVideoStats');
		//console.log(videoIdList);
		//showLoader();
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		
		apiVideoStatURL = "https://www.googleapis.com/youtube/v3/videos?part=statistics%2CcontentDetails&id="+videoIdList+"&key="+apiKey;
		$.ajax({
			url: apiVideoStatURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { displayVideoStats(response,$youmaxContainer);},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},
	
	/* updated to v3 API - not needed 
	//get YouTube user details using Youtube API
	getUserDetails = function (userIdList,$youmaxContainer) {
		//console.log('inside getVideoStats');
		//console.log(videoIdList);
		//showLoader();
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		
		for(var i=0; i<userIdList.length; i++) {
			apiUserDetailsURL = "https://gdata.youtube.com/feeds/api/users/"+userIdList[i]+"?alt=json";
			$.ajax({
				url: apiUserDetailsURL,
				type: "GET",
				async: true,
				cache: true,
				dataType: 'jsonp',
				success: function(response) { displayUserDetails(response);},
				error: function(html) { },
				beforeSend: setHeader
			});
		}
	},*/
	
	setHeader = function (xhr) {
		if(xhr && xhr.overrideMimeType) {
			xhr.overrideMimeType("application/j-son;charset=UTF-8");
		}
	},
	
	//utility function to displaye view counts
	convertViewCount = function(videoViewCount) {
		videoViewCount = parseInt(videoViewCount,10);
		if(videoViewCount<1000) {
			
		} else if (videoViewCount<1000000) {
			videoViewCount = Math.round(videoViewCount/1000) + "K";
			
		} else if (videoViewCount<1000000000) {
			videoViewCount = (videoViewCount/1000000).toFixed(1) + "M";
		} else {
			videoViewCount = (videoViewCount/1000000000).toFixed(1) + "B";
		}
		
		return videoViewCount;
		
	},
	
	//utility function to display time
	convertDuration = function(videoDuration) {
		var duration,returnDuration;
		videoDuration = videoDuration.replace('PT','').replace('S','').replace('M',':').replace('H',':');	
		
		//TODO: fix some duration settings
		//console.log('videoDuration-'+videoDuration);
		
		var videoDurationSplit = videoDuration.split(':');
		returnDuration = videoDurationSplit[0];
		for(var i=1; i<videoDurationSplit.length; i++) {
			duration = videoDurationSplit[i];
			////console.log('duration-'+duration);
			if(duration=="") {
				returnDuration+=":00";
			} else {
				duration = parseInt(duration,10);
				////console.log('duration else -'+duration)
				if(duration<10) {
					returnDuration+=":0"+duration;
				} else {
					returnDuration+=":"+duration;
				}
			}
		}
		if(videoDurationSplit.length==1) {
			returnDuration="0:"+returnDuration;
		}
		return returnDuration;
		
	},
	
	//display channel header
	displayChannelHeader = function(response,$youmaxContainer) {
		//console.log(response);
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var channelData = response.items[0];
		
		//alert(videoArray.length);
		channelId = channelData.id;
		channelTitle = channelData.snippet.title;
		channelImage = channelData.snippet.thumbnails.default.url;
		channelSubscribers = channelData.statistics.subscriberCount;
		channelViews = channelData.statistics.viewCount;
		channelBackgroundImage = channelData.brandingSettings.image.bannerImageUrl;
		channelUploadsPlaylistId = channelData.contentDetails.relatedPlaylists.uploads;
		//console.log('channelBackgroundImage-'+channelBackgroundImage);
		
		
		$youmaxContainer.find('#youmax-header').css('background-image',"url("+channelBackgroundImage+")");
		
		$youmaxContainer.find('#youmax-header-wrapper').append('<a href="https://www.youtube.com/channel/'+channelId+'" target="_blank"><div class="youmax-channel-icon"><img src="'+channelImage+'"/></div><div class="youmax-channel-title">'+channelTitle+'</div></a>&nbsp;&nbsp;&nbsp;&nbsp;<div class="youmax-subscribe"><div class="g-ytsubscribe" data-channelid="'+channelId+'" data-layout="default" data-count="default"></div></div><div id="youmax-stat-holder"><div id="youmax-search-holder"><input id="youmax-search-box" type="text" placeholder=""/><i class="fa fa-search youmax-search-icon"></i></div></div>');
		
		//$youmaxContainer.find('#youmax-header-wrapper').append('');
		
		//Stats removed and search is added after Youmax 6.0
		/*$youmaxContainer.find('#youmax-stat-holder').append('<div class="youmax-stat"><span class="youmax-stat-count">'+convertViewCount(channelViews)+'</span><br/> VIDEO VIEWS </div><div class="youmax-stat"><span class="youmax-stat-count">'+convertViewCount(channelSubscribers)+'</span><br/>SUBSCRIBERS</div>');*/
		
		$youmaxContainer.find('#youmax-tabs').prepend('<span id="'+channelUploadsPlaylistId+'" class="youmax-tab" >Uploads</span><span id="playlists_'+channelId+'" class="youmax-tab" >Playlists</span>');
		$youmaxContainer.find('#youmax-select').prepend('<option value="'+channelUploadsPlaylistId+'" class="youmax-option-highlight" >Uploads</option><option value="playlists_'+channelId+'" class="youmax-option-highlight" >Playlists</option>');
		
		//$youmaxContainer.find('#youmax-tabs').prepend('');
		//$youmaxContainer.find('#youmax-select').prepend('');		
		
		//console.log('selected Tab-'+youmax_global_options.selectedTab);
		if(youmax_global_options.selectedTab.charAt(0)=='u') {
			$('#'+channelUploadsPlaylistId).click();
		} else if(youmax_global_options.selectedTab.charAt(0)=='l') {
			$('#playlists_'+channelId).click();
		}
		
		renderSubscribeButton();
	},
	
	//display tabs for playlists
	displayTabs = function(response,$youmaxContainer) {
		//console.log(response);
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var playlistArray = response.items;
		
		//alert(videoArray.length);
		$youmaxTabs = $youmaxContainer.find('#youmax-tabs');
		$youmaxSelect = $youmaxContainer.find('#youmax-select');
		for(var i=0; i<playlistArray.length; i++) {
			playlistId = playlistArray[i].id;
			playlistTitle = playlistArray[i].snippet.title;
			if(playlistTitle.length>youmax_global_options.maxPlaylistNameLength) {
				playlistTitleShort = playlistTitle.substring(0,youmax_global_options.maxPlaylistNameLength) + "..";
			} else {
				playlistTitleShort = playlistTitle;
			}
			
			$youmaxTabs.append('<span id="'+playlistId+'" class="youmax-tab" >'+playlistTitleShort+'</span>');
			$youmaxSelect.append('<option value="'+playlistId+'" >'+playlistTitle+'</option>');
		}
		
		//click the selectedTab
		if(youmax_global_options.selectedTab.charAt(0)=='p') {
			playlistSelect = (youmax_global_options.selectedTab.charAt(1)) - 1;
			if(null!=playlistArray[playlistSelect]) {
				$('#'+playlistArray[playlistSelect].id).click();
			}
		}
	},
	
	//display video statistics
	displayVideoStats = function(response,$youmaxContainer) {
		//console.log(response);
		
		var videoArray = response.items;
		var $videoThumbnail;

		for(var i=0; i<videoArray.length; i++) {
			videoId = videoArray[i].id;
			videoViewCount = videoArray[i].statistics.viewCount;
			videoViewCount = convertViewCount(videoViewCount);
			videoDuration = videoArray[i].contentDetails.duration;
			videoDuration = convertDuration(videoDuration);
			videoDefinition = videoArray[i].contentDetails.definition.toUpperCase();
			$videoThumbnail = $youmaxContainer.find('#youmax-video-list-div #'+videoId);
			$videoThumbnail.find('.youmax-video-list-views').prepend(videoViewCount+' views | ');
			$videoThumbnail.append('<div class="youmax-duration">'+videoDuration+'</div>');
			$videoThumbnail.append('<div class="youmax-definition">'+videoDefinition+'</div>');
			
		}
	},

	/* updated to v3 API - not needed
	//display YouTube user details
	displayUserDetails = function(response) {
		//console.log('displayUserDetails');
		//console.log(response);
		
		var authorImage = response.entry.media$thumbnail.url;
		//var authorId = response.entry.yt$username.$t;

		var authorName = response.entry.author[0].name.$t;
		var authorNameAsClass = authorName.replace(/\s+/g,"_").replace(/['|!|\.]/g,"").toLowerCase();
		//var authorId = response.entry.author[0].uri.$t;
		//authorId = authorId.substring(authorId.lastIndexOf("/")+1); //.toLowerCase()

		
		$('.'+authorNameAsClass).find('.youmax-from-img').css('background-image','url('+authorImage+')');
		//alert(videoArray.length);
	},*/


	//insert HTML for video thumbnails into youmax grid
	insertVideoComments = function(response,loadMoreFlag,$youmaxContainer) {
		//console.log('insertVideoComments');
		//console.log(response);
		
		
		var $youmaxCommentHolder = $youmaxContainer.find('#youmax-encloser-comments');
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		//console.log('loadMoreFlag-'+loadMoreFlag);
		if(!loadMoreFlag) {
			//empty earlier comments if not load more
			$youmaxCommentHolder.empty();
		}

		var commentArray = response.items;
		//var userIdArray = [];
		
		//page token logic
		var nextPageToken = response.nextPageToken;
		var $loadCommentsButton = $youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button');
		//console.log('nextPageToken-'+nextPageToken);
		
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			$loadCommentsButton.data('nextpagetoken',nextPageToken);
		} else {
			$loadCommentsButton.data('nextpagetoken','');
		}

		$loadCommentsButton.data('nextpagetoken',nextPageToken);

		
		//alert(videoArray.length);
		if(null==commentArray||commentArray.length==0) {
			$youmaxCommentHolder.append('<div id="" class="youmax-video-comment"><div class="youmax-comment" ><span class="youmax-comment-content" style="text-align:center;">No more comments found.</span><div></div>');
			$youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button').data('nextpagetoken','');
			resetLoadMoreComments($youmaxContainer);
			return;
		}
		
		/* v2 logic for start index
		$loadCommentsButton = $youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button');
		var startIndex = parseInt($loadCommentsButton.data('start-index'),10);
		startIndex += commentArray.length;
		$loadCommentsButton.data('start-index',startIndex);*/
		
		for(var i=0; i<commentArray.length; i++) {
			comment = commentArray[i].snippet.topLevelComment.snippet.textDisplay;
			if(null==comment||comment=="") {
				continue;
			}
			commentPublished = commentArray[i].snippet.topLevelComment.snippet.publishedAt;
			authorName = commentArray[i].snippet.topLevelComment.snippet.authorDisplayName;
			authorImage = commentArray[i].snippet.topLevelComment.snippet.authorProfileImageUrl;
			//authorNameAsClass = authorName.replace(/\s+/g,"_").replace(/['|!|\.]/g,"").toLowerCase();
			/*authorId = commentArray[i].author[0].uri.$t;
			authorId = authorId.substring(authorId.lastIndexOf("/")+1); //.toLowerCase()*/
			//authorId = commentArray[i].author[0].yt$userId.$t;
			//userIdArray.push(authorId);

			$youmaxCommentHolder.append('<div  class="youmax-video-comment"><div class="youmax-from"><div class="youmax-from-img" style="background-image:url(\''+authorImage+'\');"></div><div class="youmax-from-name">'+authorName+'</div><div class="youmax-published">'+getDateDiff(commentPublished)+' </div></div><div class="youmax-comment"><span class="youmax-comment-content">'+comment+'</span><div></div>');

		}
		
		//getUserDetails(userIdArray,$youmaxContainer);
		resetLoadMoreComments($youmaxContainer);
		
	},
	

	
	//insert HTML for video thumbnails into youmax grid
	insertPlaylistVideos = function(response,loadMoreFlag,$youmaxContainer) {
		//console.log(response);
		var videoIdArray = [];
		var $youmaxContainerList = $youmaxContainer.find('ul');
		//console.log('loadMoreFlag-'+loadMoreFlag);
		if(!loadMoreFlag) {
			//$youmaxContainerList.empty();
			if($youmaxContainer.find('.youmax-tab-hover').length==0) {
				$youmaxContainer.find('#youmax-showing-title').append('<div id="'+$youmaxContainer.data('youmax_current_playlist_id')+'" class="youmax-tab youmax-tab-hover">Showing Playlist "'+$youmaxContainer.data('youmax_current_playlist_name')+'"</div>').show();
			}
		}

		var videoArray = response.items;
		var nextPageToken = response.nextPageToken;
		var $youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
		//console.log('nextPageToken-'+nextPageToken);
		
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			$youmaxLoadMoreDiv.data('nextpagetoken',nextPageToken);
		} else {
			$youmaxLoadMoreDiv.data('nextpagetoken','');
		}

		
		$youmaxLoadMoreDiv.data('nextpagetoken',nextPageToken);
		//alert(videoArray.length);
		for(var i=0; i<videoArray.length; i++) {
			videoId = videoArray[i].snippet.resourceId.videoId;
			
			videoTitle = videoArray[i].snippet.title;
			//console.log('Video title-'+videoTitle);
			if(null!=videoArray[i].snippet.thumbnails) {
				videoThumbnail = videoArray[i].snippet.thumbnails.medium.url;
			} else {
				videoThumbnail = '';
				continue;
			}
			videoUploaded = videoArray[i].snippet.publishedAt;
			
			videoIdArray.push(videoId);
			
			//console.log('videoUploaded-'+videoUploaded);
			
			$youmaxContainerList.append('<li id="'+videoId+'" href="https://www.youtube.com/watch?v='+videoId+'" ><img src="'+videoThumbnail+'"><p><span class="youmax-video-list-title">'+videoTitle+'</span><span class="youmax-video-list-views">'+getDateDiff(videoUploaded)+' </span></p></li>');

		}
		
		createGrid($youmaxContainer);
		
		getVideoStats(videoIdArray,$youmaxContainer);
		
	},


	//insert HTML for video thumbnails into youmax grid
	insertChannelPlaylists = function(response,loadMoreFlag,$youmaxContainer) {
		//console.log(response);
		//var videoIdArray = [];
		var $youmaxContainerList = $youmaxContainer.find('ul');
		//console.log('loadMoreFlag-'+loadMoreFlag);
		if(!loadMoreFlag) {
			//$youmaxContainerList.empty();
		}

		var playlistArray = response.items;
		var nextPageToken = response.nextPageToken;
		var $youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
		//console.log('nextPageToken-'+nextPageToken);
		
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			$youmaxLoadMoreDiv.data('nextpagetoken',nextPageToken);
		} else {
			$youmaxLoadMoreDiv.data('nextpagetoken','');
		}

		
		$youmaxLoadMoreDiv.data('nextpagetoken',nextPageToken);
		//alert(playlistArray.length);
		for(var i=0; i<playlistArray.length; i++) {
			playlistId = playlistArray[i].id;
			videoCount = playlistArray[i].contentDetails.itemCount;
			playlistTitle = playlistArray[i].snippet.title;
			//console.log('Video title-'+videoTitle);
			if(null!=playlistArray[i].snippet.thumbnails) {
				playlistThumbnail = playlistArray[i].snippet.thumbnails.medium.url;
			} else {
				playlistThumbnail = '';
				continue;
			}
			playlistUploaded = playlistArray[i].snippet.publishedAt;
			
			//console.log('videoUploaded-'+videoUploaded);
			
			$youmaxContainerList.append('<li id="'+playlistId+'" ><img src="'+playlistThumbnail+'"><div class="youmax-playlist-video-count-wrapper"><div class="youmax-playlist-video-count-box"><span class="youmax-playlist-video-count">'+videoCount+'</span><br>VIDEOS<br><div class="youmax-playlist-line-wrapper"><span class="youmax-playlist-line"></span><br><span class="youmax-playlist-line"></span><br><span class="youmax-playlist-line"></span></div></div></div><p><span class="youmax-video-list-title">'+playlistTitle+'</span><span class="youmax-video-list-views">'+getDateDiff(playlistUploaded)+' </span></p></li>');

		}
		
		createGrid($youmaxContainer,"getPlaylistVideos");
		
	},	
	
	
	//insert HTML for video thumbnails into youmax grid
	insertUserSearchVideos = function(response,searchQuery,loadMoreFlag,$youmaxContainer) {
		//console.log('inside insertUserSearchVideos');
		//console.log(response);

		if(!loadMoreFlag) {
			//$youmaxContainerList.empty();
			if($youmaxContainer.find('.youmax-tab-hover').length==0) {
				$youmaxContainer.find('#youmax-showing-title').append('<div id="query_'+searchQuery+'" class="youmax-tab youmax-tab-hover">Showing Search for "'+searchQuery+'"</div>').show();
			}
			
			if(null==response.items || response.items.length==0) {
				var $youmaxContainerList = $youmaxContainer.find('ul');
				$youmaxContainerList.append('<div class="youmax-not-found"><span style="opacity:0;">.</span><br><br><br><br><br><br>No videos found..<br><br><br><br><br><br><span style="opacity:0;">.</span></div>');
			}
			
		}

		
		insertSearchVideos(response,$youmaxContainer);
	},

	//insert HTML for video thumbnails into youmax grid
	insertSearchVideos = function(response,$youmaxContainer) {
		//console.log('inside insertSearchVideos');
		//console.log(response);
		var videoIdArray = [];
		var $youmaxContainerList = $youmaxContainer.find('ul');
		//console.log('loadMoreFlag-'+loadMoreFlag);

		var videoArray = response.items;
		var nextPageToken = response.nextPageToken;
		var $youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
		//console.log('nextPageToken-'+nextPageToken);
		
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			$youmaxLoadMoreDiv.data('nextpagetoken',nextPageToken);
		} else {
			$youmaxLoadMoreDiv.data('nextpagetoken','');
		}

		
		$youmaxLoadMoreDiv.data('nextpagetoken',nextPageToken);
		//alert(videoArray.length);
		for(var i=0; i<videoArray.length; i++) {
			videoId = videoArray[i].id.videoId;

			if($youmaxContainerList.find('#'+videoId).length>0) {
				continue;
			}
			
			videoTitle = videoArray[i].snippet.title;
			//console.log('Video title-'+videoTitle);
			if(null!=videoArray[i].snippet.thumbnails) {
				videoThumbnail = videoArray[i].snippet.thumbnails.medium.url;
			} else {
				videoThumbnail = '';
				continue;
			}
			videoUploaded = videoArray[i].snippet.publishedAt;
			
			videoIdArray.push(videoId);
			
			//console.log('videoUploaded-'+videoUploaded);
			
			$youmaxContainerList.append('<li id="'+videoId+'" href="https://www.youtube.com/watch?v='+videoId+'" ><img src="'+videoThumbnail+'"><p><span class="youmax-video-list-title">'+videoTitle+'</span><span class="youmax-video-list-views">'+getDateDiff(videoUploaded)+' </span></p></li>');

		}
		
		createGrid($youmaxContainer);
		
		getVideoStats(videoIdArray,$youmaxContainer);
		
	},

	getDateDiff = function (timestamp) {
		if(null==timestamp||timestamp==""||timestamp=="undefined")
			return "?";
		//console.log(timestamp);
		
		
		dateDiffMS = Math.abs(new Date() - new Date(timestamp));
		//console.log(dateDiffMS);
		
		dateDiffHR = dateDiffMS/1000/60/60;
		if(dateDiffHR>24) {
			dateDiffDY = dateDiffHR/24;
			if(dateDiffDY>30) {
				dateDiffMH = dateDiffDY/12;
				if(dateDiffMH>12) {
					dateDiffYR = dateDiffMH/12;
					dateDiffYR = Math.round(dateDiffYR);
					if(dateDiffYR<=1) {
						return dateDiffYR+" year ago";
					} else {
						return dateDiffYR+" years ago";
					}						
				} else {
					dateDiffMH = Math.round(dateDiffMH);
					if(dateDiffMH<=1) {
						return dateDiffMH+" month ago";
					} else {
						return dateDiffMH+" months ago";
					}						
				}
			} else {
				dateDiffDY = Math.round(dateDiffDY);
				if(dateDiffDY<=1) {
					return dateDiffDY+" day ago";
				} else {
					return dateDiffDY+" days ago";
				}
			}
		} else {
			dateDiffHR = Math.round(dateDiffHR);
			if(dateDiffHR<1) {
				return "just now";
			}else if(dateDiffHR==1) {
				return dateDiffHR+" hour ago";
			} else {
				return dateDiffHR+" hours ago";
			}
		}		

	
	},
	
	
	/*
	//utility function for date time
	getDateDiff = function (timestamp) {
		if(null==timestamp||timestamp==""||timestamp=="undefined")
			return "?";
		//console.log(timestamp);
		var splitDate=((timestamp.toString().split('T'))[0]).split('-');
		var d1 = new Date();		
		
		var d1Y = d1.getFullYear();
		var d2Y = parseInt(splitDate[0],10);
		var d1M = d1.getMonth();
		var d2M = parseInt(splitDate[1],10);

		var diffInMonths = (d1M+12*d1Y)-(d2M+12*d2Y);
		if(diffInMonths<=1)
			return "1 month";
		else if(diffInMonths<12)
			return  diffInMonths+" months";
		
		var diffInYears = Math.floor(diffInMonths/12);
		
		if(diffInYears<=1)
			return "1 year";
		else if(diffInYears<12)
			return  diffInYears+" years";

	},*/
	
	//create grid layout using Wookmark plugin
	createGrid = function($youmaxContainer,onClickAction) {
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');	
		var $youmaxContainerList = $youmaxContainer.find('ul');
		$youmaxContainerList.imagesLoaded(function() {			
		
			$youmaxContainer.find('.youmax-loading-div').remove();
			
			var options = {
			  autoResize: true, // This will auto-update the layout when the browser window is resized.
			  container: $youmaxContainer.find('#youmax-video-list-div'), // Optional, used for some extra CSS styling
			  offset: youmax_global_options.innerOffset, // Optional, the distance between grid items
			  itemWidth: youmax_global_options.minItemWidth, // Optional, the width of a grid item
			  flexibleWidth : youmax_global_options.maxItemWidth,
			  outerOffset: youmax_global_options.outerOffset
			};

			
			var handler = $youmaxContainerList.find('li');
			
			// Call the layout function.
			handler.wookmark(options);
			
			if(onClickAction=="getPlaylistVideos") {
				$youmaxContainer.find('#youmax-video-list-div li').click(function(){
					//console.log($youmaxEncloserIframe);
					displayPlaylist(this.id,$youmaxContainer);	
					youmax_current_playlist_name = $(this).find('.youmax-video-list-title').text();
					$youmaxContainer.data('youmax_current_playlist_name',youmax_current_playlist_name);
					$youmaxContainer.data('youmax_current_playlist_id',this.id);
				});
			} else {
				registerPopup($youmaxContainer);
			}
			resetLoadMoreButton($youmaxContainer);
			
		});
	},
	
	resetLoadMoreButton = function($youmaxContainer) {
		var $youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
		$youmaxLoadMoreDiv.removeClass('youmax-load-more-div-click');
		$youmaxLoadMoreDiv.text('LOAD MORE');
	},
	
	resetLoadMoreComments = function($youmaxContainer) {
		var $youmaxMoreButton = $youmaxContainer.find(".youmax-encloser-comment-button.youmax-more-button");
		$youmaxMoreButton.removeClass('youmax-load-more-comments-clicked');
		$youmaxMoreButton.text('Load More Comments');
	},
	
	//register video popup on video thumbnails
	registerPopup = function($youmaxContainer) {
	
		var frame_source="";
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		if(youmax_global_options.displayVideo=="popup") {
			//display video in popup
			frame_source = youmax_global_options.videoProtocol + "//www.youtube.com/embed/%id%?rel=0";
			if(youmax_global_options.autoPlayVideo) {
				frame_source+="&autoplay=1";
			}
			$youmaxContainer.find('#youmax-video-list-div li').magnificPopup({
				type:'iframe',
				iframe:{
					markup: '<div class="mfp-iframe-scaler">'+
					'<div class="mfp-close"></div>'+
					'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
					'<div id="youmax-encloser-comment-wrapper" class="youmax-encloser-comment-wrapper-popup"><div class="youmax-encloser-comment-button youmax-show-button youmax-popup-show-button">Show Comments</div><div id="youmax-encloser-comment-holder" class="youmax-encloser-comment-holder-popup"><div class="youmax-video-comment"><textarea class="youmax-comment-textbox" placeholder="Share your Thoughts..."></textarea><button type="button" class="youmax-add-comment-button">G+ Sign In</button></div><div id="youmax-encloser-comments"></div><div class="youmax-encloser-comment-button youmax-more-button">Load More Comments</div></div></div>'+
					'</div>',
					patterns: {
						youtube: {
							src: frame_source
						}
					}
				},
				preloader:false,
				showCloseBtn: true, 
				closeBtnInside: true, 
				closeOnContentClick: false, 
				closeOnBgClick: true, 
				enableEscapeKey: true, 
				modal: false, 
				alignTop: youmax_global_options.alignPopupToTop, 
				removalDelay: 100, 
				mainClass: ' ',
				prependTo: $youmaxContainer.get(),
				callbacks: {
					open: function(template, values, item) {
						// Triggers each time when content of popup changes
						//console.log('open:',item);
						
						videoUrl = $youmaxContainer.find('.mfp-content iframe').attr('src');
						videoId = videoUrl.substring(videoUrl.indexOf('/embed/')+7);
						if(videoUrl.indexOf('?')!=-1) {
							videoId = videoId.substring(0,videoId.indexOf('?'));
						}
						//console.log('videoId-'+videoId);
						//console.log($youmaxContainer);
						$youmaxContainer.find('.youmax-show-button.youmax-popup-show-button').attr('id',videoId).show();
						$youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button').data('start-index',1);
						$youmaxContainer.find('#youmax-encloser-comment-holder').hide();
						
						if(youmax_global_options.autoLoadComments) {
							$youmaxContainer.find('.youmax-encloser-comment-button.youmax-show-button').click();
						}

					}			
				}
			});		
			
			//TODO: add video id as Id of show button
			
		} else if(youmax_global_options.displayVideo=="inline" || youmax_global_options.displayVideo=="newpage"){
			//display inline video
			//http://www.youtube.com/embed/%id%?rel=0&autoplay=1
			//var $youmaxEncloserIframe = $youmaxContainer.find('#youmax-encloser-video');
			$youmaxContainer.find('#youmax-video-list-div li').click(function() {
				//console.log($youmaxEncloserIframe);
				
				displayInlineVideo(this.id,true,true,$youmaxContainer);
				/*
				//$youmaxEncloserIframe = $(this).parent().parent().prev().find('#youmax-encloser-video');
				$youmaxEncloserIframe = $youmaxContainer.find('#youmax-encloser-video');
				$youmaxEncloserIframe.attr("src","");
				$youmaxEncloserIframe.parents("#youmax-encloser").show();
				$('html, body').animate({scrollTop: $youmaxEncloserIframe.offset().top - 50},'slow');
				//$youmaxEncloserIframe.show();
				frame_source = "http://www.youtube.com/embed/"+this.id+"?rel=0";
				if(youmax_global_options.autoPlayVideo) {
					frame_source+="&autoplay=1";
				}
				$youmaxEncloserIframe.attr("src",frame_source);
				
				//5.0 comments --------------------
				$youmaxContainer.find('.youmax-encloser-comment-button.youmax-show-button').attr('id',this.id).show();
				$youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button').data('start-index',1);
				$youmaxContainer.find('#youmax-encloser-comment-holder').hide();
					
				if(youmax_global_options.displayVideo=="newpage") {
					//empty thumbnails
					$youmaxContainer.find('#youmax-video-list-div li').remove();
					$youmaxContainer.find('#youmax-video-list-div').css('height','20px');
					//disable load more videos button
					$youmaxContainer.find('#youmax-load-more-div').attr('disabled','disabled');
					//remove highlight on tabs
					$youmaxContainer.find('.youmax-tab-hover').removeClass('youmax-tab-hover');
					//show comments
					$youmaxContainer.find('.youmax-encloser-comment-button.youmax-show-button').click();
					//hide showing playlists banner
					$youmaxContainer.find('#youmax-showing-title').empty().hide();
					//$famaxContainerList.find('li').trigger('refreshWookmark');
					
					//6.0 added 
					if(youmax_global_options.linkNewPages) {
						if(location.href.indexOf('?v=')==-1 && location.href.indexOf('&v=')==-1 ) {
							location.href += ( location.search.length ? '&' : '?' ) + 'v=' + this.id;
						} else {
							//console.log(location.href);
							//console.log(location_href[1]);						
							location_href = location.href.match(/(v=.+?)($|&)/,'');
							location.href = location.href.replace(location_href[1],'v=' + this.id);
						}
					}
				}*/
			
			});
			
			if(youmax_global_options.displayVideo=="inline" && youmax_global_options.displayFirstVideoOnLoad) {
				videoId = $youmaxContainer.find('#youmax-video-list-div li:first').attr('id');
				displayInlineVideo(videoId,false,false,$youmaxContainer);
			}
			
			if(youmax_global_options.displayVideo=="inline" && youmax_global_options.featuredVideo!="") {
				videoId = youmax_global_options.featuredVideo.substring(youmax_global_options.featuredVideo.lastIndexOf("?v=")+3);
				displayInlineVideo(videoId,false,false,$youmaxContainer);
				youmax_global_options.featuredVideo="";
				$youmaxContainer.data('youmax_global_options',youmax_global_options);
			}

		}
	
	},
	
	displayInlineVideo = function(videoId,scrollToVideo,generateLink,$youmaxContainer) {
	
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		//$youmaxEncloserIframe = $(this).parent().parent().prev().find('#youmax-encloser-video');
		$youmaxEncloserIframe = $youmaxContainer.find('#youmax-encloser-video');
		$youmaxEncloserIframe.attr("src","");
		$youmaxEncloserIframe.parents("#youmax-encloser").show();
		
		if(scrollToVideo) {
			$('html, body').animate({scrollTop: $youmaxEncloserIframe.offset().top - 50},'slow');
		}
		
		//$youmaxEncloserIframe.show();
		frame_source = youmax_global_options.videoProtocol+"//www.youtube.com/embed/"+videoId+"?rel=0";
		if(youmax_global_options.autoPlayVideo) {
			frame_source+="&autoplay=1";
		}
		$youmaxEncloserIframe.attr("src",frame_source);
		
		//5.0 comments --------------------
		$youmaxContainer.find('.youmax-encloser-comment-button.youmax-show-button').attr('id',videoId).show();
		$youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button').data('start-index',1);
		$youmaxContainer.find('#youmax-encloser-comment-holder').hide();
		
		if(youmax_global_options.autoLoadComments) {
			$youmaxContainer.find('.youmax-encloser-comment-button.youmax-show-button').click();
		}
			
		if(youmax_global_options.displayVideo=="newpage") {
			//console.log('generateLink-'+generateLink);
			//6.0 added 
			if(youmax_global_options.linkNewPages && generateLink) {
				if(location.href.indexOf('?v=')==-1 && location.href.indexOf('&v=')==-1 ) {
					location.href += ( location.search.length ? '&' : '?' ) + 'v=' + videoId;
				} else {
					//console.log(location.href);
					//console.log(location_href[1]);						
					location_href = location.href.match(/(v=.+?)($|&)/,'');
					location.href = location.href.replace(location_href[1],'v=' + videoId);
				}
			} else {
			
				//empty thumbnails
				$youmaxContainer.find('#youmax-video-list-div li').remove();
				$youmaxContainer.find('#youmax-video-list-div').css('height','20px');
				//disable load more videos button
				$youmaxContainer.find('#youmax-load-more-div').attr('disabled','disabled');
				//remove highlight on tabs
				$youmaxContainer.find('.youmax-tab-hover').removeClass('youmax-tab-hover');
				//show comments
				$youmaxContainer.find('.youmax-encloser-comment-button.youmax-show-button').click();
				//hide showing playlists banner
				$youmaxContainer.find('#youmax-showing-title').empty().hide();
				//$famaxContainerList.find('li').trigger('refreshWookmark');
			
			}
		}
	
	},
	
	//display tabs for search criteria
	displaySearchTab = function(name,restrictToChannels,relatedTo,searchQuery,searchOrder,eventType,count,apiKey,$youmaxContainer) {
		
		searchTabId = 'search_'+count+'_'+$.now();
		$youmaxContainer.find('#youmax-tabs').append('<span id="'+searchTabId+'" class="youmax-tab" >'+name+'</span>');
		$youmaxContainer.find('#youmax-select').append('<option value="'+searchTabId+'" >'+name+'</option>');
		
		$searchTab = $youmaxContainer.find('#'+searchTabId);
	
		//restrictToChannels
		$searchTab.data('restrictToChannels',[]);
		var restrictedChannelArray = restrictToChannels.split(',');
		for(var i=0; i<restrictedChannelArray.length; i++) {
			if(restrictedChannelArray[i]!=null) {
				s=restrictedChannelArray[i].indexOf("/user/");
				////console.log('s-'+s);
				if(s!=-1) {
					userId = restrictedChannelArray[i].substring(s+6);
					//console.log('userId-'+userId);
					apiUrl = "https://www.googleapis.com/youtube/v3/channels?part=id&forUsername="+userId+"&key="+apiKey;
					getChannelIdForSearch(apiUrl,$searchTab);
				} else {
					s=restrictedChannelArray[i].indexOf("/channel/");
					if(s!=-1) {
						channelId = restrictedChannelArray[i].substring(s+9);
						restrictedChannels = $searchTab.data("restrictToChannels");
						//console.log(restrictedChannels);
						restrictedChannels.push(channelId);
						$searchTab.data("restrictToChannels",restrictedChannels);
					} else {
						$searchTab.data("restrictToChannels","");
					}
				}
			}
		}
		
		//relatedTo
		s=relatedTo.indexOf("/watch?v=");
		if(s!=-1) {
			videoId = relatedTo.substring(s+9);
			//console.log('videoId-'+videoId);
			$searchTab.data("relatedTo",videoId);
		} else {
			$searchTab.data("relatedTo","");
		}
		
		//searchQuery
		if(searchQuery!=null) {
			$searchTab.data("searchQuery",searchQuery);
		} else {
			$searchTab.data("searchQuery","");
		}
		
		//searchOrder
		$searchTab.data("searchOrder",searchOrder);
		
		//eventType
		if(eventType!=null) {
			$searchTab.data("eventType",eventType);
		} else {
			$searchTab.data("eventType","");
		}
		
		//click the selectedTab
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		if(youmax_global_options.selectedTab.charAt(0)=='s') {
			searchSelect = (youmax_global_options.selectedTab.charAt(1));
			//console.log('searchSelect-'+searchSelect);
			//console.log('count-'+count);
			if(count.toString()==searchSelect) {
				$('#'+searchTabId).click();
			}
		}
		
	},
	
	//get search videos when a tab is clicked
	getSearchVideos = function(searchTabId, pageToken, $youmaxContainer) {
	
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		var maxResults = youmax_global_options.maxResults;
		
		//console.log('getPlaylistVideos pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&pageToken="+pageToken;
			loadMoreFlag = true;
		}
		
		if(!loadMoreFlag) {
			//$youmaxContainer.find('ul').empty();
		}	
	
		$searchTab = $('#'+searchTabId);
		restrictedChannels = $searchTab.data("restrictToChannels");
		relatedTo = $searchTab.data("relatedTo");
		searchQuery = $searchTab.data("searchQuery");
		searchOrder = $searchTab.data("searchOrder");
		eventType = $searchTab.data("eventType");
		
		var apiURLArray = [];
		
		var searchQueryString = "";
		if(null!=searchQuery && searchQuery!="") {
		searchQuery=searchQuery.replace(/ /g,"%20");
		searchQueryString = "&q="+(searchQuery);
		}
		
		var relatedToString = "";
		if(null!=relatedTo && relatedTo!="") {
		relatedToString = "&relatedToVideoId="+relatedTo;
		}
		
		var eventTypeString = "";
		if(null!=eventType && eventType!="") {
		eventTypeString = "&eventType="+eventType;
		}
		
		var searchOrderString = "";
		if(null!=searchOrder && searchOrder!="") {
		searchOrderString = "&order="+searchOrder;
		}
		
		var restrictedChannelsString = "";
		if(null!=restrictedChannels && restrictedChannels.length>0) {
		restrictedChannelsString = "&channelId="+restrictedChannels[0];
		}
		
		if(restrictedChannels.length>0) {
			maxResults = maxResults/restrictedChannels.length;
		}

		
		apiURLArray.push("https://www.googleapis.com/youtube/v3/search?part=snippet"+searchQueryString+relatedToString+eventTypeString+searchOrderString+restrictedChannelsString+"&type=video&maxResults="+maxResults+pageTokenUrl+"&key="+apiKey);

		
		for(var l=1; l<restrictedChannels.length; l++) {
			apiURLArray.push("https://www.googleapis.com/youtube/v3/search?part=snippet"+searchQueryString+relatedToString+eventTypeString+searchOrderString+"&channelId="+restrictedChannels[l]+"&type=video&maxResults="+maxResults+pageTokenUrl+"&key="+apiKey);
		}

		
		
		//console.log('restrictedChannels-'+restrictedChannels);
		//console.log('relatedTo-'+relatedTo);
		//console.log('searchQuery-'+searchQuery);
		//console.log('searchOrder-'+searchOrder);
		
		
		for(var l=0; l<apiURLArray.length; l++) {
			
			/*if(!loadMoreFlag && l>0) {
				loadMoreFlag=true;
			}*/
			
			apiPlaylistVideosURL = apiURLArray[l];
			
			//console.log('getSearchVideos apiPlaylistVideosURL-'+apiPlaylistVideosURL);
			//console.log('loadMoreFlag -'+loadMoreFlag);
			
			$.ajax({
				url: apiPlaylistVideosURL,
				type: "GET",
				async: true,
				cache: true,
				dataType: 'jsonp',
				success: function(response) { insertSearchVideos(response,$youmaxContainer);},
				error: function(html) { alert(html); },
				beforeSend: setHeader
			});
		}
	},


	//get search videos for search text box
	getUserSearchVideos = function(searchQuery, pageToken, $youmaxContainer) {
	
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		var maxResults = youmax_global_options.maxResults;
		
		//console.log('getPlaylistVideos pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&pageToken="+pageToken;
			loadMoreFlag = true;
		}
		
		/*if(!loadMoreFlag) {
			$youmaxContainer.find('ul').empty();
		}*/
		
		searchQuery = searchQuery.substring(searchQuery.indexOf("_")+1);
		if(null!=searchQuery && searchQuery.trim()!="") {
			searchQuery=searchQuery.trim().replace(/ /g,"%20");
		} else {
			return;
		}
		
		var restrictedChannelsString = "";
		if(youmax_global_options.searchBoxScope=="channel") {
			restrictedChannelsString = "&channelId="+youmax_global_options.channelId;
		}
		
		apiSearchURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="+searchQuery+"&order=relevance"+restrictedChannelsString+"&type=video&maxResults="+maxResults+pageTokenUrl+"&key="+apiKey;
			
		$.ajax({
			url: apiSearchURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { insertUserSearchVideos(response,searchQuery,loadMoreFlag,$youmaxContainer);},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
		
	},
	

	
	//display loading.. text
	showLoader = function($youmaxContainer) {
		$youmaxContainer.find('#youmax-video-list-div>ul').empty();
		$youmaxContainer.find('#youmax-video').hide();
		$youmaxContainer.find('#youmax-video').attr('src','');
		$youmaxContainer.find('#youmax-video-list-div>ul').append('<div class="youmax-loading-div" style="text-align:center; height:200px; font:14px Calibri;"><span style="opacity:0;">.</span><br><br><br><br>loading HD...<br><br><br><br><br><br><span style="opacity:0;">.</span></div>');
		$youmaxContainer.find('#youmax-showing-title').empty().hide();
	},
	
	
	displayComments = function(videoId, $youmaxContainer) {
	
		$youmaxContainer.find(".youmax-encloser-comment-button.youmax-show-button").hide();
		$youmaxContainer.find("#youmax-encloser-comment-holder").show();
		//$youmaxContainer.find("#youmax-encloser-comments").empty().append("<br><br><br><br><br>Loading...<br><br><br><br><br>");
		$youmaxContainer.find("#youmax-encloser-comments").empty().append("<div class='youmax-loading-comments-div'>loading...</div>");
		//showLoader($youmaxContainer);
		
		getVideoComments(videoId,$youmaxContainer);
		
		/*
		if(playlistId.indexOf("search")!=-1) {
			getSearchVideos(playlistId,null,$youmaxContainer);
		} else if(playlistId.indexOf("playlists")!=-1) {
			getChannelPlaylists(playlistId,null,$youmaxContainer);
		} else {
			getPlaylistVideos(playlistId,null,$youmaxContainer);			
		}*/
		
		/*$youmaxContainer.find('.youmax-tab').removeClass('youmax-tab-hover');	
		$('#'+playlistId).addClass('youmax-tab-hover');
		$youmaxContainer.find('#youmax-select').val(playlistId);*/

	},

	loadMoreComments = function($youmaxContainer) {
	
		var $youmaxMoreButton = $youmaxContainer.find(".youmax-encloser-comment-button.youmax-more-button");
		$youmaxMoreButton.addClass('youmax-load-more-comments-clicked');
		$youmaxMoreButton.text('loading...');

		var nextPageToken = $youmaxMoreButton.data('nextpagetoken');
		//var startIndex = parseInt($youmaxMoreButton.data('start-index'),10);
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			videoId = $youmaxContainer.find(".youmax-encloser-comment-button.youmax-show-button").attr('id');
			getVideoComments(videoId,$youmaxContainer,nextPageToken);
			//$('html, body').animate({scrollTop: $youmaxCommentHolder.offset().top - 50},'slow');
		} else {
			$youmaxMoreButton.text('All Done');
		}
		
	},
	
	displayPlaylist = function(playlistId,$youmaxContainer) {
	
		$youmaxContainer.find("#youmax-encloser").hide();
		$youmaxContainer.find("#youmax-encloser-video").attr("src","");
		showLoader($youmaxContainer);
		
		if(playlistId.indexOf("search_")!=-1) {
			getSearchVideos(playlistId,null,$youmaxContainer);
		} else if(playlistId.indexOf("playlists_")!=-1) {
			getChannelPlaylists(playlistId,null,$youmaxContainer);
		} else if(playlistId.indexOf("query_")!=-1) {
			getUserSearchVideos(playlistId,null,$youmaxContainer);
		} else {
			getPlaylistVideos(playlistId,null,$youmaxContainer);			
		}
		
		$youmaxContainer.find('.youmax-tab').removeClass('youmax-tab-hover');	
		$('#'+playlistId).addClass('youmax-tab-hover');
		$youmaxContainer.find('#youmax-select').val(playlistId);

	},
	
	displayVideoFromUrl = function($youmaxContainer) {
		if(location.href.indexOf('v=')!=-1) {
			location_href = location.href.match(/v=(.+?)($|&)/,'');
			videoId = location_href[1];
			displayInlineVideo(videoId,false,false,$youmaxContainer);
			
			var youmax_global_options = $youmaxContainer.data('youmax_global_options');
			youmax_global_options.selectedTab='xxx';
			$youmaxContainer.data('youmax_global_options',youmax_global_options);
		}
	};




	//youmax plugin definition
    $.fn.youmax = function(options) {
		
		var youmax_global_options = {};
		var $youmaxContainer = this;
		var searchDefaults = {name:'Search',restrictToChannels:'',relatedTo:'',searchQuery:'',searchOrder:'',eventType:''};
		//console.log($youmaxContainer.attr('id'));

		//Get CSS for Skins
		//console.log('options.skin-'+options.skin);
		if(options.skin=="white" || options.skin=="grey" || options.skin=="blue") {
			if (document.createStyleSheet){
                document.createStyleSheet("./css/youmax_"+options.skin+".min.css");
            } else {
                $("head").append("<link rel='stylesheet' href='./css/youmax_"+options.skin+".min.css' type='text/css' />");
            }
		} else {
			//don't load any styles
			//user will load them manually
		}
		
		//set local options
		youmax_global_options.apiKey = options.apiKey;
		youmax_global_options.clientId = options.clientId||'';
		youmax_global_options.maxResults = options.maxResults||18;
		youmax_global_options.innerOffset = options.innerOffset||40;
		youmax_global_options.outerOffset = options.outerOffset||40;
		youmax_global_options.minItemWidth = options.minItemWidth||250;
		youmax_global_options.maxItemWidth = options.maxItemWidth||400;
		
		//5.0 - can be popup|inline|newpage
		youmax_global_options.displayVideo = options.displayVideo||'popup';
		youmax_global_options.aspectRatio = 360/640;
		youmax_global_options.selectedTab = options.selectedTab||"u"; //can be u|s1|s2|...|p1|p2|...|l
		youmax_global_options.alwaysUseDropdown = options.alwaysUseDropdown;
		youmax_global_options.maxPlaylistNameLength = 22;
		
		//added in 5.0
		youmax_global_options.autoPlayVideo = options.autoPlayVideo||false;
		youmax_global_options.displayFirstVideoOnLoad = options.displayFirstVideoOnLoad||false;
		youmax_global_options.imagesFolderPath = options.imagesFolderPath||"./images";
		
		//added in 6.0
		youmax_global_options.linkNewPages = options.linkNewPages||false;
		youmax_global_options.videoProtocol = options.videoProtocol||"http:";
		youmax_global_options.featuredVideo = options.featuredVideo||"";
		youmax_global_options.searchBoxScope = options.searchBoxScope||"channel";
		youmax_global_options.autoLoadComments = options.autoLoadComments||false;
		youmax_global_options.alignPopupToTop = options.alignPopupToTop||false;
		
		//added in 7.0
		youmax_global_options.commentOrder = options.commentOrder||"time"; //time|relevance
		
		

		//set global options
		$youmaxContainer.data('youmax_global_options',youmax_global_options);
		
		//add fontawesome icons
		if (document.createStyleSheet){
			document.createStyleSheet(youmax_global_options.videoProtocol+"//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css");
		} else {
			$("head").append("<link rel='stylesheet' href='"+youmax_global_options.videoProtocol+"//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css' type='text/css' />");
		}
		
		options.maxContainerWidth = options.maxContainerWidth||1000;
		$youmaxContainer.css('max-width',(options.maxContainerWidth)+'px');
		
		//adding media queries manually if maxContainerWidth is very low (widget mode)
		if(options.maxContainerWidth<800) {
			$("body").append("<style>#youmax-stat-holder {display:none;}.youmax-subscribe {left:initial;}#youmax-select-box{display:block;}#youmax-tabs {display:none;}</style>");
		}

		if(options.maxContainerWidth<500) {
			$("body").append("<style>#youmax-stat-holder {display:none;}.youmax-subscribe {display:none;}.youmax-tab {width: 42%;text-align: center;}</style>");
		}

		if(options.maxContainerWidth<300) {
			$("body").append("<style>.youmax-tab {width: 90%;text-align: center;}</style>");
		}

		
		
		
		//console.log(options);
		
		initYoumax($youmaxContainer);

		
		if(youmax_global_options.displayVideo=="newpage" && youmax_global_options.linkNewPages) {
			displayVideoFromUrl($youmaxContainer);
		}
		
		////console.log($youmaxContainer);
		////console.log($youmaxContainer.length);
		////console.log($youmaxContainer.attr('id'));
		////console.log(options.playList1);
		
		var s,playlistId,channelId,userId,apiUrl;
		var playlistIdArray = [];
		
		//Get Channel header and details 
		if(options.channel!=null) {
			s=options.channel.indexOf("/user/");
			////console.log('s-'+s);
			if(s!=-1) {
				userId = options.channel.substring(s+6);
				//console.log('userId-'+userId);
				apiUrl = "https://www.googleapis.com/youtube/v3/channels?part=id&forUsername="+userId+"&key="+options.apiKey;
				getChannelId(apiUrl,$youmaxContainer);
			} else {
				s=options.channel.indexOf("/channel/");
				if(s!=-1) {
					channelId = options.channel.substring(s+9);
					//console.log('channelId-'+channelId);
					getChannelDetails(channelId,$youmaxContainer);
				} else {
					alert("Could Not Find Channel..");
				}
			}
		}
		
		//get playlist details
		if($.isArray(options.playList)) {
			for(var i=0; i<options.playList.length; i++) {
				s=options.playList[i].indexOf("list=");
				//console.log('s-'+s);
				if(s!=-1) {
					playlistId = options.playList[i].substring(s+5);
					//console.log('playlistId-'+playlistId);
					playlistIdArray.push(playlistId);
				} else {
					//alert("Could Not List Videos..");
				}
			}
		}
		
		//get all playlist details
		getPlaylistDetails(playlistIdArray,$youmaxContainer);
		
		//display search tabs
		if($.isArray(options.searchTab)) {
			for(var i=0; i<options.searchTab.length; i++) {
				searchOptions=options.searchTab[i];
				//console.log(searchOptions);
				if(null!=searchOptions) {
					displaySearchTab(searchOptions.name||searchDefaults.name,
									searchOptions.restrictToChannels||searchDefaults.restrictToChannels,
									searchOptions.relatedTo||searchDefaults.relatedTo,
									searchOptions.searchQuery||searchDefaults.searchQuery,
									searchOptions.searchOrder||searchDefaults.searchOrder,
									searchOptions.eventType||searchDefaults.eventType,
									(i+1),
									youmax_global_options.apiKey,
									$youmaxContainer);
				
				} else {
					//alert("Could Not List Videos..");
				}
			}
		}
		
		//return this for chaining
		return this;
 
    };
	
 
}( jQuery ));


	function youmaxSaveToken(authResult) {
		//console.log(authResult);
		if (authResult['status']['signed_in']) {	
			youmaxLoggedInUser.youmaxAccessToken = authResult.access_token;
			jQuery('.youmax-add-comment-button').removeAttr('disabled').text('POST');
			//console.log('User Signed in');
		}/* else {
			youmaxAccessToken = "";
			$('.youmax-add-comment-button').text('G+ Sign In');
			//console.log('Sign in Error');
			//console.log('Sign-in state: ' + authResult['error']);
		}*/
	}