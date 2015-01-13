(function() {

  // This type of barset joins several graphs together
  // into a single bar graph (only ONE coord sys) 
  // with each "category" being a
  // cluster of bars.

  // Mandatory:  chart.otherCharts array of charts
  window.nfforg.renderers.barset2 = function($root, chart, options) {

    var colorRanges = 
        [
          chroma.scale([window.nfforg.colors.Blue3, window.nfforg.colors.Blue1]),
          chroma.scale([chroma("#e2e3de"), window.nfforg.colors.DarkerGray])
        ];

    options = options || {};

    options.legend = { enabled: true, reversed: true, verticalAlign: "top" };

    if (chart.series.count() == 1) {

      chart.series[0].name = chart["title-subchart"];
      chart.series[0].color = colorRanges[0](0).hex();

      var subchartCount = chart.otherCharts.count() + 1;

      // Bring over the series data from all the other charts that are being merged.
      var idx = 0;
      chart.otherCharts.each(function(nameOtherChart){
        idx++;
        var colorThisSubchart = colorRanges[idx%2](idx/subchartCount).hex();
        var otherChart = options.charthash[nameOtherChart];
        var seriesClone = Object.clone(otherChart.series[0], true);
        seriesClone.name = otherChart["title-subchart"];
        seriesClone.color = colorThisSubchart;
        chart.series.push(seriesClone);
      });

      // Remove all colors from the series data
      chart.series.each(function(SERIES){
        SERIES.data.each(function(X){
          delete X["color"];
        });
      });

    }

    //options.extraHeight = -50;

    window.nfforg.renderers.bar($root, chart, options);
  };

})();
