//Youmax 9.0 - http://codecanyon.net/item/youmax-youtube-channel-on-your-website/9989505

var youmaxLoggedInUser = {};
var layoutResizeTimer;
var $youmaxGrid;

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

	//get videos of Vimeo User
	getVimeoUserVideos = function (userId,pageToken,$youmaxContainer) {
		//console.log('inside getVimeoVideos');
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var maxResults = youmax_global_options.maxResults;
		//console.log('getVimeoUserVideos pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&"+pageToken;
			loadMoreFlag = true;
		}
		
		//userId = tabId.substring(tabId.indexOf("_")+1);
		//console.log("userId-"+userId);
		
		apiVimeoVideosURL = "https://api.vimeo.com/users/"+userId+"/videos?access_token="+youmax_global_options.vimeoAccessToken+"&per_page="+maxResults+pageTokenUrl;
		
		//console.log('getVimeoUserVideos apiVimeoVideosURL-'+apiVimeoVideosURL);
		
		$.ajax({
			url: apiVimeoVideosURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'json',
			success: function(response) { insertVimeoVideos(response,loadMoreFlag,$youmaxContainer);},
			error: function(html) { alert(html); 
				//console.log(html);
			},
			beforeSend: setHeader
		});
	},

	//get videos of Vimeo User
	getVimeoChannelVideos = function (channelId,pageToken,$youmaxContainer) {
		//console.log('inside getVimeoVideos');
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var maxResults = youmax_global_options.maxResults;
		//console.log('getVimeoUserVideos pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&"+pageToken;
			loadMoreFlag = true;
		}
		
		//console.log("channelId-"+channelId);
		
		apiVimeoVideosURL = "https://api.vimeo.com/channels/"+channelId+"/videos?access_token="+youmax_global_options.vimeoAccessToken+"&per_page="+maxResults+pageTokenUrl;
		
		//console.log('getVimeoUserVideos apiVimeoVideosURL-'+apiVimeoVideosURL);
		
		$.ajax({
			url: apiVimeoVideosURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'json',
			success: function(response) { insertVimeoVideos(response,loadMoreFlag,$youmaxContainer);},
			error: function(html) { alert(html); 
				//console.log(html);
			},
			beforeSend: setHeader
		});
	},

	
	//get videos of Vimeo Group
	getVimeoGroupVideos = function (groupId,pageToken,$youmaxContainer) {
		//console.log('inside getVimeoGroupVideos');
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var maxResults = youmax_global_options.maxResults;
		//console.log('getVimeoUserVideos pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&"+pageToken;
			loadMoreFlag = true;
		}
		
		//console.log("groupId-"+groupId);
		
		apiVimeoVideosURL = "https://api.vimeo.com/groups/"+groupId+"/videos?access_token="+youmax_global_options.vimeoAccessToken+"&per_page="+maxResults+pageTokenUrl;
		
		//console.log('getVimeoUserVideos apiVimeoVideosURL-'+apiVimeoVideosURL);
		
		$.ajax({
			url: apiVimeoVideosURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'json',
			success: function(response) { insertVimeoVideos(response,loadMoreFlag,$youmaxContainer);},
			error: function(html) { alert(html); 
				//console.log(html);
			},
			beforeSend: setHeader
		});
	},
	

	//get videos of Vimeo Album
	getVimeoAlbumVideos = function (albumId,pageToken,$youmaxContainer) {
		//console.log('inside getVimeoAlbumVideos');
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var maxResults = youmax_global_options.maxResults;
		//console.log('getVimeoUserVideos pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&"+pageToken;
			loadMoreFlag = true;
		}
		
		//console.log("albumId-"+albumId);
		
		apiVimeoVideosURL = "https://api.vimeo.com/albums/"+albumId+"/videos?access_token="+youmax_global_options.vimeoAccessToken+"&per_page="+maxResults+pageTokenUrl;
		
		//console.log('getVimeoUserVideos apiVimeoVideosURL-'+apiVimeoVideosURL);
		
		$.ajax({
			url: apiVimeoVideosURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'json',
			success: function(response) { insertVimeoVideos(response,loadMoreFlag,$youmaxContainer);},
			error: function(html) { alert(html); 
				//console.log(html);
			},
			beforeSend: setHeader
		});
	},
	

	
	
	//get videos of any playlist using youtube API
	getChannelEvents = function (channelId,pageToken,$youmaxContainer) {
		//console.log('inside getChannelEvents');
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
		
		//var channelId = playlistTabId.substring(playlistTabId.indexOf("_")+1);
		
		if(!loadMoreFlag) {
			//first load will club a single response of live, upcoming and completed events
			//load more will show only completed events
			eventCache = {
				items : [],
				nextPageToken : "youmax-generated"
			};
			eventCacheStatus = [];
			$youmaxContainer.data('eventcache',eventCache);
			$youmaxContainer.data('eventcachestatus',eventCacheStatus);
			
			//live events
			apiEventVideosURL = "https://www.googleapis.com/youtube/v3/search?part=snippet"+"&eventType=live&order=date"+"&channelId="+channelId+"&type=video&maxResults=50&key="+apiKey;
			
			$.ajax({
				url: apiEventVideosURL,
				type: "GET",
				async: true,
				cache: true,
				dataType: 'jsonp',
				success: function(response) {
					eventCacheCollector(response,$youmaxContainer,"live");
					//insertSearchVideos(response,$youmaxContainer,false,true);
				},
				error: function(html) { alert(html); },
				beforeSend: setHeader
			});
			
			setTimeout(function(){

				//upcoming events
				apiEventVideosURL = "https://www.googleapis.com/youtube/v3/search?part=snippet"+"&eventType=upcoming&order=date"+"&channelId="+channelId+"&type=video&maxResults=50&key="+apiKey;
				
				$.ajax({
					url: apiEventVideosURL,
					type: "GET",
					async: true,
					cache: true,
					dataType: 'jsonp',
					success: function(response) { 
						eventCacheCollector(response,$youmaxContainer,"upcoming");
						//insertSearchVideos(response,$youmaxContainer,false,true);
					},
					error: function(html) { alert(html); },
					beforeSend: setHeader
				});
			
			}, 200);
			
			setTimeout(function(){
				
				if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
					maxResults = 50;
				}
				
				//completed events
				apiEventVideosURL = "https://www.googleapis.com/youtube/v3/search?part=snippet"+"&eventType=completed&order=date"+"&channelId="+channelId+"&type=video&maxResults="+maxResults+"&key="+apiKey;
				
				$.ajax({
					url: apiEventVideosURL,
					type: "GET",
					async: true,
					cache: true,
					dataType: 'jsonp',
					success: function(response) { 
						eventCacheCollector(response,$youmaxContainer,"completed");
						//insertSearchVideos(response,$youmaxContainer,false,true);
					},
					error: function(html) { alert(html); },
					beforeSend: setHeader
				});
				
			}, 400);
			
			
		} else {
	
			//completed events for load more
			apiEventVideosURL = "https://www.googleapis.com/youtube/v3/search?part=snippet"+"&eventType=completed&order=date"+"&channelId="+channelId+"&type=video&maxResults="+maxResults+pageTokenUrl+"&key="+apiKey;
			
			$.ajax({
				url: apiEventVideosURL,
				type: "GET",
				async: true,
				cache: true,
				dataType: 'jsonp',
				success: function(response) { insertSearchVideos(response,$youmaxContainer,false,true,loadMoreFlag);},
				error: function(html) { alert(html); },
				beforeSend: setHeader
			});
			
		}
	},
	
	eventCacheCollector = function(response,$youmaxContainer,eventType) {
		
		//console.log("tripleResponseCollector");
		//console.log(response);
		//console.log(eventCache);
		
		
		eventCache = $youmaxContainer.data('eventcache');
		eventCacheStatus = $youmaxContainer.data('eventcachestatus');

		
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		if(null!=response.items && response.items.length > 0) {
			eventCache.items = eventCache.items.concat(response.items);
		}
		
		if(eventType=="completed") {
			eventCache.nextPageToken = response.nextPageToken;
		}
		
		eventCacheStatus.push(eventType);
		
		if(eventCacheStatus.length>=3 && eventCacheStatus.indexOf("live")!=-1 && eventCacheStatus.indexOf("upcoming")!=-1 && eventCacheStatus.indexOf("completed")!=-1 ) {
			if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
				//console.log(eventCache.items);
				//pagination
				cache = eventCache.items;
				cacheIndex = -1-youmax_global_options.maxResults;
				$youmaxContainer.data('cache',cache);
				$youmaxContainer.data('cacheindex',cacheIndex);
				$youmaxContainer.find('#youmax-next-div').data('nextpagetoken',eventCache.nextPageToken);
				//handlePagination($youmaxContainer,"next");
				paginationWrapper($youmaxContainer,"next");
			} else {
				//load more
				insertSearchVideos(eventCache,$youmaxContainer,false,true);
			}
		}
		
		$youmaxContainer.data('eventcache',eventCache);
		$youmaxContainer.data('eventcachestatus',eventCacheStatus);
	
	},
	
	//get video stats using Youtube API
	getYoutubeVideoDetails = function (videoId,$youmaxContainer,scrollToVideo,generateLink) {
		//console.log('inside getVideoDetails');
		//console.log(videoId);
		//showLoader();
		

		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");

		apiVideoDetailURL = "https://www.googleapis.com/youtube/v3/videos?part=statistics%2Csnippet&id="+videoId+"&key="+youmax_global_options.apiKey;
		
		//console.log("apiVideoDetailURL-"+apiVideoDetailURL);
		
		$.ajax({
			url: apiVideoDetailURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { 
				//console.log(response);
				$baseElement = $('<div id="youtube_'+videoId+'"><div class="youmax-video-list-title">'+response.items[0].snippet.title+'</div><div class="youmax-video-list-date">'+getDateDiff(response.items[0].snippet.publishedAt,youmax_translator_text)+'</div></div>');
				$baseElement.data('description',response.items[0].snippet.description);
				$baseElement.data('likes',convertLikeCommentCount(response.items[0].statistics.likeCount));
				$baseElement.data('views',convertViewCountForThumbnail(response.items[0].statistics.viewCount));
				$baseElement.data('channelid',response.items[0].snippet.channelId);
				displayInlineVideo($baseElement,scrollToVideo,generateLink,$youmaxContainer);
			},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},

	
	
	//get video stats using Youtube API
	getVimeoVideoDetails = function (videoId,$youmaxContainer,scrollToVideo,generateLink) {
		//console.log('inside getVimeoVideoDetails');
		//console.log(videoId);
		//showLoader();
		

		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");

		apiVideoDetailURL = "https://api.vimeo.com/videos/"+videoId+"?access_token="+youmax_global_options.vimeoAccessToken;
		
		//console.log("apiVideoDetailURL-"+apiVideoDetailURL);
		
		$.ajax({
			url: apiVideoDetailURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'json',
			success: function(response) { 
				//console.log(response);
					
				videoDescription = response.description.replace(/"/g, "'");
				videoViewCount = response.stats.plays;
				if(null==videoViewCount) {
					videoViewCount="Private";
				} else {
					videoViewCount = convertViewCountForThumbnail(videoViewCount);
				}
				
				$baseElement = $('<div id="vimeo_'+videoId+'"><div class="youmax-video-list-title">'+response.name+'</div><div class="youmax-video-list-date">'+getDateDiff(response.created_time,youmax_translator_text)+'</div></div>');
				
				$baseElement.data('description',videoDescription);
				$baseElement.data('likes',convertLikeCommentCount(response.metadata.connections.likes.total));
				$baseElement.data('comments',convertLikeCommentCount(response.metadata.connections.comments.total));
				$baseElement.data('views',convertViewCountForThumbnail(videoViewCount));
				
				$baseElement.data('channelid','');
				displayInlineVideo($baseElement,scrollToVideo,generateLink,$youmaxContainer);
			},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},

	
	getYoutubeVideoComments = function (videoId,$youmaxContainer,pageToken) {
		//console.log('inside getVideoComments');
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		var maxComments = youmax_global_options.maxComments;
		//console.log('getVideoComments pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&pageToken="+pageToken;
			loadMoreFlag = true;
		}
		
		/*var startIndex = $youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button').data('start-index');
		if(startIndex>1) {
			loadMoreFlag = true;
		}*/
		
		apiVideoCommentsURL = "https://www.googleapis.com/youtube/v3/commentThreads?part=id%2Csnippet&videoId="+videoId+pageTokenUrl+"&maxResults="+maxComments+"&key="+apiKey+"&order="+youmax_global_options.commentOrder;
		
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
	

	getVimeoVideoComments = function (videoId,$youmaxContainer,pageToken) {
		//console.log('inside getVideoComments');
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		var maxComments = youmax_global_options.maxComments;
		//console.log('getVideoComments pageToken-'+pageToken);
		if(null!=pageToken) {
			pageTokenUrl = "&"+pageToken;
			loadMoreFlag = true;
		}
		
		/*var startIndex = $youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button').data('start-index');
		if(startIndex>1) {
			loadMoreFlag = true;
		}*/
		
		apiVideoCommentsURL = "https://api.vimeo.com/videos/"+videoId+"/comments?per_page="+maxComments+"&access_token="+youmax_global_options.vimeoAccessToken+"&sort=date"+pageTokenUrl;
		//youmax_global_options.commentOrder
		
		//console.log('getVideoComments apiVideoCommentsURL-'+apiVideoCommentsURL);
		
		$.ajax({
			url: apiVideoCommentsURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'json',
			success: function(response) { insertVimeoVideoComments(response,loadMoreFlag,$youmaxContainer);},
			error: function(html) { 
				alert(html); 
				//console.log(html);
			},
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
	getChannelPlaylists = function (channelId,pageToken,$youmaxContainer) {
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
		
		//save the last viewed playlist for back button
		$youmaxContainer.data('youmax_last_channel_playlists','youtube_channel_playlists_'+channelId);
		
		//var channelId = playlistTabId.substring(playlistTabId.indexOf("_")+1);
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
		
		//top ad space
		if(youmax_global_options.showTopAdSpace) {
			//console.log("showing ad");
			//console.log($youmaxContainer.find('#youmax-top-ad'));
			//$youmaxTopAd =  $youmaxContainer.find('#youmax-top-ad').wrap('<div class="youmax-ad-space">');
			$youmaxContainer.append('<div class="youmax-ad-space">'+youmax_global_options.topAdHtml+'</div>');		
		}
		
		if(youmax_global_options.displayVideo != 'popup') {
			//encloser video
			//$youmaxContainer.append('<div id="youmax-encloser"><div class="fluid-width-video-wrapper" style="padding-top:'+(youmax_global_options.aspectRatio*100)+'%;"><iframe id="youmax-encloser-video" style="width:100%;" src="" frameborder="0" allowfullscreen></iframe></div><div id="youmax-encloser-comment-wrapper"><div id="photo-detail-holder"><div class="photo-popup-title"></div><div class="photo-popup-description"></div><div class="photo-popup-stats"><span class="media-views"></span><span class="media-likes"> </span><span class="media-uploaded"></span></div> <div class="youmax-show-button-wrapper"><div class="youmax-encloser-comment-button youmax-show-button youmax-popup-show-button">Show Comments</div></div> <div id="youmax-encloser-comment-holder" class="youmax-encloser-comment-holder-popup"><div class="youmax-video-comment youmax-commentbox-holder"><textarea class="youmax-comment-textbox" placeholder="Share your Thoughts..."></textarea><button type="button" class="youmax-add-comment-button"><i class="fa fa-sign-in fa-2x"></i></button><div type="button" class="youmax-share-video-button"><i class="fa fa-share fa-2x"></i></div></div><div id="youmax-encloser-comments"></div><div class="youmax-encloser-comment-button youmax-more-button">Load More Comments</div></div> </div> </div></div>');
			$youmaxContainer.append('<div id="youmax-encloser"></div>');

		}
		
		
		//showing playlist xxxx
		$youmaxContainer.append('<div id="youmax-showing-title"></div>');
		
		//list
		var videoListClass = "";
		if(youmax_global_options.loadMode=="paginate-sides") {
			videoListClass = "youmax-small-container";
		}		
		$youmaxContainer.append('<div id="youmax-video-list-div" class="'+videoListClass+'"><ul id="tiles"></ul></div>');

		var $youmaxLoadMoreDiv = null, $youmaxPreviousDiv = null, $youmaxNextDiv = null;
		var buttonClass = '';
		
		if(youmax_global_options.loadButtonSize=="small") {
			buttonClass = 'class="youmax-small"';
		}
		
		if(youmax_global_options.loadMode=="loadmore") {
			//load more
			$youmaxContainer.append('<button type="button" id="youmax-load-more-div" '+buttonClass+'></button>');
			$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
		} else if(youmax_global_options.loadMode=="paginate-bottom") {
			//pagination
			$youmaxContainer.append('<div class="youmax-pagination"><div class="youmax-pagination-button-wrapper youmax-left-wrapper"><button type="button" id="youmax-previous-div" '+buttonClass+'></button></div><div class="youmax-pagination-button-wrapper youmax-right-wrapper"><button type="button" id="youmax-next-div" '+buttonClass+'></button></div></div>');
			$youmaxNextDiv = $youmaxContainer.find('#youmax-next-div');
			$youmaxPreviousDiv = $youmaxContainer.find('#youmax-previous-div');
		}  else if(youmax_global_options.loadMode=="paginate-sides") {
			//pagination
			$youmaxContainer.append('<div class="youmax-pagination-button-wrapper youmax-left-wrapper youmax-side-nav"><button type="button" id="youmax-previous-div" '+buttonClass+'></button></div><div class="youmax-pagination-button-wrapper youmax-right-wrapper youmax-side-nav"><button type="button" id="youmax-next-div" '+buttonClass+'></button></div>');
			$youmaxNextDiv = $youmaxContainer.find('#youmax-next-div');
			$youmaxPreviousDiv = $youmaxContainer.find('#youmax-previous-div');
		} 
		
		resetLoadMoreButton($youmaxContainer);
		
		if(null!=$youmaxLoadMoreDiv) {
			$youmaxLoadMoreDiv.data('nextpagetoken','');
			$youmaxLoadMoreDiv.click(function(){
				loadMorePlaylistVideos($youmaxContainer);
			});
		}
		
		if(null!=$youmaxPreviousDiv) {
			$youmaxPreviousDiv.click(function(){
				paginationWrapper($youmaxContainer,"previous");
				//handlePagination($youmaxContainer,"previous");
			});
		}
		
		if(null!=$youmaxNextDiv) {
			$youmaxNextDiv.click(function(){
				paginationWrapper($youmaxContainer,"next");
				//handlePagination($youmaxContainer,"next");
			});
		}
		
		//$youmaxLoadMoreDiv.html('<i class="fa fa-plus fa-5x"></i>');
		
		
		$youmaxContainer.find('#youmax-tabs').on('click','.youmax-tab',function() {
			$youmaxContainer.find('#youmax-load-more-div').removeAttr('disabled');
			displayPlaylist(this.id,$youmaxContainer);
		});
		
		$youmaxContainer.find('#youmax-select').change(function() {
			var playlistId = $(this).find(":selected").val();
			displayPlaylist(playlistId,$youmaxContainer);
		});
		
		//5.0 - show comments
		/*$youmaxContainer.find('.youmax-encloser-comment-button.youmax-show-button').click(function(){
			displayComments(this.id,$youmaxContainer);
		});	
		$youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button').click(function(){
			loadMoreComments($youmaxContainer);
		});	*/
		
		if(youmax_global_options.displayVideo=="popup") {
			$youmaxPlayBox = $('body');
			$youmaxPlayBox.off('click','.youmax-show-button');
			$youmaxPlayBox.off('click','.youmax-add-comment-button');
		} else {
			$youmaxPlayBox = $youmaxContainer;
		}
		
		$youmaxPlayBox.on('click','.youmax-show-button',function(){
			displayComments(this.id,$youmaxContainer);
		});
		
		$youmaxPlayBox.on('click','.youmax-more-button',function(){
			loadMoreComments($youmaxContainer);
		});
		
		
		//console.log('init Google API');
		//load Google API for Login
		$.getScript("https://apis.google.com/js/client:platform.js").done(function(data, textStatus) {
			//console.log('Google API Loaded');
			$youmaxPlayBox.on('click','.youmax-add-comment-button',function(){
				handleComments(this,$youmaxContainer);
			});
			
		}).fail(function( jqxhr, settings, exception ) {
			//console.log( "Triggered ajaxError handler." );
		});
		
		//added in 6.0 
		$youmaxContainer.on('keyup','#youmax-search-box,#youmax-search-box-header', function (e) {
			if (e.keyCode == 13) {
				searchText = "query_" + $(this).val();
				displayPlaylist(searchText,$youmaxContainer);
				return false;
			}
		});
		
		//added in 7.0 - show stats on mouse hove for clean skin
		if(youmax_global_options.skin.indexOf("clean")!=-1) {
			$youmaxContainer.on('mouseenter','#tiles li',function(){
				$(this).find(".youmax-duration").show();
				$(this).find(".youmax-definition").show();
				$(this).find(".youmax-clean-overlay-holder").hide();
				//$(this).find(".youmax-playlist-video-count-wrapper").hide();
				//$(this).find(".youmax-clean-playlist-title").show();
			});

			$youmaxContainer.on('mouseleave','#tiles li',function(){
				$(this).find(".youmax-duration").hide();
				$(this).find(".youmax-definition").hide();
				$(this).find(".youmax-clean-overlay-holder").show();
				//$(this).find(".youmax-playlist-video-count-wrapper").show();
				//$(this).find(".youmax-clean-playlist-title").hide();
			});
		} else {
		
			//for all skins except clean - show play icon on thumbnails hover
			//also video display mode should not be thumbnail
			if (youmax_global_options.displayVideo!="thumbnail") {
				if(youmax_global_options.playIconType && youmax_global_options.playIconType!='default') {
					$youmaxContainer.on('mouseenter','.youmax-thumbnail-image-wrapper',function(){
						$(this).find(".youmax-play-overlay").addClass('youmax-play-hover');
					});

					$youmaxContainer.on('mouseleave','.youmax-thumbnail-image-wrapper',function(){
						$(this).find(".youmax-play-overlay").removeClass('youmax-play-hover');
					});
				} else {
					$youmaxContainer.on('mouseenter','.youmax-thumbnail-image-wrapper',function(){
						$(this).find(".youmax-play-overlay").show();
					});

					$youmaxContainer.on('mouseleave','.youmax-thumbnail-image-wrapper',function(){
						$(this).find(".youmax-play-overlay").hide();
					});
				}
			}

		}
		
		$youmaxContainer.on('click','#youmax-back-to-playlists',function(){
			//alert('back');
			var lastPlaylistsTabId = $youmaxContainer.data('youmax_last_channel_playlists');
			$youmaxContainer.find('#'+lastPlaylistsTabId).click();
		});
		
		
		$youmaxContainer.on('click','#youmax-search-holder-header',function(){
			$(this).find('#youmax-search-box-header').toggle();
		});
		
		$youmaxContainer.on('click','#youmax-search-box-header', function (e) {
			return false;
		});
		
		
		$(window).resize(function() {
			clearTimeout(layoutResizeTimer);
			layoutResizeTimer = setTimeout(function(){
				$('body').find('.youmax').each(function(){
					$ymaxContainer = $(this);
					//console.log("setting media queries");
					setMediaQueries($ymaxContainer.width(),$ymaxContainer);
				});
				
				setTimeout(function(){
					$('body').find('.youmax').each(function(){
						$ymaxContainer = $(this);
						ymax_global_options = $ymaxContainer.data('youmax_global_options');
						//remove date for trend skin if not enough space
						if(ymax_global_options.skin.indexOf('trend')!=-1 && ($ymaxContainer.find('#tiles li:first-child').width())<280) {
							$ymaxContainer.find('.youmax-video-list-date').hide();
						} else {
							$ymaxContainer.find('.youmax-video-list-date').show();
						}
						//console.log("updaing msonry layout");
						$ymaxContainer.find('ul').masonry('layout'); 
					});
				}, youmax_global_options.updateLayoutDelay);
				
				
			}, youmax_global_options.updateLayoutDelay);
		});
		
		//Adding this as a Safety Net
		$(window).on('load', function(){
			setTimeout(function(){
				$('body').find('.youmax').each(function(){
					$(this).find('ul').masonry('layout'); 
				});
			}, youmax_global_options.updateLayoutDelay);
		});	
	
		
	},
	
	paginationWrapper = function($youmaxContainer,handle) {
		
		if(handle=="previous") {
			pauseLoadMoreButton($youmaxContainer,"previous");
		} else {
			pauseLoadMoreButton($youmaxContainer);
		}
		
		$youmaxContainerList = $youmaxContainer.find('ul#tiles');
		var current_height = $youmaxContainerList.height();
		$youmaxContainerList.parent('#youmax-video-list-div').css('min-height',current_height);		
		$youmaxContainerList.find('li').addClass("youmax-dying");//.fadeTo(200, 0.3, function(){
			//setTimeout(function(){
				//handlePagination($youmaxContainer,handle);
			//}, 1000);
		//});
		
		handlePagination($youmaxContainer,handle);
	
	},
	
	handlePagination = function($youmaxContainer,handle) {

		var youtubeResponse = {
			items:[],
			nextPageToken:"youmax-generated"
		};
		
		var vimeoResponse = {
			data:[],
			paging:{
				next:"youmax-generated"
			}
		};		
		
		//setMinimumContainerHeight($youmaxContainer);
		
		cache = $youmaxContainer.data('cache');
		cacheIndex = $youmaxContainer.data('cacheindex');				
		
		//var tempCache = cache;
		var tempCacheIndex;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		//console.log("inside handlePagination for - "+handle);
		
		//videoType = $(".youmax-tab-hover").attr("id").split("_")[0];
		//console.log(videoType);
		
		tabId = $(".youmax-tab-hover").attr("id");
		
		if(handle=="previous") {
			if(cacheIndex>=0) {
				/*for(var p=cacheIndex, c=youmax_global_options.maxResults; c>0; c--,p++) {
					response.items.push()
				}*/
				tempCacheIndex = cacheIndex - youmax_global_options.maxResults + 1;
				if(tempCacheIndex<0) tempCacheIndex = 0;
				
				youtubeResponse.items = (cache.slice(tempCacheIndex,tempCacheIndex+youmax_global_options.maxResults));
				vimeoResponse.data = (cache.slice(tempCacheIndex,tempCacheIndex+youmax_global_options.maxResults));
				
				setTimeout(function(){
					if(tabId.indexOf("youtube_channel_uploads_")!=-1) {
						insertPlaylistVideos(youtubeResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("youtube_channel_playlists_")!=-1) {
						insertChannelPlaylists(youtubeResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("youtube_channel_search_")!=-1) {
						eventType = $(".youmax-tab-hover").data("eventtype");
						isEvent = false;
						if(null!=eventType && eventType!="") {
							isEvent = true;
						}
						insertSearchVideos(youtubeResponse,$youmaxContainer,false,isEvent,true,true);
					} else if(tabId.indexOf("youtube_channel_events_")!=-1) {
						insertSearchVideos(youtubeResponse,$youmaxContainer,false,true,true,true);
					} else if(tabId.indexOf("youtube_playlist_videos_")!=-1) {
						insertPlaylistVideos(youtubeResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("vimeo_user_videos_")!=-1) {
						insertVimeoVideos(vimeoResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("vimeo_channel_videos_")!=-1) {
						insertVimeoVideos(vimeoResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("vimeo_group_videos_")!=-1) {
						insertVimeoVideos(vimeoResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("vimeo_album_videos_")!=-1) {
						insertVimeoVideos(vimeoResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("query_")!=-1) {
						
					}	
					
				}, youmax_global_options.minimumFadeTimeout);
				
				cacheIndex = cacheIndex - youmax_global_options.maxResults;
				//console.log("cacheIndex > "+cacheIndex);
			} else {
				if(youmax_global_options.showTextInsteadOfIcons) {
					$youmaxContainer.find('#youmax-previous-div').removeClass('youmax-load-more-div-click').html('Done');
				} else {
					$youmaxContainer.find('#youmax-previous-div').removeClass('youmax-load-more-div-click').html('<i class="fa fa-close fa-5x"></i>');
				}
				$youmaxContainer.find('ul#tiles li').removeClass("youmax-dying").fadeTo(0, 1);
			}
		
		
		} else if(handle=="next") {
			if(cacheIndex+youmax_global_options.maxResults+1 >= cache.length) {
				//console.log("cache length > "+cache.length);
				//console.log("calling load more playlists");
				loadMorePlaylistVideos($youmaxContainer);
			} else {
				tempCacheIndex = cacheIndex + youmax_global_options.maxResults + 1;
				//console.log("tempCacheIndex>"+tempCacheIndex);
				
				youtubeResponse.items = (cache.slice(tempCacheIndex,tempCacheIndex+youmax_global_options.maxResults));
				vimeoResponse.data = (cache.slice(tempCacheIndex,tempCacheIndex+youmax_global_options.maxResults));

				setTimeout(function(){				
					if(tabId.indexOf("youtube_channel_uploads_")!=-1) {
						insertPlaylistVideos(youtubeResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("youtube_channel_playlists_")!=-1) {
						insertChannelPlaylists(youtubeResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("youtube_channel_search_")!=-1) {
						eventType = $(".youmax-tab-hover").data("eventtype");
						isEvent = false;
						if(null!=eventType && eventType!="") {
							isEvent = true;
						}
						insertSearchVideos(youtubeResponse,$youmaxContainer,false,isEvent,true,true);
					} else if(tabId.indexOf("youtube_channel_events_")!=-1) {
						insertSearchVideos(youtubeResponse,$youmaxContainer,false,true,true,true);
					} else if(tabId.indexOf("youtube_playlist_videos_")!=-1) {
						insertPlaylistVideos(youtubeResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("vimeo_user_videos_")!=-1) {
						insertVimeoVideos(vimeoResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("vimeo_channel_videos_")!=-1) {
						insertVimeoVideos(vimeoResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("vimeo_group_videos_")!=-1) {
						insertVimeoVideos(vimeoResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("vimeo_album_videos_")!=-1) {
						insertVimeoVideos(vimeoResponse,false,$youmaxContainer,true);
					} else if(tabId.indexOf("query_")!=-1) {
						
					}
				}, youmax_global_options.minimumFadeTimeout);
				cacheIndex = cacheIndex + youmax_global_options.maxResults;
				//console.log("cacheIndex > "+cacheIndex);
			}
			
			if(cacheIndex<-1) {
				cacheIndex = -1;
			}
			
		}
		
		$youmaxContainer.data('cache',cache);
		$youmaxContainer.data('cacheindex',cacheIndex);				
	
	},
	
	handleComments = function(thisElement,$youmaxContainer) {
		
		//var $youmaxAddButton = $youmaxContainer.find('.youmax-add-comment-button');
		//$youmaxAddButton.text('posting..');
		//$youmaxAddButton.attr('disabled','disabled');
		$(thisElement).html('<i class="fa fa-ellipsis-h fa-2x"></i>').attr('disabled','disabled');
		//console.log('Button text - '+$(thisElement).text());
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		if(youmax_global_options.displayVideo=="popup") {
			$youmaxPlayBox = $('.youmax-popup.mfp-gallery');
		} else {
			$youmaxPlayBox = $youmaxContainer;
		}	

		var youmaxAccessToken = youmaxLoggedInUser.youmaxAccessToken;
		if(null!=youmaxAccessToken && youmaxAccessToken!="") {
			//Token available
			//getLoggedInUserDetails($youmaxContainer,youmaxAccessToken,youmax_global_options.apiKey);
			
			var comment = $youmaxPlayBox.find('.youmax-comment-textbox').val();
			if(null==comment||comment.trim()=="") {
				alert("Please enter a valid comment..");
				$youmaxPlayBox.find('.youmax-add-comment-button').removeAttr('disabled').html('<i class="fa fa-send fa-2x"></i>');
				return;
			} else {
				comment=comment.trim();
			}
			
			videoId = $youmaxPlayBox.find(".youmax-encloser-comment-button.youmax-show-button").attr('id');
			channelId = $youmaxPlayBox.find(".youmax-encloser-comment-button.youmax-show-button").data('channelid');
			
			//remove "youtube_" from the video id
			videoId = videoId.substring(videoId.indexOf("_")+1);
			youmaxPostComment($youmaxContainer,videoId,youmaxAccessToken,youmax_global_options.apiKey,comment,channelId);
			
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
				'scope' : 'https://www.googleapis.com/auth/youtube.force-ssl'
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
	
	youmaxPostComment = function($youmaxContainer,videoId,youmaxAccessToken,apiKey,comment,channelId) {
		
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		//var postCommentURL = "https://gdata.youtube.com/feeds/api/videos/"+videoId+"/comments?alt=json";
		var postCommentURL = "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&shareOnGooglePlus=false&fields=snippet&key="+youmax_global_options.apiKey;
		//var xmlComment = '<?xml version="1.0" encoding="UTF-8"?><entry xmlns="http://www.w3.org/2005/Atom" xmlns:yt="http://gdata.youtube.com/schemas/2007"><content>'+comment+'</content></entry>';
		var xmlComment = '{"snippet":{"channelId":"'+channelId+'","videoId":"'+videoId+'","topLevelComment":{"snippet":{"textOriginal":"'+comment+'"}}}}';
		
		//console.log(xmlComment);
		
		$.ajax({
			url: postCommentURL,
			type: 'post',
			crossDomain: true,
			data:xmlComment,
			//contentType: "application/atom+xml",
			beforeSend: function(xhr){
				//xhr.setRequestHeader('X-GData-Key','key='+apiKey);
				xhr.setRequestHeader('Authorization','Bearer '+youmaxAccessToken);
				//xhr.setRequestHeader('GData-Version','2');
				//xhr.setRequestHeader('Host','gdata.youtube.com');
				xhr.setRequestHeader('Content-Type','application/json');
				xhr.setRequestHeader('Content-Length',xmlComment.length);
			},
			success: function (data, status) {

				/*var authorId = data.entry.author[0].uri.$t;
				authorId = authorId.substring(authorId.lastIndexOf("/")+1); //.toLowerCase()*/
				//console.log(data)
				var authorName = data.snippet.topLevelComment.snippet.authorDisplayName;
				var authorImage = data.snippet.topLevelComment.snippet.authorProfileImageUrl;
				var youmax_translator_text = $youmaxContainer.data('youmax_translator_text');
				var youmax_global_options = $youmaxContainer.data('youmax_global_options');
				if(youmax_global_options.displayVideo=="popup") {
					$youmaxPlayBox = $('.youmax-popup.mfp-gallery');
				} else {
					$youmaxPlayBox = $youmaxContainer;
				}	
				
				//Display added comment
				$youmaxPlayBox.find("#youmax-encloser-comments").prepend('<div  class="youmax-video-comment"><div class="youmax-from"><div class="youmax-from-img" style="background-image:url(\''+authorImage+'\');"></div><div class="youmax-from-name">'+authorName+'</div><div class="youmax-published">'+youmax_translator_text.now+'</div></div><div class="youmax-comment"><span class="youmax-comment-content">'+comment+'</span><div></div>');				
				
				//getUserDetails(new Array(authorId),$youmaxContainer);
				
				$youmaxPlayBox.find('.youmax-add-comment-button').removeAttr('disabled').html('<i class="fa fa-send fa-2x"></i>');
				$youmaxPlayBox.find('.youmax-comment-textbox').val('');
				//console.log("Success!!");
				//console.log(data);
				//console.log(status);
			},
			error: function (xhr, desc, err) {
				alert("Could not Post - "+err);
				console.log(xhr);
				console.log("Desc: " + desc + "\nErr:" + err);
			}
		});
	
	},
	
	//load more button functionality
	loadMorePlaylistVideos = function($youmaxContainer) {
	
		$youmaxLoadMoreDiv = pauseLoadMoreButton($youmaxContainer);
		$youmaxContainer.find('#youmax-encloser').empty().hide();
		
		var tabId = $youmaxContainer.find('.youmax-tab.youmax-tab-hover').attr('id');
		var nextPageToken = $youmaxLoadMoreDiv.data('nextpagetoken');
		//console.log('load more clicked : nextPageToken-'+nextPageToken);
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			/*if(playlistId.indexOf("search_")!=-1) {
				getSearchVideos(playlistId,nextPageToken,$youmaxContainer);
			} else if(playlistId.indexOf("playlists_")!=-1) {
				getChannelPlaylists(playlistId,nextPageToken,$youmaxContainer);
			} else if(playlistId.indexOf("query_")!=-1) {
				getUserSearchVideos(playlistId,nextPageToken,$youmaxContainer);
			} else if(playlistId.indexOf("events_")!=-1) {
				getChannelEvents(playlistId,nextPageToken,$youmaxContainer);
			} else {
				getPlaylistVideos(playlistId,nextPageToken,$youmaxContainer);
			}*/
			
			if(tabId.indexOf("youtube_channel_uploads_")!=-1) {
				innerId=tabId.substring(24);
				getPlaylistVideos(innerId,nextPageToken,$youmaxContainer);
			} else if(tabId.indexOf("youtube_channel_playlists_")!=-1) {
				innerId=tabId.substring(26);
				getChannelPlaylists(innerId,nextPageToken,$youmaxContainer);
			} else if(tabId.indexOf("youtube_channel_search_")!=-1) {
				//innerId=tabId.substring(23);
				getSearchVideos(tabId,nextPageToken,$youmaxContainer);
			} else if(tabId.indexOf("youtube_channel_events_")!=-1) {
				innerId=tabId.substring(23);
				getChannelEvents(innerId,nextPageToken,$youmaxContainer);
			} else if(tabId.indexOf("youtube_playlist_videos_")!=-1) {
				innerId=tabId.substring(24);
				getPlaylistVideos(innerId,nextPageToken,$youmaxContainer);
			} else if(tabId.indexOf("vimeo_user_videos_")!=-1) {
				innerId=tabId.substring(18);
				getVimeoUserVideos(innerId,nextPageToken,$youmaxContainer);
			} else if(tabId.indexOf("vimeo_channel_videos_")!=-1) {
				innerId=tabId.substring(21);
				getVimeoChannelVideos(innerId,nextPageToken,$youmaxContainer);
			} else if(tabId.indexOf("vimeo_group_videos_")!=-1) {
				innerId=tabId.substring(19);
				getVimeoGroupVideos(innerId,nextPageToken,$youmaxContainer);
			} else if(tabId.indexOf("vimeo_album_videos_")!=-1) {
				innerId=tabId.substring(19);
				getVimeoAlbumVideos(innerId,nextPageToken,$youmaxContainer);
			}  else if(tabId.indexOf("query_")!=-1) {
				innerId=tabId.substring(6);
				getUserSearchVideos(innerId,nextPageToken,$youmaxContainer);	
			}		
			
		} else {
		
			deactivateLoadMoreButton($youmaxContainer);
			
		}
	},
	
	pauseLoadMoreButton = function ($youmaxContainer,direction) {
	
		var $youmaxLoadMoreDiv;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		if(youmax_global_options.showTextInsteadOfIcons) {

			if(youmax_global_options.loadMode=="loadmore") {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
				$youmaxLoadMoreDiv.html('Loading..');
			} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
				if(direction=="previous") {
					$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-previous-div');
					$youmaxLoadMoreDiv.html('Loading..');
				} else {
					$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
					$youmaxLoadMoreDiv.html('Loading..');
				}
			}		

		} else {
		
			if(youmax_global_options.loadMode=="loadmore") {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
				$youmaxLoadMoreDiv.html('<i class="fa fa-ellipsis-h fa-5x"></i>');
			} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
				if(direction=="previous") {
					$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-previous-div');
					$youmaxLoadMoreDiv.html('<i class="fa fa-ellipsis-h fa-5x"></i>');
				} else {
					$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
					$youmaxLoadMoreDiv.html('<i class="fa fa-ellipsis-h fa-5x"></i>');
				}
			}
			
		}		


		$youmaxLoadMoreDiv.addClass('youmax-load-more-div-click');
		
		return $youmaxLoadMoreDiv;
	
	},
	
	deactivateLoadMoreButton = function ($youmaxContainer) {
	
		var $youmaxLoadMoreDiv;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		if(youmax_global_options.showTextInsteadOfIcons) {
		
			if(youmax_global_options.loadMode=="loadmore") {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
				$youmaxLoadMoreDiv.html('All Done');
			} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
				$youmaxLoadMoreDiv.html('Done');
				$youmaxContainer.find('ul#tiles li').removeClass("youmax-dying").fadeTo(0, 1);
			}
			
		} else {
		
			if(youmax_global_options.loadMode=="loadmore") {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
				$youmaxLoadMoreDiv.html('<i class="fa fa-close fa-5x"></i>');
			} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
				$youmaxLoadMoreDiv.html('<i class="fa fa-close fa-5x"></i>');
				$youmaxContainer.find('ul#tiles li').removeClass("youmax-dying").fadeTo(0, 1);
			}
			
		}

		$youmaxLoadMoreDiv.removeClass('youmax-load-more-div-click');
		//$youmaxLoadMoreDiv.addClass('youmax-load-more-div-click');
	
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


	//get channel Id if channel URL is of the form ....../user/Adele
	getChannelIdForTabs = function (userId,tab_prefix,$youmaxContainer,isSelected) {
		//console.log('inside getChannelId');
		//console.log('apiUrl-'+apiUrl);
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');

		apiUrl = "https://www.googleapis.com/youtube/v3/channels?part=id&forUsername="+userId+"&key="+youmax_global_options.apiKey;
		
		$.ajax({
			url: apiUrl,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) {
				//console.log("tab_prefix: "+tab_prefix);
				if(tab_prefix.indexOf("youtube_channel_search_")!=-1) {
					//$youmaxContainer.find("#"+tab_prefix).data("restricttochannels",response.items[0].id);
					$youmaxContainer.find("#"+tab_prefix).attr("data-restricttochannels",response.items[0].id);
					$youmaxContainer.find("#"+tab_prefix).data("restricttochannels",response.items[0].id);
					$youmaxContainer.find('option[value="'+tab_prefix+'"]').attr("data-restricttochannels",response.items[0].id);
					$youmaxContainer.find('option[value="'+tab_prefix+'"]').data("restricttochannels",response.items[0].id);
					if(isSelected) {
						$youmaxContainer.find("#"+tab_prefix).click();
					}					
				} else {
					$youmaxContainer.find("#"+tab_prefix+userId).attr("id",tab_prefix+response.items[0].id);
					$youmaxContainer.find('option[value="'+tab_prefix+userId+'"]').attr("value",tab_prefix+response.items[0].id);
					if(tab_prefix=="youtube_channel_uploads_") {
						getUploadsPlaylistIdForTabs(response.items[0].id,tab_prefix,$youmaxContainer,isSelected);
					} else {
						if(isSelected) {
							$youmaxContainer.find("#"+tab_prefix+response.items[0].id).click();
						}
					}
				}
				
			},
			error: function(html) { alert(html); },
			beforeSend: setHeader
		});
	},
	
	getUploadsPlaylistIdForTabs = function(channel_id,tab_prefix,$youmaxContainer,isSelected) {
		//console.log('getUploadsPlaylistIdForTabs');
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		apiUrl = "https://www.googleapis.com/youtube/v3/channels?part=brandingSettings%2Csnippet%2Cstatistics%2CcontentDetails&id="+channel_id+"&key="+youmax_global_options.apiKey;
		//console.log('apiUrl-'+apiUrl);
		//showLoader();
		
		$.ajax({
			url: apiUrl,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) {
				//console.log(response);
				$youmaxContainer.find("#"+tab_prefix+channel_id).attr("id",tab_prefix+response.items[0].contentDetails.relatedPlaylists.uploads);
				$youmaxContainer.find('option[value="'+tab_prefix+channel_id+'"]').attr("value",tab_prefix+response.items[0].contentDetails.relatedPlaylists.uploads);
				if(isSelected) {
					$youmaxContainer.find("#"+tab_prefix+response.items[0].contentDetails.relatedPlaylists.uploads).click();
				}
			},
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

	/* not needed in 8.0
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
	*/
	
	//get video stats using Youtube API
	getVideoStats = function (videoIdList,$youmaxContainer,isEvent) {
		//console.log('inside getVideoStats');
		//console.log(videoIdList);
		//showLoader();
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		var streamingURL = "";
		
		if(isEvent) {
			streamingURL = "%2CliveStreamingDetails";
		}
		
		apiVideoStatURL = "https://www.googleapis.com/youtube/v3/videos?part=statistics%2CcontentDetails"+streamingURL+"&id="+videoIdList+"&key="+apiKey;
		$.ajax({
			url: apiVideoStatURL,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'jsonp',
			success: function(response) { displayVideoStats(response,$youmaxContainer,isEvent);},
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
		//console.log(videoViewCount);
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
	
	convertViewCountForThumbnail = convertViewCount,
	
	convertLikeCommentCount = convertViewCount,
	
	convertHeaderCounts = convertViewCountWithComma,
	
	//utility function to displaye view counts
	convertViewCountWithComma = function(videoViewCount) {
		
		var videoResultCount = "";
		
		if(null==videoViewCount || videoViewCount=="0") {
			return "";
		}
		
		videoViewCount = ""+videoViewCount;
		
		//console.log("videoViewCount-"+videoViewCount);
		//console.log("videoViewCount length-"+videoViewCount.length);
		
		while(videoViewCount.length>0) {
			if(videoViewCount.length > 3) {
				videoResultCount = ","+videoViewCount.substring(videoViewCount.length-3)+videoResultCount;
				videoViewCount = videoViewCount.substring(0,videoViewCount.length-3);
			} else {
				videoResultCount = videoViewCount + videoResultCount;
				break;
			}
		}
		
		return videoResultCount;
		
	},
	
	//utility function to display time
	convertVimeoDuration = function(videoDuration) {
		min = parseInt(videoDuration/60,10);
		sec = videoDuration - (min*60);
		
		if(sec<10) {
			sec="0"+sec;
		}
		
		if(min>=60) {
			hours = parseInt(min/60,10);
			min = videoDuration - (hours*60);
			
			if(min<10) {
				min="0"+min;
			}
			
			return hours+":"+min+":"+sec;
		} else {
			return min+":"+sec;
		}
	
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
			//console.log('duration-'+duration);
			if(duration=="") {
				returnDuration+=":00";
			} else {
				duration = parseInt(duration,10);
				//console.log('duration else -'+duration)
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
		//console.log("displayChannelHeader");
		//console.log(response);
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");
		var channelData = response.items[0];
		
		//alert(videoArray.length);
		channelId = channelData.id;
		channelTitle = channelData.snippet.title;
		channelImage = channelData.snippet.thumbnails.default.url;
		channelSubscribers = convertHeaderCounts(channelData.statistics.subscriberCount);
		channelViews = convertHeaderCounts(channelData.statistics.viewCount);
		channelBackgroundImage = channelData.brandingSettings.image.bannerImageUrl;
		//channelUploadsPlaylistId = channelData.contentDetails.relatedPlaylists.uploads;
		
		channelVideos = convertHeaderCounts(channelData.statistics.videoCount);
		channelDescription = channelData.snippet.description;
		userWebsite = youmax_global_options.userWebsite;
		
		//console.log('channelBackgroundImage-'+channelBackgroundImage);
		
		//youmax_global_options.channelBackgroundImage = channelBackgroundImage;
		//$youmaxContainer.data("youmax_global_options",youmax_global_options);
		
		$youmaxContainer.find('#youmax-header').css('background-image',"url("+channelBackgroundImage+")");
	
		//old header
		//$youmaxContainer.find('#youmax-header-wrapper').append('<a href="https://www.youtube.com/channel/'+channelId+'" target="_blank"><div class="youmax-channel-icon"><img src="'+channelImage+'"/></div><div class="youmax-channel-data-holder"><div class="youmax-channel-title">'+channelTitle+'</div>  <div id="youmax-header-counts"><span class="youmax-header-posts"><span class="youmax-count">'+channelVideos+'</span> videos</span><span class="youmax-header-followers"><span class="youmax-count">'+channelSubscribers+'</span> subscribers</span><span class="youmax-header-following"><span class="youmax-count">'+channelViews+'</span> views</span></div>  </div></a>');
		
		$youmaxContainer.find('#youmax-header-wrapper').append('<a href="https://www.youtube.com/channel/'+channelId+'" target="_blank"><div class="youmax-channel-icon"><img src="'+channelImage+'"/></div><div class="youmax-channel-data-holder"><div class="youmax-channel-title">'+channelTitle+'</div>  <div id="youmax-header-counts" class="youmax-generic-header-counts"><span class="youmax-header-posts" title="'+youmax_translator_text.videos+'"><span class="youmax-count"><i class="fa fa-video-camera"></i>'+channelVideos+'</span> </span><span class="youmax-header-followers" title="'+youmax_translator_text.subscribers+'"><span class="youmax-count"><i class="fa fa-envelope"></i>'+channelSubscribers+'</span></span><span class="youmax-header-following" title="'+youmax_translator_text.views+'"><span class="youmax-count"><i class="fa fa-user"></i>'+channelViews+'</span></span></div>  </div></a>');
		
		
		//<div class="youmax-subscribe-clean"><a href="https://instagram.com/'+channelTitle+'" target="_blank"><i class="fa fa-instagram fa-lg"></i>&nbsp;&nbsp;FOLLOW</a></div>
		
		if(youmax_global_options.skin.indexOf("clean")!=-1) {
			$youmaxContainer.find('#youmax-header-wrapper').append('<div id="youmax-header-info"><div id="youmax-header-title">'+channelTitle+'</div><div class="youmax-subscribe-clean-wrapper"><div class="youmax-subscribe"><div class="g-ytsubscribe" data-channelid="'+channelId+'" data-layout="default" data-count="default"></div></div></div><div id="youmax-header-bio">'+channelDescription+'</div><div id="youmax-header-website"><a href="'+userWebsite+'" target="_blank">'+userWebsite+'</a></div><div id="youmax-header-counts"><span class="youmax-header-posts"><span class="youmax-count">'+channelVideos+'</span> '+youmax_translator_text.videos+'</span><span class="youmax-header-followers"><span class="youmax-count">'+channelSubscribers+'</span> '+youmax_translator_text.subscribers+'</span><span class="youmax-header-following"><span class="youmax-count">'+channelViews+'</span> '+youmax_translator_text.views+'</span></div></div>');
		
			$youmaxContainer.find('#youmax-select-box').prepend('<div id="youmax-search-holder"><input id="youmax-search-box" type="text" placeholder="'+youmax_translator_text.search+'"/><i class="fa fa-search youmax-search-icon"></i></div>');
			$youmaxContainer.find('#youmax-select-box').append('<i class="fa fa-caret-down"></i>');
		} else {
			
			//old search in header
			//$youmaxContainer.find('#youmax-header-wrapper').append('&nbsp;&nbsp;&nbsp;&nbsp;<div class="youmax-subscribe"><div class="g-ytsubscribe" data-channelid="'+channelId+'" data-layout="default" data-count="default"></div></div><div id="youmax-stat-holder"><div id="youmax-search-holder"><input id="youmax-search-box" type="text" placeholder=""/><i class="fa fa-search youmax-search-icon"></i></div></div>');
			
			//added search in header for backward compatibility
			$youmaxContainer.find('#youmax-header-wrapper').append('<div id="youmax-stat-holder"><div id="youmax-search-holder-header"><input id="youmax-search-box-header" type="text" placeholder="Search"/><i class="fa fa-search youmax-search-icon-header"></i></div></div>');

			
			$youmaxContainer.find('#youmax-header-wrapper').append('&nbsp;&nbsp;&nbsp;&nbsp;<div class="youmax-subscribe"><div class="g-ytsubscribe" data-channelid="'+channelId+'" data-layout="default" data-count="default"></div></div>');
			
			$youmaxContainer.find('#youmax-select-box').prepend('<div id="youmax-search-holder"><input id="youmax-search-box" type="text" placeholder="'+youmax_translator_text.search+'"/><i class="fa fa-search youmax-search-icon"></i></div>');
			$youmaxContainer.find('#youmax-select-box').append('<i class="fa fa-caret-down"></i>');
			
			$youmaxContainer.find('#youmax-select-box').wrap('<div class="youmax-select-box-wrapper">');


			
		}
		
		
		
		
		//Always Use Dropdown Setting
		if(youmax_global_options.alwaysUseDropdown) {
			//console.log('options.alwaysUseDropdown-'+options.alwaysUseDropdown);	
			$youmaxContainer.find('#youmax-select-box').css('display','block');
			//$youmaxContainer.find('#youmax-select-box').show();
			$youmaxContainer.find('#youmax-tabs').hide();
			$youmaxContainer.find('#youmax-stat-holder').hide();
		}		

		
		//$youmaxContainer.find('#youmax-header-wrapper').append('');
		
		//Stats removed and search is added after Youmax 6.0
		/*$youmaxContainer.find('#youmax-stat-holder').append('<div class="youmax-stat"><span class="youmax-stat-count">'+convertViewCount(channelViews)+'</span><br/> VIDEO VIEWS </div><div class="youmax-stat"><span class="youmax-stat-count">'+convertViewCount(channelSubscribers)+'</span><br/>SUBSCRIBERS</div>');*/
		
		/* Tabs creation moved to a separate function
		$youmaxContainer.find('#youmax-tabs').prepend('<span id="'+channelUploadsPlaylistId+'" class="youmax-tab" >'+youmax_translator_text.uploads+'</span><span id="playlists_'+channelId+'" class="youmax-tab" >'+youmax_translator_text.playlists+'</span>');
		
		$youmaxContainer.find('#youmax-select').prepend('<option value="'+channelUploadsPlaylistId+'" class="youmax-option-highlight" >'+youmax_translator_text.uploads+'</option><option value="playlists_'+channelId+'" class="youmax-option-highlight" >'+youmax_translator_text.playlists+'</option>');
		
		if(youmax_global_options.showEvents) {
			$youmaxContainer.find('#youmax-tabs').append('<span id="events_'+channelId+'" class="youmax-tab" >'+youmax_translator_text.events+'</span>');
			$youmaxContainer.find('#youmax-select').append('<option value="events_'+channelId+'" class="youmax-option-highlight" >'+youmax_translator_text.events+'</option>');
		}

		if(null!=youmax_global_options.vimeoUser && youmax_global_options.vimeoUser!="") {
			
			$youmaxContainer.find('#youmax-tabs').append('<span id="vimeo_'+youmax_global_options.vimeoId+'" class="youmax-tab" >'+youmax_translator_text.vimeo+'</span>');
			$youmaxContainer.find('#youmax-select').append('<option value="vimeo_'+youmax_global_options.vimeoId+'" class="youmax-option-highlight" >'+youmax_translator_text.vimeo+'</option>');
		}

		//$youmaxContainer.find('#youmax-tabs').prepend('');
		//$youmaxContainer.find('#youmax-select').prepend('');		
		
		
		if(youmax_global_options.alwaysUseDropdown) {
			//console.log('options.alwaysUseDropdown-'+options.alwaysUseDropdown);	
			$youmaxContainer.find('#youmax-select-box').css('display','block');
			//$youmaxContainer.find('#youmax-select-box').show();
			$youmaxContainer.find('#youmax-tabs').hide();
			$youmaxContainer.find('#youmax-stat-holder').hide();
		}
		
		//console.log('selected Tab-'+youmax_global_options.selectedTab);
		if(youmax_global_options.selectedTab.charAt(0)=='u') {
			$('#'+channelUploadsPlaylistId).click();
		} else if(youmax_global_options.selectedTab.charAt(0)=='l') {
			$('#playlists_'+channelId).click();
		} else if(youmax_global_options.selectedTab.charAt(0)=='e') {
			$('#events_'+channelId).click();
		}
		*/
		
		renderSubscribeButton();
	},
	
	/* removed in 8.0
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
	*/
	
	//display video statistics
	displayVideoStats = function(response,$youmaxContainer,isEvent) {
		//console.log("displayVideoStats");
		//console.log(response);

		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data('youmax_translator_text');
		
		
		var videoArray = response.items;
		var $videoThumbnail;

		for(var i=0; i<videoArray.length; i++) {
			videoId = videoArray[i].id;
			videoViewCount_raw = videoArray[i].statistics.viewCount;
			videoViewCount = convertViewCountForThumbnail(videoViewCount_raw);
			videoDuration = videoArray[i].contentDetails.duration;
			videoDuration = convertDuration(videoDuration);
			videoDefinition = videoArray[i].contentDetails.definition.toUpperCase();
			videoLikeCount_raw = videoArray[i].statistics.likeCount;
			videoLikeCount = convertLikeCommentCount(videoLikeCount_raw);
			videoCommentCount_raw = videoArray[i].statistics.commentCount;
			videoCommentCount = convertLikeCommentCount(videoCommentCount_raw);
			
			
			$videoThumbnail = $youmaxContainer.find('#youmax-video-list-div #youtube_'+videoId);
			
			$videoThumbnail.data("views",videoViewCount);
			$videoThumbnail.data("likes",videoLikeCount);			
			
			if(youmax_global_options.skin.indexOf("clean")!=-1) {
				if(isEvent) {
					actualEndTime = videoArray[i].liveStreamingDetails.actualEndTime;
					actualStartTime = videoArray[i].liveStreamingDetails.actualStartTime;
					scheduledStartTime = videoArray[i].liveStreamingDetails.scheduledStartTime;
					if (null!=actualEndTime) {  //completed event
						$videoThumbnail.append('<div class="youmax-event-tag">Completed Event</div>');
					} else if(null!=actualStartTime) {  //live event
						watching = convertViewCountWithComma(videoArray[i].liveStreamingDetails.concurrentViewers);
						$videoThumbnail.append('<div class="youmax-event-tag youmax-event-live"><div class="youmax-live-icon"><i class="fa fa-circle"></i></div>Live Event</div>');
					} else if (null!=scheduledStartTime) { //upcoming event
						scheduledAt = convertDateFormat(scheduledStartTime);
						$videoThumbnail.append('<div class="youmax-event-tag youmax-event-upcoming">Upcoming Event</div>');
					}
				}
				
				//not needed
				//$videoThumbnail.find('.youmax-video-list-views').append(videoViewCount+' <span class="youmax-views-text">'+youmax_translator_text.views+'</span> ');				
				
				$videoThumbnail.find('.youmax-all-skin-views').empty().append(videoViewCount);
				
				$videoThumbnail.find('.youmax-all-skin-likes').empty().append(videoLikeCount);
				
				$videoThumbnail.find('.youmax-all-skin-comments').empty().append(videoCommentCount);				

				$videoThumbnail.find(".youmax-clean-time").empty().append(videoDuration);				
				
			} else {
				if(isEvent) {
					actualEndTime = videoArray[i].liveStreamingDetails.actualEndTime;
					actualStartTime = videoArray[i].liveStreamingDetails.actualStartTime;
					scheduledStartTime = videoArray[i].liveStreamingDetails.scheduledStartTime;
					if (null!=actualEndTime) {  //completed event
						$videoThumbnail.append('<div class="youmax-definition youmax-event-tag">Completed Event</div>');
						$videoThumbnail.append('<div class="youmax-duration">'+videoDuration+'</div>');
					} else if(null!=actualStartTime) {  //live event
						watching = convertViewCountWithComma(videoArray[i].liveStreamingDetails.concurrentViewers);
						$videoThumbnail.append('<div class="youmax-definition youmax-event-tag youmax-event-live"><div class="youmax-live-icon"><i class="fa fa-circle"></i></div>Live Event</div>');
						$videoThumbnail.append('<div class="youmax-duration">'+watching+' watching</div>');
					} else if (null!=scheduledStartTime) { //upcoming event
						scheduledAt = convertDateFormat(scheduledStartTime);
						$videoThumbnail.append('<div class="youmax-definition youmax-event-tag youmax-event-upcoming">Upcoming Event</div>');
						$videoThumbnail.append('<div class="youmax-duration">'+scheduledAt+'</div>');
					}
				} else {
					$videoThumbnail.find('.youmax-duration').empty().append(videoDuration);
					$videoThumbnail.find('.youmax-definition').empty().append(videoDefinition);
				}
				
				if(youmax_global_options.skin.indexOf("list")!=-1) {
				
					$videoThumbnail.find('.youmax-all-skin-views').empty().append(videoViewCount);
					
					$videoThumbnail.find('.youmax-all-skin-likes').empty().append(videoLikeCount);
					
					$videoThumbnail.find('.youmax-all-skin-comments').empty().append(videoCommentCount);

				} else if(youmax_global_options.skin.indexOf("trend")!=-1){
				
					video_uploaded = $videoThumbnail.data("videouploaded");
					trend = getVideoTrend(videoViewCount_raw,videoLikeCount_raw,videoCommentCount_raw,video_uploaded,youmax_global_options.hotThreshold,youmax_global_options.trendingThreshold);
					
					//not needed
					//link = $videoThumbnail.attr("id");
					//link = "https://youtu.be/"+link.substring(link.indexOf("_")+1);
					//$videoThumbnail.find('.youmax-thumbnail-link').attr('href', link);
					
					
					if(trend=="trending") {
						icon="fa-bolt";
					} else if (trend=="hot") {
						icon="fa-fire";
					} else {
						icon="fa-check";
					}
					
					$videoThumbnail.find('.youmax-trend-holder').attr('class', 'youmax-trend-holder').empty().addClass('youmax-'+trend).append('<i class="fa '+icon+'"></i> <span class="youmax-trend-text">'+trend+'</span>');
				
					$videoThumbnail.find('.youmax-all-skin-views').empty().append(videoViewCount);
					
					$videoThumbnail.find('.youmax-all-skin-likes').empty().append(videoLikeCount);
					
					$videoThumbnail.find('.youmax-all-skin-comments').empty().append(videoCommentCount);

				} else {
					$videoThumbnail.find('.youmax-all-skin-views').empty().append(videoViewCount);
					
					if(youmax_global_options.skin.indexOf("block")!=-1) {
						$videoThumbnail.find('.youmax-all-skin-likes').empty().append(videoLikeCount);
						$videoThumbnail.find('.youmax-all-skin-comments').empty().append(videoCommentCount);
					}
				}
			}
		}
		
		/*if(youmax_global_options.skin.indexOf("block")!=-1 || youmax_global_options.skin.indexOf("trend")!=-1) {
			setTimeout(function(){
				window.dispatchEvent(new CustomEvent("resize"));
			}, youmax_global_options.updateLayoutDelay);
		}*/
	},
	
	getVideoTrend = function (views,likes,comments,time,hotThreshold,trendingThreshold) {
		
		if(null!=views && views!="") {
			views = parseInt(views,10);
		} else {
			views = 0;
		}
		
		if(null!=likes && likes!="") {
			likes = parseInt(likes,10);
		} else {
			likes = 0;
		}
		
		if(null!=comments && comments!="") {
			comments = parseInt(comments,10);
		} else {
			comments = 0;
		}
		
		dateDiffMS = Math.abs(new Date() - new Date(time));
		//console.log(dateDiffMS);
		
		dateDiffDY = dateDiffMS/1000/60/60/24;
		
		var score = (views + 100*likes + 300*comments)/dateDiffDY;

		//console.log('views: '+views);
		//console.log('likes: '+likes);
		//console.log('comments: '+comments);
		
		//console.log(views + 100*likes + 300*comments);
		//console.log(dateDiffDY);
		//console.log('score: '+score);

		if(score>=hotThreshold) {
			return "hot";
		}
		
		if(score>=trendingThreshold) {
			return "trending";
		}
		
		return "classic";
		
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

		
		var $youmaxCommentHolder;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");

		if(youmax_global_options.displayVideo=="popup") {
			$youmaxPlayBox = $('.youmax-popup.mfp-gallery');			
		} else {
			$youmaxPlayBox = $youmaxContainer;			
		}	

		$youmaxCommentHolder = $youmaxPlayBox.find('#youmax-encloser-comments');		
		
		//console.log('loadMoreFlag-'+loadMoreFlag);
		if(!loadMoreFlag) {
			//empty earlier comments if not load more
			$youmaxCommentHolder.empty();
		}

		var commentArray = response.items;
		//var userIdArray = [];
		
		//page token logic
		var nextPageToken = response.nextPageToken;
		var $loadCommentsButton = $youmaxPlayBox.find('.youmax-encloser-comment-button.youmax-more-button');
		//console.log('nextPageToken-'+nextPageToken);
		
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			$loadCommentsButton.data('nextpagetoken',nextPageToken);
		} else {
			$loadCommentsButton.data('nextpagetoken','');
		}

		//no need
		//$loadCommentsButton.data('nextpagetoken',nextPageToken);

		
		//alert(videoArray.length);
		if(null==commentArray||commentArray.length==0) {
			$youmaxCommentHolder.append('<div id="" class="youmax-video-comment"><div class="youmax-comment" ><span class="youmax-comment-content" style="text-align:center;">No more comments found.</span><div></div>');
			$loadCommentsButton.data('nextpagetoken','');
			resetLoadMoreComments($youmaxPlayBox,youmax_global_options);
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

			$youmaxCommentHolder.append('<div  class="youmax-video-comment"><div class="youmax-from"><div class="youmax-from-img" style="background-image:url(\''+authorImage+'\');"></div><div class="youmax-from-name">'+authorName+'</div><div class="youmax-published">'+getDateDiff(commentPublished,youmax_translator_text)+' </div></div><div class="youmax-comment"><span class="youmax-comment-content">'+comment+'</span><div></div>');

		}
		
		//getUserDetails(userIdArray,$youmaxContainer);
		resetLoadMoreComments($youmaxPlayBox,youmax_global_options);
		
	},
	

	//insert HTML for video thumbnails into youmax grid
	insertVimeoVideoComments = function(response,loadMoreFlag,$youmaxContainer) {
		//console.log('insertVimeoVideoComments');
		//console.log(response);
		
		
		var $youmaxCommentHolder;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");

		if(youmax_global_options.displayVideo=="popup") {
			$youmaxPlayBox = $('.youmax-popup.mfp-gallery');			
		} else {
			$youmaxPlayBox = $youmaxContainer;			
		}
		$youmaxCommentHolder = $youmaxPlayBox.find('#youmax-encloser-comments');		
		
		//console.log('loadMoreFlag-'+loadMoreFlag);
		if(!loadMoreFlag) {
			//empty earlier comments if not load more
			$youmaxCommentHolder.empty();
		}

		var commentArray = response.data;
		//var userIdArray = [];
		
		//page token logic
		var nextPageToken = response.paging.next;
		var $loadCommentsButton = $youmaxPlayBox.find('.youmax-encloser-comment-button.youmax-more-button');
		//console.log('nextPageToken-'+nextPageToken);
		
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			nextPageToken = nextPageToken.substring(nextPageToken.lastIndexOf("&")+1);
			$loadCommentsButton.data('nextpagetoken',nextPageToken);
		} else {
			$loadCommentsButton.data('nextpagetoken','');
		}
		
		//alert(videoArray.length);
		if(null==commentArray||commentArray.length==0) {
			$youmaxCommentHolder.append('<div id="" class="youmax-video-comment"><div class="youmax-comment" ><span class="youmax-comment-content" style="text-align:center;">No more comments found.</span><div></div>');
			$loadCommentsButton.data('nextpagetoken','');
			resetLoadMoreComments($youmaxPlayBox,youmax_global_options);
			return;
		}
		
		
		for(var i=0; i<commentArray.length; i++) {
			comment = commentArray[i].text;
			if(null==comment||comment=="") {
				continue;
			}
			commentPublished = commentArray[i].created_on;
			authorName = commentArray[i].user.name;
			if(null!=commentArray[i].user.pictures) {
				authorImage = commentArray[i].user.pictures.sizes[1].link;
			} else {
				authorImage = "http://i1.wp.com/i.vimeocdn.com/portrait/default-green_75x75.png";
			}
			//authorNameAsClass = authorName.replace(/\s+/g,"_").replace(/['|!|\.]/g,"").toLowerCase();
			//authorId = commentArray[i].author[0].yt$userId.$t;
			//userIdArray.push(authorId);

			$youmaxCommentHolder.append('<div  class="youmax-video-comment"><div class="youmax-from"><div class="youmax-from-img" style="background-image:url(\''+authorImage+'\');"></div><div class="youmax-from-name">'+authorName+'</div><div class="youmax-published">'+getDateDiff(commentPublished,youmax_translator_text)+' </div></div><div class="youmax-comment"><span class="youmax-comment-content">'+comment+'</span><div></div>');

		}
		
		//getUserDetails(userIdArray,$youmaxContainer);
		resetLoadMoreComments($youmaxPlayBox,youmax_global_options);
		
	},
	
	processDescription = function(description) {
	
	
		description = description.replace(/"/g, "'");
		//console.log(description);
		
		//spotArray = description.match(/http(s)*:\/\/.+?(\s|\n|$)/g);
		spotArray = description.match(/(http(s)*:\/\/|www\.).+?(\s|\n|$)/g);
		
		//console.log(description);
		//console.log(spotArray);

		//console.log(message);
		//console.log(spotArray);
		if(null!=spotArray) {
			for(var i=0;i<spotArray.length;i++) {
				spotArray[i] = spotArray[i].trim();
				if(spotArray[i].indexOf("www.")==0) {
					replaceLink = "http://"+spotArray[i];
				} else {
					replaceLink = spotArray[i];
				}
				description = description.replace(spotArray[i],"<a target='_blank' href='"+replaceLink+"' class='famax-link'>"+spotArray[i]+"</a>");
			}
		}
	
		//spotArray = description.match(/www\..+?(\s|\n|$)/g);
		//spotArray = description.match(/(http(s)*:\/\/|www.).+?(\s|\n|$)/g);
		
		
		/*if(null!=spotArray) {
			for(var i=0;i<spotArray.length;i++) {
				spotArray[i] = spotArray[i].trim();
				description = description.replace(spotArray[i],"<a target='_blank' href='http://"+spotArray[i]+"' class='famax-link'>"+spotArray[i]+"</a>");
			}
		}*/
	
		return description;					
	},
	
	
	
	//insert HTML for video thumbnails into youmax grid
	insertPlaylistVideos = function(response,loadMoreFlag,$youmaxContainer,paginateFlag) {
		//alert("insertPlaylistVideos");
		//console.log(response.items);
		var videoIdArray = [];
		var $youmaxContainerList = $youmaxContainer.find('ul');
		var item = '', paginate = false;
		//console.log('loadMoreFlag-'+loadMoreFlag);
		if(!loadMoreFlag) {
			//$youmaxContainerList.empty();
			if($youmaxContainer.find('.youmax-tab-hover').length==0) {
				$youmaxContainer.find('#youmax-showing-title').append('<div id="'+$youmaxContainer.data('youmax_current_playlist_id')+'" class="youmax-tab youmax-tab-hover youmax-showing-search-title"><i title="Back to Playlists" id="youmax-back-to-playlists" class="fa fa-chevron-circle-left fa-lg"></i> <i class="fa fa-bars fa-lg youmax-showing-playlist-icon"></i>'+$youmaxContainer.data('youmax_current_playlist_name')+'</div>').show();
			}
		}

		var videoArray = response.items;
		var nextPageToken = response.nextPageToken;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");
		var $youmaxLoadMoreDiv;
		
		if(youmax_global_options.loadMode=="loadmore") {
			$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
		} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
			$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
			//$youmaxContainerList.empty();
			if(loadMoreFlag) {
				paginateFlag = true;
			}			
			loadMoreFlag = false;
		} 

		//console.log('nextPageToken-'+nextPageToken);
		
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			if(nextPageToken.indexOf("youmax-generated")==-1) {
				$youmaxLoadMoreDiv.data('nextpagetoken',nextPageToken);
			}
		} else {
			$youmaxLoadMoreDiv.data('nextpagetoken','');
		}

		//console.log(videoArray.length);
		
		for(var i=0; i<videoArray.length; i++) {
			videoId = videoArray[i].snippet.resourceId.videoId;			
			videoTitle = videoArray[i].snippet.title;
			videoDescription = videoArray[i].snippet.description;
			videoDescription = processDescription(videoDescription);

			if($youmaxContainerList.find('#youtube_'+videoId).length>0) {
				continue;
			}
			
			channelId = videoArray[i].snippet.channelId;
			
			//console.log('Video title-'+videoTitle);
			if(null!=videoArray[i].snippet.thumbnails) {
				videoThumbnail = videoArray[i].snippet.thumbnails.medium.url;
			} else {
				videoThumbnail = '';
				continue;
			}
			videoUploaded = videoArray[i].snippet.publishedAt;
			
			videoIdArray.push(videoId);
			
			videoLink = "https://www.youtube.com/watch?v="+videoId;
			
			//console.log('videoUploaded-'+videoUploaded);

			item += createItem("youtube",videoId,videoTitle,videoDescription,null,null,null,videoUploaded,videoLink,videoThumbnail,null,null,channelId,youmax_global_options,youmax_translator_text);
			
			//$youmaxContainerList.append('<li id="youtube_'+videoId+'" data-description="'+videoDescription+'" data-channelid="'+channelId+'" data-videouploaded="'+videoUploaded+'" class="youmax-grid-item"><div class="youmax-thumbnail-image-wrapper"><img class="youmax-main-thumbnail" href="https://www.youtube.com/watch?v='+videoId+'" src="'+videoThumbnail+'" /><div class="youmax-play-overlay"><div class="youmax-play-icon-holder"><i class="fa fa-play"></i></div></div></div><p><span class="youmax-title-desc-holder"><span class="youmax-video-list-title">'+videoTitle+'</span><span class="youmax-video-list-description">'+videoDescription+'</span></span><span class="youmax-view-date-holder"><span class="youmax-video-list-views" title="views"></span><span class="youmax-views-date-separator">|</span><span class="youmax-video-list-date">'+getDateDiff(videoUploaded,youmax_translator_text)+'</span></span></p><div class="youmax-clean-overlay-holder"><span class="youmax-clean-title">'+videoTitle+'</span><span class="youmax-clean-time"></span></span></div></li>');
			
			//item += ('<li id="youtube_'+videoId+'" data-description="'+videoDescription+'" data-channelid="'+channelId+'" data-videouploaded="'+videoUploaded+'" class="youmax-grid-item youmax-hidden"><div class="youmax-thumbnail-image-wrapper"><img class="youmax-main-thumbnail" href="https://www.youtube.com/watch?v='+videoId+'" src="'+videoThumbnail+'" /><div class="youmax-play-overlay"><div class="youmax-play-icon-holder"><i class="fa fa-play"></i></div></div></div><p><span class="youmax-title-desc-holder"><span class="youmax-video-list-title">'+videoTitle+'</span><span class="youmax-video-list-description">'+videoDescription+'</span></span><span class="youmax-view-date-holder"><span class="youmax-video-list-views" title="views"></span><span class="youmax-views-date-separator">|</span><span class="youmax-video-list-date">'+getDateDiff(videoUploaded,youmax_translator_text)+'</span></span></p><div class="youmax-clean-overlay-holder"><span class="youmax-clean-title">'+videoTitle+'</span><span class="youmax-clean-time"></span></span></div></li>');
			
			
			//$youmaxGrid.append( $items ).masonry( 'appended', $items );

		}

		$items = $(item);			
		$youmaxContainerList.append($items);
		
		createGrid($youmaxContainer,"video",loadMoreFlag,paginateFlag,$items);
		
		getVideoStats(videoIdArray,$youmaxContainer);
		
		if(youmax_global_options.loadMode.indexOf("paginate")!=-1 && (null==nextPageToken || nextPageToken.indexOf("youmax-generated")==-1)) {
			if(videoArray.length > 0) {
				cache = $youmaxContainer.data('cache');
				cacheIndex = $youmaxContainer.data('cacheindex');				

				cache = cache.concat(videoArray);
				cacheIndex = cache.length - videoArray.length - 1;
				//console.log(cache);
				//console.log("cacheIndex : "+cacheIndex);
				
				$youmaxContainer.data('cache',cache);
				$youmaxContainer.data('cacheindex',cacheIndex);				
				
			}
		}
		
	},


	//insert HTML for video thumbnails into youmax grid
	insertVimeoVideos = function(response,loadMoreFlag,$youmaxContainer,paginateFlag) {
		//console.log("insertVimeoVideos");
		//console.log(response);
		
		var item='';
		var $youmaxContainerList = $youmaxContainer.find('ul');
		//console.log('loadMoreFlag-'+loadMoreFlag);
		
		/*if(!loadMoreFlag) {
			//$youmaxContainerList.empty();
			if($youmaxContainer.find('.youmax-tab-hover').length==0) {
				$youmaxContainer.find('#youmax-showing-title').append('<div id="'+$youmaxContainer.data('youmax_current_playlist_id')+'" class="youmax-tab youmax-tab-hover youmax-showing-search-title"><i title="Back to Playlists" id="youmax-back-to-playlists" class="fa fa-chevron-circle-left fa-lg"></i> <i class="fa fa-bars fa-lg youmax-showing-playlist-icon"></i>'+$youmaxContainer.data('youmax_current_playlist_name')+'</div>').show();
			}
		}*/

		var videoArray = response.data;
		var nextPageToken = response.paging.next;
		
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");
		var $youmaxLoadMoreDiv;
		
		if(youmax_global_options.loadMode=="loadmore") {
			$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
		} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
			$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
			//$youmaxContainerList.empty();
			if(loadMoreFlag) {
				paginateFlag = true;
			}			
			loadMoreFlag = false;
		}

		//console.log('nextPageToken-'+nextPageToken);
		
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			if(nextPageToken.indexOf("youmax-generated")==-1) {
				nextPageToken = nextPageToken.substring(nextPageToken.lastIndexOf("&")+1);
				$youmaxLoadMoreDiv.data('nextpagetoken',nextPageToken);
			}
		} else {
			$youmaxLoadMoreDiv.data('nextpagetoken','');
		}

		//alert(videoArray.length);
		for(var i=0; i<videoArray.length; i++) {
			//videoId = videoArray[i].snippet.resourceId.videoId;	
			videoId = videoArray[i].uri.substring(videoArray[i].uri.lastIndexOf("/")+1);
			
			videoLink = "https://vimeo.com/" + videoId;
			videoTitle = videoArray[i].name;
			videoDescription = videoArray[i].description;
			if(null==videoDescription) {
				videoDescription="";
			} else {
				videoDescription = processDescription(videoDescription);
			}
			
			
			//console.log('Video title-'+videoTitle);
			if(null!=videoArray[i].pictures.sizes) {
				videoThumbnail = videoArray[i].pictures.sizes[2].link;
			} else {
				videoThumbnail = '';
				continue;
			}
			videoUploaded = videoArray[i].created_time;
			

			//stats
			
			videoViewCount_raw = videoArray[i].stats.plays;
			
			videoDuration = videoArray[i].duration;
			
			videoLikeCount_raw = videoArray[i].metadata.connections.likes.total;
			
			videoCommentCount_raw = videoArray[i].metadata.connections.comments.total;

			item += createItem("vimeo",videoId,videoTitle,videoDescription,videoViewCount_raw,videoLikeCount_raw,videoCommentCount_raw,videoUploaded,videoLink,videoThumbnail,videoDuration,null,null,youmax_global_options,youmax_translator_text);
			
			//$youmaxContainerList.append(item);

		}
		
		$items = $(item);			
		$youmaxContainerList.append($items);
		
		createGrid($youmaxContainer,"video",loadMoreFlag,paginateFlag,$items);
		
		
		//getVideoStats(videoIdArray,$youmaxContainer);
		
		if(youmax_global_options.loadMode.indexOf("paginate")!=-1 && (null==nextPageToken || nextPageToken.indexOf("youmax-generated")==-1)) {
			if(videoArray.length > 0) {
				cache = $youmaxContainer.data('cache');
				cacheIndex = $youmaxContainer.data('cacheindex');				

				cache = cache.concat(videoArray);
				cacheIndex = cache.length - videoArray.length - 1;
				//console.log(cache);
				//console.log("cacheIndex : "+cacheIndex);
				
				$youmaxContainer.data('cache',cache);
				$youmaxContainer.data('cacheindex',cacheIndex);				
				
			}
		}
		
	},

	
	createItem = function(network,videoId,videoTitle,videoDescription,videoViewCount_raw,videoLikeCount_raw,videoCommentCount_raw,videoUploaded,videoLink,videoThumbnail,videoDuration,videoDefinition,channelId,youmax_global_options,youmax_translator_text) {
			//network = youtube|vimeo
	
			//console.log("creating item");
			
			var item = '';
			
			//processing where counts are provided - vimeo
			if(null==videoViewCount_raw) {
				videoViewCount="??";
				videoViewCount_raw = 0;
			} else {
				videoViewCount = convertViewCountForThumbnail(videoViewCount_raw);
			}
			
			if(null!=videoLikeCount_raw) {
				videoLikeCount = convertLikeCommentCount(videoLikeCount_raw);
			} else {
				videoLikeCount="??";
				videoLikeCount_raw = 0;
			}

			if(null!=videoCommentCount_raw) {
				videoCommentCount = convertLikeCommentCount(videoCommentCount_raw);
			} else {
				videoCommentCount="??";
				videoCommentCount_raw = 0;
			}
			
			if(null!=videoDuration) {
				if(network=="vimeo") {
					videoDuration = convertVimeoDuration(videoDuration);
				} else if(network=="youtube") {
					//youtube never provides duration in first go..
				}
			} else {
				videoDuration="??";
			}
			
			
			if(null==channelId) {
				channelId = "";
			}
			
			
			if(network=="vimeo" && youmax_global_options.showVimeoLikesInsteadOfViews) {
				primaryAttributeString = '<span class="youmax-list-thumbnail-icon"><i class="fa fa-heart"></i></span> <span class="youmax-thumbnail-primary-attribute">' + videoLikeCount+'</span> <span class="youmax-views-text">'+youmax_translator_text.likes+'</span> ';
			} else {
				primaryAttributeString = '<span class="youmax-list-thumbnail-icon"><i class="fa fa fa-dot-circle-o"></i></span> <span class="youmax-all-skin-views">' + videoViewCount+'</span> <span class="youmax-views-text">'+youmax_translator_text.views+'</span> ';
			}
			
			if (youmax_global_options.displayVideo=="thumbnail") {
				frame_source = generateFrameSource(videoId,network,false,youmax_global_options);				
				videoThumbnailString = '<div class="fluid-width-video-wrapper" style="padding-top:'+(youmax_global_options.aspectRatio*100)+'%;"><iframe id="youmax-encloser-video" style="width:100%;" src="'+frame_source+'" frameborder="0" allowfullscreen></iframe></div>';
			} else if (youmax_global_options.displayVideo=="link") {
				videoThumbnailString = '<a href="'+videoLink+'" target="_blank"><img class="youmax-main-thumbnail" href="'+videoLink+'" src="'+videoThumbnail+'"></a>';
			} else {
				videoThumbnailString = '<img class="youmax-main-thumbnail" href="'+videoLink+'" src="'+videoThumbnail+'">';
			}
			

			item = '<li id="'+network+'_'+videoId+'" data-description="'+videoDescription+'" data-views="'+videoViewCount+'" data-likes="'+videoLikeCount+'" data-comments="'+videoCommentCount+'" data-videouploaded="'+videoUploaded+'" data-channelid="'+channelId+'" class="youmax-grid-item youmax-hidden" ><div class="youmax-thumbnail-image-wrapper">'+videoThumbnailString+'<div class="youmax-play-overlay"><div class="youmax-play-icon-holder"><i class="fa fa-play"></i></div></div></div><p><span class="youmax-title-desc-holder"><span class="youmax-video-list-title">'+videoTitle+'</span><span class="youmax-video-list-description">'+videoDescription+'</span></span>';
			
			if(youmax_global_options.skin.indexOf("list")!=-1) {
			
				item += '<span class="youmax-view-date-holder"><span class="youmax-video-list-views" title="views"><span class="youmax-list-thumbnail-icon"><i class="fa fa fa-dot-circle-o"></i></span> <span class="youmax-all-skin-views">' + videoViewCount+'</span> <span class="youmax-views-text">'+youmax_translator_text.views+'</span></span> <span class="youmax-views-date-separator">|</span><span class="youmax-video-list-date">'+getDateDiff(videoUploaded,youmax_translator_text)+'</span> <span class="youmax-video-list-likes" title="likes"> <span class="youmax-list-thumbnail-icon"><i class="fa fa fa-heart"></i></span> <span class="youmax-all-skin-likes">'+videoLikeCount+'</span> <span class="youmax-views-text">'+youmax_translator_text.likes+'</span></span><span class="youmax-video-list-comments" title="comments"> <span class="youmax-list-thumbnail-icon"><i class="fa fa fa-comment"></i></span> <span class="youmax-all-skin-comments">'+videoCommentCount+'</span> <span class="youmax-views-text">'+youmax_translator_text.comments+'</span></span></span></p>';
				
			} else if(youmax_global_options.skin.indexOf("trend")!=-1) {

				
				trend = getVideoTrend(videoViewCount_raw,videoLikeCount_raw,videoCommentCount_raw,videoUploaded,youmax_global_options.hotThreshold,youmax_global_options.trendingThreshold);
				
				if(trend=="trending") {
					icon="fa-bolt";
				} else if (trend=="hot") {
					icon="fa-fire";
				} else {
					icon="fa-check";
				}
				
				//<div class="youmax-trend-link-holder"></div>
				item += '<span class="youmax-trend-link-holder"><span class="youmax-trend-holder youmax-'+trend+'"><i class="fa '+icon+'"></i> <span class="youmax-trend-text">'+trend+'</span></span>   <a class="youmax-thumbnail-link" href="'+videoLink+'" target="_blank"><span class="youmax-link"><i class="fa fa-link"></i></span></a></span>';

				item += '<span class="youmax-view-date-holder"><span class="youmax-video-list-views" title="views"><span class="youmax-list-thumbnail-icon"><i class="fa fa fa-dot-circle-o"></i></span> <span class="youmax-all-skin-views">' + videoViewCount+'</span> <span class="youmax-views-text">'+youmax_translator_text.views+'</span></span> <span class="youmax-views-date-separator">|</span><span class="youmax-video-list-date">'+getDateDiff(videoUploaded,youmax_translator_text)+'</span> <span class="youmax-video-list-likes" title="likes"> <span class="youmax-list-thumbnail-icon"><i class="fa fa fa-heart"></i></span> <span class="youmax-all-skin-likes">'+videoLikeCount+'</span> <span class="youmax-views-text">'+youmax_translator_text.likes+'</span></span><span class="youmax-video-list-comments" title="comments"> <span class="youmax-list-thumbnail-icon"><i class="fa fa fa-comment"></i></span> <span class="youmax-all-skin-comments">'+videoCommentCount+'</span> <span class="youmax-views-text">'+youmax_translator_text.comments+'</span></span></span></p>';
			
			} else {
			
				item += '<span class="youmax-view-date-holder"><span class="youmax-video-list-views" title="views">'+primaryAttributeString+'</span><span class="youmax-views-date-separator">|</span><span class="youmax-video-list-date">'+getDateDiff(videoUploaded,youmax_translator_text)+'</span></span></p>';
				
			}
			
			if(youmax_global_options.skin.indexOf("clean")!=-1) {
				if(network=="vimeo" && youmax_global_options.showVimeoLikesInsteadOfViews) {
					item += '<div class="youmax-definition"><i class="fa fa-heart fa-1x"></i> <span class="youmax-all-skin-likes">'+videoLikeCount+'</span> </div>';
					item += '<div class="youmax-duration"><i class="fa fa-comment fa-1x"></i> <span class="youmax-all-skin-comments">'+videoCommentCount+'</span> </div>';
				} else {
					item += '<div class="youmax-duration"><i class="fa fa-heart fa-1x"></i> <span class="youmax-all-skin-likes">'+videoLikeCount+'</span> </div>';
					item += '<div class="youmax-definition"><i class="fa fa-volume-off fa-1x"></i> <span class="youmax-all-skin-views">'+videoViewCount+'</span> </div>';
				}
				
				item += '<div class="youmax-clean-overlay-holder"><span class="youmax-clean-title">'+videoTitle+'</span><span class="youmax-clean-time">'+videoDuration+'</span></span></div>';
				
			} else {
			
				if (youmax_global_options.displayVideo!="thumbnail") {
					item += '<div class="youmax-duration">'+videoDuration+'</div>';
					
					if(network=="youtube") {
						item += '<div class="youmax-definition">'+videoDefinition+'</div>';
					}
				}
				
				if(youmax_global_options.skin.indexOf("block")!=-1) {
					item += '<div class="youmax-like-comment-holder"><div class="youmax-like-box"><i class="fa fa-heart"></i> <span class="youmax-all-skin-likes">'+videoLikeCount+'</span></div><div class="youmax-comment-box"><i class="fa fa-comment"></i><span class="youmax-all-skin-comments">'+videoCommentCount+'</span></div></div>';
				}
			}
			
			item += '</li>';

			return item;
	
	},
	
	
	
	//insert HTML for video thumbnails into youmax grid
	insertChannelPlaylists = function(response,loadMoreFlag,$youmaxContainer,paginateFlag) {
		//console.log("insertChannelPlaylists");
		//console.log(response);
		//var videoIdArray = [];
		var item = '';
		var $youmaxContainerList = $youmaxContainer.find('ul');
		//console.log('loadMoreFlag-'+loadMoreFlag);
		if(!loadMoreFlag) {
			//$youmaxContainerList.empty();
		}

		var playlistArray = response.items;
		var nextPageToken = response.nextPageToken;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');		
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");		
		var $youmaxLoadMoreDiv;
		
		if(youmax_global_options.loadMode=="loadmore") {
			$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
		} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
			$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
			//$youmaxContainerList.empty();
			if(loadMoreFlag) {
				paginateFlag = true;
			}			
			loadMoreFlag = false;
		} 

		//console.log('nextPageToken-'+nextPageToken);
		
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			if(nextPageToken.indexOf("youmax-generated")==-1) {
				$youmaxLoadMoreDiv.data('nextpagetoken',nextPageToken);
			}
		} else {
			$youmaxLoadMoreDiv.data('nextpagetoken','');
		}


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
			
			item += '<li id="youtube_playlist_videos_'+playlistId+'" class="youmax-playlist-thumbnail youmax-grid-item youmax-hidden" ><div class="youmax-thumbnail-image-wrapper" ><img class="youmax-main-thumbnail" href="https://www.youtube.com/watch?v='+playlistId+'" src="'+playlistThumbnail+'"></div><div class="youmax-playlist-video-count-wrapper"><div class="youmax-playlist-video-count-box"><span class="youmax-playlist-video-count">'+videoCount+'</span><br>VIDEOS<br><div class="youmax-playlist-line-wrapper"><span class="youmax-playlist-line"></span><br><span class="youmax-playlist-line"></span><br><span class="youmax-playlist-line"></span></div></div></div><p><span class="youmax-video-list-title">'+playlistTitle+'</span><span class="youmax-video-list-views youmax-video-list-date-playlist">'+getDateDiff(playlistUploaded,youmax_translator_text)+' </span></p><div class="youmax-clean-playlist-title">'+playlistTitle+'</div></li>';

			//$youmaxContainerList.append('<li id="'+videoId+'" href="https://www.youtube.com/watch?v='+videoId+'" ><img src="'+videoThumbnail+'"><p><span class="youmax-video-list-title">'+videoTitle+'</span><span class="youmax-video-list-views"></span><span class="youmax-views-date-separator">|</span><span class="youmax-video-list-date">'+getDateDiff(videoUploaded)+'</span></p><div class="youmax-clean-overlay-holder"><span class="youmax-clean-title">'+videoTitle+'</span><span class="youmax-clean-time"></span></span></div></li>');

		}
		
		$items = $(item);
		$youmaxContainerList.append($items);
		
		createGrid($youmaxContainer,"playlist",loadMoreFlag,paginateFlag,$items);
		
		if(youmax_global_options.loadMode.indexOf("paginate")!=-1 && (null==nextPageToken || nextPageToken.indexOf("youmax-generated")==-1)) {
			if(playlistArray.length > 0) {
				cache = $youmaxContainer.data('cache');
				cacheIndex = $youmaxContainer.data('cacheindex');				
				
				cache = cache.concat(playlistArray);
				cacheIndex = cache.length - playlistArray.length - 1;
				//console.log(cache);
				//console.log("cacheIndex : "+cacheIndex);
				
				$youmaxContainer.data('cache',cache);
				$youmaxContainer.data('cacheindex',cacheIndex);				
			}
		}		
	},	
	
	
	//insert HTML for video thumbnails into youmax grid
	insertUserSearchVideos = function(response,searchQuery,loadMoreFlag,$youmaxContainer) {
		//console.log('inside insertUserSearchVideos');
		//console.log(response);
		
		searchQuery=searchQuery.replace(/%20/g," ");

		if(!loadMoreFlag) {
			//$youmaxContainerList.empty();
			if($youmaxContainer.find('.youmax-tab-hover').length==0) {
				$youmaxContainer.find('#youmax-showing-title').append('<div id="query_'+searchQuery+'" class="youmax-tab youmax-tab-hover youmax-showing-search-title"><i class="fa fa-search fa-1x youmax-showing-search-icon"></i>'+searchQuery+'</div>').show();
			}
			
			if(null==response.items || response.items.length==0) {
				var $youmaxContainerList = $youmaxContainer.find('ul');
				$youmaxContainerList.empty().append('<div class="youmax-not-found"><span style="opacity:0;">.</span><br><br><br><br><br><br>No videos found..<br><br><br><br><br><br><span style="opacity:0;">.</span></div>');
			}
			
		}

		
		insertSearchVideos(response,$youmaxContainer,null,null,loadMoreFlag);
	},

	//insert HTML for video thumbnails into youmax grid
	insertSearchVideos = function(response,$youmaxContainer,fileBasedSearch,isEvent,loadMoreFlag,paginateFlag) {
		//console.log('inside insertSearchVideos - '+eventType);
		//console.log("insertSearchVideos");
		//console.log(response);
		var videoIdArray = [], item='';
		var $youmaxContainerList = $youmaxContainer.find('ul');
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");
		
		//console.log('loadMoreFlag-'+loadMoreFlag);

		var videoArray = response.items;
		
		if(!fileBasedSearch) {
			var nextPageToken = response.nextPageToken;
			var $youmaxLoadMoreDiv;
			
			if(youmax_global_options.loadMode=="loadmore") {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
			} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
				//$youmaxContainerList.empty();
				if(loadMoreFlag) {
					paginateFlag = true;
				}			
				loadMoreFlag = false;
			} 

			//console.log('nextPageToken-'+nextPageToken);
			
			if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
				if(nextPageToken.indexOf("youmax-generated")==-1) {
					$youmaxLoadMoreDiv.data('nextpagetoken',nextPageToken);
				}
			} else {
				$youmaxLoadMoreDiv.data('nextpagetoken','');
			}
		
		}
		
		//7.0 - added for playlist search via file
		if(null==videoArray || videoArray.length==0) {
			
			return;
		} else {
			$youmaxContainer.find('.youmax-not-found').remove();
		}
		
		//alert(videoArray.length);
		for(var i=0; i<videoArray.length; i++) {
			if(fileBasedSearch) {
				videoId = videoArray[i].id;
			} else {
				videoId = videoArray[i].id.videoId;
			}
			
			if($youmaxContainerList.find('#youtube_'+videoId).length>0) {
				continue;
			}
			
			videoTitle = videoArray[i].snippet.title;
			//console.log('Video title-'+videoTitle);
			if(null!=videoArray[i].snippet.thumbnails) {
				videoThumbnail = videoArray[i].snippet.thumbnails.medium.url;
				if(isEvent) {
					eventType = videoArray[i].snippet.liveBroadcastContent;				
					if(eventType=="upcoming" ) {
						videoThumbnail = videoThumbnail.replace(".jpg","_live.jpg");						
					} else if (eventType=="live") {
						videoThumbnail = videoThumbnail.replace(".jpg","_live.jpg");
					} else if (eventType=="completed") {
						// we do not get event type as completed in search
						//videoThumbnail = videoThumbnail.replace(".jpg","_live.jpg");
					}
				}
			} else {
				videoThumbnail = '';
				continue;
			}
			videoUploaded = videoArray[i].snippet.publishedAt;
			
			videoDescription = videoArray[i].snippet.description;
			videoDescription = processDescription(videoDescription);
			
			channelId = videoArray[i].snippet.channelId;

			
			videoIdArray.push(videoId);
			
			//console.log('videoUploaded-'+videoUploaded);
		
			//$youmaxContainerList.append('<li id="'+videoId+'" href="https://www.youtube.com/watch?v='+videoId+'" ><img src="'+videoThumbnail+'"><p><span class="youmax-video-list-title">'+videoTitle+'</span><span class="youmax-video-list-views"></span><span class="youmax-views-date-separator">|</span><span class="youmax-video-list-date">'+getDateDiff(videoUploaded)+'</span></p><div class="youmax-clean-overlay-holder"><span class="youmax-clean-title">'+videoTitle+'</span><span class="youmax-clean-time"></span></span></div></li>');
			
			videoLink = "https://www.youtube.com/watch?v="+videoId;
			
			item += createItem("youtube",videoId,videoTitle,videoDescription,null,null,null,videoUploaded,videoLink,videoThumbnail,null,null,channelId,youmax_global_options,youmax_translator_text);


			//$youmaxContainerList.append('<li id="youtube_'+videoId+'" data-description="'+videoDescription+'" data-channelid="'+channelId+'" data-videouploaded="'+videoUploaded+'" class="youmax-grid-item youmax-hidden" ><div class="youmax-thumbnail-image-wrapper"><img class="youmax-main-thumbnail" href="https://www.youtube.com/watch?v='+videoId+'" src="'+videoThumbnail+'"><div class="youmax-play-overlay"><div class="youmax-play-icon-holder"><i class="fa fa-play"></i></div></div></div><p><span class="youmax-title-desc-holder"><span class="youmax-video-list-title">'+videoTitle+'</span><span class="youmax-video-list-description">'+videoDescription+'</span></span><span class="youmax-view-date-holder"><span class="youmax-video-list-views" title="views"></span><span class="youmax-views-date-separator">|</span><span class="youmax-video-list-date">'+getDateDiff(videoUploaded,youmax_translator_text)+'</span></span></p><div class="youmax-clean-overlay-holder"><span class="youmax-clean-title">'+videoTitle+'</span><span class="youmax-clean-time"></span></span></div></li>');

			
		}

		$items = $(item);
		$youmaxContainerList.append($items);
		
		createGrid($youmaxContainer,"video",loadMoreFlag,paginateFlag,$items);

		
		getVideoStats(videoIdArray,$youmaxContainer,isEvent);

		if(youmax_global_options.loadMode.indexOf("paginate")!=-1 && (null==nextPageToken || nextPageToken.indexOf("youmax-generated")==-1)) {
			if(videoArray.length > 0) {
				cache = $youmaxContainer.data('cache');
				cacheIndex = $youmaxContainer.data('cacheindex');				

				cache = cache.concat(videoArray);
				cacheIndex = cache.length - videoArray.length - 1;
				//console.log(cache);
				//console.log("cacheIndex : "+cacheIndex);

				$youmaxContainer.data('cache',cache);
				$youmaxContainer.data('cacheindex',cacheIndex);								
			}
		}
		
	},
	
	convertDateFormat = function (timestamp) {
		var jsDate = new Date(timestamp);
		month = ["Jan","Feb","","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		if(jsDate.getMinutes()<10) {
			minutes = ("0"+jsDate.getMinutes());
		} else {
			minutes = (jsDate.getMinutes());
		}
		return jsDate.getDate()+" "+month[(jsDate.getMonth()+1)]+" "+jsDate.getHours()+":"+minutes+" GMT";
	
	},

	getDateDiff = function (timestamp,youmax_translator_text) {
	
		if(null==timestamp||timestamp==""||timestamp=="undefined")
			return "?";
		//console.log(new Date(timestamp));
		
		dateDiffMS = Math.abs(new Date() - new Date(timestamp));
		//console.log(dateDiffMS);
		
		dateDiffHR = dateDiffMS/1000/60/60;
		if(dateDiffHR>24) {
			dateDiffDY = dateDiffHR/24;
			if(dateDiffDY>30) {
				dateDiffMH = dateDiffDY/30;
				if(dateDiffMH>12) {
					dateDiffYR = dateDiffMH/12;
					dateDiffYR = Math.round(dateDiffYR);
					if(dateDiffYR<=1) {
						return dateDiffYR+" "+youmax_translator_text.year+" "+youmax_translator_text.ago;
					} else {
						return dateDiffYR+" "+youmax_translator_text.years+" "+youmax_translator_text.ago;
					}						
				} else {
					dateDiffMH = Math.round(dateDiffMH);
					if(dateDiffMH<=1) {
						return dateDiffMH+" "+youmax_translator_text.month+" "+youmax_translator_text.ago;
					} else {
						return dateDiffMH+" "+youmax_translator_text.months+" "+youmax_translator_text.ago;
					}						
				}
			} else {
				dateDiffDY = Math.round(dateDiffDY);
				if(dateDiffDY<=1) {
					return dateDiffDY+" "+youmax_translator_text.day+" "+youmax_translator_text.ago;
				} else {
					return dateDiffDY+" "+youmax_translator_text.days+" "+youmax_translator_text.ago;
				}
			}
		} else {
			dateDiffHR = Math.round(dateDiffHR);
			if(dateDiffHR<1) {
				return youmax_translator_text.now;
			}else if(dateDiffHR==1) {
				return dateDiffHR+" "+youmax_translator_text.hour+" "+youmax_translator_text.ago;
			} else {
				return dateDiffHR+" "+youmax_translator_text.hours+" "+youmax_translator_text.ago;
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
	createGrid = function($youmaxContainer,itemType,loadMoreFlag,paginateFlag,$items) {
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');	
		var $youmaxContainerList = $youmaxContainer.find('ul');
		
		
		
		/*
		var options = {
		  autoResize: true, // This will auto-update the layout when the browser window is resized.
		  //container: $youmaxContainer.find('#youmax-video-list-div'), // Optional, used for some extra CSS styling
		  offset: youmax_global_options.innerOffset, // Optional, the distance between grid items
		  itemWidth: youmax_global_options.minItemWidth, // Optional, the width of a grid item
		  flexibleWidth : youmax_global_options.maxItemWidth,
		  outerOffset: youmax_global_options.outerOffset
		};

		var youmax_wookmark;*/
			
		//$youmaxContainerList.imagesLoaded(function() {
		$youmaxContainerList.imagesLoaded().always(function() {
			
			$youmaxContainer.find('.youmax-loading-div').remove();
			
			$youmaxContainerList.find("li.youmax-hidden").removeClass("youmax-hidden");
			
			//console.log("images loaded");
			//$youmaxContainerList.css("opacity","1");
			
			//youmax_wookmark = $youmaxContainerList.wookmark(options);
			//setTimeout(function(){ youmax_wookmark.wookmarkInstance.updateOptions(); }, youmax_global_options.updateLayoutDelay);
			
			if(loadMoreFlag) {
				//console.log("load more grid");
				$youmaxContainerList.masonry('appended',$items);
			} else if (paginateFlag) {
				
				//console.log("paginate grid");
				$oldItems = $youmaxContainerList.find('.youmax-dying');
				//console.log($oldItems);
				$youmaxContainerList.masonry('remove',$oldItems).masonry('layout');
				$youmaxContainerList.masonry('appended',$items);
				
			} else {
				
				if(null!=$youmaxContainerList.data('masonry')) {
					//console.log("destroying masonry");
					$youmaxContainerList.masonry('destroy');
				}
				
				//not sure why time delay is needed
				//setTimeout(function(){
					//console.log("creating grid");			
					$youmaxGrid = $youmaxContainerList.masonry({
						// options...
						//itemSelector: '.grid-item',
						columnWidth: '.youmax-grid-item',
						percentPosition: true
					});
				//}, 100);
				
				//DO NOT REMOVE
				setTimeout(function(){
					//add option to do relayout for slow websites
					//also used by list layout
					console.log("Youmax Re-Layout");
					$youmaxContainer.find('ul').masonry('layout'); 
				}, youmax_global_options.updateLayoutDelay);
				
			}
			
			//my_wookmark.wookmarkInstance.layout(true);
			//youmax_wookmark.wookmarkInstance.updateOptions();
			
			
			/*var options = {
			  autoResize: true, // This will auto-update the layout when the browser window is resized.
			  //container: $youmaxContainer.find('#youmax-video-list-div'), // Optional, used for some extra CSS styling
			  offset: youmax_global_options.innerOffset, // Optional, the distance between grid items
			  itemWidth: youmax_global_options.minItemWidth, // Optional, the width of a grid item
			  flexibleWidth : youmax_global_options.maxItemWidth,
			  outerOffset: youmax_global_options.outerOffset
			};*/

			
			//var handler = $youmaxContainerList.find('li');
			
			// Call the layout function.
			//handler.wookmark(options);
			//var wookmark = $youmaxContainerList.wookmark(options);
			
			if(itemType=="playlist") {
				if(youmax_global_options.playlistAction=="playall") {
					registerPopup($youmaxContainer,true);
				} else {
					$youmaxContainer.find('#youmax-video-list-div .youmax-main-thumbnail').click(function(){
						//console.log($youmaxEncloserIframe);
						$youmaxPlaylistThumbnail = $(this).parents("li").first();
						youmaxPlaylistId = $youmaxPlaylistThumbnail.attr("id");
						displayPlaylist(youmaxPlaylistId,$youmaxContainer);
						youmax_current_playlist_name = $youmaxPlaylistThumbnail.find('.youmax-video-list-title').text();
						$youmaxContainer.data('youmax_current_playlist_name',youmax_current_playlist_name);
						$youmaxContainer.data('youmax_current_playlist_id',youmaxPlaylistId);
					});
				}
			} else {
				registerPopup($youmaxContainer);
			}
			resetLoadMoreButton($youmaxContainer);
			
			if(youmax_global_options.skin.indexOf('trend')!=-1 && ($youmaxContainer.find('#tiles li:first-child').width())<280) {
				$youmaxContainer.find('.youmax-video-list-date').hide();
			}
			
			
		});
	},
	
	resetLoadMoreButton = function($youmaxContainer) {
		
		var $youmaxLoadMoreDiv;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		if(youmax_global_options.showTextInsteadOfIcons) {
		
			if(youmax_global_options.loadMode=="loadmore") {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
				$youmaxLoadMoreDiv.html('Load More');
			} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
				$youmaxLoadMoreDiv.html('Next');
				$youmaxContainer.find('#youmax-previous-div').html('Previous');
			}
		
		} else {
		
			if(youmax_global_options.loadMode=="loadmore") {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-load-more-div');
				$youmaxLoadMoreDiv.html('<i class="fa fa-plus fa-5x"></i>');
			} else if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
				$youmaxLoadMoreDiv = $youmaxContainer.find('#youmax-next-div');
				$youmaxLoadMoreDiv.html('<i class="fa fa-caret-right fa-5x"></i>');
				$youmaxContainer.find('#youmax-previous-div').html('<i class="fa fa-caret-left fa-5x"></i>');
			}
		
		}
		
		$youmaxLoadMoreDiv.removeClass('youmax-load-more-div-click');
		$youmaxContainer.find('#youmax-previous-div').removeClass('youmax-load-more-div-click');
			
	},
	
	resetLoadMoreComments = function($youmaxPlayBox,youmax_global_options) {
		var $youmaxMoreButton = $youmaxPlayBox.find(".youmax-encloser-comment-button.youmax-more-button");
		$youmaxMoreButton.removeClass('youmax-load-more-comments-clicked');
		
		if(youmax_global_options.showTextInsteadOfIcons) {
			$youmaxMoreButton.html('Load More Comments');
		} else {
			$youmaxMoreButton.html('<i class="fa fa-plus fa-3x"></i>');
		}
	},
	
	//register video popup on video thumbnails
	registerPopup = function($youmaxContainer,isPlaylist) {
	
		var frame_source="";
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data('youmax_translator_text');
		var youtube_frame_source="", vimeo_frame_source="";
		
		if(youmax_global_options.displayVideo=="popup") {
			//display video in popup
			
			//var tabId = $youmaxContainer.find(".youmax-tab-hover").attr("id");
			//frame_source = generateFrameSource("%id%",isPlaylist,$youmaxContainer);
			
			//youtube frame source
			if(isPlaylist) {
				youtube_frame_source = youmax_global_options.videoProtocol + "//www.youtube.com/embed?listType=playlist&list=%id%&rel=0";
			} else {
				youtube_frame_source = youmax_global_options.videoProtocol + "//www.youtube.com/embed/%id%?rel=0";
			}
			if(youmax_global_options.autoPlayVideo) {
				youtube_frame_source+="&autoplay=1";
			}
			if(youmax_global_options.showTitleInVideoPlayer) {
				youtube_frame_source+="&showinfo=1";
			} else {
				youtube_frame_source+="&showinfo=0";
			}
			youtube_frame_source+="&theme="+youmax_global_options.videoPlayerTheme;

			//vimeo frame source
			vimeo_frame_source = youmax_global_options.videoProtocol + "//player.vimeo.com/video/%id%";
			if(youmax_global_options.autoPlayVideo) {
				vimeo_frame_source+="?autoplay=1";
			}
			
			if(youmax_global_options.showTextInsteadOfIcons) {
				youmaxExtraPopupClasses = 'youmax-text-instead-of-icons';
				youmaxShowCommentsText = 'Show Comments';
				youmaxMoreCommentsText = 'Load More Comments';				
			} else {
				youmaxExtraPopupClasses = '';
				youmaxShowCommentsText = '<i class="fa fa-comments fa-3x"></i>';
				youmaxMoreCommentsText = '<i class="fa fa-plus fa-3x"></i>';
			}	
			
			
			$youmaxContainer.find('#youmax-video-list-div .youmax-main-thumbnail').magnificPopup({
				type:'iframe',
				gallery: {
					enabled:true
				},
				iframe:{
					markup: '<div class="mfp-iframe-scaler">'+
					'<div class="mfp-close"></div>'+
					'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
					//'<div id="youmax-encloser-comment-wrapper" class="youmax-encloser-comment-wrapper-popup"><div class="youmax-encloser-comment-button youmax-show-button youmax-popup-show-button">Show Comments</div><div id="youmax-encloser-comment-holder" class="youmax-encloser-comment-holder-popup"><div class="youmax-video-comment"><textarea class="youmax-comment-textbox" placeholder="Share your Thoughts..."></textarea><button type="button" class="youmax-add-comment-button">G+ Sign In</button></div><div id="youmax-encloser-comments"></div><div class="youmax-encloser-comment-button youmax-more-button">Load More Comments</div></div></div>'+
					'<div id="photo-detail-holder"><div class="photo-popup-title"></div><div class="photo-popup-description photo-popup-description-limited"></div><div class="youmax-full-description-button-wrapper"><div class="youmax-full-description-button">More..</div></div><div class="photo-popup-stats"><div class="media-views"></div><div class="media-likes"> </div><div class="media-uploaded"></div> <div type="button" class="youmax-share-video-button"><i class="fa fa-share-alt fa-2x"></i></div></div>  <div class="youmax-show-button-wrapper"><div class="youmax-encloser-comment-button youmax-show-button youmax-popup-show-button">'+youmaxShowCommentsText+'</div></div> <div id="youmax-encloser-comment-holder" class="youmax-encloser-comment-holder-popup"><div class="youmax-video-comment youmax-commentbox-holder"><textarea class="youmax-comment-textbox" placeholder="'+youmax_translator_text.thoughts+'"></textarea><button type="button" class="youmax-add-comment-button"><i class="fa fa-google-plus fa-2x"></i><span class="youmax-google-login-text">Login</span></button></div><div id="youmax-encloser-comments"></div><div class="youmax-encloser-comment-button youmax-more-button">'+youmaxMoreCommentsText+'</div></div> </div>'+
					'</div>',
					patterns: {
						youtube: {
							src: youtube_frame_source
						},
						vimeo: {
							src: vimeo_frame_source
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
				mainClass: 'youmax-popup '+youmaxExtraPopupClasses,
				//prependTo: $youmaxContainer.get(),
				callbacks: {
					change: function(template, values, item) {
						// Triggers each time when content of popup changes
						//console.log('open:',item);
						var $baseElement = $(this.currItem.el.context).parents("li").first();
						//console.log("$baseElement",$baseElement);
						displayVideoData($baseElement,$youmaxContainer);
						


					}			
				}
			});		
			
			
		} else if(youmax_global_options.displayVideo=="inline" || youmax_global_options.displayVideo=="newpage"){
			//display inline video
			//http://www.youtube.com/embed/%id%?rel=0&autoplay=1
			//var $youmaxEncloserIframe = $youmaxContainer.find('#youmax-encloser-video');
			$youmaxContainer.find('#youmax-video-list-div .youmax-main-thumbnail').click(function() {
				//console.log($youmaxEncloserIframe);
				
				$baseElement = $(this).parents("li").first();
				displayInlineVideo($baseElement,true,true,$youmaxContainer,isPlaylist);
			
			});
			
			if(youmax_global_options.displayVideo=="inline" && youmax_global_options.displayFirstVideoOnLoad) {
				//videoId = $youmaxContainer.find('#youmax-video-list-div li:first').attr('id');
				//displayInlineVideo(videoId,false,false,$youmaxContainer);
				setTimeout(function(){
					//$youmaxContainer.find('#youmax-video-list-div li:first .youmax-main-thumbnail').click();
					$baseElement = $youmaxContainer.find('#youmax-video-list-div li:first');
					displayInlineVideo($baseElement,false,true,$youmaxContainer,isPlaylist);
				}, 100);
				
				youmax_global_options.displayFirstVideoOnLoad=false;
				$youmaxContainer.data('youmax_global_options',youmax_global_options);

			}
			
			if(youmax_global_options.displayVideo=="inline" && youmax_global_options.featuredVideo!="") {
				
				if(youmax_global_options.featuredVideo.indexOf("youtube.com")!=-1) {
					video_type = "youtube";
					video_id = youmax_global_options.featuredVideo.substring(youmax_global_options.featuredVideo.lastIndexOf("?v=")+3);
				} else if(youmax_global_options.featuredVideo.indexOf("vimeo.com")!=-1) {
					video_type = "vimeo";
					video_id = youmax_global_options.featuredVideo.substring(youmax_global_options.featuredVideo.lastIndexOf("/")+1);					
				}

				if(video_type=="youtube") {
					getYoutubeVideoDetails(video_id,$youmaxContainer,false,false);
				} else if(video_type=="vimeo") {
					getVimeoVideoDetails(video_id,$youmaxContainer,false,false);
				} 
				//displayInlineVideo(null,false,false,$youmaxContainer,videoId);
				youmax_global_options.featuredVideo="";
				$youmaxContainer.data('youmax_global_options',youmax_global_options);
			}

		} else if (youmax_global_options.displayVideo=="thumbnail") {
			
			//do nothing - already handled during insert item
			
			/*$youmaxContainer.find('#youmax-video-list-div .youmax-main-thumbnail').click(function() {
				//console.log($youmaxEncloserIframe);
				
				$baseElement = $(this).parents("li").first();
				displayThumbnailVideo($baseElement,true,true,$youmaxContainer,isPlaylist);
			
			});*/
			
		}
	
	},
	
	
/*
	displayThumbnailVideo = function($baseElement,scrollToVideo,generateLink,$youmaxContainer,isPlaylist) {
	
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data('youmax_translator_text');
		
		video_id_with_type = $baseElement.attr("id");		
		video_type = video_id_with_type.substring(0,video_id_with_type.indexOf("_"));
		video_id = video_id_with_type.substring(video_id_with_type.indexOf("_")+1);		
		frame_source = generateFrameSource(video_id,video_type,isPlaylist,$youmaxContainer);
		
		
		$baseElement.find('.youmax-thumbnail-image-wrapper').empty().append('<div class="fluid-width-video-wrapper" style="padding-top:'+(youmax_global_options.aspectRatio*100)+'%;"><iframe id="youmax-encloser-video" style="width:100%;" src="'+frame_source+'" frameborder="0" allowfullscreen></iframe></div>');
		

	},
*/		
	
	
	displayVideoData = function($baseElement,$youmaxContainer) {
		
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data("youmax_translator_text");
		
		//var tabId = $youmaxContainer.find(".youmax-tab-hover").attr("id");
		
		video_likes = $baseElement.data("likes");
		video_comments = $baseElement.data("comments");
		video_views = $baseElement.data("views");
		video_description = $baseElement.data("description");
		video_uploaded = $baseElement.find(".youmax-video-list-date").text();
		//console.log(video_likes+"\n"+video_views+"\n"+video_description);
		video_id_with_type = $baseElement.attr("id");
		video_type = video_id_with_type.substring(0,video_id_with_type.indexOf("_"));
		video_id = video_id_with_type.substring(video_id_with_type.indexOf("_")+1);
		video_title = $baseElement.find(".youmax-video-list-title").text();
		channel_id = $baseElement.data("channelid");


		setTimeout(function(){

			if(youmax_global_options.displayVideo=="popup") {
				$youmaxPlayBox = $('.youmax-popup.mfp-gallery');
				//console.log($youmaxPlayBox);
			} else {
				$youmaxPlayBox = $youmaxContainer;
			}
		
			if(null!=video_title) {
				$youmaxPlayBox.find('.photo-popup-title').html(video_title);
			}
			
			if(null!=video_description) {
				video_description = video_description.replace(/\n/g,"<br>");
				$youmaxPlayBox.find('.photo-popup-description').html(video_description);
			}
			
			if(youmax_global_options.showVimeoLikesInsteadOfViews && video_type=="vimeo") {
				if(null!=video_comments) {
					$youmaxPlayBox.find('.media-likes').html('<i class="fa fa-comment"></i>'+video_comments+" "+youmax_translator_text.comments);
				}
				
				if(null!=video_views) {
					$youmaxPlayBox.find('.media-views').html('<i class="fa fa-heart"></i>'+video_likes+" "+youmax_translator_text.likes);
				}
			} else {
				if(null!=video_likes) {
					$youmaxPlayBox.find('.media-likes').html('<i class="fa fa-heart"></i>'+video_likes+" "+youmax_translator_text.likes);
				}
				
				if(null!=video_views) {
					$youmaxPlayBox.find('.media-views').html('<i class="fa fa-video-camera"></i>'+video_views+" "+youmax_translator_text.views);
				}
			}
			
			if(null!=video_uploaded) {
				$youmaxPlayBox.find('.media-uploaded').html('<i class="fa fa-clock-o"></i>'+video_uploaded);
			}
			
			
			/*videoUrl = $youmaxContainer.find('.mfp-content iframe').attr('src');
			videoId = videoUrl.substring(videoUrl.indexOf('/embed/')+7);
			if(videoUrl.indexOf('?')!=-1) {
				videoId = videoId.substring(0,videoId.indexOf('?'));
			}*/
			//console.log('videoId-'+videoId);
			//console.log($youmaxContainer);
			
			$descriptionBox = $youmaxPlayBox.find('.photo-popup-description');
			if($descriptionBox.height()<250) {
				$youmaxPlayBox.find('.youmax-full-description-button-wrapper').hide();
			} else {
				$youmaxPlayBox.find('.youmax-full-description-button').click(function(){
					$descriptionBox.removeClass('photo-popup-description-limited');
					$(this).hide();
				});
			}
			
			
			$youmaxPlayBox.find('.youmax-show-button.youmax-popup-show-button').attr('id',video_id_with_type).show();
			$youmaxPlayBox.find('.youmax-show-button.youmax-popup-show-button').data('channelid',channel_id);
			$youmaxPlayBox.find('.youmax-encloser-comment-button.youmax-more-button').data('start-index',1);
			$youmaxPlayBox.find('#youmax-encloser-comment-holder').hide();
			
			if(youmax_global_options.autoLoadComments) {
				displayComments(video_id_with_type,$youmaxContainer);
			}
			
			video_type = video_id_with_type.substring(0,video_id_with_type.indexOf("_"));
			video_id = video_id_with_type.substring(video_id_with_type.indexOf("_")+1);			
			
			//Share
			if(youmax_global_options.shareLink=="video") {
				if(video_type=="youtube") {
					shareLink = "https://youtu.be/"+video_id;
				} else if(video_type=="vimeo") {
					shareLink = "https://vimeo.com/"+video_id;
				} else {
					shareLink = window.location.href;
				}
			} else {
				shareLink = window.location.href;
			}
			
			config = {
				networks: {
					facebook: {
						app_id: youmax_global_options.facebookAppId
					},
					email: {
						enabled: false
					},
					pinterest: {
						enabled: false
					}
				},
				ui: {
					flyout: 'top center',
					button_text: '<i class="fa fa-2x fa-share-alt"></i>'
				},
				url: shareLink
			};

			new Share('.youmax-share-video-button', config).open();
		
		}, 100);

	},
	
	displayInlineVideo = function($baseElement,scrollToVideo,generateLink,$youmaxContainer,isPlaylist) {
	
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = $youmaxContainer.data('youmax_translator_text');
		
		//$youmaxContainer.find("#youmax-encloser").empty().append('<div class="fluid-width-video-wrapper" style="padding-top:'+(youmax_global_options.aspectRatio*100)+'%;"><iframe id="youmax-encloser-video" style="width:100%;" src="" frameborder="0" allowfullscreen></iframe></div><div id="youmax-encloser-comment-wrapper"><div id="photo-detail-holder"><div class="photo-popup-title"></div><div class="photo-popup-description photo-popup-description-limited"></div><div class="youmax-full-description-button-wrapper"><div class="youmax-full-description-button">More</div></div><div class="photo-popup-stats"><span class="media-views"></span><span class="media-likes"> </span><span class="media-uploaded"></span></div> <div class="youmax-show-button-wrapper"><div class="youmax-encloser-comment-button youmax-show-button youmax-popup-show-button"><i class="fa fa-comments fa-3x"></i></div></div> <div id="youmax-encloser-comment-holder" class="youmax-encloser-comment-holder-popup"><div class="youmax-video-comment youmax-commentbox-holder"><textarea class="youmax-comment-textbox" placeholder="'+youmax_translator_text.thoughts+'"></textarea><button type="button" class="youmax-add-comment-button"><i class="fa fa-sign-in fa-2x"></i></button><div type="button" class="youmax-share-video-button"><i class="fa fa-share fa-2x"></i></div></div><div id="youmax-encloser-comments"></div><div class="youmax-encloser-comment-button youmax-more-button"><i class="fa fa-plus fa-3x"></i></div></div> </div> </div>');

		if(youmax_global_options.showTextInsteadOfIcons) {
			youmaxExtraPopupClasses = 'youmax-text-instead-of-icons';
			youmaxShowCommentsText = 'Show Comments';
			youmaxMoreCommentsText = 'Load More Comments';				
		} else {
			youmaxExtraPopupClasses = '';
			youmaxShowCommentsText = '<i class="fa fa-comments fa-3x"></i>';
			youmaxMoreCommentsText = '<i class="fa fa-plus fa-3x"></i>';
		}	
		
		$youmaxContainer.find("#youmax-encloser").empty().append('<div class="fluid-width-video-wrapper" style="padding-top:'+(youmax_global_options.aspectRatio*100)+'%;"><iframe id="youmax-encloser-video" style="width:100%;" src="" frameborder="0" allowfullscreen></iframe></div><div id="youmax-encloser-comment-wrapper"> <div id="photo-detail-holder"><div class="photo-popup-title"></div><div class="photo-popup-description photo-popup-description-limited"></div><div class="youmax-full-description-button-wrapper"><div class="youmax-full-description-button">More..</div></div><div class="photo-popup-stats"><div class="media-views"></div><div class="media-likes"> </div><div class="media-uploaded"></div> <div type="button" class="youmax-share-video-button"><i class="fa fa-share-alt fa-2x"></i></div></div>  <div class="youmax-show-button-wrapper"><div class="youmax-encloser-comment-button youmax-show-button youmax-popup-show-button">'+youmaxShowCommentsText+'</div></div> <div id="youmax-encloser-comment-holder" class="youmax-encloser-comment-holder-popup"><div class="youmax-video-comment youmax-commentbox-holder"><textarea class="youmax-comment-textbox" placeholder="'+youmax_translator_text.thoughts+'"></textarea><button type="button" class="youmax-add-comment-button"><i class="fa fa-google-plus fa-2x"></i><span class="youmax-google-login-text">Login</span></button></div><div id="youmax-encloser-comments"></div><div class="youmax-encloser-comment-button youmax-more-button">'+youmaxMoreCommentsText+'</div></div></div> </div>');

		
		//$youmaxEncloserIframe = $(this).parent().parent().prev().find('#youmax-encloser-video');
		$youmaxEncloserIframe = $youmaxContainer.find('#youmax-encloser-video');
		$youmaxEncloserIframe.attr("src","");
		$youmaxEncloserIframe.parents("#youmax-encloser").show();		
		
		
		
		
		video_id_with_type = $baseElement.attr("id");		
		video_type = video_id_with_type.substring(0,video_id_with_type.indexOf("_"));
		video_id = video_id_with_type.substring(video_id_with_type.indexOf("_")+1);

			//$youmaxEncloserIframe.show();
		
		
		frame_source = generateFrameSource(video_id,video_type,isPlaylist,youmax_global_options);
		$youmaxEncloserIframe.attr("src",frame_source);
				
		
		displayVideoData($baseElement,$youmaxContainer);
		
		if(scrollToVideo) {
			$('html, body').animate({scrollTop: $youmaxEncloserIframe.offset().top - 50},'slow');
		}
		
		
		//5.0 comments --------------------
		/*$youmaxContainer.find('.youmax-encloser-comment-button.youmax-show-button').attr('id',videoId).show();
		$youmaxContainer.find('.youmax-encloser-comment-button.youmax-more-button').data('start-index',1);
		$youmaxContainer.find('#youmax-encloser-comment-holder').hide();
		
		if(youmax_global_options.autoLoadComments) {
			$youmaxContainer.find('.youmax-encloser-comment-button.youmax-show-button').click();
		}*/
			
		if(youmax_global_options.displayVideo=="newpage") {
			//console.log('generateLink-'+generateLink);
			//6.0 added 
			if(youmax_global_options.linkNewPages && generateLink) {
				if(location.href.indexOf('?v=')==-1 && location.href.indexOf('&v=')==-1 ) {
					location.href += ( location.search.length ? '&' : '?' ) + 'v=' + video_id_with_type;
				} else {
					//console.log(location.href);
					//console.log(location_href[1]);						
					location_href = location.href.match(/(v=.+?)($|&)/,'');
					location.href = location.href.replace(location_href[1],'v=' + video_id_with_type);
				}
			} else {

				//empty thumbnails
				$youmaxContainer.find('#youmax-video-list-div li').remove();
				$youmaxContainer.find('#youmax-video-list-div').css('height','20px');
				//disable load more videos button - no need it will be hidden 
				//$youmaxContainer.find('#youmax-load-more-div').attr('disabled','disabled');
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
	
	generateFrameSource = function(video_id,video_type,isPlaylist,youmax_global_options) {
	
		//var tabId = $youmaxContainer.find(".youmax-tab-hover").attr("id");
		//var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var frame_source="";
		
		
		if(video_type=="youtube") {
			if(isPlaylist) {
				video_id = video_id.substring(video_id.indexOf("playlist_videos_")+16);
				frame_source = youmax_global_options.videoProtocol + "//www.youtube.com/embed?listType=playlist&list="+video_id+"&rel=0";
			} else {
				frame_source = youmax_global_options.videoProtocol + "//www.youtube.com/embed/"+video_id+"?rel=0";
			}
			if(youmax_global_options.autoPlayVideo) {
				frame_source+="&autoplay=1";
			}
			if(youmax_global_options.showTitleInVideoPlayer) {
				frame_source+="&showinfo=1";
			} else {
				frame_source+="&showinfo=0";
			}
			frame_source+="&theme="+youmax_global_options.videoPlayerTheme;
		} else if (video_type=="vimeo") {
			frame_source = youmax_global_options.videoProtocol + "//player.vimeo.com/video/"+video_id;
			if(youmax_global_options.autoPlayVideo) {
				frame_source+="?autoplay=1";
			}
		}
		
		return frame_source;
	
	},
	
	/* removed in 8.0
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
				//console.log('s-'+s);
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
	*/
	
	//get search videos when a tab is clicked
	getSearchVideos = function(searchTabId, pageToken, $youmaxContainer) {
	
		var pageTokenUrl = "";
		var loadMoreFlag = false;
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var apiKey = youmax_global_options.apiKey;
		var maxResults = youmax_global_options.maxResults;
		
		if(null!=pageToken) {
			pageTokenUrl = "&pageToken="+pageToken;
			loadMoreFlag = true;
		}
		
		if(!loadMoreFlag) {
			//$youmaxContainer.find('ul').empty();
		}	
	
		$searchTab = $('#'+searchTabId);
		//console.log($searchTab);
		restrictedChannels = $searchTab.data("restricttochannels");
		relatedTo = $searchTab.data("relatedto");
		searchQuery = $searchTab.data("searchquery");
		searchOrder = $searchTab.data("searchorder");
		eventType = $searchTab.data("eventtype");
		
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
		
		var eventTypeString = "", isEvent = false;
		if(null!=eventType && eventType!="") {
		eventTypeString = "&eventType="+eventType;
		isEvent = true;
		}
		
		var searchOrderString = "";
		if(null!=searchOrder && searchOrder!="") {
		searchOrderString = "&order="+searchOrder;
		}
		
		var restrictedChannelsString = "";
		if(null!=restrictedChannels && restrictedChannels!="") {
		restrictedChannelsString = "&channelId="+restrictedChannels;
		}		
		
		/*if(null!=restrictedChannels && restrictedChannels.length>0) {
		restrictedChannelsString = "&channelId="+restrictedChannels[0];
		}
		
		if(restrictedChannels.length>0) {
			maxResults = maxResults/restrictedChannels.length;
		}*/

		
		apiURLArray.push("https://www.googleapis.com/youtube/v3/search?part=snippet"+searchQueryString+relatedToString+eventTypeString+searchOrderString+restrictedChannelsString+"&type=video&maxResults="+maxResults+pageTokenUrl+"&key="+apiKey);

		
		/*for(var l=1; l<restrictedChannels.length; l++) {
			apiURLArray.push("https://www.googleapis.com/youtube/v3/search?part=snippet"+searchQueryString+relatedToString+eventTypeString+searchOrderString+"&channelId="+restrictedChannels[l]+"&type=video&maxResults="+maxResults+pageTokenUrl+"&key="+apiKey);
		}*/
		
		
		//for(var l=0; l<apiURLArray.length; l++) {
			
			apiPlaylistVideosURL = apiURLArray[0];
			//console.log("apiPlaylistVideosURL - "+apiPlaylistVideosURL);
			$.ajax({
				url: apiPlaylistVideosURL,
				type: "GET",
				async: true,
				cache: true,
				dataType: 'jsonp',
				success: function(response) { insertSearchVideos(response,$youmaxContainer,false,isEvent,loadMoreFlag);},
				error: function(html) { alert(html); },
				beforeSend: setHeader
			});
		//}
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
		
		//searchQuery = searchQuery.substring(searchQuery.indexOf("_")+1);
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
		
		//added for 7.0 - search playlists
		if(null!=youmax_global_options.playlistSearchFile && youmax_global_options.playlistSearchFile!="") {
			$.ajax({
				url: youmax_global_options.playlistSearchFile,
				type: "GET",
				async: true,
				cache: true,
				dataType: 'json',
				success: function(response) { getPlaylistSearchVideos(response,searchQuery,loadMoreFlag,$youmaxContainer);},
				error: function(html) { 
					//console.log("error in getting searchlist",html); 
				},
				beforeSend: setHeader
			});			
		}		
		
	},
	
	getPlaylistSearchVideos = function(response,searchQuery,loadMoreFlag,$youmaxContainer) {
		//console.log("getPlaylistSearchVideos");
		//console.log(response);
		
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');

		searchList = response.searchList;
		searchQueryList=searchQuery.toLowerCase().split("%20");
		searchResult = [];
		//searchResultIndex = 0;
		
		//console.log(searchQueryList);
		
		
		for(var i=0;i<searchList.length;i++) {
			for(var j=0;j<searchQueryList.length;j++) {
				if(searchList[i].videoTitle.indexOf(searchQueryList[j])!=-1) {
					searchResult.push(searchList[i].videoId);
					break;
				}
				if(searchList[i].videoDescription.indexOf(searchQueryList[j])!=-1) {
					searchResult.push(searchList[i].videoId);
					break;
				}
			}
		}
		
		//console.log(searchResult);
		
		if(searchResult.length>0) {
			//get search videos from YouTube
			apiGetVideosURL = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+searchResult+"&key="+youmax_global_options.apiKey;
			
			//console.log('apiGetVideosURL-'+apiGetVideosURL);
			
			$.ajax({
				url: apiGetVideosURL,
				type: "GET",
				async: true,
				cache: true,
				dataType: 'jsonp',
				success: function(response) { insertSearchVideos(response,$youmaxContainer,true,null,loadMoreFlag);},
				error: function(html) { alert(html); },
				beforeSend: setHeader
			});
		}
		
		
	
	},
	

	
	//display loading.. text
	showLoader = function($youmaxContainer) {
		$youmaxContainer.find('#youmax-video-list-div>ul').empty();
		$youmaxContainer.find("#youmax-encloser").empty();
		//$youmaxContainer.find('#youmax-video').hide();
		$youmaxContainer.find('#youmax-encloser-video').attr('src','');
		$youmaxContainer.find('#youmax-video-list-div>ul').append('<div class="youmax-loading-div" style="text-align:center; height:200px; font:14px Calibri;"><span style="opacity:0;">.</span><br><br><br><br>loading HD...<br><br><br><br><br><br><span style="opacity:0;">.</span></div>');
		$youmaxContainer.find('#youmax-showing-title').empty().hide();
	},
	
	
	displayComments = function(video_id_with_type, $youmaxContainer) {

		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		if(youmax_global_options.displayVideo=="popup") {
			$youmaxPlayBox = $('.youmax-popup.mfp-gallery');
		} else {
			$youmaxPlayBox = $youmaxContainer;
		}

		video_type = video_id_with_type.substring(0,video_id_with_type.indexOf("_"));
		video_id = video_id_with_type.substring(video_id_with_type.indexOf("_")+1);	
	
		$youmaxPlayBox.find(".youmax-encloser-comment-button.youmax-show-button").hide();
		$youmaxPlayBox.find("#youmax-encloser-comment-holder").show();
		$youmaxPlayBox.find("#youmax-encloser-comments").empty().append("<div class='youmax-loading-comments-div'>loading...</div>");

		
		if(video_type=="youtube") {
			getYoutubeVideoComments(video_id,$youmaxContainer);
		} else if(video_type=="vimeo") {
			getVimeoVideoComments(video_id,$youmaxContainer);
			
			$youmaxPlayBox.find(".youmax-comment-textbox").attr("disabled","disabled").addClass("youmax-disabled");
			$youmaxPlayBox.find(".youmax-add-comment-button").attr("disabled","disabled").addClass("youmax-disabled");
		}

	},

	loadMoreComments = function($youmaxContainer) {
	
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		if(youmax_global_options.displayVideo=="popup") {
			$youmaxPlayBox = $('.youmax-popup.mfp-gallery');
		} else {
			$youmaxPlayBox = $youmaxContainer;
		}	
	
		var $youmaxMoreButton = $youmaxPlayBox.find(".youmax-encloser-comment-button.youmax-more-button");
		$youmaxMoreButton.addClass('youmax-load-more-comments-clicked');
		
		if(youmax_global_options.showTextInsteadOfIcons) {
			$youmaxMoreButton.html('Loading..');
		} else {
			$youmaxMoreButton.html('<i class="fa fa-ellipsis-h fa-3x"></i>');
		}
		
		var nextPageToken = $youmaxMoreButton.data('nextpagetoken');
		//var startIndex = parseInt($youmaxMoreButton.data('start-index'),10);
		
		if(null!=nextPageToken && nextPageToken!="undefined" && nextPageToken!="") {
			
			video_id_with_type = $youmaxPlayBox.find(".youmax-encloser-comment-button.youmax-show-button").attr('id');
			video_type = video_id_with_type.substring(0,video_id_with_type.indexOf("_"));
			video_id = video_id_with_type.substring(video_id_with_type.indexOf("_")+1);	
			
			if(video_type=="youtube") {
				getYoutubeVideoComments(video_id,$youmaxContainer,nextPageToken);
			} else if(video_type=="vimeo") {
				getVimeoVideoComments(video_id,$youmaxContainer,nextPageToken);
			}
		
			//getVideoComments(videoId,$youmaxContainer,nextPageToken);
			//$('html, body').animate({scrollTop: $youmaxCommentHolder.offset().top - 50},'slow');
		} else {
			$youmaxMoreButton.removeClass('youmax-load-more-comments-clicked');
			if(youmax_global_options.showTextInsteadOfIcons) {
				$youmaxMoreButton.html('All Done');
			} else {
				$youmaxMoreButton.html('<i class="fa fa-close fa-3x"></i>');
			}
		}
		
	},
	
	displayPlaylist = function(tabId,$youmaxContainer) {
		
		//clear cache
		cache=[];
		$youmaxContainer.data('cache',cache);
		
		//added to display load more button when any tab is clicked in New Page mode
		$youmaxContainer.removeClass("newpage");
		
		$youmaxContainer.find("#youmax-encloser").hide();
		$youmaxContainer.find("#youmax-encloser-video").attr("src","");
		showLoader($youmaxContainer);
		
		//console.log(tabId);
		
		/*if(playlistId.indexOf("search_")!=-1) {
			getSearchVideos(playlistId,null,$youmaxContainer);
		} else if(playlistId.indexOf("playlists_")!=-1) {
			getChannelPlaylists(playlistId,null,$youmaxContainer);
		} else if(playlistId.indexOf("query_")!=-1) {
			getUserSearchVideos(playlistId,null,$youmaxContainer);
		} else if(playlistId.indexOf("events_")!=-1) {
			getChannelEvents(playlistId,null,$youmaxContainer);
		} else if(playlistId.indexOf("vimeo_")!=-1) {
			getVimeoUserVideos(playlistId,null,$youmaxContainer);
		} else {
			getPlaylistVideos(playlistId,null,$youmaxContainer);			
		}*/
		
		if(tabId.indexOf("youtube_channel_uploads_")!=-1) {
			innerId=tabId.substring(24);
			getPlaylistVideos(innerId,null,$youmaxContainer);
		} else if(tabId.indexOf("youtube_channel_playlists_")!=-1) {
			innerId=tabId.substring(26);
			getChannelPlaylists(innerId,null,$youmaxContainer);
		} else if(tabId.indexOf("youtube_channel_search_")!=-1) {
			//innerId=tabId.substring(23);
			getSearchVideos(tabId,null,$youmaxContainer);
		} else if(tabId.indexOf("youtube_channel_events_")!=-1) {
			innerId=tabId.substring(23);
			getChannelEvents(innerId,null,$youmaxContainer);
		} else if(tabId.indexOf("youtube_playlist_videos_")!=-1) {
			innerId=tabId.substring(24);
			getPlaylistVideos(innerId,null,$youmaxContainer);
		} else if(tabId.indexOf("vimeo_user_videos_")!=-1) {
			innerId=tabId.substring(18);
			getVimeoUserVideos(innerId,null,$youmaxContainer);
		} else if(tabId.indexOf("vimeo_channel_videos_")!=-1) {
			innerId=tabId.substring(21);
			getVimeoChannelVideos(innerId,null,$youmaxContainer);
		} else if(tabId.indexOf("vimeo_group_videos_")!=-1) {
			innerId=tabId.substring(19);
			getVimeoGroupVideos(innerId,null,$youmaxContainer);
		} else if(tabId.indexOf("vimeo_album_videos_")!=-1) {
			innerId=tabId.substring(19);
			getVimeoAlbumVideos(innerId,null,$youmaxContainer);
		} else if(tabId.indexOf("query_")!=-1) {
			innerId=tabId.substring(6);
			getUserSearchVideos(innerId,null,$youmaxContainer);	
		}		
		
		$youmaxContainer.find('.youmax-tab').removeClass('youmax-tab-hover');	
		$('#'+tabId).addClass('youmax-tab-hover');
		$youmaxContainer.find('#youmax-select').val(tabId);

	},
	
	initTranlator = function($youmaxContainer) {
	
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var youmax_translator_text = {
			"search":"Search",
			"uploads":"Uploads",
			"playlists":"Playlists",
			"events":"Events",
			"views":"views",
			"likes":"likes",
			"videos":"videos",
			"subscribers":"subscribers",
			"year":"year",
			"years":"years",
			"month":"month",
			"months":"months",
			"day":"day",
			"days":"days",
			"hour":"hour",
			"hours":"hours",
			"ago":"ago",
			"now":"just now",
			"thoughts":"Share your Thoughts...",
			"comments":"comments"
		};
		
		$youmaxContainer.data("youmax_translator_text",youmax_translator_text);
		
		if(null!=youmax_global_options.translatorFile && youmax_global_options.translatorFile!="") {
			getTranslationFile($youmaxContainer);
		} else {
			initiatePlugin($youmaxContainer);
		}
	
	},
	
	getTranslationFile = function($youmaxContainer) {
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		$.ajax({
			url: youmax_global_options.translatorFile,
			type: "GET",
			async: true,
			cache: true,
			dataType: 'json',
			success: function(response) { applyTranslation(response,$youmaxContainer);},
			error: function(html) { 
				//console.log("error in getting searchlist",html); 
				initiatePlugin($youmaxContainer);
			},
			beforeSend: setHeader
		});			
	},
	
	applyTranslation = function(response,$youmaxContainer) {
		
		//console.log(response);
		youmax_translator_text = response.translator;
		$youmaxContainer.data('youmax_translator_text',youmax_translator_text);
		
		initiatePlugin($youmaxContainer);
		

	},
	
	initiatePlugin = function($youmaxContainer) {
	
		initYoumax($youmaxContainer);

		initVideo($youmaxContainer);
		
		createTabs($youmaxContainer);
		
		initHeader($youmaxContainer);
		
		
		/*		
		initPlaylist($youmaxContainer);

		initSearch($youmaxContainer);
		*/
	},
	
	createTabs = function($youmaxContainer) {
		
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		
		$tabContainer = $youmaxContainer.find('#youmax-tabs');
		$selectConatiner = $youmaxContainer.find('#youmax-select');
		
		//YouTube Channel Uploads Tabs
		if(null!=youmax_global_options.youtube_channel_uploads) {
			for(i=0; i<youmax_global_options.youtube_channel_uploads.length; i++) {
			
				if(youmax_global_options.doNotSelectTabsByDefault) {
					youmax_global_options.youtube_channel_uploads[i].selected = false;
				}
				
				channelId = scrapeChannelId(youmax_global_options.youtube_channel_uploads[i].url,"youtube_channel_uploads_",$youmaxContainer,youmax_global_options.youtube_channel_uploads[i].selected);
				
				$tabContainer.append('<span id="youtube_channel_uploads_'+channelId+'" class="youmax-tab" >'+youmax_global_options.youtube_channel_uploads[i].name.replace(/%20/g,' ')+'</span>');
				
				$selectConatiner.append('<option value="youtube_channel_uploads_'+channelId+'" class="youmax-option-highlight" >'+youmax_global_options.youtube_channel_uploads[i].name.replace(/%20/g,' ')+'</option>');			
				
			}
		}
		
		//YouTube Channel Playlists Tabs
		if(null!=youmax_global_options.youtube_channel_playlists) {		
			for(i=0; i<youmax_global_options.youtube_channel_playlists.length; i++) {
			
				if(youmax_global_options.doNotSelectTabsByDefault) {
					youmax_global_options.youtube_channel_playlists[i].selected = false;
				}		
				
				channelId = scrapeChannelId(youmax_global_options.youtube_channel_playlists[i].url,"youtube_channel_playlists_",$youmaxContainer,youmax_global_options.youtube_channel_playlists[i].selected);
				
				$tabContainer.append('<span id="youtube_channel_playlists_'+channelId+'" class="youmax-tab" >'+youmax_global_options.youtube_channel_playlists[i].name.replace(/%20/g,' ')+'</span>');
				
				$selectConatiner.append('<option value="youtube_channel_playlists_'+channelId+'" class="youmax-option-highlight" >'+youmax_global_options.youtube_channel_playlists[i].name.replace(/%20/g,' ')+'</option>');
				
				if(youmax_global_options.youtube_channel_playlists[i].selected) {
					$tabContainer.find('#youtube_channel_playlists_'+channelId).click();
				}			
				
			}
		}
		
		//YouTube Channel Events Tabs
		if(null!=youmax_global_options.youtube_channel_events) {				
			for(i=0; i<youmax_global_options.youtube_channel_events.length; i++) {
				
				if(youmax_global_options.doNotSelectTabsByDefault) {
					youmax_global_options.youtube_channel_events[i].selected = false;
				}
				
				channelId = scrapeChannelId(youmax_global_options.youtube_channel_events[i].url,"youtube_channel_events_",$youmaxContainer,youmax_global_options.youtube_channel_events[i].selected);
				
				$tabContainer.append('<span id="youtube_channel_events_'+channelId+'" class="youmax-tab" >'+youmax_global_options.youtube_channel_events[i].name.replace(/%20/g,' ')+'</span>');
				
				$selectConatiner.append('<option value="youtube_channel_events_'+channelId+'" class="youmax-option-highlight" >'+youmax_global_options.youtube_channel_events[i].name.replace(/%20/g,' ')+'</option>');
				
				if(youmax_global_options.youtube_channel_events[i].selected) {
					$tabContainer.find('#youtube_channel_events_'+channelId).click();
				}			
				
			}
		}
		
		//YouTube Search Tabs
		if(null!=youmax_global_options.youtube_channel_search) {				
			for(i=0; i<youmax_global_options.youtube_channel_search.length; i++) {
				
				dataString = '';
				suffix = (new Date()).getTime();

				if(youmax_global_options.doNotSelectTabsByDefault) {
					youmax_global_options.youtube_channel_search[i].selected = false;
				}
				
				//restrictToChannels
				if(youmax_global_options.youtube_channel_search[i].restrictToChannels!=null) {
					channelId = scrapeChannelId(youmax_global_options.youtube_channel_search[i].restrictToChannels,"youtube_channel_search_"+suffix,$youmaxContainer,youmax_global_options.youtube_channel_search[i].selected);
					dataString += ' data-restricttochannels="'+channelId+'"';
				} else {
					dataString += ' data-restricttochannels=""';
				}

				//relatedTo
				if(youmax_global_options.youtube_channel_search[i].relatedTo!=null) {
					s=youmax_global_options.youtube_channel_search[i].relatedTo.indexOf("/watch?v=");
					if(s!=-1) {
						videoId = youmax_global_options.youtube_channel_search[i].relatedTo.substring(s+9);
						dataString += ' data-relatedto="'+videoId+'"';					
					} else {
						dataString += ' data-relatedto=""';
					}			
				} else {
					dataString += ' data-relatedto=""';
				}
				
				
				//searchQuery
				if(youmax_global_options.youtube_channel_search[i].searchQuery!=null) {
					dataString += ' data-searchquery="'+youmax_global_options.youtube_channel_search[i].searchQuery+'"';
				} else {
					dataString += ' data-searchquery=""';
				}
				
				
				//searchOrder
				if(youmax_global_options.youtube_channel_search[i].searchOrder!=null) {
					dataString += ' data-searchorder="'+youmax_global_options.youtube_channel_search[i].searchOrder+'"';
				} else {
					dataString += ' data-searchorder="date"';
				}
				

				//eventType
				if(youmax_global_options.youtube_channel_search[i].eventType!=null) {
					dataString += ' data-eventtype="'+youmax_global_options.youtube_channel_search[i].eventType+'"';
				} else {
					dataString += ' data-eventtype=""';
				}

				
				$tabContainer.append('<span id="youtube_channel_search_'+suffix+'" class="youmax-tab" '+dataString+' >'+youmax_global_options.youtube_channel_search[i].name.replace(/%20/g,' ')+'</span>');
				
				$selectConatiner.append('<option value="youtube_channel_search_'+suffix+'" class="youmax-option-highlight" '+dataString+' >'+youmax_global_options.youtube_channel_search[i].name.replace(/%20/g,' ')+'</option>');
				
				if(youmax_global_options.youtube_channel_search[i].selected) {
					$tabContainer.find('#youtube_channel_search_'+suffix).click();
				}			
				
			}
		}
		
		//YouTube Playlist Tabs
		if(null!=youmax_global_options.youtube_playlist_videos) {
			for(i=0; i<youmax_global_options.youtube_playlist_videos.length; i++) {

				if(youmax_global_options.doNotSelectTabsByDefault) {
					youmax_global_options.youtube_playlist_videos[i].selected = false;
				}
			
				s=youmax_global_options.youtube_playlist_videos[i].url.indexOf("list=");
				if(s!=-1) {
					playlistId = youmax_global_options.youtube_playlist_videos[i].url.substring(s+5);
				} else {
					playlistId = "null";
					alert("Could Not List Videos.."+youmax_global_options.youtube_playlist_videos[i].url);
				}			
				
				$tabContainer.append('<span id="youtube_playlist_videos_'+playlistId+'" class="youmax-tab" >'+youmax_global_options.youtube_playlist_videos[i].name.replace(/%20/g,' ')+'</span>');
				
				$selectConatiner.append('<option value="youtube_playlist_videos_'+playlistId+'" class="youmax-option-highlight" >'+youmax_global_options.youtube_playlist_videos[i].name.replace(/%20/g,' ')+'</option>');
				
				if(youmax_global_options.youtube_playlist_videos[i].selected) {
					$tabContainer.find('#youtube_playlist_videos_'+playlistId).click();
				}
				
			}
		}
		
		//Vimeo User Tabs
		if(null!=youmax_global_options.vimeo_user_videos) {		
			for(i=0; i<youmax_global_options.vimeo_user_videos.length; i++) {

				if(youmax_global_options.doNotSelectTabsByDefault) {
					youmax_global_options.vimeo_user_videos[i].selected = false;
				}
			
				s=youmax_global_options.vimeo_user_videos[i].url.indexOf("vimeo.com/");
				if(s!=-1) {
					vimeoId = youmax_global_options.vimeo_user_videos[i].url.substring(s+10);
				} else {
					vimeoId = "null";
					alert("Could Not Find Vimeo User.."+youmax_global_options.vimeo_user_videos[i].url);
				}
				
				$tabContainer.append('<span id="vimeo_user_videos_'+vimeoId+'" class="youmax-tab" >'+youmax_global_options.vimeo_user_videos[i].name.replace(/%20/g,' ')+'</span>');
				
				$selectConatiner.append('<option value="vimeo_user_videos_'+vimeoId+'" class="youmax-option-highlight" >'+youmax_global_options.vimeo_user_videos[i].name.replace(/%20/g,' ')+'</option>');
				
				if(youmax_global_options.vimeo_user_videos[i].selected) {
					$tabContainer.find('#vimeo_user_videos_'+vimeoId).click();
				}			
				
			}
		}

		//Vimeo Channel Tabs
		if(null!=youmax_global_options.vimeo_channel_videos) {
			for(i=0; i<youmax_global_options.vimeo_channel_videos.length; i++) {

				if(youmax_global_options.doNotSelectTabsByDefault) {
					youmax_global_options.vimeo_channel_videos[i].selected = false;
				}
			
				s=youmax_global_options.vimeo_channel_videos[i].url.indexOf("vimeo.com/channels/");
				if(s!=-1) {
					vimeoId = youmax_global_options.vimeo_channel_videos[i].url.substring(s+19);
				} else {
					vimeoId = "null";
					alert("Could Not Find Vimeo User.."+youmax_global_options.vimeo_channel_videos[i].url);
				}
				
				$tabContainer.append('<span id="vimeo_channel_videos_'+vimeoId+'" class="youmax-tab" >'+youmax_global_options.vimeo_channel_videos[i].name.replace(/%20/g,' ')+'</span>');
				
				$selectConatiner.append('<option value="vimeo_channel_videos_'+vimeoId+'" class="youmax-option-highlight" >'+youmax_global_options.vimeo_channel_videos[i].name.replace(/%20/g,' ')+'</option>');
				
				if(youmax_global_options.vimeo_channel_videos[i].selected) {
					$tabContainer.find('#vimeo_channel_videos_'+vimeoId).click();
				}			
				
			}
		}
		
		

		//Vimeo Group Tabs
		if(null!=youmax_global_options.vimeo_group_videos) {
			for(i=0; i<youmax_global_options.vimeo_group_videos.length; i++) {

				if(youmax_global_options.doNotSelectTabsByDefault) {
					youmax_global_options.vimeo_group_videos[i].selected = false;
				}
			
				s=youmax_global_options.vimeo_group_videos[i].url.indexOf("vimeo.com/groups/");
				if(s!=-1) {
					vimeoId = youmax_global_options.vimeo_group_videos[i].url.substring(s+17);
				} else {
					vimeoId = "null";
					alert("Could Not Find Vimeo Group.."+youmax_global_options.vimeo_group_videos[i].url);
				}
				
				$tabContainer.append('<span id="vimeo_group_videos_'+vimeoId+'" class="youmax-tab" >'+youmax_global_options.vimeo_group_videos[i].name.replace(/%20/g,' ')+'</span>');
				
				$selectConatiner.append('<option value="vimeo_group_videos_'+vimeoId+'" class="youmax-option-highlight" >'+youmax_global_options.vimeo_group_videos[i].name.replace(/%20/g,' ')+'</option>');
				
				if(youmax_global_options.vimeo_group_videos[i].selected) {
					$tabContainer.find('#vimeo_group_videos_'+vimeoId).click();
				}			
				
			}
		}
				
		
		
		//Vimeo Album Tabs
		if(null!=youmax_global_options.vimeo_album_videos) {
			for(i=0; i<youmax_global_options.vimeo_album_videos.length; i++) {

				if(youmax_global_options.doNotSelectTabsByDefault) {
					youmax_global_options.vimeo_album_videos[i].selected = false;
				}
			
				s=youmax_global_options.vimeo_album_videos[i].url.indexOf("vimeo.com/album/");
				if(s!=-1) {
					vimeoId = youmax_global_options.vimeo_album_videos[i].url.substring(s+16);
				} else {
					vimeoId = "null";
					alert("Could Not Find Vimeo Album.."+youmax_global_options.vimeo_album_videos[i].url);
				}
				
				$tabContainer.append('<span id="vimeo_album_videos_'+vimeoId+'" class="youmax-tab" >'+youmax_global_options.vimeo_album_videos[i].name.replace(/%20/g,' ')+'</span>');
				
				$selectConatiner.append('<option value="vimeo_album_videos_'+vimeoId+'" class="youmax-option-highlight" >'+youmax_global_options.vimeo_album_videos[i].name.replace(/%20/g,' ')+'</option>');
				
				if(youmax_global_options.vimeo_album_videos[i].selected) {
					$tabContainer.find('#vimeo_album_videos_'+vimeoId).click();
				}			
				
			}
		}
		
	
	},
	
	scrapeChannelId = function(channel_url,tab_prefix,$youmaxContainer,isSelected) {

		channelId = "null";
		s=channel_url.indexOf("/user/");
		//console.log('s-'+s);
		if(s!=-1) {
			channelId = channel_url.substring(s+6);
			getChannelIdForTabs(channelId,tab_prefix,$youmaxContainer,isSelected);
		} else {
			s=channel_url.indexOf("/channel/");
			if(s!=-1) {
				channelId = channel_url.substring(s+9);
				if(tab_prefix=="youtube_channel_uploads_") {
					getUploadsPlaylistIdForTabs(channelId,tab_prefix,$youmaxContainer,isSelected);
				}
			} else {
				alert("Could Not Find Channel.."+channel_url);
			}
		}
		
		return channelId;
	
	},
	
	initHeader = function($youmaxContainer) {
	
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var s;
		
		//Get Channel header and details 
		if(youmax_global_options.channel!=null) {
			s=youmax_global_options.channel.indexOf("/user/");
			//console.log('s-'+s);
			if(s!=-1) {
				userId = youmax_global_options.channel.substring(s+6);
				//console.log('userId-'+userId);
				apiUrl = "https://www.googleapis.com/youtube/v3/channels?part=id&forUsername="+userId+"&key="+youmax_global_options.apiKey;
				getChannelId(apiUrl,$youmaxContainer);
			} else {
				s=youmax_global_options.channel.indexOf("/channel/");
				if(s!=-1) {
					channelId = youmax_global_options.channel.substring(s+9);
					//console.log('channelId-'+channelId);
					getChannelDetails(channelId,$youmaxContainer);
				} else {
					alert("Could Not Find Channel..");
				}
			}
		}

	},
	
	/* removed in 8.0

	initPlaylist = function($youmaxContainer) {
	
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var s,playlistIdArray = [];

		//get playlist details
		if($.isArray(youmax_global_options.playList)) {
			for(var i=0; i<youmax_global_options.playList.length; i++) {
				s=youmax_global_options.playList[i].indexOf("list=");
				//console.log('s-'+s);
				if(s!=-1) {
					playlistId = youmax_global_options.playList[i].substring(s+5);
					//console.log('playlistId-'+playlistId);
					playlistIdArray.push(playlistId);
				} else {
					//alert("Could Not List Videos..");
				}
			}
		}
		
		//get all playlist details
		getPlaylistDetails(playlistIdArray,$youmaxContainer);
	
	},
	
	initSearch = function($youmaxContainer) {
		
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
		var searchDefaults = {name:'Search',restrictToChannels:'',relatedTo:'',searchQuery:'',searchOrder:'',eventType:''};

		//display search tabs
		if($.isArray(youmax_global_options.searchTab)) {
			for(var i=0; i<youmax_global_options.searchTab.length; i++) {
				searchOptions=youmax_global_options.searchTab[i];
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
		
	},
	*/
	
	
	initVideo = function($youmaxContainer) {
		
		var youmax_global_options = $youmaxContainer.data('youmax_global_options');
	
		if(youmax_global_options.displayVideo=="newpage" && youmax_global_options.linkNewPages) {
			displayVideoFromUrl($youmaxContainer);
		}
	
	},
	
	displayVideoFromUrl = function($youmaxContainer) {
		if(location.href.indexOf('v=')!=-1) {
			location_href = location.href.match(/v=(.+?)($|&)/,'');
			video_id_with_type = location_href[1];

			video_type = video_id_with_type.substring(0,video_id_with_type.indexOf("_"));
			video_id = video_id_with_type.substring(video_id_with_type.indexOf("_")+1);	

			if(video_type=="youtube") {
				getYoutubeVideoDetails(video_id,$youmaxContainer,false,false);
			} else if(video_type=="vimeo") {
				getVimeoVideoDetails(video_id,$youmaxContainer,false,false);
			} 
			
			//displayInlineVideo(null,false,false,$youmaxContainer,videoId);
			
			var youmax_global_options = $youmaxContainer.data('youmax_global_options');
			youmax_global_options.doNotSelectTabsByDefault=true;
			$youmaxContainer.data('youmax_global_options',youmax_global_options);
			
			$youmaxContainer.addClass("newpage");
		}
	},
	
	setMediaQueries = function(containerWidth,$youmaxContainer) {
	
		$youmaxContainer.removeClass("gt1400 gt1350 gt1300 gt1250 gt1200 gt1150 gt1100 gt1050 gt1000 gt950 gt900 lt1400 lt1350 lt1300 lt1250 lt1200 lt1150 lt1100 lt1050 lt1000 lt950 lt900 lt850 lt800 lt750 lt700 lt650 lt600 lt550 lt500 lt450 lt400");
		
		//adding media queries manually
		
		//greater than classes
		if(containerWidth>1250) {
			$youmaxContainer.addClass("gt1400");
		}

		if(containerWidth>1250) {
			$youmaxContainer.addClass("gt1350");
		}

		if(containerWidth>1250) {
			$youmaxContainer.addClass("gt1300");
		}

		if(containerWidth>1250) {
			$youmaxContainer.addClass("gt1250");
		}

		if(containerWidth>1200) {
			$youmaxContainer.addClass("gt1200");
		}

		if(containerWidth>1150) {
			$youmaxContainer.addClass("gt1150");
		}

		if(containerWidth>1100) {
			$youmaxContainer.addClass("gt1100");
		}

		if(containerWidth>1050) {
			$youmaxContainer.addClass("gt1050");
		}

		if(containerWidth>1000) {
			$youmaxContainer.addClass("gt1000");
		}
		
		if(containerWidth>950) {
			$youmaxContainer.addClass("gt950");
		}
		
		if(containerWidth>900) {
			$youmaxContainer.addClass("gt900");
		}
		
		//less than classes
		if(containerWidth<1250) {
			$youmaxContainer.addClass("lt1400");
		}		

		if(containerWidth<1250) {
			$youmaxContainer.addClass("lt1350");
		}		

		if(containerWidth<1250) {
			$youmaxContainer.addClass("lt1300");
		}		

		if(containerWidth<1250) {
			$youmaxContainer.addClass("lt1250");
		}		

		if(containerWidth<1200) {
			$youmaxContainer.addClass("lt1200");
		}		

		if(containerWidth<1150) {
			$youmaxContainer.addClass("lt1150");
		}		

		if(containerWidth<1100) {
			$youmaxContainer.addClass("lt1100");
		}		

		if(containerWidth<1050) {
			$youmaxContainer.addClass("lt1050");
		}		

		if(containerWidth<1000) {
			$youmaxContainer.addClass("lt1000");
		}		

		if(containerWidth<950) {
			$youmaxContainer.addClass("lt950");
		}		

		if(containerWidth<900) {
			$youmaxContainer.addClass("lt900");
		}

		if(containerWidth<850) {
			$youmaxContainer.addClass("lt850");
		}

		if(containerWidth<800) {
			$youmaxContainer.addClass("lt800");			
		}

		if(containerWidth<750) {
			$youmaxContainer.addClass("lt750");			
		}

		if(containerWidth<700) {
			$youmaxContainer.addClass("lt700");			
		}

		if(containerWidth<650) {
			$youmaxContainer.addClass("lt650");			
		}

		if(containerWidth<600) {
			$youmaxContainer.addClass("lt600");			
		}

		if(containerWidth<550) {
			$youmaxContainer.addClass("lt550");
		}
		
		if(containerWidth<500) {
			$youmaxContainer.addClass("lt500");
		}
		
		if(containerWidth<450) {
			$youmaxContainer.addClass("lt450");
		}	
	
		if(containerWidth<400) {
			$youmaxContainer.addClass("lt400");
		}	
	
	
	};




	//youmax plugin definition
    $.fn.youmax = function(options) {
		
		var youmax_global_options = {};
		var $youmaxContainer = this;
		//console.log($youmaxContainer.attr('id'));

		//Get CSS for Skins
		//console.log('options.skin-'+options.skin);
		options.skin = options.skin||"block";
		if(options.skin.indexOf("white")!=-1 || options.skin.indexOf("grey")!=-1 || options.skin.indexOf("blue")!=-1 || options.skin.indexOf("clean")!=-1 || options.skin.indexOf("block")!=-1 || options.skin.indexOf("list")!=-1 || options.skin.indexOf("trend")!=-1) {
			skin_file = options.skin.replace(/\d+$/, "");
			if (document.createStyleSheet){
                document.createStyleSheet("./css/youmax_"+skin_file+".min.css");
            } else {
                $("head").append("<link rel='stylesheet' href='./css/youmax_"+skin_file+".min.css' type='text/css' />");
            }
		} else {
			//don't load any styles
			//user will load them manually
		}
		
		//set local options
		youmax_global_options.apiKey = options.apiKey||'AIzaSyDEm5wGLsWi2G3WG40re-DAJcWioQSpJ6o';
		youmax_global_options.channel = options.channel||'https://www.youtube.com/channel/UC_IRYSp4auq7hKLvziWVH6w';
		youmax_global_options.clientId = options.clientId||'237485577723-lndqepqthdb3lh4gec2skvpfaii9sgh0.apps.googleusercontent.com';
		youmax_global_options.maxResults = options.maxResults||18;
		
		//removed because Grid is now updated
		/*youmax_global_options.innerOffset = options.innerOffset||25;
		youmax_global_options.outerOffset = options.outerOffset||35;
		youmax_global_options.minItemWidth = options.minItemWidth||250;
		youmax_global_options.maxItemWidth = options.maxItemWidth||400;*/
		
		//5.0 - can be popup|inline|newpage
		youmax_global_options.displayVideo = options.displayVideo||'popup';
		youmax_global_options.aspectRatio = 360/640;
		//youmax_global_options.selectedTab = options.selectedTab||"u"; //can be u|s1|s2|...|p1|p2|...|l
		youmax_global_options.alwaysUseDropdown = options.alwaysUseDropdown;
		youmax_global_options.maxPlaylistNameLength = 22;
		
		//added in 5.0
		youmax_global_options.autoPlayVideo = options.autoPlayVideo||false;
		youmax_global_options.displayFirstVideoOnLoad = options.displayFirstVideoOnLoad||false;
		//youmax_global_options.imagesFolderPath = options.imagesFolderPath||"./images";
		
		//added in 6.0
		youmax_global_options.linkNewPages = options.linkNewPages||false;
		youmax_global_options.videoProtocol = options.videoProtocol||"http:";
		youmax_global_options.featuredVideo = options.featuredVideo||"";
		youmax_global_options.searchBoxScope = options.searchBoxScope||"channel";
		youmax_global_options.autoLoadComments = options.autoLoadComments||false;
		youmax_global_options.alignPopupToTop = options.alignPopupToTop;
		
		//added in 7.0
		youmax_global_options.commentOrder = options.commentOrder||"time"; //time|relevance
		youmax_global_options.playlistSearchFile = options.playlistSearchFile||"";
		youmax_global_options.skin = options.skin||"block";
		youmax_global_options.userWebsite = options.userWebsite||"";
		youmax_global_options.videoMode = options.videoMode||"wide"; //wide or narrow
		youmax_global_options.shareLink = options.shareLink||"video"; //video or website
		youmax_global_options.facebookAppId = options.facebookAppId||""; 
		youmax_global_options.widgetMode = options.widgetMode||false; 
		
		//added in 7.3
		youmax_global_options.viewCountType = options.viewCountType||"abbr"; //comma or abbr 
		youmax_global_options.showEvents = options.showEvents||false;
		youmax_global_options.likeCommentCountType = options.likeCommentCountType||"abbr"; //comma or abbr 
		youmax_global_options.loadMode = options.loadMode||"loadmore"; //loadmore or paginate-sides or paginate-bottom 
		youmax_global_options.hideHeader = options.hideHeader||false; 
		youmax_global_options.hideNavigation = options.hideNavigation||false; 
		youmax_global_options.loadButtonSize = options.loadButtonSize||"large"; //small or large
		youmax_global_options.playlistAction = options.playlistAction||"showvideos"; //playall or showvideos		
		youmax_global_options.videoPlayerTheme = options.videoPlayerTheme||"dark"; //dark or light
		youmax_global_options.hideComments = options.hideComments||false; 
		youmax_global_options.minVideoContainerHeight = options.minVideoContainerHeight||10;
		youmax_global_options.hideVideoThumbnails = options.hideVideoThumbnails||false; 
		youmax_global_options.hideLoadMore = options.hideLoadMore||false; 
		youmax_global_options.showTitleInVideoPlayer = options.showTitleInVideoPlayer; 
		youmax_global_options.translatorFile = options.translatorFile||"";
		youmax_global_options.hideVideoDetails = options.hideVideoDetails||false; 
		
		//added in 8.0
		youmax_global_options.vimeoAccessToken = options.vimeoAccessToken||'c289d754a132ca07051aaf931ef0de33'; 
		youmax_global_options.youtube_channel_uploads = options.youtube_channel_uploads; 
		youmax_global_options.youtube_channel_playlists = options.youtube_channel_playlists; 
		youmax_global_options.youtube_channel_events = options.youtube_channel_events; 
		youmax_global_options.youtube_channel_search = options.youtube_channel_search; 
		youmax_global_options.youtube_playlist_videos = options.youtube_playlist_videos; 
		youmax_global_options.vimeo_user_videos = options.vimeo_user_videos; 
		youmax_global_options.vimeo_channel_videos = options.vimeo_channel_videos; 
		youmax_global_options.vimeo_group_videos = options.vimeo_group_videos; 
		youmax_global_options.vimeo_album_videos = options.vimeo_album_videos; 
		youmax_global_options.showVimeoLikesInsteadOfViews = options.showVimeoLikesInsteadOfViews||false; 
		
		//added in 8.2
		youmax_global_options.updateLayoutDelay = options.updateLayoutDelay||500; 
		youmax_global_options.hotThreshold = options.hotThreshold||300;
		youmax_global_options.trendingThreshold = options.trendingThreshold||100;

		//added in 8.4
		youmax_global_options.minimumFadeTimeout = options.minimumFadeTimeout||1000; 
		youmax_global_options.showTopAdSpace = options.showTopAdSpace||false;
		youmax_global_options.topAdHtml = options.topAdHtml||'';
		
		youmax_global_options.fourColumnContainerWidth = options.fourColumnContainerWidth||'1150px';
		youmax_global_options.threeColumnContainerWidth = options.threeColumnContainerWidth||'1000px';
		youmax_global_options.twoColumnContainerWidth = options.twoColumnContainerWidth||'750px';
		youmax_global_options.oneColumnContainerWidth = options.oneColumnContainerWidth||'500px';		

		youmax_global_options.fiveColumnThumbnailWidth = options.fiveColumnThumbnailWidth||'18%';
		youmax_global_options.fiveColumnThumbnailLeftRightMargin = options.fiveColumnThumbnailLeftRightMargin||'1%';
		
		youmax_global_options.fourColumnThumbnailWidth = options.fourColumnThumbnailWidth||'23%';
		youmax_global_options.fourColumnThumbnailLeftRightMargin = options.fourColumnThumbnailLeftRightMargin||'1%';

		youmax_global_options.threeColumnThumbnailWidth = options.threeColumnThumbnailWidth||'30.3%';
		youmax_global_options.threeColumnThumbnailLeftRightMargin = options.threeColumnThumbnailLeftRightMargin||'1.5%';

		youmax_global_options.twoColumnThumbnailWidth = options.twoColumnThumbnailWidth||'46%';
		youmax_global_options.twoColumnThumbnailLeftRightMargin = options.twoColumnThumbnailLeftRightMargin||'2%';

		youmax_global_options.oneColumnThumbnailWidth = options.oneColumnThumbnailWidth||'95%';
		youmax_global_options.oneColumnThumbnailLeftRightMargin = options.oneColumnThumbnailLeftRightMargin||'2.5%';
		
		youmax_global_options.thumbnailBottomMargin = options.thumbnailBottomMargin||'25px';
		youmax_global_options.containerLeftRightMargin = options.containerLeftRightMargin||'2%';

		//added in 8.5
		youmax_global_options.hideDefinition = options.hideDefinition||false; 
		youmax_global_options.playIconType = options.playIconType||'default'; 

		//added in 9.0
		youmax_global_options.showTextInsteadOfIcons = options.showTextInsteadOfIcons||false;
		youmax_global_options.maxComments = options.maxComments||7;
		youmax_global_options.headerCountType = options.headerCountType||"abbr"; //comma or abbr 
		
		
		
		
		
		//set global options
		$youmaxContainer.data('youmax_global_options',youmax_global_options);

		
		//process dependencies
		if(youmax_global_options.viewCountType == "comma") {
			convertViewCountForThumbnail = convertViewCountWithComma;	
		} else {
			convertViewCountForThumbnail = convertViewCount;
		}

		if(youmax_global_options.likeCommentCountType == "comma") {
			convertLikeCommentCount = convertViewCountWithComma;	
		} else {
			convertLikeCommentCount = convertViewCount;
		}
		
		if(youmax_global_options.headerCountType == "comma") {
			convertHeaderCounts = convertViewCountWithComma;	
		} else {
			convertHeaderCounts = convertViewCount;
		}
		
		/*if(youmax_global_options.loadMode.indexOf("paginate")!=-1) {
			youmax_global_options.playlistAction = "playall";
		}*/
		
		if(youmax_global_options.skin.indexOf("clean")!=-1) {
			youmax_global_options.alwaysUseDropdown = true;
		}		

		if(youmax_global_options.loadMode=="paginate-sides") {
			youmax_global_options.loadButtonSize="small";
			youmax_global_options.playlistAction = "playall";
		}
		
		if(null==youmax_global_options.showTitleInVideoPlayer || youmax_global_options.showTitleInVideoPlayer==="") {
			youmax_global_options.showTitleInVideoPlayer = true;
		}
		
		/*if(null==youmax_global_options.autoLoadComments || youmax_global_options.autoLoadComments==="") {
			youmax_global_options.autoLoadComments = true;
		}*/
		
		if(null==youmax_global_options.alignPopupToTop || youmax_global_options.alignPopupToTop==="") {
			youmax_global_options.alignPopupToTop = true;
		}
		
		if(null==youmax_global_options.alwaysUseDropdown || youmax_global_options.alwaysUseDropdown==="") {
			youmax_global_options.alwaysUseDropdown = true;
		}
		
		if(youmax_global_options.skin.indexOf("list")!=-1) {
			youmax_global_options.fourColumnContainerWidth = '5000px';
			youmax_global_options.threeColumnContainerWidth = '5000px';
			youmax_global_options.twoColumnContainerWidth = '5000px';
			youmax_global_options.oneColumnContainerWidth = '1400px';
			
			youmax_global_options.oneColumnThumbnailWidth = '97%';
			youmax_global_options.oneColumnThumbnailLeftRightMargin = '1.5%';
		}
		
		
		
		//set local cache for pagination and events
		var cache = [];
		var cacheIndex = -1;

		var eventCache = {
				items:[],
				nextPageToken:"youmax-generated"
		};
		var eventCacheStatus = []; 
		
		$youmaxContainer.data('cache',cache);
		$youmaxContainer.data('cacheindex',cacheIndex);
		$youmaxContainer.data('eventcache',eventCache);
		$youmaxContainer.data('eventcachestatus',eventCacheStatus);

		
		//add fontawesome icons
		if (document.createStyleSheet){
			document.createStyleSheet(youmax_global_options.videoProtocol+"//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css");
		} else {
			$("head").append("<link rel='stylesheet' href='"+youmax_global_options.videoProtocol+"//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css' type='text/css' />");
		}
		
		options.maxContainerWidth = options.maxContainerWidth||1080;
		$youmaxContainer.css('max-width',(options.maxContainerWidth)+'px');
		
		var custom_styles = "";
		var youmaxElementId = '#'+$youmaxContainer.attr('id')+' ';
		//Adding styles for wide video mode
		if(youmax_global_options.videoMode=="wide") {
			custom_styles += '#youmax-encloser {max-width: 100% !important;} #youmax-encloser-comment-wrapper {max-width: 880px;margin: 20px auto auto;}';
		}
		
		//Adding styles for widget mode
		if(youmax_global_options.widgetMode) {
			$youmaxContainer.addClass("youmax-widget");
		}
		
		//Adding styles for Text instead of Icon mode
		if(youmax_global_options.showTextInsteadOfIcons) {
			$youmaxContainer.addClass("youmax-text-instead-of-icons");
		}
		
		
		
		
		
		//adding styles for hide header
		if(youmax_global_options.hideHeader) {
			custom_styles += '#youmax-header{display:none !important;} .youmax-select-box-wrapper {padding-top: 3px;}';
		}
		
		//adding styles for hide navigation
		if(youmax_global_options.hideNavigation) {
			custom_styles += '#youmax-tabs,.youmax-select-box-wrapper,#youmax-select-box{display:none !important;}';
		}
		
		//adding styles for hide comments
		if(youmax_global_options.hideComments) {
			custom_styles += '#youmax-encloser-comment-holder,.youmax-show-button-wrapper{display:none !important;} .photo-popup-stats {border-bottom: none !important;}';
		}
		
		//adding styles for hide video details
		if(youmax_global_options.hideVideoDetails) {
			custom_styles += youmaxElementId+'.photo-popup-title,'+youmaxElementId+'.photo-popup-description,'+youmaxElementId+'.photo-popup-stats{display:none !important;}';
		}
		
		//hide complete video detail holder
		if(youmax_global_options.hideVideoDetails && youmax_global_options.hideComments) {
			custom_styles += '#photo-detail-holder{display:none !important;}';
		}
		
		//adding styles for hide video thumbnails
		if(youmax_global_options.hideVideoThumbnails) {
			custom_styles += '#youmax-video-list-div{display:none !important;}';
		}
		
		//adding styles for hide load more and pagination
		if(youmax_global_options.hideLoadMore) {
			custom_styles += '#youmax-load-more-div,.youmax-pagination,.youmax-pagination-button-wrapper{display:none !important;}';
		}
		
		
		if(youmax_global_options.minVideoContainerHeight>0) {
			custom_styles += '#youmax-video-list-div{min-height:'+youmax_global_options.minVideoContainerHeight+'px;}';
		}
		
		//adding styles to hide definition
		if(youmax_global_options.hideDefinition) {
			custom_styles += '.youmax-definition{display:none !important;}';
		}
		
		//adding styles to show fixed play icon
		if(youmax_global_options.playIconType=="white_grey_combo") {
			custom_styles += '.youmax-play-overlay {display: block !important;background-color: rgba(0,0,0,0) !important;} .youmax-play-icon-holder { background-color: rgba(255,255,255,0.85);border: none !important;} .youmax-play-icon-holder i {color: #878787;padding: 15px 0 0 19px !important;font-size: 20px !important;} .youmax-play-hover .youmax-play-icon-holder{transition: 0.3s; background-color: #CF1F1F !important;} .youmax-play-hover i{color: white !important;}';
		} else if(youmax_global_options.playIconType=="white_black_combo") {
			custom_styles += '.youmax-play-overlay {display: block !important;} .youmax-play-hover .youmax-play-icon-holder {background-color: #CF1F1F !important;border-color: #CF1F1F !important;} .youmax-play-hover.youmax-play-overlay {background-color: rgba(0,0,0,0);}';
		} else if(youmax_global_options.playIconType=="no_icon") {
			custom_styles += '.youmax-play-overlay {display: none !important;}';
		}

		

		
		//setting width qantifiers
		//setMediaQueries(options.maxContainerWidth,$youmaxContainer);
		setMediaQueries($youmaxContainer.width(),$youmaxContainer);
		
		
		//adding media queries based on column thresholds
		
		custom_styles += '.youmax-grid-item {margin-bottom: '+youmax_global_options.thumbnailBottomMargin+';} #youmax-video-list-div {padding-left: '+youmax_global_options.containerLeftRightMargin+';padding-right: '+youmax_global_options.containerLeftRightMargin+';}';
		
		youmax_global_options.fourColumnContainerWidth = youmax_global_options.fourColumnContainerWidth.replace('px','');
		custom_styles += '.gt'+youmax_global_options.fourColumnContainerWidth+' .youmax-grid-item {width: '+youmax_global_options.fiveColumnThumbnailWidth+'; margin-left: '+youmax_global_options.fiveColumnThumbnailLeftRightMargin+'; margin-right: '+youmax_global_options.fiveColumnThumbnailLeftRightMargin+';} .lt'+youmax_global_options.fourColumnContainerWidth+' .youmax-grid-item {width: '+youmax_global_options.fourColumnThumbnailWidth+'; margin-left: '+youmax_global_options.fourColumnThumbnailLeftRightMargin+';margin-right: '+youmax_global_options.fourColumnThumbnailLeftRightMargin+';}';
		
		youmax_global_options.threeColumnContainerWidth = youmax_global_options.threeColumnContainerWidth.replace('px','');
		custom_styles += '.lt'+youmax_global_options.threeColumnContainerWidth+' .youmax-grid-item {width: '+youmax_global_options.threeColumnThumbnailWidth+'; margin-left: '+youmax_global_options.threeColumnThumbnailLeftRightMargin+';margin-right: '+youmax_global_options.threeColumnThumbnailLeftRightMargin+';}';
		
		youmax_global_options.twoColumnContainerWidth = youmax_global_options.twoColumnContainerWidth.replace('px','');
		custom_styles += '.lt'+youmax_global_options.twoColumnContainerWidth+' .youmax-grid-item {width: '+youmax_global_options.twoColumnThumbnailWidth+'; margin-left: '+youmax_global_options.twoColumnThumbnailLeftRightMargin+';margin-right: '+youmax_global_options.twoColumnThumbnailLeftRightMargin+';}';
		
		youmax_global_options.oneColumnContainerWidth = youmax_global_options.oneColumnContainerWidth.replace('px','');
		custom_styles += '.lt'+youmax_global_options.oneColumnContainerWidth+' .youmax-grid-item {width: '+youmax_global_options.oneColumnThumbnailWidth+'; margin-left: '+youmax_global_options.oneColumnThumbnailLeftRightMargin+';margin-right: '+youmax_global_options.oneColumnThumbnailLeftRightMargin+';}';

		if(youmax_global_options.skin=="block1") {
			custom_styles += 'span.youmax-view-date-holder, .youmax-like-comment-holder {display: none !important;} #tiles li p {padding-bottom: 5px !important;} .youmax-duration {bottom: 125px !important;}';
		} else if(youmax_global_options.skin=="block2") {
			custom_styles += '.youmax-like-comment-holder {display: none !important;} #tiles li p {padding-bottom: 6px !important;} .youmax-duration {bottom: 163px !important;}';
		} else if(youmax_global_options.skin=="block3") {
			custom_styles += 'span.youmax-view-date-holder {display: none !important;} #tiles li p {padding-bottom: 6px !important;} .youmax-duration {bottom: 155px !important;}';
		} else if(youmax_global_options.skin=="block4") {
			custom_styles += '#tiles li p, .youmax-like-comment-holder {display: none !important;} .youmax-duration {bottom: 10px !important;}';
		} else if(youmax_global_options.skin=="trend1") {
			custom_styles += 'span.youmax-trend-holder, .youmax-thumbnail-link, .youmax-trend-link-holder {display: none !important;} span.youmax-title-desc-holder {margin-bottom: 5px;}.youmax-duration {bottom: 165px !important;}';
		} else if(youmax_global_options.skin=="trend2") {
			custom_styles += 'span.youmax-view-date-holder {display: none !important;} span.youmax-trend-link-holder {border-top: 1px solid #e2e2e2;} span.youmax-trend-link-holder {padding-top: 5px;margin-top: 6px;} #tiles li p {padding-bottom: 5px !important;} .youmax-duration {bottom: 170px !important;}';
		} else if(youmax_global_options.skin=="grey1" || youmax_global_options.skin=="white1" || youmax_global_options.skin=="blue1") {
			custom_styles += 'span.youmax-view-date-holder {display: none !important;} span.youmax-video-list-title {height: 52px !important; padding-top: 4px !important;} .youmax-duration {bottom: 75px !important;}';
		} else if(youmax_global_options.skin=="list1") {
			custom_styles += 'span.youmax-view-date-holder {display: none !important;} .youmax-title-desc-holder {height: 120px !important;} .youmax-video-list-description { max-height: 80px !important;} .lt700 .youmax-title-desc-holder {height: 100px !important;} .lt700 .youmax-video-list-description {max-height: 60px !important;} .lt600 .youmax-video-list-description {display: inline-block !important;}';
		}
		
		



		$("head").append("<style class='youmax-added-styles'>"+custom_styles+"</style>");
		
		initTranlator($youmaxContainer);

		//IE 10 mode
		var doc = document.documentElement;
		doc.setAttribute('data-useragent', navigator.userAgent);

		
		//return this for chaining
		return this;
 
    };
	
 
}( jQuery ));


function youmaxSaveToken(authResult) {
	//console.log(authResult);
	if (authResult['status']['signed_in']) {
		youmaxLoggedInUser.youmaxAccessToken = authResult.access_token;
		jQuery('.youmax-add-comment-button').removeAttr('disabled').html('<i class="fa fa-send fa-2x"></i>');
		//console.log('User Signed in');
	}/* else {
		youmaxAccessToken = "";
		$('.youmax-add-comment-button').text('G+ Sign In');
		//console.log('Sign in Error');
		//console.log('Sign-in state: ' + authResult['error']);
	}*/
}