
  window.nfforg.doSingleChart = false;

  window.nfforg.px = function(VAL) { return String(VAL) + 'px'; }

  function markAsCompare($chart, side) {
    $chart.addClass('compare-side');
    $chart.addClass(side);
    var strToShow = (side=='left') ? "FILTERED SET" : "Full set of respondents";
    $chart.find('.chart-header').append('<div class=filterspec>' + strToShow + '</div>');
  };


  window.nfforg.percDisplay = function(val, total) {
    if (val==0)
      return "0%";
    //---------------
    var result = Highcharts.numberFormat(100 * val / total, 0) + "%";
    if (result == "0%")
      return "<1%";
    else
      return result;
  };




  window.nfforg.createChartViz = function($section, chartname, charthash, chartkey) {
    var chart = charthash[chartkey];
    var $chart = $('<div class="chart"><div class=chart-header><div class=uniqid/><div class=title/><div class=buttons><a class="button print" target="nffprintsinglechart" href="/?mode=print&chart='+chartname+'"/><a download="nff_survey_2014_chart.png" class="button export">Download&nbsp;&#9660</a></div></div><div class="viz"/><div class=respcount/></div>');
    if (chart.usagetip) {
      $chart.find('.chart-header').append($("<div class=usagetip>"+chart.usagetip+"</div>"));
    }
    $chart.find('.title').html(chart.title);
    $chart.find('.uniqid').html(chartname);
    $chart.data('chart-source', chart);
    if (chart.yValueTotal) {
      // Anjali wants the words "total respondents" to be shown for mult-choice questions and planned/taken questions
      var wordingResp = "respondents: ";
      switch (chart.renderer) {
      case "actions_planned_taken":
      case "one_or_more":
        wordingResp = "total respondents: ";
        break;
      }
      $chart.find('.respcount').text(wordingResp + String(chart.yValueTotal));
    }
    $chart.data('key', chartname);
    
    // OPTIONAL TOOLTIP
    if (chart["info-tip"]) {
      $chart.append($('<a class=infotip href=# title="' + chart["info-tip"] + '"></a>'));
    }

    // WIDTH OF THE CHART'S REAL-ESTATE DOMAIN
    if (chart.css)
      $chart.find('.viz').css(chart.css);

    $section.find('.chart-holder').append($chart);

    if (chart.renderer) {
      window.nfforg.renderers[chart.renderer] ( $chart.find('.viz'), chart, {charthash: charthash} );
    }

    return $chart;
    
  };





  window.nfforg.recreateEntireVizArea = function() {
    var DB = window.nfforg.database;
    var $root = $('#viz-area');
    $root.empty();
    var idx_cur_section = 0;
    var cur_section = null;
    var $section = null;
    var $toc = $('#table-of-contents .toc-body');
    $toc.find('.toc-body-segment').empty();

    var abort = false;

    var cur_section_hidden = false;

    var $tocToFill = $toc.find('.toc-body-left');

    Object.keys(DB.charts).each(function(chartname){

      if (abort) return;
      //----------------

      var chart = DB.charts[chartname];

      if (chart.special == "ABORT") {
        abort = true;
        return;  // return from anonymous .each function, not from the entire-viz-area reconstruction!
      }

      if (chart.special == "INTERNAL") {
        if ( ! (window.nfforg.queryParams['internalnff'] == 'true')) {
          return;
        }
      }
          
      if (chart.renderer == "none")
        return;  // return from anonymous .each function, not from the entire-viz-area reconstruction!

      if (!(chart.section))
        chart.section = cur_section;

      if (cur_section != chart.section) {
        //if (cur_section_hidden)
        //   return;  // return from anonymous .each function, not from the entire-viz-area reconstruction!
        //-----------------------
        idx_cur_section++;
        cur_section_hidden = false;
        var sectLauncher = 
            $("<div href=#SECT"+idx_cur_section+" class='toc-section'>"+String(idx_cur_section)+". " + chart.section+"</div>");
        if (chart.section.has('Feature')) {
          sectLauncher.addClass('feature');
          sectLauncher.text(chart.section);
        }
        sectLauncher.append($("<span>&#x25B7</span>"));
        $tocToFill.append(sectLauncher);
        if (idx_cur_section > 5) 
          $tocToFill = $toc.find('.toc-body-right');

        $section = $('<div class=section></div>');
        $root.append($section);
        if (DB.sections[chart.section]["extra-class"])
          $section.addClass(DB.sections[chart.section]["extra-class"]);
        if (!window.nfforg.doSingleChart) {
          $section.append($('<a name=SECT'+idx_cur_section+ ' class=section-title>'+chart.section+'</a>'));
          if (DB.sections[chart.section]) {
            if (DB.sections[chart.section].commentary) {
              $section.append($('<div class=section-commentary>'+DB.sections[chart.section].commentary+'</div>'));
            }
            // Showcases are not shown when filtering/comparison is ON, except in the case of
            // the "overview" section, which shows a special respondent-count showcase to announce
            // how many made it through the filter.
            var idShowcase = DB.sections[chart.section]["showcase"];
            if (idShowcase) {
              if ( ! window.nfforg.isAnyFilteringGoingOnInCurrentActiveTab() ) {
                $('.hidden-area .showcase-bar-table#'+idShowcase).clone().appendTo($section);
              }else{
                switch (idShowcase) {
                case "overview":
                  var showcaseSpecial = 
                    (window.nfforg.isComparisonInEffect())
                    ?
                    $('.hidden-area .showcase-bar-table#overview-when-compared').clone()
                    :
                    $('.hidden-area .showcase-bar-table#overview-when-filtered').clone();
                  showcaseSpecial.appendTo($section);
                  break;
                case "artsculturecount":
                  var showcaseSpecial = 
                    (window.nfforg.isComparisonInEffect())
                    ?
                    $('.hidden-area .showcase-bar-table#artsculturecount-when-compared').clone()
                    :
                    $('.hidden-area .showcase-bar-table#artsculturecount').clone();
                  showcaseSpecial.appendTo($section);
                }
              }
              if ($section.find('.fill-in-from-first-chart')) {
                var chartFirst = "";
                if (window.nfforg.isComparisonInEffect()) 
                  chartFirst = window.nfforg.database.chartsComparison.left[chartname];
                else
                  chartFirst = window.nfforg.database.chartsForPrez[chartname];
                $section.find('.fill-in-from-first-chart').text(String(chartFirst.yValueTotal));
                if ( ! window.nfforg.isComparisonInEffect()) {
                  if (chart.yValueTotal == 0) {
                    cur_section_hidden = true;
                  }
                }
              }
            }
          }
        }
        cur_section = chart.section;
        $section.append("<div class=chart-holder/>");
        if (DB.sections[chart.section]["disable-when-filters-on"]) {
          if (window.nfforg.isAnyFilteringGoingOnInCurrentActiveTab()) {
            $section.addClass('empty-of-charts');
            cur_section_hidden = true;
            $section.find('.chart-holder').append(
              window.nfforg.isComparisonInEffect() 
                ?
                "<div class=why-am-i-empty>This section is not available when you are doing a comparison across criteria.  Please use the 'Clear' button in the Compare sidebar (located at the right side) when you want to view this section.</div>"
                :
                "<div class=why-am-i-empty>This section is not available when there are active filters.  Please use the 'Clear' button in the filter sidebar (located at the right side) to clear the filters when you want to view this section.</div>");
          }
        }
      }


      if (cur_section_hidden) {
        return;
        // !!!!!!!!!!!! RETURN !!!!!!!!!!!!
      }

      if (window.nfforg.doSingleChart) {
        if (chartname != window.nfforg.doSingleChart) {
          return;
          // !!!!!!!!! RETURN !!!!!!!!
        }
      }

      if ($section.hasClass('empty-of-charts')) {
        return;
        // !!!!!!!!! RETURN !!!!!!!!
      }
      

      // If we wanted the TOC to be complete with chart titles, we would add this:
      // $toc.append($("<div class='toc-chart'>"+chart.title.replace("<br/>"," ")+"</div>"));

      if (window.nfforg.isComparisonInEffect()) {
        markAsCompare(
          window.nfforg.createChartViz($section, chartname, window.nfforg.database.chartsComparison.right, chartname),
          'right');
        markAsCompare(
          window.nfforg.createChartViz($section, chartname, window.nfforg.database.chartsComparison.left, chartname),
          'left');
      }
      else
        window.nfforg.createChartViz($section, chartname, window.nfforg.database.chartsForPrez, chartname);

    });



    // SET UP CLICKING ON TOC LINKS
    // Clicking on a toc "link" to jump to a particular chart section:
    $('.toc-section').click(function(e){
      // FIND THE VERT POSITION OF THE SECTION
      var sectID = $(this).attr('href').remove('#');
      var amtToScroll = $('a[name="'+sectID+'"]').offset().top;
      if (sectID=="SECT1") {
        // The very first one is special -- no need to scroll, just hide the TOC
        $('#table-of-contents').toggleClass('opened');
        $('#nav-bar .button.toc').removeClass('opened');
        return;
        //----------------- RETURN
      }

      // All other sections
      $(window).scrollTop(amtToScroll);
      $('#table-of-contents').removeClass('opened');
      $('#nav-bar .button.toc').removeClass('opened');
      setTimeout(function(){
        var delta = ($('.header.fixed.shown').length==1) 
            ? 
            (($('body.narrow-width').length==1) ? -328 : -300)
            : 
            0;
        console.log("delta");
        console.log(delta);
        console.log(amtToScroll+delta);
        $(window).scrollTop(amtToScroll+delta);
      }, 100);
    });


    // SET UP TOOLTIPS
    $('a.infotip').qtip();

    window.nfforg.configureChartInteraction();
  };



// Called after DOM is ready:
$(function() {

  if (window.nfforg.queryParams['mode'] == 'print') {
    $('body').addClass('print');
  }

  if (window.nfforg.queryParams['chart']) {
    window.nfforg.doSingleChart = window.nfforg.queryParams['chart'];
  };

});
