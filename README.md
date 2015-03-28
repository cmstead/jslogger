JSLogger
========

Javascript console abstraction - Keeps logging to a minimum in a production environment

##Usage

Currently jslogger is intended for web applications only.

*Include in html doc*

    <script src="path/to/libraries/jslogger.js"></script>

*In code*

    jslogger.log('I\'m going to become log output');
    jslogger.log('%cI am output with style', 'color: #cccccc');
    jslogger.debug('I am a debug message. I will not cause a deprecation warning');
    //And so on

*In console*

    jslogger.setLogLevel(3); //This will output everything up to debug level
    jslogger.setLogLevel(0); //This will output only errors
    jslogger.getLogLevel(); //Outputs log level, currently 0

*Supported log levels*

Each log level outputs everything from a lower log level and also includes listed functions.

- 0: Error
- 1: Warn
- 2: Info and log
- 3: Debug
- 4: Trace

##Roadmap

- Provide a configuration abstraction to allow for logging in node applications
- Add expanded console support for modern API support (grouping and other modern functions)

##Update log

###v1.2.0

- Added debug function which performs the following mapping at log level 3: debug -> console.log
- Moved trace output to log level 4
- Refactored code to eliminate unnecessarily repeated function behaviors
- Pulled multi-parameter logging validation out of consoleCaller
- Re-organized code for easier identification of critical moving parts
- Added function mapping to allow for extended function naming and defintions without requiring complex logic
- Adopted some principles of 'BOT' architecture model to simplify program logic and express expectations in a more declarative way

###v1.1.1

- Fixed log level check. Regex was failing in a production environment
