$(function(){

  var spec1 = {"legend":{"enabled":true},"credits":{"enabled":false},"chart":{"type":"column","spacingLeft":0,"spacingRight":0,"marginRight":0,"spacingBottom":10},"title":{"text":""},"subtitle":{"text":""},"xAxis":{"categories":["Operating Surplus","Break-even financials","Operating Deficit"]},"yAxis":{"min":0,"title":{"text":"Percentage"}},"tooltip":{"headerFormat":"<span style=\"font-size:10px\">{point.key}</span><table>","pointFormat":"<tr><td style=\"xxxcolor:{series.color};padding:0\">{series.name}: </td><td style=\"padding:0\"><b>{point.y:.0f}%</b></td></tr>","footerFormat":"</table>","shared":true,"useHTML":true},"plotOptions":{"column":{"pointPadding":0.2,"borderWidth":0}},"series":[{"name":"2009","color":"#c2dae3","data":[40,28,32]},{"name":"2010","color":"#a2d2e9","data":[55,0,45]},{"name":"2011","color":"#83caee","data":[44,34,22]},{"name":"2012","color":"#63c2f4","data":[44,25,31]},{"name":"2013","color":"#43baf9","data":[40,31,29]},{"name":"2014","color":"#24b2ff","data":[40,28,31]}]};

  var spec2 = {"legend":{"enabled":true},"credits":{"enabled":false},"chart":{"type":"column","spacingLeft":0,"spacingRight":0,"marginRight":0,"spacingBottom":10},"title":{"text":""},"subtitle":{"text":""},"xAxis":{"categories":["Yes","No"]},"yAxis":{"min":0,"title":{"text":"Percentage"}},"tooltip":{"headerFormat":"<span style=\"font-size:10px\">{point.key}</span><table>","pointFormat":"<tr><td style=\"xxxcolor:{series.color};padding:0\">{series.name}: </td><td style=\"padding:0\"><b>{point.y:.0f}%</b></td></tr>","footerFormat":"</table>","shared":true,"useHTML":true},
                    "plotOptions":
                    {
                      "column":{
                        // stacking:"normal",
                        pointPadding:0.2,
                        borderWidth:0
                      }
                    },
                    "series":[{"name":"2010","color":"#a2d2e9","data":[56,44]},{"name":"2011","color":"#83caee","data":[51,48]},{"name":"2012","color":"#63c2f4","data":[52,48]},{"name":"2013","color":"#43baf9","data":[48,52]},{"name":"2014","color":"#24b2ff","data":[44,56]}]};

  
  Highcharts.setOptions({
    chart: {
      animation: false,
      backgroundColor: "rgba(0,0,0, 0.1)",
      style: {
        fontFamily: 'Arial', //(options.stdfont ? 'Arial' : 'Roboto Condensed'),
        fontSize: "12px" // (options.hires ? "20px" : "10px")
      }
    }
  });

  $('.chart').highcharts(spec2);
  $('.chart').highcharts(spec1);

});
