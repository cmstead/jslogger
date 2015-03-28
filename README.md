jslogger
========

Javascript console abstraction - Keeps logging to a minimum in a production environment

##Roadmap

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
