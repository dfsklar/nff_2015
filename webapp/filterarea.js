$(function() {

  /*
    The methods herein handle the "scrolling" of the vertical sidebar used for filter/compare controls.
  */


  // Should be called anytime the height of the content within the sidebar changes 
  // *OR*
  // the height of the browser area changes.

  window.nfforg.filterSidebar = {
    scrollToBottom: function($theForm){
      var verticalHeightOccluded = $theForm.data('verticalHeightOccluded');
      var value = "translate(0px, " + String(0-verticalHeightOccluded) + "px)"
      var $scrollableDiv = $theForm.find('.section-holder');
      $scrollableDiv.css({
        "-webkit-transform": value,
        "-moz-transform": value,
        "transform": value
      });
      $theForm.data('scrolldownInProgress', true);
    },

    scrollToTop: function($theForm){
      var value = "translate(0px, 0px)";
      var $scrollableDiv = $theForm.find('.section-holder');
      $scrollableDiv.css({
        "-webkit-transform": value,
        "-moz-transform": value,
        "transform": value
      });
      $theForm.data('scrolldownInProgress', false);
    },

    respondToHeightChanges: function($theForm){
      var croppingOngoing = false;
      var heightTab = $('#filter-area .tabs').height();
      var heightContent = $theForm.height();
      var vertHtOccluded = (heightTab + heightContent) - $('#filter-area').height();
      $theForm.data('verticalHeightOccluded', vertHtOccluded);
      console.log("Vertical height occluded: " + $theForm.data('verticalHeightOccluded'));
      if (vertHtOccluded > 0) {
        croppingOngoing = true;
      }
      $theForm.find('.hint').removeClass('shown');
      if (!croppingOngoing) {
        window.nfforg.filterSidebar.scrollToTop($theForm);
      }else{
        if ($theForm.data('scrolldownInProgress'))
          $theForm.find('.hint.scroll-up').addClass('shown');
        else
          $theForm.find('.hint.scroll-down').addClass('shown');
      }
    }
  };



  $('#filter-area .hint.scroll-down').click(function(e){
    var theform = $(this).parent();
    window.nfforg.filterSidebar.scrollToBottom(theform);
    window.nfforg.filterSidebar.respondToHeightChanges(theform);
  });
  $('#filter-area .hint.scroll-up').click(function(e){
    var theform = $(this).parent();
    window.nfforg.filterSidebar.scrollToTop(theform);
    window.nfforg.filterSidebar.respondToHeightChanges(theform);
  });



});
