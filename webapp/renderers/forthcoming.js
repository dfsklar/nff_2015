"use strict";

(function() {

  window.nfforg.renderers.forthcoming = function($root, chart) {

    var doNeedOtherCategory = (chart.valueSet['Other']);

    var $container = $('<div class=display>Forthcoming</div>');
    $root.append($container);

  }


})();
