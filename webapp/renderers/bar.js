(function() {

  /*
    options.enableBarLabels boolean
    options.enableAxisLabels boolean
    options.funcAppendToRendering function
    options.extraHeight int
    options.legend  object
    options.calculateOnly boolean
   */
  window.nfforg.renderers.bar = function($root, chart, options) {

    options = options || {};

    if (options.enableBarLabels === undefined)
      options.enableBarLabels = true;
    if (options.enableAxisLabels === undefined)
      options.enableAxisLabels = true;
    if (options.extraHeight === undefined)
      options.extraHeight = 10;

    var barWidth = options.hires ? 40 : 25;

    var textStyle =  {
      fontFamily: (options.stdfont ? 'Arial' : 'Roboto Condensed'),
      fontSize: (options.hires ? "20px" : "12px")
    };

    Highcharts.setOptions({
      chart: {
        animation: false,
        backgroundColor: "rgba(255,255,255,0.002)",
        style: {
          fontFamily: 'Arial', //(options.stdfont ? 'Arial' : 'Roboto Condensed'),
          fontSize: "100px" // (options.hires ? "20px" : "10px")
        }
      }
    });

    chart.chart = {
      type: 'bar', 
      spacingLeft: 10, spacingRight: 15, marginRight: 15, spacingBottom: 15+options.extraHeight
    };

    if (chart.highchart_formatting) {
      if (chart.highchart_formatting.chart) {
        Object.merge(chart.chart, chart.highchart_formatting.chart);
        if (chart.chart.marginLeft && options.hires)
          chart.chart.marginLeft *= 2;
      }
    }

    chart.legend = (options.legend==undefined) ? {enabled:false} : options.legend;
    chart.credits = { enabled: false };
    chart.xAxis = { gridLineWidth: 0, lineWidth: 0, 
                    tickWidth: 0, 
                    categories: chart.keyList.map(function(X){
                      return window.nfforg.convertEnumToEnglish(chart.ID, X);
                    }),
                    labels: { enabled: options.enableAxisLabels, overflow: undefined, style: textStyle } };
    chart.yAxis = { gridLineWidth: 0, labels: { enabled: false }, title: {text: null} };
    chart.tooltip = { 
      backgroundColor: "black",
      borderWidth: 0,
      followPointer: true,
      style: { color: "white" },
      DISABLEDpositioner: function (x,y,z) {
        console.log(z);
        return { x: 80, y: 50 };
      },
      formatter:
      (chart["show-percentage-only"]) 
        ?
        function(){
          return ((this.series.name!="name") ? (this.series.name+": ") : "")
            + String(this.y)+"%";
        }
      :
      function(){
        return String(this.y) + " (" + window.nfforg.percDisplay(this.y, chart.yValueTotal) + ")";
      }
    };
    chart.plotOptions = {
      series: { animation: false },
      bar: {
        dataLabels: {
          enabled: options.enableBarLabels,
          color: '#000000',
          crop: false,
          overflow: 'none',
          style: {
            fontFamily: textStyle.fontFamily,
            fontSize: options.hires ? "19px" : "11px"
          },
          formatter: 
          (chart["show-percentage-only"]) 
            ?
            function(){return String(this.y) + "%"}
          : 
          function(){
            return window.nfforg.percDisplay(this.y, chart.yValueTotal);
          }
        }
      }
    };
    var hc = chart.series[0];
    if (hc.name == undefined) 
      hc.name = 'name';
    $root.css('height', 
              window.nfforg.px(50 + (chart.xAxis.categories.length * chart.series.count() * barWidth) + options.extraHeight));

    if (!(options.calculateOnly))
      $root.highcharts(chart, options.funcAppendToRendering);
    
    return chart;
  };

  window.nfforg.renderers.one_or_more = window.nfforg.renderers.bar;

})();
