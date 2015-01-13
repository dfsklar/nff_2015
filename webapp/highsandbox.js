$(function(){

  var spec = {"legend":{"enabled":true},"credits":{"enabled":false},"chart":{"type":"column", spacingTop: 20, "spacingLeft":0,"spacingRight":25,"marginRight":18,"spacingBottom":20},"title":{"text":""},"subtitle":{"text":""},"xAxis":{"categories":["$0 - 250K","$250K - 500K","$500K - $2M","$2 - $5M","$5M - $10M","$10M - 20M","> $20M"]},"yAxis":{"min":0,"title":{"text":"Percentage"}},"tooltip":{"headerFormat":"<span style=\"font-size:10px\">{point.key}</span><table>","pointFormat":"<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td><td style=\"padding:0\"><b>{point.y:.0f}%</b></td></tr>","footerFormat":"</table>","shared":true,"useHTML":false},"plotOptions":{"column":{"pointPadding":0.2,"borderWidth":0}},"series":[{"name":"2009","color":"#c2dae3","data":[15,13,35,16,9,5,7]},{"name":"2010","color":"#a2d2e9","data":[25,13,30,12,8,6,6]},{"name":"2011","color":"#83caee","data":[17,13,33,16,9,5,6]},{"name":"2012","color":"#63c2f4","data":[20,13,32,16,8,6,5]},{"name":"2013","color":"#43baf9","data":[23,12,32,17,9,6,0]},{"name":"2014","color":"#24b2ff","data":[16,10,29,19,10,7,9]}]};


/* MULT Y AXIS BAR CHART (to debug data labels) */
var spec = {
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
            dataLabels: {
                enabled:true
            },
            name: 'Tokyo',
            yAxis: 0,
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            type: 'bar',
            name: 'New York',
            dataLabels: {
                enabled:true
            },
            yAxis: 1,
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            type: 'bar',
            dataLabels: {
                enabled:true
            },
            name: 'Berlin',
            yAxis: 2,
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }]
    };


var spec = 
{"section":"Overview and Profile of Respondents","title":"Gov’t payments are received...","renderer":"barset","title-subchart":"FEDERAL","highchart_formatting":{"chart":{"marginLeft":130,"spacingLeft":0}},"color_by_key":{"Ahead of schedule":"#24b2ff","On schedule":"#a1e0ff","1-30 days late":"#e2e3de","31-90 days late":"#ff9980","More than 90 days late":"#ff724f"},"key_order":["Ahead of schedule","On schedule","1-30 days late","31-90 days late","More than 90 days late"],"css":{"width":"670px"},"otherCharts":["funding_gov_state_days_late","funding_gov_loc_days_late"],"yValueTotal":1723,"valueSet":{"1-30 days late":325,"On schedule":917,"31-90 days late":336,"More than 90 days late":122,"Ahead of schedule":23},"ID":"funding_gov_days_late","series":[{"data":[{"name":"Ahead of schedule","y":23,"color":"#24b2ff"},{"name":"On schedule","y":917,"color":"#a1e0ff"},{"name":"1-30 days late","y":325,"color":"#e2e3de"},{"name":"31-90 days late","y":336,"color":"#ff9980"},{"name":"More than 90 days late","y":122,"color":"#ff724f"}],"name":"name","yAxis":0,"type":"bar","dataLabels":{"enabled":true}},{"data":[{"name":"Ahead of schedule","y":39,"color":"#24b2ff"},{"name":"On schedule","y":844,"color":"#a1e0ff"},{"name":"1-30 days late","y":453,"color":"#e2e3de"},{"name":"31-90 days late","y":416,"color":"#ff9980"},{"name":"More than 90 days late","y":221,"color":"#ff724f"}],"name":"name","yAxis":1},{"data":[{"name":"Ahead of schedule","y":39,"color":"#24b2ff"},{"name":"On schedule","y":911,"color":"#a1e0ff"},{"name":"1-30 days late","y":492,"color":"#e2e3de"},{"name":"31-90 days late","y":393,"color":"#ff9980"},{"name":"More than 90 days late","y":176,"color":"#ff724f"}],"name":"name","yAxis":2}],"keyList":["Ahead of schedule","On schedule","1-30 days late","31-90 days late","More than 90 days late"],"chart":{"type":"bar","spacingLeft":0,"spacingRight":15,"marginRight":15,"spacingBottom":25,"marginLeft":130},"legend":{"enabled":false},"credits":{"enabled":false},"xAxis":{"gridLineWidth":0,"lineWidth":0,"tickWidth":0,"categories":["Ahead of schedule","On schedule","1-30 days late","31-90 days late","More than 90 days late"],"labels":{"enabled":true,"style":{"fontFamily":"Roboto Condensed","fontSize":"12px"}}},"yAxis":[{"gridLineWidth":0,"labels":{"enabled":false},"title":{"text":null},"width":146.66666666666666,"offset":0,"left":0},{"gridLineWidth":0,"labels":{"enabled":false},"title":{"text":null},"width":146.66666666666666,"offset":0,"left":200},{"gridLineWidth":0,"labels":{"enabled":false},"title":{"text":null},"width":146.66666666666666,"offset":0,"left":200}],"tooltip":{"backgroundColor":"black","borderWidth":0,"followPointer":true,"style":{"color":"white"}},"plotOptions":{"series":{"animation":false},"bar":{"dataLabels":{"enabled":false,"color":"#000000","crop":false,"overflow":"none","style":{"fontFamily":"Roboto Condensed","fontSize":"10px"}}}}};

  
  Highcharts.setOptions({
    chart: {
      animation: false,
      style: {
        fontFamily: 'Arial', //(options.stdfont ? 'Arial' : 'Roboto Condensed'),
        fontSize: "12px" // (options.hires ? "20px" : "10px")
      }
    }
  });

  $('.chart').highcharts(spec);

});
