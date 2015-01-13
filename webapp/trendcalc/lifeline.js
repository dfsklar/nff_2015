$(function() {



  window.TRENDATA_lifeline = 

[{"data": {"node": {"count": 19816, "total_count": 19845, "label": "Number of Responses", "perc": 0.9985386747291509}, "children": [{"node": {"count": 986, "perc": 0.049757771497779574, "question_key": "year", "label": "2009", "key": "2009", "order": "1"}, "children": [{"node": {"count": 430, "perc": 0.43610547667342797, "question_key": "lifeline", "label": "Yes", "key": "yes", "order": "1"}}, {"node": {"count": 556, "perc": 0.563894523326572, "question_key": "lifeline", "label": "No", "key": "no", "order": "2"}}]}, {"node": {"count": 1315, "perc": 0.06636051675413807, "question_key": "year", "label": "2010", "key": "2010", "order": "2"}, "children": [{"node": {"count": 527, "perc": 0.4007604562737643, "question_key": "lifeline", "label": "Yes", "key": "yes", "order": "1"}}, {"node": {"count": 788, "perc": 0.5992395437262358, "question_key": "lifeline", "label": "No", "key": "no", "order": "2"}}]}, {"node": {"count": 1935, "perc": 0.09764836495761, "question_key": "year", "label": "2011", "key": "2011", "order": "3"}, "children": [{"node": {"count": 956, "perc": 0.4940568475452196, "question_key": "lifeline", "label": "Yes", "key": "yes", "order": "1"}}, {"node": {"count": 979, "perc": 0.5059431524547804, "question_key": "lifeline", "label": "No", "key": "no", "order": "2"}}]}, {"node": {"count": 4585, "perc": 0.2313786838918046, "question_key": "year", "label": "2012", "key": "2012", "order": "4"}, "children": [{"node": {"count": 1944, "perc": 0.42399127589967284, "question_key": "lifeline", "label": "Yes", "key": "yes", "order": "1"}}, {"node": {"count": 2641, "perc": 0.5760087241003271, "question_key": "lifeline", "label": "No", "key": "no", "order": "2"}}]}, {"node": {"count": 5983, "perc": 0.30192773516350424, "question_key": "year", "label": "2013", "key": "2013", "order": "5"}, "children": [{"node": {"count": 3088, "perc": 0.5161290322580645, "question_key": "lifeline", "label": "Yes", "key": "yes", "order": "1"}}, {"node": {"count": 2895, "perc": 0.4838709677419355, "question_key": "lifeline", "label": "No", "key": "no", "order": "2"}}]}, {"node": {"count": 5012, "perc": 0.2529269277351635, "question_key": "year", "label": "2014", "key": "2014", "order": "6"}, "children": [{"node": {"count": 2605, "perc": 0.5197525937749401, "question_key": "lifeline", "label": "Yes", "key": "yes", "order": "1"}}, {"node": {"count": 2407, "perc": 0.48024740622505985, "question_key": "lifeline", "label": "No", "key": "no", "order": "2"}}]}]}, "id": "year/lifeline"}];




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

  var DB = window.TRENDATA_lifeline[0];

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

  console.log(JSON.stringify(chartspec));

  $('.chart').highcharts(chartspec);

});
