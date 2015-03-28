var SklarVersionChecker = function(prefix, minver) {
    return (navigator.userAgent.indexOf(prefix) != -1) && (parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf(prefix) + prefix.length+1)) >= minver);
};


if ( ! (
    SklarVersionChecker('Firefox', 20.6)
    ||
    SklarVersionChecker('Chrome', 15)
    ||
    SklarVersionChecker('MSIE', 9.0)
    ||
    SklarVersionChecker('Safari', 5.0)
    ||
    SklarVersionChecker('Trident', 5.0)
    ||
    SklarVersionChecker('Opera', 12.0)
)) {
    window.location.href = "modernbrowser.html";
}



// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
