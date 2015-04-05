$(function() {  

  var BLUE = window.nfforg.colors.Blue2;
  var opacityGhost = 0.7;

  function formatPercDisplay(percValue) {
    var retval =  String(Math.round(percValue*100)) + "%";
    return retval;
  }


  window.nfforg.renderSlopegraph = function($holder, data, preEnumMappings, yCoordFudgings, chartName) {

    function mapEnumToEnglish(val) {
      var key = val.replace('acted_','').replace('planned_','') || undefined;
      var catDisplay = window.nfforg.MAPenumToEnglish[chartName][key] || undefined;
      if (!catDisplay) {
        key = preEnumMappings[key];
        catDisplay = window.nfforg.MAPenumToEnglish[chartName][key];
      }
      return catDisplay;
    };


    
    var config = {
      padding: 28,
      heightYearHeader: 20,
      heightInterStrip: 0,
      heightStrip: 550,
      widthYearLabel: 23,
      widthCategoryLabels: 288,
      widthPercLabels: 40,
      radiusDots: 2,
      fontsizeCategory: 12,
      fontsizePerc: 14,

      yearStart: 2009  // This really should be dynamic?
    };


    

    var widthPaper = $holder.width();   // not working -- giving back entire width of the brow win
    widthPaper = 692;  // hardwire to NFF standard


    var widthLinePath = widthPaper - config.padding*2 - config.widthCategoryLabels - 2*config.widthPercLabels;
    var xStart = config.padding + config.widthCategoryLabels + config.widthPercLabels;







    // Goal is to mine the data to summarize in this way:
    // summary = { "categoryname": [ 51, 35, 42, 52, 42 ], 
    //             "categoryname": 

    var summary = {};

    var setYears = {};

    Object.keys(data).each(function(CATEGORY){
      summary[CATEGORY] = [];
      data[CATEGORY][0].data.children.each(function(SPECIFICYEAR){
        var numYear = parseInt(SPECIFICYEAR.node.key);
        if (numYear >= config.yearStart) {
          summary[CATEGORY].push(SPECIFICYEAR.children[0].node.perc);
          setYears[numYear] = true;
        }
      });
      if (summary[CATEGORY].exclude(0).count() < 2) 
        delete summary[CATEGORY];
    });

    var yearOrderedList = Object.keys(setYears).sortBy();

    // SORT THE DATA ROWS BY 2014 VALUES *DESCENDING*
    var keysUnsorted = Object.keys(summary).clone();
    var keysSorted = keysUnsorted.sortBy(function(KEY){
      return summary[KEY].last();
    }, true);



    var numLineSegments;



    // first we need to find out: what is the maximumally-volatile (max value of (max minus min)) found in all categories?
    var idx = 0;
    var ranges = {};
    var max = 0;
    var min = 99999;
    keysSorted.each(function(CATEGORY){
      // Computation of the part of the percentage range that has data and how it will be mapped to the "strip"'s height
      var arrValues = summary[CATEGORY];
      min = Math.min(min,arrValues.exclude(0).min());
      max = Math.max(max,arrValues.max());
      numLineSegments = arrValues.count() - 1;
    });

    var range = max-min;
    keysSorted.each(function(CATEGORY){
      ranges[CATEGORY] = range;
    });


    var maxRangeSize_Key = keysSorted[0];
    var maxRangeSize = range;

    var widthXaxisPerYear = widthLinePath / numLineSegments;


    var heightPaper = config.padding*2 + config.heightYearHeader + config.heightStrip + 50;

    var paper = Raphael($holder.get(0), widthPaper, heightPaper);
    $holder.data('raphael-paper',paper);
    $holder.addClass('raphael-paper-is-attached');

    var amountStripToUseInPerc = 1;
    var paddingVert = 0.5 * ( config.heightStrip - (config.heightStrip * amountStripToUseInPerc) );

    var funcMapperY = function(_yValue) {
      var yValue = Math.round(_yValue*100);
      var pixelAdjust = yCoordFudgings[yValue] || 0;
      yValue = yValue / 100;
      // First we do this assuming X axis is bottom of coord system 
      var yConverted = paddingVert + ((yValue-min)/(max-min))*amountStripToUseInPerc*config.heightStrip;
      // NEXT DO A FLIP SINCE RAPHAEL HAS X AXIS AT TOP, AND RAISE SINCE THE STRIP'S Y VALUES GO FROM -halfstripheight TO +halfstripheight
      yConverted = config.heightStrip - yConverted - (config.heightStrip/2);
      return yConverted - pixelAdjust;
    };


    var metarowset = paper.set();

    idxCat = 0;
    keysSorted.each(function(CATEGORY){
      idxCat++;
      // Compute the normalized graph (crammed into the strip)
      var arrValues = summary[CATEGORY];
      var valueFirstNonzero = arrValues.exclude(0).first();
      var min = arrValues.exclude(0).min();
      var max = arrValues.max();

      var metarow = paper.set();
      var row = paper.set();  // really only for the text elements in a row

      var debugme = 3;
      var strPath = ""
      var idx;

      var catDisplay = mapEnumToEnglish(CATEGORY);

      var nudgerStart = 0;
      var nudgerEnd = 0;
      var yFudgeThisCat = yCoordFudgings[CATEGORY];
      if (yFudgeThisCat) {
        nudgerStart = yFudgeThisCat.start || 0;
        nudgerEnd = yFudgeThisCat.end || 0;
      }

      var extraToddYNudge = catDisplay.has('\n') ? 5 : -3;
      row.push(
        // Left side: name of category
        paper.text(config.widthCategoryLabels, 
                   funcMapperY(valueFirstNonzero)-nudgerStart+extraToddYNudge, catDisplay).attr({'text-anchor': 'end', 'font-size': config.fontsizeCategory }).transform("t20,20"),
        // End percentage
        paper.text(widthPaper - config.padding - config.widthPercLabels + 7,
                   funcMapperY(arrValues.last())-nudgerEnd, 
                   formatPercDisplay(arrValues.last())).attr({'text-anchor': 'start', 'font-size': config.fontsizePerc })
        //,
        // paper.circle(xStart, funcMapperY(arrValues[0]), config.radiusDots).attr({fill:"black", "stroke-opacity":0})
      );



      var interimPercentageDisplay = paper.set();


      for (idx=0; idx<=numLineSegments; idx++) {
        var xx = xStart+idx*widthXaxisPerYear;
        var yy = funcMapperY(arrValues[idx]);
        if (arrValues[idx] > 0) {
          // Add a percentage label unless it's the very last one (rightmost) which already exists.
          if (idx<numLineSegments) {
            var nodePercDisp = 
                paper.text(xx-4,
                           yy-nudgerStart, 
                           formatPercDisplay(arrValues[idx])).attr({'text-anchor': 'end', 'font-size': config.fontsizePerc });
            if (!strPath) {
              row.push(nodePercDisp);
            }else{
              nodePercDisp.attr({'text-anchor':'middle'});
              var bbox = nodePercDisp.getBBox();  // x y x2 y2 width height
              interimPercentageDisplay.push(
                paper.rect(bbox.x-2, bbox.y-2, bbox.width+4, bbox.height+4, 4).attr({fill:"white", stroke:"white"})
              );
              nodePercDisp.attr({fill:BLUE});
              nodePercDisp.toFront();
              interimPercentageDisplay.push(nodePercDisp);
            }
          }
          strPath += Raphael.format("{0}{1},{2} ", 
                                    strPath?"L":"M",
                                    xx, strPath?yy-nudgerEnd:yy-nudgerStart);

          //row.push(
          //paper.circle(xx, yy, config.radiusDots).attr({fill:"black", "stroke-opacity":0})
          //);
        }
      }

      var mypath = paper.path(strPath).attr({"stroke-width": 2, "stroke": "black"});
      mypath.toBack();
      var mypathID = mypath.id;

      metarow.push(row);
      metarow.push(mypath);
      metarow.push(mypath.glow({color:"white"}));
      metarow.push(interimPercentageDisplay);

      metarowset.push(row);
      metarowset.push(mypath);

      row.attr({opacity: 0.6, cursor: "default"});
      mypath.attr({opacity: 0.6, cursor: "default"});
      interimPercentageDisplay.attr({opacity: 0, cursor:"default"});

      row.glow({});

      metarow.hover(
        // IN
        function(){
          // hovertip.remove();
          metarowset.attr({opacity: opacityGhost});
          metarow.attr({opacity: 1});
          interimPercentageDisplay.attr({opacity: 1});
          row.attr({fill: BLUE});
          mypath.attr({stroke: BLUE});
          row.toFront();
          mypath.toFront();
          interimPercentageDisplay.toFront();
        },
        // OUT
        function(){
          metarowset.attr({opacity: 0.6});
          interimPercentageDisplay.attr({opacity: 0});
          row.attr({fill: "black"});
          mypath.attr({stroke: "black"});
        }
      );

      // !!!!  WE ARE MERGING THE COORD SYSTEMS
      idxCat = 1;
      metarow.transform("t0," + String(config.heightYearHeader + 0.5*(config.heightStrip) + 50));
    });


    // Finally, draw the year headers
    var header = paper.set();
    var formatYear = {'font-size': config.fontsizePerc-1};
    header.push(
      paper.text(0, 0, yearOrderedList[0]).attr(formatYear).attr({'text-anchor':'middle'}),
      paper.path(Raphael.format("M{0},10 L{1},10", 
                                0-config.widthPercLabels, 
                                widthLinePath+config.widthPercLabels)).attr({stroke: "#CCCCCC"})
    );
    var intyear;
    for (intyear=yearOrderedList[1]; intyear<=yearOrderedList.last(); intyear++) {
      var xx = 0 + (intyear-yearOrderedList[0])*widthXaxisPerYear;
      header.push(
        paper.text(xx, 0, String(intyear)).attr(formatYear)
      );
    }
    var hovertip = 
        paper.text(135, 20, ""/*TIP: Hover your cursor over a line or action to see more detail*/).attr({fill: BLUE, 'font-size': 12});
    header.push(hovertip);
    $holder.data('raphael-remove-for-print', hovertip);
    header.transform(Raphael.format("t{0},{1}", 
                                    config.padding + config.widthCategoryLabels + config.widthPercLabels,
                                    config.heightYearHeader));
  };


});
