$(function() {

  var alreadyLoaded = false;

  window.nfforg.indexAndFilterDatabase();

  if (window.nfforg.queryParams['filter']) {
    window.nfforg.setFiltersFromString(decodeURI(window.nfforg.queryParams['filter']));
    window.nfforg.createFilterGUI($('#filter-area #filter .section-holder'));
    window.nfforg.indexAndFilterDatabase();
  }else{
    window.nfforg.createFilterGUI($('#filter-area #filter .section-holder'));
  }

  window.nfforg.layoutUX();




  // Needed to await font loading?  Maybe not.  Need a better approach
  // to ensure geometries are calculated properly.
  setTimeout(function(){
    window.nfforg.recreateEntireVizArea();
    window.nfforg.layoutUX();
    window.nfforg.configureSidebarInteraction();  

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
             1800);
  //10);

});
