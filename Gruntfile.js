/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        clean: ["dist"],
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src/', src: ['**/*.html'], dest: 'dist/'},
                    {expand: true, cwd: 'src/vendor/', src: ['**/*'], dest: 'dist/'}
                ]
            }
        },
        concat_css: {
            options: {},
            all: {
                src: ["src/**/*.css", "!src/vendor/**/*"],
                dest: "dist/css/styles.min.css"
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/css/styles.min.css': ['dist/css/styles.min.css']
                }
            }
        },
        concat: {
            options: {
                separator: ';\n'
            },
            dist: {
                src: ['src/**/*.js', '!src/vendor/**'],
                dest: 'dist/js/scripts.min.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'dist/js/scripts.min.js': ['dist/js/scripts.min.js']
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task.
    grunt.registerTask('default',
        ['newer:copy', 'newer:concat_css', 'newer:cssmin', 'newer:concat', 'newer:uglify']);

};
