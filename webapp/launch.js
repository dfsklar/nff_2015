/* THIS IS IT -- THE main() FOR THIS APPLICATION! */

window.nfforg.updateProgressBar = function (num,denom) {
    var pct = Math.round(num*100/denom);
    $('.progress-bar-inner').css({width: String(pct)+"%"});
}

jQuery.ajax({
    xhr: function() {
	var total = 15063700;
        var xhr = new window.XMLHttpRequest();
	var handleProgress = function(evt) {
	    window.nfforg.updateProgressBar(evt.loaded, total);
	};
        xhr.upload.addEventListener("progress", handleProgress, false);
	xhr.addEventListener("progress", handleProgress, false);
	return xhr;
    },
    type: 'GET',
    url: "realdata.json",
    data: {},

    // SUCCESS !!!
    // SUCCESS !!!
    // SUCCESS !!!
    // SUCCESS !!!
    // SUCCESS !!!
    success: function(data){
	window.nfforg.database_unindexed.respondents = data;

	// Make sure at least one of the sidebar subareas is active
	if ($('#filter-area .tab.active').length == 0) {
	    $('#filter-area .tab.filter').addClass('active');
	    $('#filter-area .form#filter').addClass('active');
	}

	// if MSIE8, hide all overlays because the use of transforms to place the offscreen is not going to work on IE8
	if (navigator.userAgent.has("MSIE 8")) {
	    console.log("IE8");
	    $('.overlay').css('display','none');
	}

	// Needed to await font loading?  Maybe not.  Need a better approach
	// to ensure geometries are calculated properly.
	setTimeout(function(){

	    window.nfforg.recreateEntireVizArea();
	    window.nfforg.layoutUX();
	    window.nfforg.configureSidebarInteraction();  

	    // Automatic TOC opening
	    if (boolAutoOpenTOC) {
		$('#nav-bar .button.toc').toggleClass('opened');
		$('#table-of-contents').toggleClass('opened');
	    }

	    // Chrome has bug: googlefont-based text sometimes does not appear at all
	    // until "jostled" by code like the following.
	    $('.filtration-active-reminder .web').css({opacity: 0.94});

	    // Make sure infotip anchors are not clickable
	    $('a.infotip').attr('href','javascript:void(0);')
	    $('a.infotip').click(function(e){
		e.preventDefault();
		return false;
	    });

	},
		   (window.location.href.has("localhost")?10:800));
    }
});



