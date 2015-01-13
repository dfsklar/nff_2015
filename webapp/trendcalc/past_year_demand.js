$(function() {



  window.TRENDATA_oppexp = 

[{"data": {"node": {"count": 17602, "total_count": 19845, "label": "Number of Responses", "perc": 0.8869740488788108}, "children": [{"node": {"count": 974, "perc": 0.05533462106578798, "question_key": "year", "label": "2009", "key": "2009", "order": "1"}, "children": [{"node": {"count": 388, "perc": 0.39835728952772076, "question_key": "surplus_deficit_prior", "label": "An operating surplus", "key": "surplus", "order": "1"}}, {"node": {"count": 275, "perc": 0.28234086242299794, "question_key": "surplus_deficit_prior", "label": "Break-even financial results, where revenue matches expenses", "key": "break_even", "order": "2"}}, {"node": {"count": 311, "perc": 0.3193018480492813, "question_key": "surplus_deficit_prior", "label": "An operating deficit", "key": "deficit", "order": "2"}}]}, {"node": {"count": 836, "perc": 0.04749460288603568, "question_key": "year", "label": "2010", "key": "2010", "order": "2"}, "children": [{"node": {"count": 459, "perc": 0.5490430622009569, "question_key": "surplus_deficit_prior", "label": "An operating surplus", "key": "surplus", "order": "1"}}, {"node": {"count": 0, "perc": 0.0, "question_key": "surplus_deficit_prior", "label": "An operating deficit", "key": "deficit", "order": "2"}}, {"node": {"count": 377, "perc": 0.45095693779904306, "question_key": "surplus_deficit_prior", "label": "Break-even financial results, where revenue matches expenses", "key": "break_even", "order": "2"}}]}, {"node": {"count": 1878, "perc": 0.10669242131575957, "question_key": "year", "label": "2011", "key": "2011", "order": "3"}, "children": [{"node": {"count": 821, "perc": 0.4371671991480298, "question_key": "surplus_deficit_prior", "label": "An operating surplus", "key": "surplus", "order": "1"}}, {"node": {"count": 644, "perc": 0.34291799787007454, "question_key": "surplus_deficit_prior", "label": "An operating deficit", "key": "deficit", "order": "2"}}, {"node": {"count": 413, "perc": 0.21991480298189564, "question_key": "surplus_deficit_prior", "label": "Break-even financial results, where revenue matches expenses", "key": "break_even", "order": "2"}}]}, {"node": {"count": 4019, "perc": 0.2283263265538007, "question_key": "year", "label": "2012", "key": "2012", "order": "4"}, "children": [{"node": {"count": 1778, "perc": 0.44239860661856184, "question_key": "surplus_deficit_prior", "label": "An operating surplus", "key": "surplus", "order": "1"}}, {"node": {"count": 1005, "perc": 0.25006220452848965, "question_key": "surplus_deficit_prior", "label": "Break-even financial results, where revenue matches expenses", "key": "break_even", "order": "2"}}, {"node": {"count": 1236, "perc": 0.3075391888529485, "question_key": "surplus_deficit_prior", "label": "An operating deficit", "key": "deficit", "order": "2"}}]}, {"node": {"count": 5407, "perc": 0.3071810021588456, "question_key": "year", "label": "2013", "key": "2013", "order": "5"}, "children": [{"node": {"count": 2172, "perc": 0.40170149805807287, "question_key": "surplus_deficit_prior", "label": "An operating surplus", "key": "surplus", "order": "1"}}, {"node": {"count": 1684, "perc": 0.3114481228037729, "question_key": "surplus_deficit_prior", "label": "Break-even financial results, where revenue matches expenses", "key": "break_even", "order": "2"}}, {"node": {"count": 1551, "perc": 0.28685037913815425, "question_key": "surplus_deficit_prior", "label": "An operating deficit", "key": "deficit", "order": "2"}}]}, {"node": {"count": 4488, "perc": 0.2549710260197705, "question_key": "year", "label": "2014", "key": "2014", "order": "6"}, "children": [{"node": {"count": 1813, "perc": 0.4039661319073084, "question_key": "surplus_deficit_prior", "label": "An operating surplus", "key": "surplus", "order": "1"}}, {"node": {"count": 1275, "perc": 0.2840909090909091, "question_key": "surplus_deficit_prior", "label": "An operating deficit", "key": "deficit", "order": "2"}}, {"node": {"count": 1400, "perc": 0.31194295900178254, "question_key": "surplus_deficit_prior", "label": "Break-even financial results, where revenue matches expenses", "key": "break_even", "order": "2"}}]}]}, "id": "year/surplus_deficit_prior"}];





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
