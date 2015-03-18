/* THIS IS IT -- THE main() FOR THIS APPLICATION! */

var canDoCORS = !(window.navigator.userAgent.match(/MSIE /));

window.nfforg.updateProgressBar = function (num,denom) {
    var pct = Math.round(num*100/denom);
    $('.progress-bar-inner').css({width: String(pct)+"%"});
}

jQuery.ajax({
    xhr: function() {
	var totalUncompressed = 15063700;
	var totalCompressed =     797745;
	var total = totalUncompressed;
        var xhr = new window.XMLHttpRequest();
	var handleProgress = function(evt) {
	    total = evt.position ? totalUncompressed : totalCompressed;
	    window.nfforg.updateProgressBar(evt.loaded, total);
	};
	if (xhr.upload)    xhr.upload.addEventListener("progress", handleProgress, false);
	if (xhr.addEventListener) xhr.addEventListener("progress", handleProgress, false);
	return xhr;
    },
    type: 'GET',
    url: canDoCORS ? "http://s3.amazonaws.com/sklardevel/realdata.json" : "realdata.json",
    data: {},


    error: function (jqXHR, textStatus, errorThrown) {
	console.log(textStatus);
	console.log(errorThrown);
    },

    // SUCCESS !!!
    // SUCCESS !!!
    // SUCCESS !!!
    // SUCCESS !!!
    // SUCCESS !!!
    success: function(data){
	window.nfforg.database_unindexed.respondents = data;

	var boolAutoOpenTOC = ( ! (window.nfforg.queryParams['mode'] == "print") );

	window.nfforg.filtrationCurrent = new Object();
	window.nfforg.filtrationForCompareCurrent = new Object();

	window.nfforg.database = {};
	window.nfforg.indexAndFilterDatabase();

	if (window.nfforg.queryParams['filter']) {
	    $('.form.sidebar#filter').addClass('active');
	    window.nfforg.setFiltersFromString(window.nfforg.filtrationCurrent, decodeURI(window.nfforg.queryParams['filter']));
	    window.nfforg.createFilterGUI($('#filter-area #filter .section-holder'),
					  window.nfforg.filtrationCurrent);
	    window.nfforg.indexAndFilterDatabase(window.nfforg.database, 'chartsForPrez', window.nfforg.filtrationCurrent);
	    window.nfforg.createFilterGUI(
		$('#filter-area .form#compare .section-holder'),
		window.nfforg.filtrationForCompareCurrent
	    );
	    boolAutoOpenTOC = false;
	}
	else if (window.nfforg.queryParams['compareleft']) {
	    $('.form.sidebar#compare').addClass('active');
	    // Create two copies of the unfiltered chart specs:
	    window.nfforg.database.chartsComparison = {
		left: Object.clone(window.nfforg.database.charts, true),
		right: Object.clone(window.nfforg.database.charts, true)
	    };
	    // Initially, we are ignoring the "right" side and making that be an unfiltered respondent pool.
	    window.nfforg.filtrationForCompareCurrent = new Object();  // eventually this may be a right-side thing
	    window.nfforg.setFiltersFromString(new Object(), "");  //decodeURI(window.nfforg.queryParams['compareright']));
	    window.nfforg.indexAndFilterDatabase(window.nfforg.database.chartsComparison, 'right', new Object());
	    window.nfforg.setFiltersFromString(window.nfforg.filtrationForCompareCurrent, decodeURI(window.nfforg.queryParams['compareleft']));
	    window.nfforg.createFilterGUI(
		$('#filter-area .form#compare .section-holder'),
		window.nfforg.filtrationForCompareCurrent
	    );
	    window.nfforg.indexAndFilterDatabase(window.nfforg.database.chartsComparison, 'left', window.nfforg.filtrationForCompareCurrent);
	    $('#filter-area .form#compare').addClass('active');
	    $('#filter-area .tab.compare').addClass('active');
	    window.nfforg.createFilterGUI($('#filter-area #filter .section-holder'), new Object());
	    boolAutoOpenTOC = false;
	}else{
	    $('.form.sidebar#filter').addClass('active');
	    window.nfforg.createFilterGUI($('#filter-area #filter .section-holder'), new Object());
	    window.nfforg.createFilterGUI(
		$('#filter-area .form#compare .section-holder'),
		window.nfforg.filtrationForCompareCurrent
	    );
	    window.nfforg.database.chartsForPrez = Object.clone(window.nfforg.database.charts, true);
	    window.nfforg.indexAndFilterDatabase(window.nfforg.database, 'chartsForPrez', window.nfforg.filtrationCurrent);
	}

	window.nfforg.layoutUX();

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



