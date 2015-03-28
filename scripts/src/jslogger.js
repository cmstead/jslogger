var jslogger = (function(){
    'use strict';

        //Log level map defines output expectations
    var logLevels = {
            debug: 3,
            error: 0,
            info: 2,
            log: 2,
            trace: 3,
            warn: 1
        },

        //Map functions to exposed function keys
        functionMap = {
            debug: 'log',
            error: 'error',
            info: 'info',
            log: 'log',
            trace: 'trace',
            warn: 'warn'
        },

        //Default object log level
        logLevel = 0;


    /**
    * Utility functions to simplify the process of building console abstractions
    * Many of these functions are analogs or simplifications of functional
    * behaviors.
    */

    //Apply argument array to function in console context
    function apply(fn, args){
        fn.apply(console, args);
    }

    //Take the argument pseudo-array and slice it to make it an apply-friendly vector
    function sliceArgs(args){
        return Array.prototype.slice.call(args, 0);
    }

    //Apply function key to console caller for abstraction definition
    function partialDefn(fnKey){
        return function(){
            consoleCaller(fnKey, sliceArgs(arguments));
        };
    }

    /**
    * Primary library code. This is code that is particular and distinct to
    * jslogger. Any novel implementations should exist below this point.
    */

    //Extract log level key from cookies
    function extractValue(){
        var tokens = document.cookie.split(';'),
            cookieValue = '';

        tokens.forEach(function(token){
            if(token.match(/logLevel/) !== null){
                cookieValue = token.split(',')[0].split('=')[1];
            }
        });

        return cookieValue;
    }

    //Verify that console output is appropriate given current environment state and log level
    function checkConsoleOutputState(referenceKey, fnKey){
        var outputOkay = !!console; //If console does not exist, do not output

        outputOkay = outputOkay && typeof console[fnKey] === 'function'; //Output type must be a function
        outputOkay = outputOkay && logLevel >= logLevels[referenceKey]; //Only output when log level matches required level

        return outputOkay;
    }

    //Call console function on acceptable output state
    function consoleCaller(referenceKey, args){
        var fnKey = functionMap[referenceKey],
            outputOkay = checkConsoleOutputState(referenceKey, fnKey);

        if(outputOkay){
            apply(console[fnKey], args);
        }
    }

    //Capture and return log level based on object and environment state
    function getLogLevel(){
        var storedLevel = extractValue();
        return (!!storedLevel) ? parseInt(storedLevel, 10) : logLevel;
    }

    //Accept new log level and update object and environment state
    function setLogLevel(level){
        logLevel = level;
        document.cookie = 'logLevel=' + level;
    }

    //On first load, set object state to match global preset log level
    //This preserves log level set in a prior session
    setLogLevel(getLogLevel());

    //Expose world-usable functions
    return {
        getLogLevel: getLogLevel,
        setLogLevel: setLogLevel,

        debug: partialDefn('debug'),
        error: partialDefn('error'),
        info: partialDefn('info'),
        log: partialDefn('log'),
        trace: partialDefn('trace'),
        warn: partialDefn('warn')
    };

})();
