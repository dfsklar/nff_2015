$(function(){


  var preEnumMappings = {
  };


  var yCoordFudgings = {
    4: -15,
    2: -15,
    36: -20,
    49: -13,
    17: -13,
    15: -13,
    "acted_new_org_tech": {start: -24, end:0}
  };




  var $holder = $('.chart');


  window.nfforg.renderSlopegraph($holder, window.nfforg.data_acted_services, preEnumMappings, yCoordFudgings,
                                "action_services_abbrev");


});
