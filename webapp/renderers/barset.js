/*

This approach allows 3 barcharts to be side-by-side horizontally, sharing a single Xaxis label set at far left!

$(function () {
    $('#container').highcharts({
        xAxis:{
        },
        yAxis: [{
            width: 200,
            lineWidth: 2,
            offset:0
        }, {
            width: 200,
            left: 300,
            lineWidth: 2,
            
            offset:0
        }, {
            width: 200,
            left: 550,
            lineWidth: 2,
            offset:0
        }],
        series: [{
            type: 'bar',
            name: 'Tokyo',
            yAxis: 0,
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            type: 'bar',
            name: 'New York',
            yAxis: 1,
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            type: 'bar',
            name: 'Berlin',
            yAxis: 2,
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }]
    });
});


*/


(function() {

  // Mandatory:  chart.otherCharts array of charts
  window.nfforg.renderers.barset = function($root, _chart, options) {

    options = options || {};

    var textStyle =  {
      fontFamily: (options.stdfont ? 'Arial' : 'Roboto Condensed'),
      fontSize: (options.hires ? "20px" : "15px"),
      color: "black"
    };


    var chart = Object.clone(_chart, true);

    if (!(chart.highchart_formatting)) 
      chart.highchart_formatting = {chart:{marginLeft:0}};

    options.calculateOnly = true;

    chart = window.nfforg.renderers.bar($root, chart, options);
    delete chart.plotOptions['bar'];
    delete chart['plotOptions'];
    
    chart.plotOptions = {
      bar: {
        dataLabels: {
          formatter: function(){
            return this.y; // + "%";
          }
        }
      }
    };


    // COMPUTE GEOMETRIES
    var paddingBetweenSubcharts = 40;
    var totalWidth = $root.width();
    var subchartCount = 1 + chart.otherCharts.length;
    var widthForLeftSideLabels = chart.highchart_formatting.chart.marginLeft;
    var paddingForRightSide = 20;

    // derived: 
    var widthPerSubchart = ( (totalWidth - paddingForRightSide - widthForLeftSideLabels) - (paddingBetweenSubcharts*(subchartCount-1)) ) / subchartCount;

    var idxColumn = 0;

    

    // Start changing the cloned chart spec to make it clear we have multiple y axes

    var tmpYAxis = Object.clone(chart.yAxis, true);
    tmpYAxis.width = widthPerSubchart;
    tmpYAxis.offset = 0;
    tmpYAxis.left = widthForLeftSideLabels;
    tmpYAxis.title = {
      text: chart['title-subchart'],
      style: textStyle,
      align: "low"
    };
    tmpYAxis.title.style.fontSize = "18px";

    chart.yAxis = [ tmpYAxis ];

    chart.series[0].yAxis = 0;
    chart.series[0].type = "bar";
    chart.series[0].dataLabels = {
      enabled: true,
      color: '#000000',
      crop: false,
      overflow: 'none',
      style: {
        fontFamily: textStyle.fontFamily,
        fontSize: options.hires ? "19px" : "11px"
      }
    };


    
    chart.otherCharts.each(function(nameOtherChart){

      idxColumn++;   // This is the index of the yaxis

      var _otherChart = options.charthash[nameOtherChart];
      var otherChart = window.nfforg.renderers.bar($root, _otherChart, options);
      otherChart.plotOptions.bar.dataLabels.enabled = false;

      var newYAxis = Object.clone(tmpYAxis, true);
      newYAxis.left = chart.yAxis[idxColumn-1].left + widthPerSubchart + paddingBetweenSubcharts;
      newYAxis.title.text = otherChart['title-subchart'];
      // newYAxis.title.style = {fontSize: "20px"};

      chart.yAxis.push(newYAxis);
      
      otherChart.series[0].yAxis = idxColumn;
      otherChart.series[0].type = "bar";
      otherChart.series[0].dataLabels = chart.series[0].dataLabels;
      chart.series.push(otherChart.series[0]);
    });

    $root.highcharts(chart);

  };

})();
