$(function() {


  window.onpopstate = function(event) {
    if (window.nfforg.queryParams['mode'] != 'print') {
      if (event.eventPhase == 2) {
        $('body').removeClass('print');
      }
    }
  };



  // SHOWING AN OVERLAY
  window.nfforg.overlayShow = function(classname) {
    var $overlay = $('.overlay.'+classname);
    $overlay.find('.message').css("height", Math.max(window.innerHeight - 140 - 200, 70));
    $overlay.addClass('displayed');
    $('.body-inner').addClass('shrunken');
    // Immediately setting frozen on the HTML document
    // had a bad effect on firefox-on-Mac: it caused
    // the overlay's transition to not animate.
    // A slight delay of the freezing does the trick.
    setTimeout(function(){
      $('html').addClass('frozen');
    }, 500);
  }


  // SIDEBAR TABS
  $('#filter-area .tab').click(function(){
    if ( ! (($(this).hasClass('active'))) ) {
      $('#filter-area .tab,.form').toggleClass('active');
      if (window.nfforg.isAnyFilteringGoingOn()) {
        // At least one of the two sidebar sides is currently
        // specifying a filter, so we must force the VIZ area
        // to be redrawn to match the sidebar form now being
        // newly active.
        makeVizMatchSidebar(true);
      }
    }
  });


  

  // TOC
  $('#nav-bar .button.toc').click(function(){
    $('#nav-bar .button.toc').toggleClass('opened');
    $('#table-of-contents').toggleClass('opened');
    window.scrollTo(0,0);
  });




  // CLEAR ALL FILTERS
  $('#filter-area .button.clear').click(function(){
    var $activeform = $('.sidebar.form.active');
    if ( !
         (
           ($activeform.hasClass('dirty'))
             ||
             ($activeform.hasClass('clean'))
         )
       )
      return;

    $('#viz-area').addClass('invisible');
    $activeform.removeClass('dirty');
    $activeform.addClass('computing');
    $activeform.find('.chkholder').removeClass('checked').removeClass('partial');
    $activeform.find('.subarea-value-checkboxes').removeClass('opened');
    $activeform.find('.list-active-values').text("");
    $activeform.find('.section').removeClass("has-active-values");
    $activeform.find('input').attr('checked', false);
    $('.filtration-active-reminder').removeClass('opened');
    window.nfforg.filtrationCurrent = {};
    if ($activeform.attr('id') == ('filter')) {
      // THIS REGARDS THE FILTERING SIDE
      setTimeout(function(){
        if (window.nfforg.indexAndFilterDatabase(window.nfforg.database, 'chartsForPrez', {}))
          window.nfforg.recreateEntireVizArea();
        $activeform.find('.section').removeClass('opened');
        History.replaceState("filterclear", null, "/");
        window.nfforg.filterSidebar.respondToHeightChanges($activeform);
      }, 100);
    }else{
      // THIS REGARDS COMPARE
      setTimeout(function(){
        window.nfforg.database.chartsForPrez = Object.clone(window.nfforg.database.charts, true);
        // window.nfforg.database.chartsComparison = {};
        window.nfforg.filtrationForCompareCurrent = new Object();
        window.nfforg.indexAndFilterDatabase(window.nfforg.database, 'chartsForPrez', {});
        window.nfforg.recreateEntireVizArea();
        $activeform.find('.section').removeClass('opened');
        History.replaceState("filterclear", null, "/");
        window.nfforg.filterSidebar.respondToHeightChanges($activeform);
      }, 100);
    }
  });





  // APPLY-FILTERS

  var makeVizMatchSidebar = function(doForce){
    var $activeform = $('.sidebar.form.active');
    if ((!doForce)  &&  (!($activeform.hasClass('dirty'))))
      return;
    //-----------------

    $('#viz-area').addClass('invisible');
    $activeform.removeClass('dirty').addClass('computing');
    window.scrollTo(0,0);
    // Ensure the UI feedback occurs immediately since processing takes a long time:
    setTimeout(function(){
      // THIS IS "FILTER" (not compare)
      if ($activeform.attr('id') == 'filter') {
        History.replaceState("filterset", null, 
                             "/?filter=" + encodeURI(window.nfforg.filterSetAsString(window.nfforg.filtrationCurrent)));
        if (window.nfforg.indexAndFilterDatabase(window.nfforg.database, 'chartsForPrez', window.nfforg.filtrationCurrent))
          window.nfforg.recreateEntireVizArea();
      }else{
        // THIS IS "COMPARE"
        History.replaceState("filterset", null, 
                             "/?compareleft=" + encodeURI(window.nfforg.filterSetAsString(window.nfforg.filtrationForCompareCurrent)));
        if (window.nfforg.isComparisonInEffect()) {
          window.nfforg.database.chartsComparison = {
            left: Object.clone(window.nfforg.database.charts, true),
            right: Object.clone(window.nfforg.database.charts, true)
          };
          window.nfforg.indexAndFilterDatabase(window.nfforg.database.chartsComparison, 'right', {});
          window.nfforg.indexAndFilterDatabase(window.nfforg.database.chartsComparison, 'left', window.nfforg.filtrationForCompareCurrent); 
        }else{
          window.nfforg.indexAndFilterDatabase(window.nfforg.database, 'chartsForPrez', window.nfforg.filtrationForCompareCurrent);
        }
        window.nfforg.recreateEntireVizArea();
      }
      $activeform.find('.section').removeClass('opened');
      window.nfforg.filterSidebar.respondToHeightChanges($activeform);
    }, 10);
  };

  $('#filter-area .button.apply').click(makeVizMatchSidebar);







  $('.button-hamburger').click(function(){
    alert("Coming soon: navigation popup menu");
  });


  // "ABOUT THIS SURVEY" POPUP
  $('#nav-bar .button.contact').click(function(){
    window.nfforg.overlayShow('contact');
  });
  $('#nav-bar .button.about-survey').click(function(){
    window.nfforg.overlayShow('about-this-survey');
  });
  $('#nav-bar .button.about-nff').click(function(){
    window.nfforg.overlayShow('about-nff');
  });
  $('#nav-bar .button.about-analyzer').click(function(){
    window.nfforg.overlayShow('about-analyzer');
  });

  $('#nav-bar .button.share').click(function(EVENT){
    $('.menu-horiz-share').removeClass('filtering-in-effect');
    var filtInEffect = (Object.size(window.nfforg.filtrationCurrent) != 0);
    stLight.options({publisher: "9d362b9c-f607-4564-b04c-5bf7ddf680e0", shorten:filtInEffect,
                     doNotHash: true, doNotCopy: true, hashAddressBar: false});
    $('#share-aswhole').empty();
    
    // TWITTER

    var title = "Explore the trends & challenges nonprofits faced in 2014. #NonprofitFinanceFund";
    ["twitter","facebook","linkedin","pinterest"].each(function(svc){
      stWidget.addEntry({
        "service":svc,
	      "element":document.getElementById('share-aswhole'),
	      "url": filtInEffect?window.location.href:window.location.href, // //"http://nffdemo.sklardevelopment.com",
	      "title":"Explore the trends & challenges nonprofits faced in 2014. #NonprofitFinanceFund",
	      "type":"large",
	      "text":"ShareThis" ,
	      "image":"http://nffdemo.sklardevelopment.com/assets/images/nff_logo_square_noBG.png",
	      "summary":"this is description1"
      })
    });

    $('.menu-horiz-share').toggleClass('visible');

    return false;
  });



  // PRINT
  // Version 1:  no webapp reload
  $('.NOTINUSENOTINUSENOTINUSENOTINUSENOTINUSENOTINUSENOTINUSE #nav-bar .button.print').click(function(){
    var urlNew = "";
    if (window.location.href.has('?'))
      urlNew = window.location.href + "&mode=print";
    else
      urlNew = window.location.href + "?mode=print";
    History.pushState("print", null, urlNew);
    $('body').addClass('print');
  });

  // Version 2: new page/tab
  $('#nav-bar .button.print').click(function(){
    var urlNew = "";
    if (window.location.href.has('?'))
      urlNew = window.location.href + "&mode=print";
    else
      urlNew = window.location.href + "?mode=print";
    $('a.button.print').attr('href',urlNew);
  });



  // THE CLOSE BUTTON ON A POPUP OVERLAY
  $('.overlay .button-close').click(function(){
    $('html').removeClass('frozen');
    $('.overlay').removeClass('displayed');
    $('.body-inner').removeClass('shrunken');
  });


  $('body').click(function(){
    $('.menu-horiz-share').removeClass('visible');
  });



  // REACTING TO WINDOW SCROLLING
  window.nfforg.reactToWindowScroll = function(){
    if ($('body').hasClass('narrow-width')) {
      $('.header.fixed').addClass('shown');
      $('.header.full-height').addClass('betrayed');
      $('#nav-bar').appendTo($('.header.fixed .holder-nav-bar'));
    }else{
      if ($(window).scrollTop() > 130) {
        $('.header.fixed').addClass('shown');
        $('.header.full-height').addClass('betrayed');
        $('#nav-bar').appendTo($('.header.fixed .holder-nav-bar'));
        $('#nav-bar .button.toc').removeClass('opened');
        $('#table-of-contents').removeClass('opened');
      }
      else {
        $('.header.fixed').removeClass('shown');
        $('.header.full-height').removeClass('betrayed');
        $('#nav-bar').appendTo($('.header.full-height .holder-nav-bar'));
      }
    }
  };

  $(window).scroll(window.nfforg.reactToWindowScroll);






  // REACTING TO WINDOW-WIDTH CHANGES
  //
  window.nfforg.layoutUX = function() {

    $('.sidebar.form').each(function(){
      window.nfforg.filterSidebar.respondToHeightChanges($(this));
    });

    var newWidth = $(window).width();
    var boolForceContentRedraw = false;

    if (newWidth < 930) {
      if ( ! ($('body').hasClass('narrow-width'))) {
        // HA!  This is a CHANGE from full width to narrow width
        $('body').addClass('narrow-width');
        $('.header.fixed').addClass('shown');
        boolForceContentRedraw = true;
        // The fixed header is not part of the flow of the content area.
        // Thus, the content area must be given padding to ensure the top
        // of the TOC (for example) is visible past the fixed header's area
        $('.content-area').css( 'padding-top', window.nfforg.px($('.header.fixed').height()) );
        $('#table-of-contents').removeClass('opened');
        $('#nav-bar .button.toc').removeClass('opened');
      }
    }else{
      $('.content-area').css( 'padding-top', window.nfforg.px(0) );
      if (($('body').hasClass('narrow-width'))) {
        $('body').removeClass('narrow-width');
        $('.header.fixed').removeClass('shown');
        boolForceContentRedraw = true;
      }
    }
    window.nfforg.reactToWindowScroll();

    var newContentAreaWidth = Math.min( parseInt($('.content-area').css('maxWidth')), newWidth - $('#filter-area').width() - 10   );
    $('.content-area').css('width', window.nfforg.px(newContentAreaWidth));

    // Re-establish the fixed filter area
    var calculatedOffsetLeftForFilter = 
      $('.body-inner').offset()['left'] + $('.body-inner').width()
      - $('#filter-area').width();
    $('#filter-area').css(
      {
        display: "block",
        position: "fixed",
        left: calculatedOffsetLeftForFilter,
        top: 0
      });
    $('.overlay').css(
      {
        left: (newWidth/2 - $('.overlay').width()/2)|0
      });
    $('.header.fixed').css(
      {
        left: calculatedOffsetLeftForFilter - newContentAreaWidth,
        width: newContentAreaWidth
      });

    if (boolForceContentRedraw) {
      window.nfforg.recreateEntireVizArea();
    }
    
  };


  $(window).resize(window.nfforg.layoutUX);





  // This *also* maintains the global current-filtration database
  // This *also* maintains the global current-filtration database
  // This *also* maintains the global current-filtration database
  // This *also* maintains the global current-filtration database

  window.nfforg.displayListOfActiveFilterValues = function($sect, filtrationToManage)
  {
    var sectionName = $sect.find('.chart-name').text();

    var $activeform = $($sect.parents('.sidebar.form').get(0));

    // Special case for the SECTOR section: its arts/culture choice has subchoices so it is "tri-state"
    if (sectionName == "org_type") {
      filtrationToManage["arts_org_type"] = [];
      var $formSectorArts = $sect.find('.sector-arts');
      var howManyChecked = $sect.find('.subarea-value-checkboxes .chkholder.checked').size();
      if (0 == howManyChecked) {
        // None of the arts subsectors are checked
        $formSectorArts.removeClass('checked').removeClass('partial');
      }
      else if (howManyChecked == $sect.find('.subarea-value-checkboxes .chkholder').size()) {
        $formSectorArts.addClass('checked').removeClass('partial');
      }
      else {
        $formSectorArts.addClass('partial').removeClass('checked');
      }
    }

    filtrationToManage[sectionName] = [];
    var toDisplay = "";
    var doConsiderArtsSubsectors = $sect.find('.sector-arts.partial').size();
    var atLeastOneArtsSubsectorSpecificFilter = false;
    $sect.find('.chkholder').each(function(){
      var thisSectionName = sectionName;
      if ($(this).hasClass('arts-subsector')) {
        thisSectionName = "arts_org_type";
        if (!doConsiderArtsSubsectors)
          return;
      }
      if ($(this).hasClass('checked')) {
        var $box = $(this).find('input');
        filtrationToManage[thisSectionName].push($box.siblings().text());
        toDisplay += $box.siblings().text() + ", ";
        if (thisSectionName == "arts_org_type")
          atLeastOneArtsSubsectorSpecificFilter = true;
      }
    });

    if (atLeastOneArtsSubsectorSpecificFilter) {
      filtrationToManage["org_type"].push("Arts/Culture/Humanities");
    }

    $sect.removeClass('has-active-values');
    if (toDisplay) {
      $sect.addClass('has-active-values');
      toDisplay = toDisplay.replace(/, $/,'');
    }else{
      filtrationToManage[sectionName] = null;
      delete filtrationToManage[sectionName];
    }
    if (sectionName == "org_type") {
      if (!atLeastOneArtsSubsectorSpecificFilter)
        delete filtrationToManage["arts_org_type"];
    }
    $sect.find('.list-active-values').text(toDisplay);

    return toDisplay;
  };




  window.nfforg.configureSidebarInteraction = function() {

    // EVENT: CLICKING ON A CHECKBOX
    //
    $('.sidebar.form input').change(function(){
      $form = $('.sidebar.form.active');
      var filtrationToManage = 
          ($form.attr('id')=='filter') 
          ?
          window.nfforg.filtrationCurrent
          :
          filtrationToManage = window.nfforg.filtrationForCompareCurrent;
      $form.addClass('dirty');
      $form.find('.button.apply').addClass('throb');
      setTimeout(function(){
        $form.find('.button.apply').removeClass('throb');
      }, 400);
      var newvalue = this.checked;
      if (newvalue)
        $(this).parent().addClass('checked');
      else
        $(this).parent().removeClass('checked');
      var $sect = $(this).parents('.section');
      if ($(this).parent().hasClass('sector-arts')) {
        if (newvalue) {
          $(this).parent().parent().find('.subarea-value-checkboxes').addClass('opened');
          //$(this).parent().parent().find('.subarea-value-checkboxes .chkholder').find('input').attr('checked','checked');
          $(this).parent().parent().find('.subarea-value-checkboxes .chkholder').find('input').prop('checked',true);
          $(this).parent().parent().find('.subarea-value-checkboxes .chkholder').addClass('checked');
        } else {
          $(this).parent().parent().find('.subarea-value-checkboxes').removeClass('opened');
          $(this).parent().parent().find('.subarea-value-checkboxes .chkholder').removeClass('checked');
          $(this).parent().parent().find('.subarea-value-checkboxes .chkholder').find('input').removeAttr('checked');
        }
      }
      window.nfforg.displayListOfActiveFilterValues($sect, filtrationToManage);
      setTimeout(function(){
        window.nfforg.filterSidebar.respondToHeightChanges($form);
      }, 200);
    });




    // CLICKING ON OPEN/CLOSE TOGGLE FOR A FILTER SECTION
    $('#filter-area .form .section .title,.button-openclose').click(function(e){
      var $sect = $(this).parent('.section');
      var currentlyOpen = $sect.hasClass('opened');
      $sect.parent().find('.section').removeClass('opened');
      if (!currentlyOpen) {
        $sect.addClass('opened');
      }
      window.nfforg.filterSidebar.respondToHeightChanges($($sect.parents('.form').get(0)));
      e.preventDefault();
    });

  }



  // Delayed adding of events to the sharing buttons
  // Not sure why this is here so tring to disable
  if (false) 
  setTimeout(function(){
    $('.menu-horiz-share').click(function(){
      $('.menu-horiz-share').removeClass('visible');
      
    });
  }, 2000);



});
