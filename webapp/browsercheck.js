if (navigator.userAgent.indexOf('Firefox') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Firefox') + 8)) >= 3.6){//Firefox
 //Allow
}else if (navigator.userAgent.indexOf('Chrome') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Chrome') + 7).split(' ')[0]) >= 15){//Chrome
 //Allow
}else if(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Version') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Version') + 8).split(' ')[0]) >= 5){//Safari
 //Allow
if (navigator.userAgent.indexOf('MSIE') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('MSIE') + 5)) >= 9.0){//Firefox
 //Allow
}else{
  window.location.href = "modernbrowser.html";
 }
