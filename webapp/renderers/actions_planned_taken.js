(function() {

  window.nfforg.renderers.actions_planned_taken = function($root, chart, options) {

    options = options || {};

    var barWidth = options.hires ? 95 : 45;
    var textStyle =  {
      fontFamily: (options.stdfont ? 'Arial' : 'Roboto Condensed'),
      fontSize: (options.hires ? "20px" : "12px")
    };

    chart.chart = { type: 'bar', 
                    marginTop: 50,
                    marginLeft: options.hires ? 750 : 350 };

    chart.animation = false;
    chart.legend = { 
      align: 'left', 
      reversed: true,
      reverse: true,
      verticalAlign: 'top', 
      layout: 'horizontal',
      itemMarginBottom: 3,
      borderWidth: 0
    };
    chart.credits = { enabled: false };
    chart.xAxis = { gridLineWidth: 0, lineWidth: 0, tickWidth: 0, 
                    categories: chart.keyList.map(function(X){
                      return window.nfforg.convertEnumToEnglish(chart.ID, X);
                    }),
                    labels: { overflow: undefined, style: textStyle } };
    chart.yAxis = { gridLineWidth: 0, labels: { enabled: false }, title: {text: null} };
    chart.tooltip = { 
      backgroundColor: "black",
      borderWidth: 0,
      style: { color: "white" },
      followPointer: true,
      formatter: function(){
        return String(this.y) + " (" + window.nfforg.percDisplay(this.y, chart.yValueTotal) + ")";
      }
    };
    chart.plotOptions = {
      series: { animation: false },
      bar: {
        minPointLength: 2,
        dataLabels: {
          enabled: true,
          color: '#000000',
          style: {
            fontFamily: textStyle.fontFamily,
            fontSize: options.hires ? "19px" : "11px"
          },
          formatter: function(){
            return window.nfforg.percDisplay(this.y, chart.yValueTotal);
          }
        }
      }
    };

    // The serieses must be non-sparse, so every x-value "key"
    // must be represented even if zero is the data point.


    // Human-friendly labels for the two serieses
    chart.series[0].name = "Planned next 12 months";    //next
    chart.series[0].color = chroma(window.nfforg.colors.Blue3).hex();
    chart.series[1].name = "Taken last 12 months    ";  //last
    chart.series[1].color = chroma(window.nfforg.colors.Blue2).hex();

    $root.css('height', window.nfforg.px(80 + chart.keyList.length * barWidth));
    $root.highcharts(chart);
  }


})();
