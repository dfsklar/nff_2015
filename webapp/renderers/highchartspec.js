"use strict";

(function() {

  /*
    options.enableBarLabels boolean
    options.enableAxisLabels boolean
    options.funcAppendToRendering function
    options.extraHeight int
   */
  window.nfforg.renderers.highchartspec = function($root, chart, options) {

    options = options || {};

    Highcharts.setOptions({
      chart: {
        animation: false,
        backgroundColor: "white",
        style: {
          fontFamily: 'Arial', //(options.stdfont ? 'Arial' : 'Roboto Condensed'),
          fontSize: "12px" // (options.hires ? "20px" : "10px")
        }
      }
    });


    $root.css('height', window.nfforg.px(300));

    if (chart.colorRanges) {
      var countSeries = chart.chartspec.series.length - 1;
      var idx=-1;
      chart.chartspec.series.each(function(SERIES){
        idx++;
        SERIES.color = chart.colorRanges[idx%2](idx/countSeries).hex();
      });
    }
    $root.highcharts(chart.chartspec);
  };

})();
