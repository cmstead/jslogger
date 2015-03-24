var jslogger = (function(){
    'use strict';

    var logLevels = {
            error: 0,
            info: 2,
            log: 2,
            trace: 3,
            warn: 1
        },
        logLevel = 0;

    function apply(fn, args){
        fn.apply(console, args);
    }

    function extractValue(){
        var tokens = document.cookie.split(';'),
            cookieValue = '';

        tokens.forEach(function(token){
            if(token.match(/^logLevel/) !== null){
                cookieValue = token.split(',')[0].split('=')[1];
            }
        });

        return cookieValue;
    }

    function getLogLevel(){
        var storedLevel = extractValue();
        return (!!storedLevel) ? parseInt(storedLevel, 10) : logLevel;
    }

    function setLogLevel(level){
        logLevel = level;
        document.cookie = 'logLevel=' + level;
    }

    function parseArgs(args){
        return Array.prototype.slice.call(args, 0);
    }

    function consoleCaller(fnKey, args){
        if(!!console && typeof console[fnKey] === 'function' && logLevel >= logLevels[fnKey]){
            apply(console[fnKey], args);
        }
    }

    function error(){
        consoleCaller('error', parseArgs(arguments));
    }

    function info(){
        consoleCaller('info', parseArgs(arguments));
    }

    function log(){
        consoleCaller('log', parseArgs(arguments));
    }

    function trace(){
        consoleCaller('trace', []);
    }

    function warn(){
        consoleCaller('warn', parseArgs(arguments));
    }

    setLogLevel(getLogLevel());

    return {
        error: error,
        getLogLevel: getLogLevel,
        info: info,
        log: log,
        setLogLevel: setLogLevel,
        trace: trace,
        warn: warn
    };

})();
