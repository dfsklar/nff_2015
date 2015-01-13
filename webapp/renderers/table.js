(function() {

  // Must admit: this is currently only used for the table of STATE abbreviations
  // and I'm admittedly hardwiring this renderer to handle that special case:
  // sorted alphabetically with exception of "Other" which I move to the end.

  window.nfforg.renderers.table = function($root, chart) {

    var doNeedOtherCategory = (chart.valueSet['Other']);

    // SORTING
    var keys = Object.keys(chart.valueSet).remove('Other').sortBy();
    if (doNeedOtherCategory)
      keys = keys.add("Other");

    // RAPHAEL-BASED DRAWING
    var paper = Raphael($root.get(0), $root.width(), $root.height());

    var config = {
      width: 55,
      height: 18,
      numRows: Math.ceil(keys.count()/3),
      paddingRow: 60
    };

    var idxRow = -1;
    var idxCol = -1;

    keys.each(function(x){
      idxRow++;
      if (idxRow >= config.numRows) {
        idxRow = 0;
        idxCol++;
      }
      var xStart = 75 + (idxCol+1)*config.width + (idxCol)*config.paddingRow;
      paper.text (xStart,
                  20+idxRow*config.height, x).attr({"font-size": 12, "text-anchor":"start"});
      paper.text (xStart + config.width,
                  20+idxRow*config.height, 
                  chart.valueSet[x]).attr({"font-size": 12, "text-anchor":"end"});
    });

    return;

    keys.each(function(x){
      $container.append("<div class=valblock><table><tr><td class=key>"+x+"</td><td class=val>"+chart.valueSet[x]+"</td></tr></table></div>");
    });
  }


})();
