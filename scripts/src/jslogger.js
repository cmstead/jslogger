var jslogger = (function(){
    'use strict';

    var logLevels = {
            log: 2,
            info: 2,
            warn: 1,
            trace: 1,
            error: 0
        },
        logLevel = 0;

    function apply(fn, args){
        fn.apply(null, args);
    }

    function getLogLevel(){
        var storedLevel = decodeURIComponent(
                    document.cookie.replace(
                        new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent('logLevel')
                            .replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;

        return (!!storedLevel) ? logLevel : parseInt(storedLevel, 10);
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
