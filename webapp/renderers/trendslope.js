(function() {

  /*
    options.enableBarLabels boolean
    options.enableAxisLabels boolean
    options.funcAppendToRendering function
    options.extraHeight int
   */
  window.nfforg.renderers.trendslope = function($root, chart, options) {

    // $root.css('height', window.nfforg.px(900));

    window.nfforg.renderSlopegraph($root, chart.data, chart.preEnumMappings, chart.yCoordFudgings, chart.chartName);
  };

})();
