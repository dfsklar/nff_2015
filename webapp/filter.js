"use strict";

if (window.nfforg.queryParams['enablezipfilter']) {
    $.cookie('enablezipfilter', 'true');
    window.nfforg.enablezipfilter = true;
}

if (window.nfforg.queryParams['filter']) {
  if (window.nfforg.queryParams['filter'].has) {
    if (window.nfforg.queryParams['filter'].has('zip:')) {
      $.cookie('enablezipfilter', 'true');
      window.nfforg.enablezipfilter = true;
    }
  }
}

if ($.cookie('enablezipfilter')) {
    window.nfforg.enablezipfilter = true;
}

  window.nfforg.mapFilterSectionIdToHumanText = {
    "state": "State",
    "org_type": "Sector",
    "arts_org_type": "Arts subsector",
    "opp_exp_max": "Operating expense",
    "lifeline": "Lifeline",
    "lmi_serve_expanded": "Serves low-income communities",
    "lmi_loc": "Located in low-income communities",
    "year_founded_range": "Year founded",
    "employee_count_fte_range": "# full-time employees",
    "employee_count_pte_range": "# part-time employees"
  };



  var tooltips = {
    lifeline: "These organizations identified themselves as providing critical services to people in need.",
    opp_exp_max: "Operating expense is a way to identify organizations by size. Filter here to hone in on results for large, medium, and/or small nonprofits.",
    state: "Interested in results for a particular state or region? Select one or more states.",
    section: "Filter here to see our survey results for a particular nonprofit sector. Note: You can also select sub-sectors in Arts/Culture/Humanities!",
    org_type: "Filter here to see results for a particular nonprofit sector. Note: You can also select sub-sectors in Arts/Culture/Humanities."
  };

  var mapChkboxidToLabel = {};
  var mapLabelToChkboxid = {};
  var curChkboxid = 1000;



  window.nfforg.isAnyFilteringGoingOn = function(){
    return (0 < Object.size(window.nfforg.filtrationCurrent)) || (0 < Object.size(window.nfforg.filtrationForCompareCurrent));
  };


  window.nfforg.isAnyFilteringGoingOnInCurrentActiveTab = function(){
    return window.nfforg.areFiltersInEffect() || window.nfforg.isComparisonInEffect();
  };

  window.nfforg.areFiltersInEffect = function(){
    if ($('.sidebar.form#filter').hasClass('active'))
      return Object.size(window.nfforg.filtrationCurrent);
    else
      return false;
  };

  window.nfforg.isComparisonInEffect = function(){
    if ($('.sidebar.form#compare').hasClass('active'))
      return Object.size(window.nfforg.filtrationForCompareCurrent);
    else
      return false;
  };





  window.nfforg.setFiltersFromString = function(filtset, strFilt){
    if (strFilt) {
      strFilt.split("|").each(function(X){
        // Example value of X:   state:AR,LA
        var arrCriteria = X.split(":");
        var nameCrit = arrCriteria[0];
        filtset[nameCrit] = (nameCrit == 'zip') ? [ arrCriteria[1] ] : arrCriteria[1].split(",");
      });

      // Arts must appear in the org_type filter even if it is being divided by subsectors
      if (filtset['arts_org_type']) {
        if (filtset['arts_org_type'].length > 0) {
          filtset['org_type'] = filtset['org_type'].union(['Arts/Culture/Humanities']);
        }
      }
    }
  };



  

  // 2013 depiction was:  state:AL,org_type:ed|env
  // 2014 depiction will be:  state:AL|org_type:ed,env
  window.nfforg.filterSetAsString = function(filtration){
    var result = "";
    var arrFCats = window.nfforg.filterCategories.clone();
    arrFCats.add('arts_org_type');
    arrFCats.each(function(X){
      if (filtration[X]) {
        if (filtration[X].length > 0) {
          result += "|";
          result += X;
          result += ":";
          if (X == "org_type") {
            var arrResultRaw = filtration[X].clone();
            if (filtration['arts_org_type']) {
              if (filtration['arts_org_type'].length > 0) {
                arrResultRaw.remove("Arts/Culture/Humanities");
                result += arrResultRaw.toString();
              }
            }else{
              result += filtration[X].toString();
            }
          }else{
            result += filtration[X].toString();
          }
        }
      }
    });
    
    return result.replace('|','');
  };



  window.nfforg.representationOfFilterSet = function(filtration) {
    var result = "";
    Object.keys(filtration).each(function(KEY) {
      var title = window.nfforg.mapFilterSectionIdToHumanText[KEY] || KEY;
      var descr = String(filtration[KEY]).replace(/,/g, ', ',true);
      result += "<div class=descr><span class=upper>"+title+"</span>: "+descr+"</div>";
    });
    return result;
  };


  // Special sub-sector list will come from:
  // window.nfforg.database.charts.arts_org_type.keyList

  window.nfforg.createFilterSection = function($rootdiv, sectionName, layout_alg, arrValues, curFilterDatabase) {

    if (!curFilterDatabase)
      curFilterDatabase = {};

    var $section = $("<div class='section "+layout_alg+"'><div class='hidden chart-name'>"+sectionName+"</div><div class=title>"
                     +
                     (window.nfforg.database.charts[sectionName]["title-mini"] || sectionName)
                     +
                     (
                       tooltips[sectionName] 
                         ? 
                         ("<div class=infotip href=# title='" + tooltips[sectionName] + "'></div>")
                         :
                         ""
                     )
                     +
                     "</div><div class='button-openclose'>&#x25B7</div></div>");
    $section.append($("<div class='list-active-values'/>"));
    $section.append($("<div class='no-active-values'>no filters selected</div>"));
    $section.append($("<div class='area-value-checkboxes'/>"));
    var $areachks = $section.find('.area-value-checkboxes');
    arrValues.each(function(X){
      var $thischkholder;
      $areachks.append($thischkholder = $("<form class=chkholder><input type=checkbox></input><span class=chktext>"+X+"</span></form>"));
      var thisValueIsChecked = false;
      if (curFilterDatabase[sectionName]) {
        if (curFilterDatabase[sectionName].find(X)) {
          thisValueIsChecked = true;
        }
      }
      if (X == "Arts/Culture/Humanities") 
        if (curFilterDatabase["arts_org_type"])
          if (curFilterDatabase["arts_org_type"].length > 0)
            thisValueIsChecked = false;
      if (thisValueIsChecked) {
        $thischkholder.addClass('checked');
        $thischkholder.find('input').prop('checked',true);
      }
      $thischkholder.addClass(curChkboxid.toString());
      mapChkboxidToLabel[curChkboxid] = encodeURI(X);
      mapLabelToChkboxid[encodeURI(X)] = curChkboxid;
      curChkboxid++;
      if (X == "Arts/Culture/Humanities") {
        $thischkholder.addClass('sector-arts');
        var $chkholderACH = $thischkholder;
        var $subarea = $("<div class=subarea-value-checkboxes/>");
        var keyListArts = window.nfforg.database.charts.arts_org_type.keyList.sortBy().exclude(/Other/);
        keyListArts.add("Other arts/culture/humanities");
        keyListArts.each(function(subX){
          $subarea.append($thischkholder = $("<form class='chkholder arts-subsector'><input type=checkbox></input><span class=chktext>"+subX+"</span></form>"));
          var doCheckMarkThisSubItem = thisValueIsChecked;
          if (curFilterDatabase['arts_org_type']) {
            if (curFilterDatabase['arts_org_type'].find(subX)) {
              doCheckMarkThisSubItem = true;
            }
          }
          if (doCheckMarkThisSubItem) {
            $subarea.addClass('opened');
            $thischkholder.addClass('checked');
            $thischkholder.find('input').prop('checked',true);
            if (!thisValueIsChecked)
              $chkholderACH.addClass('partial');
          }
          $thischkholder.addClass(curChkboxid.toString());
          mapChkboxidToLabel[curChkboxid] = encodeURI(subX);
          mapLabelToChkboxid[encodeURI(subX)] = curChkboxid;
          curChkboxid++;
        });
        $areachks.append($subarea);
      }
    });
    window.nfforg.displayListOfActiveFilterValues($section, curFilterDatabase);
    $section.appendTo($rootdiv);
  };




  window.nfforg.createTextboxFilterSection = function($rootdiv, sectionName, layout_alg, arrValues, curFilterDatabase) {

    if (!curFilterDatabase)
      curFilterDatabase = {};

    var $section = $("<div class='section "+layout_alg+"'><div class='hidden chart-name'>"+sectionName+"</div><div class=title>"
                     +
		     sectionName
                     +
                         ("<div class=infotip href=# title='Contact NFF for tips on how to use this textbox to filter by zipcode.'></div>")
                     +
                     "</div><div class='button-openclose'>&#x25B7</div></div>");
    $section.append($("<div class='textareaholder'><textarea/></div>"));
    var $areachks = $section.find('textarea');
    if (curFilterDatabase.zip) {
      $areachks.text(curFilterDatabase.zip[0]);
    }
    $section.appendTo($rootdiv);
  };





  window.nfforg.createFilterGUI = function($rootdiv, curFiltration) {
//    try {
    if ($rootdiv.find('.section').length < 1) {
      window.nfforg.createFilterSection($rootdiv, "state", "span", 
                                        Object.keys(window.nfforg.database.charts.state.valueSet).sortBy().exclude("Other").include("Other"),
                                       curFiltration);
      window.nfforg.createFilterSection($rootdiv, "org_type", "div",
                                        Object.keys(window.nfforg.database.charts.org_type.valueSet).sortBy().exclude("Other").exclude('Unknown/Unclassified').include("Other"),
                                       curFiltration);

      window.nfforg.createFilterSection($rootdiv, "opp_exp_max", "div",
                                        window.nfforg.database.charts.opp_exp_max.key_order,
                                       curFiltration);

      window.nfforg.createFilterSection($rootdiv, "lifeline", "span",
                                        [ "Yes", "No" ],
                                       curFiltration);

      window.nfforg.createFilterSection($rootdiv, "lmi_serve_expanded", "div",
                                        window.nfforg.database.charts.lmi_serve_expanded.key_order.reverse(),
                                       curFiltration);

      window.nfforg.createFilterSection($rootdiv, "lmi_loc", "span",
                                        [ "Yes", "No" ],
                                       curFiltration);

      window.nfforg.createFilterSection($rootdiv, "year_founded_range", "div",
                                        window.nfforg.database.charts.year_founded_range.key_order,
                                       curFiltration);

      if (false) {
        window.nfforg.createFilterSection($rootdiv, "employee_count_fte_range", "div",
                                        window.nfforg.database.charts.employee_count_fte_range.key_order,
                                       curFiltration);
        window.nfforg.createFilterSection($rootdiv, "employee_count_pte_range", "div",
                                        window.nfforg.database.charts.employee_count_pte_range.key_order,
                                       curFiltration);
      }

      if (window.nfforg.enablezipfilter)
        window.nfforg.createTextboxFilterSection($rootdiv, "zip", "div", null, curFiltration);

      setTimeout(function(){

        $('#filter-area').addClass('ready');

	      // SET UP TOOLTIPS
	      //
	      // IMPORTANT NOTE ABOUT TOOLTIPS:  we are NOT implementing the show-on-hover tooltips via
	      // the feature of browsers that automatically shows a "title" on any ANCHOR tag.
	      // We are TRULY relying on qtip to provide that functionality. 
	      $('#filter-area .infotip').qtip({position:{my: 'top right', at: 'bottom left'}});
	      $('#filter-area .tab.compare').qtip({
	        content: "<p>Now that you've worked with the analyzer's filtering feature, you might want to try out our comparison features.<p>Click on the 'Compare' tab to compare a filtered subset of respondents against the entire pool of respondents.  Just use the filtering criteria to specify the subset that you want to compare against the whole survey pool.",
	        style:{
		        tip: {width: 30, height: 30},
		        classes:'qtip-market-compare'
	        },
	        show:{
            event: false, // disable show-on-hover; this will be shown programmatically
            modal: {
              on: true
            }
          },
	        position:{
            my: 'top right', 
            at: 'bottom left',
            adjust: {
              x: 45,
              y: -12
            }
          }});
	      window.nfforg.apiQtipMarketingComparison = 
          ($.cookie('alreadyTriedToUpsellToCompareFeature')) ? null : ($('#filter-area .tab.compare').qtip('api'));
      }, 2000);
    }
//    }
//    catch(e){
//      console.log("FILTER SECTION could not be constructed -- exception occurred in filter.js");
//    }
  };
