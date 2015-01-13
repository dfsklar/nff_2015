$(function() {



  window.TRENDATA_oppexp = 







  var chartspec = 
      {
        legend: { enabled: true },
        credits: { enabled: false },
        chart: {
          type: 'column',
          spacingLeft: 0, spacingRight: 0, marginRight: 0, spacingBottom: 10
        },
        title: {
          text: ''
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          categories: [ 
            // HERE I AM GOING TO STORE THE ACTUAL DOLLAR-RANGE VALUES, ready for display
          ]
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Percentage'
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.0f}%</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [ ]
        /*
          {
          name: 'Tokyo',  // THIS WILL ACTUALLY BE A YEAR
          data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
          
          }, {
          name: 'New York',
          data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
          
          }, {
          name: 'London',
          data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
          
          }, {
          name: 'Berlin',
          data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
          
          }]
        */
      };

  var DB = window.TRENDATA_oppexp[0];

  var colorRange = chroma.scale([chroma("#e2e3de"), window.nfforg.colors.Blue2]);

  var idx = 0;

  DB.data.children.each(function(YEAR){
    idx++;
    var year = YEAR.node.key;  // "2009"
    var thisSeries = { name: year, color: colorRange(idx/DB.data.children.length).hex(), data: [] };
    YEAR.children.each(function(DATAPOINT){
      thisSeries.data.add(Math.round(100*DATAPOINT.node.perc));
    });
    chartspec.series.add(thisSeries);
  });

  // We'll just grab the categories from the 0th year
  DB.data.children[0].children.each(function(RANGESPEC){
    chartspec.xAxis.categories.add(RANGESPEC.node.label.replace("Greater than",">"));
  });


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

  $('.chart').highcharts(chartspec);

});

