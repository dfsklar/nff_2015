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
  }, 
             // 1800);
             10);

});
