"use strict";

$(function() {

    // FROM html5canvastutorials.com:
    function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
		context.fillText(line, x, y);
		line = words[n] + ' ';
		y += lineHeight;
            }
            else {
		line = testLine;
            }
        }
        context.fillText(line, x, y);
	return y;
    }

  /* This simple approach currently does not yield a high-res image.
     Rather, the resolution is identical to screen/webpage resolution.
     In reality, we should be calling highcharts to re-render the chart
     into a larger offscreen DIV (e.g. the webpage's dimensions x 2 on each axis), 
     then grab that SVG for the purpose of the construction of the IMG and canvas
     herein: */
  window.nfforg.configureChartInteraction = function() {

    $('.button.export').click(function(){

      var $chartdiv = $(this).parents('.chart');
      var chartkey = $chartdiv.data('key');
      var chart = $chartdiv.data('chart-source');  // window.nfforg.database.charts[chartkey];

      ga('send', 'event', 'button', 'download', chartkey);

      // IF THERE IS ANY RAPHAEL OBJECT NEEDING REMOVAL FOR PRINT PURPOSES...
      try {
        $chartdiv.find('.raphael-paper-is-attached').each(function(){
          if ($(this).data('raphael-remove-for-print')) {
            $(this).data('raphael-remove-for-print').remove();
          }
        });
      }catch(exc){}

      // OBTAIN THE SVG FROM THE EXTANT CHART
      var $svg = $chartdiv.find('svg');
      var widthSVG = $svg.width();
      var heightSVG = $svg.height();
      var svgcode;

      var widthImage = 1200;
      var heightImage = (1200/widthSVG)*heightSVG;

      var arrFilters = new Array;
      if (chart.wasFiltered) {
        arrFilters = $($('.dynamic-area').get(0)).children();
      }

      var heightExtra = 200 + (arrFilters.length * 20);

      try {
        var x1= $.svg.isSVGElem($svg.get(0));
        var x2= $svg.svg();
        svgcode = $svg.svg('get').toSVG();
      }
      catch(errignore) {
        alert("Your browser or browser version does not support export/download of these charts.");
        return;
      }

      console.log(svgcode);

      // CREATE A CANVAS TO RECEIVE THE GRAPH (via canvg)
      var canvas = $('.canvas-for-export').get(0);
      canvas.width = widthImage+100;
      canvas.height = heightImage+heightExtra;
      var ctx = canvas.getContext('2d');
      
      // FOR NOW, WE FLOOD WITH CANVAS WITH WHITE
      ctx.fillStyle = 'white';
      ctx.fillRect(0,0, 99999,99999);

      // CHART TITLE
      ctx.fillStyle = 'black';
      ctx.font = 'bold 24pt Arial';
      ctx.fillText(chart.title.replace("<br/>"," "), 25, 45);

      ctx.font = '17pt Arial';
      if (chart.yValueTotal) {
        ctx.fillText("Number of respondents: " + String(chart.yValueTotal), 25, 70);
        var yCur = 94;
	var xCur = 25;
        if (chart.wasFiltered) {
          ctx.fillText("Only the respondents matching all these criteria:", 25, yCur);
          ctx.font = '15pt Arial';
          $($('.dynamic-area').get(0)).children().each(function(){
            yCur += 22;
            yCur = wrapText(ctx, $(this).text(), xCur, yCur, canvas.width-40, 22);
          });
        }
      }

      ctx.fillStyle = 'grey';
      ctx.font = 'italic 17pt Arial';
      // ctx.fillText("In the Feb-17 demo, export/download is supported only on the Google Chrome browser.", 25, 120);

      ctx.fillStyle = 'black';
      ctx.font = '12pt Arial';

      // CANVG ADD-ON:
      ctx.drawSvg(svgcode, 25, yCur+30, widthImage,heightImage);

      ctx.fillStyle = 'grey';
      ctx.font = 'italic 12pt Arial';
      ctx.fillText("Nonprofit Finance Fund 2015 State of the Sector Survey.  Visit nff.org/survey to learn more.", widthImage-600, heightImage+heightExtra-20);


      // The canvas is now populated and ready to turn into a data:image URL.
      // This is working on all browsers except IE.

      var result = canvas.toDataURL();
      console.log (result);

      // The data URL unfortunately says "png" which means the browser
      // will want to show it rather than force a download, thus we:
      if (
        navigator.userAgent.has('Chrome')
          ||
          navigator.userAgent.has('Firefox')) 
      {
        result = result.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
        $(this).attr('href', result);
      }
      else {
        // Internet Explorer or Safari
        var $imgForExportPrez = $('.img-for-export');
        $imgForExportPrez.css({
          width: (canvas.width/3)|0, 
          height: (canvas.height/3)|0
        });
        $imgForExportPrez.get(0).src = result;
        window.nfforg.overlayShow('export');
      }

    });
  };

});
