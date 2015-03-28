"use strict";

(function() {

  window.nfforg.renderers.donut = function($root, chart) {
    chart.legend = { 
      align: 'left', 
      verticalAlign: 'middle', 
      layout: 'vertical',
      itemMarginBottom: 3,
      borderWidth: 0
    };
    chart.tooltip = { 
      formatter: function(){
        return "<b>"+String(this.point.name)+"</b> : " + String(this.y) + " (" + Highcharts.numberFormat(this.percentage, 0) + "%)";
      }
    };
    chart.credits = { enabled: false };
    chart.plotOptions = {
      pie: {
        allowPointSelect: false,
        size: 50,
        showInLegend: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          color: '#000000',
          connectorColor: '#000000',
          format: '{point.percentage:.0f}%'
        }
      }
    };
    var hc = chart.series[0];
    hc.type = 'pie';
    hc.name = 'name';
    hc.innerSize = chart.inner_size || '70%';
    $root.highcharts(chart);
  }


})();
