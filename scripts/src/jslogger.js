var jslogger = (function(console, document){
    'use strict';

    function apply(fn, args){
        fn.apply(null, args);
    }

    /*function getLogLevel(){
        return decodeURIComponent(
                    document.cookie.replace(
                        new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent('logLevel')
                            .replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
    }*/

    function setLogLevel(level){
        document.cookie = 'logLevel=' + level;
    }

    function parseArgs(args){
        return Array.prototype.slice.call(args, 0);
    }

    function consoleCaller(fnKey, args){
        if(!!console && typeof console[fnKey] === 'function'){
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

    return {
        error: error,
        info: info,
        log: log,
        setLogLevel: setLogLevel,
        trace: trace,
        warn: warn
    };

})(console, document);