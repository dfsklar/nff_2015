"use strict";

(function() {

  var boolUseColorGradientsOnValueDescending = false

  var orangeNFF = window.nfforg.orangeNFF;

  window.nfforg.filtrationCurrent = {};
  window.nfforg.filtrationForCompareCurrent = {};

  function moveKeyToEnd(keyList, theKey) {
    if (keyList.find(theKey)) {
      keyList = keyList.exclude(theKey).include(theKey);
      }
    return keyList;
  }
    

  window.nfforg.filterCategories = 
    ["state","org_type","lifeline","opp_exp_max","lmi_loc","lmi_serve_expanded","year_founded_range","zip"];

  var hasValueMassageBeenDone = false;

/*

We now take the unindexed database and perform
processing to index/preprocess it for faster
runtime processing.  When the dust has settled
on the data, the indexed version of the DB will
be cached and the client will receive the
already-massaged version of the DB *FOR THE
UNFILTERED CASE*.  So this JS-based indexing 
will not be occurring on the live app *FOR
THE UNFILTERED CASE*.  However this indexer
is used at runtime when filtering is applied.

*/

  // STEP 1:  COMPUTATION OF COMPLETE SET OF
  //    RESPONSE VALUES FOR EACH QUESTION.
  //    It will likely be the case that
  //    this will come in via the unindexed
  //    chart as soon as we get the NFF data,
  //    because the order of x-axis values
  //    is probably going to be "survey order".
  //
  // STEP 2:  COMPUTATION OF Y VALUES FOR
  //    THE CASE OF NO FILTERING.
  //

  var hasArtsSubsectorMassageBeenDone = false;
  
  var massageArtsSubsector = function() {

    hasArtsSubsectorMassageBeenDone = true;

    alert("MAS 1");

    // ARTS
    var cnt = 0;
    var DB1 = window.nfforg.database_unindexed.respondents.each(function(X){
      if (X["org_type"] == "Arts, Culture, and Humanities") {
        if ( ! (X["arts_org_type"]) ) {
          X["arts_org_type"] = "Unidentified";
        }
      }
      if (X["arts_org_type"]) {
        if ( ! (X["org_type"] == "Arts, Culture, and Humanities") ) {
          // alert("Fixing");
          delete X["arts_org_type"];
        }
      }
      if (X["arts_aud_"]) {
        if ( ! (X["arts_aud_rslts_"]) ) {
          // alert("Fixing");
          cnt++;
          X["arts_aud_rslts_"] = [ "noanswer" ];
        }
      }
    });

    alert("MAS 2");

    // DO NOT HAVE A LOAN
    var DB2 = window.nfforg.database_unindexed.respondents.each(function(X){
      if (X["loan_yn"] == "No") {
        if ( ! (X["loan_no_"]) ) {
          X["loan_no_"] = [ "unidentified" ];
          if ((X["loan_want_"])) {
            console.log("We did have some people who didn't say why but did say what they want it for.");
          }
        }
        // The loan_want question was only asked to people who
        // did not say "I do not need one" and did not say
        // "I do not know how to use one".
        if ( ! (X["loan_want_"]) ) {
          var should_have_answered = true;
          if (X["loan_no_"].find("unsure_use"))
            should_have_answered = false;
          if (X["loan_no_"].find("need"))
            should_have_answered = false;
          if (should_have_answered) {
            X["loan_want_"] = [ "unidentified" ];
          }
        }
      }
      if (X["loan_yn"] == "Yes") {
        if ( ! (X["loan_yes_"]) ) {
          X["loan_yes_"] = [ "unidentified" ];
        }
      }
    });

    alert("MAS 3");

      return;
  };


  // Typically, in non-compare mode, the param will be sent:  DB.charts
  window.nfforg.indexAndFilterDatabase = function(chartArrayToModify_base, chartArrayToModify_key, filtration) {

    var DB = window.nfforg.database_unindexed;

      alert(DB.length);

    if (!hasArtsSubsectorMassageBeenDone) {
      alert("about to massage arts sector");
      massageArtsSubsector();
      alert("done from massage arts sector");
    }

    window.nfforg.database = DB;

    var useCacheIfPossible = true;

    var markChartsAsFiltered = false;

    var chartArrayToModify;

      alert("Next alert should be false when first seen");
      alert(!!chartArrayToModify_base);
    if (!chartArrayToModify_base) {
      alert("INITIALIZING THE CLONEABLE CHART SET");
      console.log("INITIALIZING THE CLONEABLE CHART SET");
      chartArrayToModify = window.nfforg.database.charts;
      useCacheIfPossible = false;
      if (Object.size(filtration) > 0) {
        alert("UNEXPECTED DAMAGE TO THE VANILLA CHARTS");
        console.log("UNEXPECTED DAMAGE TO THE VANILLA CHARTS");
      }
    }
    else {
      chartArrayToModify_base[chartArrayToModify_key] = Object.clone(window.nfforg.database.charts, true);
      chartArrayToModify = chartArrayToModify_base[chartArrayToModify_key];
    }

    var respondentsFiltered = DB.respondents;

    if (useCacheIfPossible && (Object.size(filtration)==0)) {
      // No filtration is desired, and we are allowed to simply
      // use the cache!
      alert("USING CACHE");
      console.log("USING CACHE");
    }

    else {

      // THIS IS A GIANT ELSE CLAUSE!!!  WARNING!

      var legalZipcodes = (filtration && filtration.zip && filtration.zip[0]) ? window.nfforg.parseNumericRange(filtration.zip[0]) : null;

	alert("ELSE 1");

      if (filtration) {
        respondentsFiltered = [];
        markChartsAsFiltered = true;
	var countOrgs = DB.respondents.length;
	var idxThisOrg = 0;
        DB.respondents.each(function(org){
  	  idxThisOrg++;
	  window.nfforg.updateProgressBar(idxThisOrg, countOrgs);
          var ok = true;
          window.nfforg.filterCategories.each(function(X){
            if (filtration[X]) {
              if (X == "zip") {
                // We have a zipcode filter in effect!
                if (org[X]) {
                  if (legalZipcodes) {
                    if (0 > legalZipcodes.indexOf(parseInt(org[X]))) {
                      ok = false;
                    }
                  }
                }else{
                  ok = false;  // Filter out any organization with NO zipcode info
                }
              }
              else if (filtration[X].length > 0) {
                if (! (filtration[X].some(org[X])))
                  ok = false;
              }else{
                delete filtration[X];
              }
            }
          });

          if (org["org_type"])
            if (org["org_type"].has("Arts"))
              ["arts_org_type"].each(function(X){
                if (filtration[X]) {
                  if (filtration[X].length > 0) {
                    if (! (filtration[X].some(org[X])))
                      ok = false;
                  }else{
                    delete filtration[X];
                  }
                }
              });

          if (ok) 
            respondentsFiltered.add(org);
        });
      }



      $('#filtration-too-tight').removeClass('visible');


      if (respondentsFiltered.length == 0) {

        $('#viz-area').empty();
        $('#filtration-too-tight').addClass('visible');

      }else{

	var countOrgs = Object.keys(chartArrayToModify).length;
	var idxThisOrg = 0;
        Object.keys(chartArrayToModify).each(function(chartname){
  	  idxThisOrg++;
	  window.nfforg.updateProgressBar(idxThisOrg, countOrgs);
          var chart = chartArrayToModify[chartname];
          chart.yValueTotal = 0;
          chart.valueSet = {};
          chart.ID = chartname;
          chart.wasFiltered = markChartsAsFiltered;

          if (chart.renderer == "actions_planned_taken") {
            // SPECIAL ACCUMULATOR FOR THE ACTIONS-PLANNED/TAKEN DATA TYPE
            chart.valueSet.last = {};
            chart.valueSet.next = {};
            respondentsFiltered.each(function(org){
              if (chart["denominator_required_field"]) {
                if (!(org[chart["denominator_required_field"]])) {
                  // This is a respondent who should not even be considered at all.
                  // She made it through the "regular" filter but this extra
                  // chart-specific filtration caught her.
                  return;
                }else{
                  // This is a respondent who did provide an answer for the required dependency field,
                  // but is it possible her reply included a value that is considered "negative" meaning
                  // its presence disqualifies this respondent?
                  if (chart["denominator_required_field__negative_values"]) {
                    var shouldDisqual = false;
                    chart["denominator_required_field__negative_values"].each(function(TRY){
                      if (org[chart["denominator_required_field"]].find(TRY)) 
                        shouldDisqual = true;
                    });
                    if (shouldDisqual) {
                      alert("DISQUAL");
                      return;
                    }
                  }
                }
              }
              chart.yValueTotal += 1;
              if (org[chartname]) {
                ['last','next'].each(function(timeframe){
                  org[chartname][timeframe].each(function(action){
                    if (chart.valueSet[timeframe][action])
                      chart.valueSet[timeframe][action] += 1;
                    else
                      chart.valueSet[timeframe][action] = 1;
                  });
                });
              }
            });
          }
          else if (chart.renderer == "one_or_more") {
            respondentsFiltered.each(function(org){
              if (chart["denominator_required_field"]) {
                if (!(org[chart["denominator_required_field"]])) {
                  // This is a respondent who should not even be considered at all.
                  // She made it through the "regular" filter but this extra
                  // chart-specific filtration caught her.
                  return;
                }
                else{
                  // This is a respondent who did provide an answer for the required dependency field,
                  // but is it possible her reply included a value that is considered "negative" meaning
                  // its presence disqualifies this respondent?
                  if (chart["denominator_required_field__negative_values"]) {
                    var shouldDisqual = false;
                    chart["denominator_required_field__negative_values"].each(function(TRY){
                      if ([].add(org[chart["denominator_required_field"]]).find(TRY)) 
                        shouldDisqual = true;
                    });
                    if (shouldDisqual) {
                      return;
                    }
                  }
                }
              }
              chart.yValueTotal += 1;
              if (org[chartname]) {
                if (!hasValueMassageBeenDone) {
                  if (chart.value_massager) {
                    org[chartname] = org[chartname].map(chart.value_massager, chart);
                  }
                }
                org[chartname].each(function(action){
                  if (chart.valueSet[action])
                    chart.valueSet[action] += 1;
                  else
                    chart.valueSet[action] = 1;
                });
              }
            });
          }else{
            // REGULAR ACCUMULATOR
            respondentsFiltered.each(function(org){
              if (chart["denominator_required_field"]) {
                if (!(org[chart["denominator_required_field"]])) {
                  // This is a respondent who should not even be considered at all.
                  // She made it through the "regular" filter but this extra
                  // chart-specific filtration caught her.
                  return;
                }
                else{
                  // This is a respondent who did provide an answer for the required dependency field,
                  // but is it possible her reply included a value that is considered "negative" meaning
                  // its presence disqualifies this respondent?
                  if (chart["denominator_required_field__negative_values"]) {
                    var shouldDisqual = false;
                    chart["denominator_required_field__negative_values"].each(function(TRY){
                      if ([].add(org[chart["denominator_required_field"]]).find(TRY)) 
                        shouldDisqual = true;
                    });
                    if (shouldDisqual) {
                      return;
                    }
                  }
                }
              }
              if (!hasValueMassageBeenDone) {
                if (chart.value_massager) {
                  if (org[chartname])
                    org[chartname] = chart.value_massager(org[chartname]);
                }
              }
              if (org[chartname]) {
                chart.yValueTotal += 1;
                var val = org[chartname];
                // Steps 1 and 2
                if (chart.valueSet[val])
                  chart.valueSet[val] += 1;
                else
                  chart.valueSet[val] = 1;
              }
            });
          }


          // Now create the highcharts-compatible "series.data" object
          chart.series = [];

          switch (chart.renderer) {

          case "actions_planned_taken":
            // This old technique was all about showing ONLY the bars with non-zero values and the order was arbitrary:
            // chart.keyList = Object.keys(chart.valueSet.last);
            // chart.keyList = chart.keyList.union(Object.keys(chart.valueSet.next));
            //
            // New technique is to use the dictated order in the ENUM mapping file:
            chart.keyList = Object.keys(window.nfforg.MAPenumToEnglish[chart.ID]);
            //
            ['next','last'].each(function(timeframe){
	      var hcseries = {name:timeframe, data:[]};
              chart.keyList.each(function(xvalue){
                var yVal = chart.valueSet[timeframe][xvalue];
                if (undefined == yVal)
                  yVal = 0;
                hcseries.data.push( yVal );
              });
              chart.series.push(hcseries);
            });
            break;

          case "stacked_single_bar":
            chart.series = [];
            chart.keyList = 
              chart.key_order
              ?
              chart.key_order
              :
              Object.keys(chart.valueSet);
            chart.keyList.each(function(xvalue){
              if (undefined == chart.valueSet[xvalue])
                chart.valueSet[xvalue] = 0;
              chart.series.push( { name: xvalue, 
                                   data: [ chart.valueSet[xvalue] ], 
                                   color: (chart.color_by_key ? (chart.color_by_key[xvalue]) : undefined) } );
            });
            break;

            // This is what's used for the most common case: "bar"
          default:
            if (chartname == "lmi_") {
              var debugme = 3;
            }
            chart.series.push({});
            var hcdata = chart.series[0].data = [];
            chart.keyList = chart.key_order;
            if (! chart.keyList) {
              chart.keyList = Object.keys(chart.valueSet).sortBy(null);
              chart.keyList = moveKeyToEnd(chart.keyList, "Other");
              chart.keyList = moveKeyToEnd(chart.keyList, "Other arts/culture/humanities");
              chart.keyList = moveKeyToEnd(chart.keyList, "Unidentified");
            }
            chart.keyList.each(function(xvalue){
              if (undefined == chart.valueSet[xvalue])
                chart.valueSet[xvalue] = 0;
              if ( ! ((chart.valueSet[xvalue]==0) && chart["hide-zeros"]) )
                hcdata.push( { 
                  name: window.nfforg.convertEnumToEnglish(chartname, xvalue), 
                  y: 
                  (
                    (chart["show-percentage-only"]) 
                      ?
                      Math.round(100*(chart.valueSet[xvalue] / chart.yValueTotal))
                      :
                      chart.valueSet[xvalue]
                  )
                  ,
                  color: (chart.color_by_key ? (chart.color_by_key[xvalue]) : undefined)
                } );
            });
          }

          // SORTING
          if (chart.sort_technique == "value_desc") {
            // THIS IS NO LONGER SUPPORTED PER NFF REQUEST
            chart.series[0].data = chart.series[0].data.sortBy(function(X){return X.y}, true/*descending*/);
            // Gradient-orange shading to reduce saturation slightly as you go from top-sorted item to bottom-sorted item
            var colorStart = chroma(window.nfforg.colors.Blue2);
            var percLighten = 0;
            chart.series[0].data.each(function(X){
              X.color = colorStart.hex();
              if ( (percLighten != 0)  && boolUseColorGradientsOnValueDescending)
                X.color = colorStart.brighten(percLighten).hex();
              percLighten += 1.5;
            });
          }
          else if (chart.sort_technique == "name_asc") {
            chart.series[0].data = chart.series[0].data.sortBy(function(X){
              return X.name;
            }, false/*i.e., ascending*/);
            // Gradient-orange shading to reduce saturation slightly as you go from top-sorted item to bottom-sorted item
            var colorStart = chroma(window.nfforg.colors.Blue2);
            var percLighten = 0;
            chart.series[0].data.each(function(X){
              X.color = colorStart.hex();
              if ( (percLighten != 0)  && boolUseColorGradientsOnValueDescending)
                X.color = colorStart.brighten(percLighten).hex();
              percLighten += 1.5;
            });
          }
          else if (chart.color_spec) {
            var colorStart = chart.color_spec.color_start;
            var percLighten = 0;
            chart.series[0].data.each(function(X){
              if (percLighten == 0) 
                X.color = colorStart.hex();
              else
                X.color = colorStart.brighten(percLighten).hex();
              percLighten += chart.color_spec.percentage_brighten_per_bar;
            });
          }
          else {
            chart.series[0].data.each(function(X){
	      if (typeof(X) != "number")	
              if (X.color === undefined)
                X.color = chroma(window.nfforg.colors.Blue2).hex();
            });
          }
        });
        
      }

      hasValueMassageBeenDone = true;

    }


    $('#viz-area').removeClass('invisible');
    $('.form.sidebar').removeClass('computing');
    if (Object.size(filtration) > 0) {
      $('.form.sidebar.active').addClass('clean');
    }else{
      $('.form.sidebar.active').removeClass('clean');
    }



    // FILTRATION REMINDER
    if (Object.size(filtration)) {
      $('.filtration-active-reminder').each(function(){
        $(this).find('.dynamic-area').empty();
        $(this).addClass('opened');
        var dyna = $(this).find('.dynamic-area');
        dyna.append($(window.nfforg.representationOfFilterSet(filtration)));
      });
    }else{
      $('.filtration-active-reminder').removeClass('opened');
    }

    return (respondentsFiltered.length > 0);
  };


})();
