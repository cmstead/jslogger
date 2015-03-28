module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ["scripts/src/**"],
            options: {}
        },
        karma: {
            unit: {
                configFile: './spec/karma.config.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                sourceMap: false
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['./scripts/src/**/*.js']
                }
            }
        },
        devserver: {
            server: {
            }
        }
    });

    /* Load grunt task adapters */

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-devserver');
    grunt.loadNpmTasks('grunt-karma');

    /* Register composite grunt tasks */

    grunt.registerTask('test', ['jshint', 'karma']);

    grunt.registerTask('buildjs', ['uglify']);
    grunt.registerTask('build', ['test', 'buildjs']);

    //Special build to handle work in progress experiments.
    //NOT FOR PRODUCTION. BYPASSESS LINTING AND TESTING. BUILDS NO DOCUMENTS
    grunt.registerTask('buildrough', ['buildjs'])

    grunt.registerTask('default', ['build']);
};
