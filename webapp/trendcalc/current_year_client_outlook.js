$(function() {

  window.TRENDATA =

[{"data": {"node": {"count": 11858, "total_count": 19845, "label": "Number of Responses", "perc": 0.5975308641975309}, "children": [{"node": {"count": 0, "perc": 0.0, "question_key": "year", "label": "2009", "key": "2009", "order": "1"}, "children": [{"node": {"count": 0, "perc": 0, "question_key": "current_year_org_outlook", "label": "Easier than prior year", "key": "easier_than_prior", "order": "1"}}, {"node": {"count": 0, "perc": 0, "question_key": "current_year_org_outlook", "label": "Same as prior year", "key": "same_as_prior", "order": "2"}}, {"node": {"count": 0, "perc": 0, "question_key": "current_year_org_outlook", "label": "Harder than prior year", "key": "harder_than_prior", "order": "3"}}]}, {"node": {"count": 1290, "perc": 0.10878731657952437, "question_key": "year", "label": "2010", "key": "2010", "order": "2"}, "children": [{"node": {"count": 152, "perc": 0.11782945736434108, "question_key": "current_year_org_outlook", "label": "Easier than prior year", "key": "easier_than_prior", "order": "1"}}, {"node": {"count": 497, "perc": 0.38527131782945734, "question_key": "current_year_org_outlook", "label": "Same as prior year", "key": "same_as_prior", "order": "2"}}, {"node": {"count": 641, "perc": 0.4968992248062015, "question_key": "current_year_org_outlook", "label": "Harder than prior year", "key": "harder_than_prior", "order": "3"}}]}, {"node": {"count": 1720, "perc": 0.14504975543936582, "question_key": "year", "label": "2011", "key": "2011", "order": "3"}, "children": [{"node": {"count": 240, "perc": 0.13953488372093023, "question_key": "current_year_org_outlook", "label": "Easier than prior year", "key": "easier_than_prior", "order": "1"}}, {"node": {"count": 781, "perc": 0.45406976744186045, "question_key": "current_year_org_outlook", "label": "Same as prior year", "key": "same_as_prior", "order": "2"}}, {"node": {"count": 699, "perc": 0.4063953488372093, "question_key": "current_year_org_outlook", "label": "Harder than prior year", "key": "harder_than_prior", "order": "3"}}]}, {"node": {"count": 3878, "perc": 0.3270365997638725, "question_key": "year", "label": "2012", "key": "2012", "order": "4"}, "children": [{"node": {"count": 513, "perc": 0.13228468282619907, "question_key": "current_year_org_outlook", "label": "Easier than prior year", "key": "easier_than_prior", "order": "1"}}, {"node": {"count": 1776, "perc": 0.45796802475502835, "question_key": "current_year_org_outlook", "label": "Same as prior year", "key": "same_as_prior", "order": "2"}}, {"node": {"count": 1589, "perc": 0.40974729241877256, "question_key": "current_year_org_outlook", "label": "Harder than prior year", "key": "harder_than_prior", "order": "3"}}]}, {"node": {"count": 4970, "perc": 0.41912632821723733, "question_key": "year", "label": "2013", "key": "2013", "order": "5"}, "children": [{"node": {"count": 799, "perc": 0.1607645875251509, "question_key": "current_year_org_outlook", "label": "Easier than prior year", "key": "easier_than_prior", "order": "1"}}, {"node": {"count": 2326, "perc": 0.4680080482897384, "question_key": "current_year_org_outlook", "label": "Same as prior year", "key": "same_as_prior", "order": "2"}}, {"node": {"count": 1845, "perc": 0.37122736418511065, "question_key": "current_year_org_outlook", "label": "Harder than prior year", "key": "harder_than_prior", "order": "3"}}]}, {"node": {"count": 0, "perc": 0.0, "question_key": "year", "label": "2014", "key": "2014", "order": "6"}, "children": [{"node": {"count": 0, "perc": 0, "question_key": "current_year_org_outlook", "label": "Easier than prior year", "key": "easier_than_prior", "order": "1"}}, {"node": {"count": 0, "perc": 0, "question_key": "current_year_org_outlook", "label": "Same as prior year", "key": "same_as_prior", "order": "2"}}, {"node": {"count": 0, "perc": 0, "question_key": "current_year_org_outlook", "label": "Harder than prior year", "key": "harder_than_prior", "order": "3"}}]}]}, "id": "year/current_year_org_outlook"}];


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

  var DB = window.TRENDATA[0];

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
