function ICDcreate(htmlStr) {
  var frag = document.createDocumentFragment();
  var temp = document.createElement('div');
  temp.innerHTML = htmlStr;
  while (temp.firstChild) {
    frag.appendChild(temp.firstChild);
  }
  return frag;
}


function countdown_timer(direction,targetDate,precision,targetDay,targetHr,targetMin,targetSec){this["direction"]=direction;this["targetDate"]= new Date(targetDate);this["precision"]=precision;this["currentDate"]= new Date();this["timerInterval"];this["targetDay"]=targetDay;this["targetHr"]=targetHr;this["targetMin"]=targetMin;this["targetSec"]=targetSec;} ;countdown_timer["prototype"]["targetDate"];countdown_timer["prototype"]["precision"];countdown_timer["prototype"]["currentDate"];countdown_timer["prototype"]["direction"];countdown_timer["prototype"]["startTimer"]=function (){var cdt_instance=this;this["timerInveral"]=setInterval(function (){cdt_instance["displayTime"]();} ,this["precision"]);} ;countdown_timer["prototype"]["displayTime"]=function (){var ct_days=this["targetDay"];var ct_hours=this["targetHr"];var ct_minutes=this["targetMin"];var ct_seconds=this["targetSec"];this["currentDate"]= new Date();ct_diff=(this["targetDate"]["getTime"]()-this["currentDate"]["getTime"]())*this["direction"];ms_in_sec=1000;ms_in_min=ms_in_sec*60;ms_in_hour=ms_in_min*60;ms_in_day=ms_in_hour*24;ct_days["innerHTML"]=Math["floor"](ct_diff/ms_in_day);ct_hours["innerHTML"]=Math["floor"](((ct_diff)%ms_in_day)/ms_in_hour);ct_minutes["innerHTML"]=Math["floor"](((ct_diff%ms_in_day)%ms_in_hour)/ms_in_min);ct_seconds["innerHTML"]=Math["floor"]((((ct_diff%ms_in_day)%ms_in_hour)%ms_in_min)/ms_in_sec);} ;


function icdcountdown_launch() {
  document.getElementById("icdcountdown_holder").appendChild(ICDcreate('<div id="icdcountdown_cdwidgetbox_220"><div class=icdcountdown_title>ICD-10 Countdown</div><div class=widget_middle_220><span id="ct_disp_days_220"></span> days, <span id="ct_disp_hours_220"></span> hours <div id="ct_disp_minutes_220"/><div id="ct_disp_seconds_220"/></div>'));
  var cssTag = document.createElement("link");
  cssTag.rel = "stylesheet";
  cssTag.type = "text/css";
  // cssTag.href = "http://www.sklardevelopment.com/ga/cdwidget.css";
  cssTag.href = "cdwidget.css";
  document.getElementsByTagName("head")[0].appendChild(cssTag);
  var cdt_obj= new countdown_timer(1,"10/1/2014",1000,document["getElementById"]("ct_disp_days_220"),document["getElementById"]("ct_disp_hours_220"),document["getElementById"]("ct_disp_minutes_220"),document["getElementById"]("ct_disp_seconds_220"));
  cdt_obj["displayTime"]();
  cdt_obj["startTimer"]();
}
