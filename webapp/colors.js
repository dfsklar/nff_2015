(function() {

  /*
    non-semantic charts:  stick with orange or use your Blue2
    
   */

  window.nfforg.colors = 
    {
      /* Dark to light */
      Blue1: '#162682',  // vivid blue
      Blue2: '#24B2FF',
      Blue3: '#A1E0FF',  // desaturated
      MidnightBlue: "#0000B0",
      MediumBlue: "#2A7AE0",
      DarkerGray: '#5D7683',
      LightGray: '#d2d3de',
      Orange1: '#FF9980',
      Orange2: '#FF724F',
      Orange3: '#FFAE15',
      FilterRed: '#FF2445'
    };

  window.nfforg.colors.DEFAULT = window.nfforg.colors.Blue1;
  window.nfforg.colors.YES = window.nfforg.colors.Blue1;
  window.nfforg.colors.MIDDLE = window.nfforg.colors.Blue2;
  window.nfforg.colors.NO = '#91D0EF';

  window.nfforg.colors.DISPARAGINGYES = window.nfforg.colors.Orange1;
  window.nfforg.colors.DISPARAGINGNO = window.nfforg.colors.Orange2;

  window.nfforg.colors.BADVERY = window.nfforg.colors.Orange2;
  window.nfforg.colors.BAD = window.nfforg.colors.Orange1;
  window.nfforg.colors.NEUTRAL = window.nfforg.colors.LightGray;
  window.nfforg.colors.GOOD = window.nfforg.colors.Blue3;
  window.nfforg.colors.GOODVERY = window.nfforg.colors.Blue2;

  /* For the three stacked bars:  just use blue1-3.  No could be darker grey, and then yes could be blue 2 and blue 3 */

  window.nfforg.orangeNFF = chroma(235, 155, 46);
  window.nfforg.greenNFF = chroma(85, 107, 115);

})();
