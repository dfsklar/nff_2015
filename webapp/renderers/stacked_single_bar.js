(function() {

  window.nfforg.renderers.stacked_single_bar = function($root, chart, options) {

    options = options || {};

    var textStyle =  {
      fontFamily: (options.stdfont ? 'Arial' : 'Roboto Condensed'),
      fontSize: (options.hires ? "200px" : "12px")
    };

    // DELETE ALL SLICES THAT HAVE VALUE OF ZERO
    chart.series.remove(function(X){
      return (X.data[0] == 0);
    });

    chart.chart = { type: 'bar', spacingLeft: 10, spacingRight: 0, marginRight: 0 };
    if (chart.highchart_formatting)
      if (chart.highchart_formatting.chart)
        Object.merge(chart.chart, chart.highchart_formatting.chart);
    chart.legend = { enabled: true, reversed:true, reverse:true };
    chart.credits = { enabled: false };
    chart.xAxis = { gridLineWidth: 0, lineWidth: 0, 
                    tickWidth: 0, 
                    categories: [ "" ],
                    labels: { overflow: undefined, style: textStyle } };
    chart.yAxis = { gridLineWidth: 0, labels: { enabled: false }, title: {text: null} };
    chart.tooltip = { 
      backgroundColor: "black",
      borderWidth: 0,
      followPointer: true,
      style: { color: "white" },
      formatter: function(){
        return this.series.name + " " + String(this.y) + " (" + Highcharts.numberFormat(100 * this.y / chart.yValueTotal, 0) + "%)";
      }
    };

    chart.plotOptions = {
      animation: false,
      bar: {
        dataLabels: {
          enabled: true,
          color: 'white',
          crop: true,
          overflow: 'none'
        }
      },
      series: {
        animation: false,
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          color: 'white',
          crop: true,
          overflow: 'none',
          style: {
            fontSize: options.hires ? "25px" : "12px"
          },
          formatter: function(){
            var perc = 100 * this.y / chart.yValueTotal;
            var pctFmt = Highcharts.numberFormat(perc, 0) + "%";
            if (perc < 20) {
              if (perc < 5)
                return "";
              else
                return pctFmt;
            }
            else {
              return this.series.name 
                +
                (
                  true/*options.hires*/ ? 
                    ("  " + Highcharts.numberFormat(100 * this.y / chart.yValueTotal, 0) + "%") : ""
                );
            }
          }
        }
      }
    };
    $root.css('height', window.nfforg.px(options.hires?250:145));
    $root.highcharts(chart);
  };

})();
