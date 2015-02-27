$(function() {

  window.nfforg.mapFilterSectionIdToHumanText = {
    "state": "State",
    "org_type": "Sector",
    //"opp_exp_max": "Operating expense",
    //"lifeline": "Lifeline",
    //"lmi_serve_expanded": "Serves low-income communities",
    //"lmi_loc": "Located in low-income communities",
    //"year_founded_range": "Year founded",
    //"employee_count_fte_range": "# full-time employees",
    //"employee_count_pte_range": "# part-time employees"
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
        filtset[arrCriteria[0]] = arrCriteria[1].split(",");
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
      var title = window.nfforg.mapFilterSectionIdToHumanText[KEY];
      var descr = String(filtration[KEY]);
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
                         ("<a class=infotip href=# title='" + tooltips[sectionName] + "'></a>")
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





  window.nfforg.createFilterGUI = function($rootdiv, curFiltration) {
    try {
    if ($rootdiv.find('.section').length < 1) {
      window.nfforg.createFilterSection($rootdiv, "state", "span", 
                                        Object.keys(window.nfforg.database.charts.state.valueSet).sortBy().exclude("Other").include("Other"),
                                       curFiltration);
      window.nfforg.createFilterSection($rootdiv, "org_type", "div",
                                        Object.keys(window.nfforg.database.charts.org_type.valueSet).sortBy().exclude("Other").exclude('Unknown/Unclassified').include("Other").include("Unknown/Unclassified"),
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

      setTimeout(function(){
        $('#filter-area').addClass('ready');
      }, 2000);
    }
    }
    catch(e){}
  };


});


