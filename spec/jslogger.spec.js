(function(){
    'use strict';

    describe('jslogger', function(){

        it('should be an object', function(){
            expect(typeof jslogger).toBe('object');
        });

        describe('log', function(){
            var log;

            beforeEach(function(){
                jslogger.setLogLevel(2);
                log = console.log;
            });

            afterEach(function(){
                console.log = log;
            });

            it('should call console.log', function(){
                console.log = jasmine.createSpy('log');

                jslogger.log();

                expect(console.log).toHaveBeenCalled();
            });

            it('should call console.log with a single argument', function(){
                console.log = jasmine.createSpy('log');

                jslogger.log('test');

                expect(console.log).toHaveBeenCalledWith('test');
            });

            it('should call console.log with a single argument', function(){
                console.log = jasmine.createSpy('log');

                jslogger.log('test1', 'test2', 'test3', 'test4');

                expect(console.log).toHaveBeenCalledWith('test1', 'test2', 'test3', 'test4');
            });

            it('should not throw an error if console.log does not exist', function(){
                console.log = undefined;

                function logger(){
                    jslogger.log();
                }

                expect(logger).not.toThrow();
            });
        });

        describe('error', function(){

            var error;

            beforeEach(function(){
                jslogger.setLogLevel(0);
                error = console.error;
            });

            afterEach(function(){
                console.error = error;
            });

            it('should call console.error', function(){
                console.error = jasmine.createSpy('error');

                jslogger.error();

                expect(console.error).toHaveBeenCalled();
            });

            it('should call console.error with a single argument', function(){
                console.error = jasmine.createSpy('error');

                jslogger.error('test');

                expect(console.error).toHaveBeenCalledWith('test');
            });

            it('should call console.error with a single argument', function(){
                console.error = jasmine.createSpy('error');

                jslogger.error('test1', 'test2', 'test3', 'test4');

                expect(console.error).toHaveBeenCalledWith('test1', 'test2', 'test3', 'test4');
            });

            it('should not throw an error if console.error does not exist', function(){
                console.error = undefined;

                function logger(){
                    jslogger.error();
                }

                expect(logger).not.toThrow();
            });
        });

        describe('info', function(){

            var info;

            beforeEach(function(){
                jslogger.setLogLevel(2);
                info = console.info;
            });

            afterEach(function(){
                console.info = info;
            });

            it('should call console.info', function(){
                console.info = jasmine.createSpy('info');

                jslogger.info();

                expect(console.info).toHaveBeenCalled();
            });

            it('should call console.info with a single argument', function(){
                console.info = jasmine.createSpy('info');

                jslogger.info('test');

                expect(console.info).toHaveBeenCalledWith('test');
            });

            it('should call console.info with a single argument', function(){
                console.info = jasmine.createSpy('info');

                jslogger.info('test1', 'test2', 'test3', 'test4');

                expect(console.info).toHaveBeenCalledWith('test1', 'test2', 'test3', 'test4');
            });

            it('should not throw an error if console.info does not exist', function(){
                console.info = undefined;

                function logger(){
                    jslogger.info();
                }

                expect(logger).not.toThrow();
            });
        });

        describe('warn', function(){

            var warn;

            beforeEach(function(){
                jslogger.setLogLevel(1);
                warn = console.warn;
            });

            afterEach(function(){
                console.warn = warn;
            });

            it('should call console.warn', function(){
                console.warn = jasmine.createSpy('warn');

                jslogger.warn();

                expect(console.warn).toHaveBeenCalled();
            });

            it('should call console.warn with a single argument', function(){
                console.warn = jasmine.createSpy('warn');

                jslogger.warn('test');

                expect(console.warn).toHaveBeenCalledWith('test');
            });

            it('should call console.warn with a single argument', function(){
                console.warn = jasmine.createSpy('warn');

                jslogger.warn('test1', 'test2', 'test3', 'test4');

                expect(console.warn).toHaveBeenCalledWith('test1', 'test2', 'test3', 'test4');
            });

            it('should not throw an error if console.warn does not exist', function(){
                console.warn = undefined;

                function logger(){
                    jslogger.warn();
                }

                expect(logger).not.toThrow();
            });
        });

        describe('trace', function(){

            var trace;

            beforeEach(function(){
                jslogger.setLogLevel(1);
                trace = console.trace;
            });

            afterEach(function(){
                console.trace = trace;
            });

            it('should call console.trace', function(){
                console.trace = jasmine.createSpy('trace');

                jslogger.trace();

                expect(console.trace).toHaveBeenCalled();
            });

            it('should not throw an error if console.warn does not exist', function(){
                console.trace = undefined;

                function logger(){
                    jslogger.trace();
                }

                expect(logger).not.toThrow();
            });
        });

        describe('setLogLevel', function(){

            it('should set log level cookie', function(){
                document.cookie = 'test=test';
                jslogger.setLogLevel(0);
                expect(document.cookie.match(/logLevel/).length).toBe(1);
            });

            it('should not call log if log level is < 2', function(){
                jslogger.setLogLevel(1);
                console.log = jasmine.createSpy('log');
                jslogger.log('test');
                expect(console.log).not.toHaveBeenCalled();
            });

            it('should not call warn if log level is < 1', function(){
                jslogger.setLogLevel(0);
                console.warn = jasmine.createSpy('warn');
                jslogger.warn('test');
                expect(console.warn).not.toHaveBeenCalled();
            });
        });

        describe('getLogLevel', function(){

            beforeEach(function(){
                jslogger.setLogLevel(0);
            });

            it('Should return log level', function(){
                jslogger.setLogLevel(1);
                expect(jslogger.getLogLevel()).toBe(1);
            });

        });

    });

})();
