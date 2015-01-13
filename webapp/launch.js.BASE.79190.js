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


  setTimeout(function(){
    window.nfforg.recreateEntireVizArea();
    window.nfforg.layoutUX();
    window.nfforg.configureSidebarInteraction();
  }, 1800);


  // *** THIS REALLY DOES NOT WORK ***
  // *** SO I'M USING A setTimeout TO DELAY LOADING ***
  // Do not load the UI until the google font
  // Roboto Condensed (needed for the highcharts)
  // has loaded.
  /*
  $('.fontspy-tester-hidden').fontSpy({
    onLoad: function() {
      if (alreadyLoaded) return;
      alreadyLoaded = true;
      $('.fontspy-tester-hidden').remove();
      window.nfforg.recreateEntireVizArea();
      window.nfforg.layoutUX();
      window.nfforg.createFilterGUI($('#filter-area #filter .section-holder'));
      window.nfforg.configureSidebarInteraction();
    },
    onFail: 'fontFail anotherClass'
  });
  */
});
