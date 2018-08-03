module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            plugins: {
                src: [
                ],
                dest: 'assets/js/plugins.concat.js'
            },
            app: {
                src: ['src/js/components/*.js', 'src/js/app.js'],
                dest: 'www/assets/js/app.concat.js'
            },
        },
        uglify: {
            plugins: {
                src: 'www/assets/js/plugins.concat.js',
                dest: 'www/assets/js/build/plugins.js'
            },
            app: {
                src: 'www/assets/js/app.concat.js',
                dest: 'www/assets/js/build/app.min.js',
                options: {
                    sourceMap: true
                }
            }
        },
        svgstore: {
          options: {
            prefix : 'js-', // This will prefix each <g> ID
          },
          default : {
              files: {
                'www/assets/images/svg-sprite.svg': ['src/svg/*.svg'],
              }
            }
        },
        stylus: {
            compile: {
                options: {
                    'include css': true,
                    use: [
                        require('rupture')
                    ],
                },
                files: {
                    'www/assets/css/build/build.min.css': 'src/css/app.styl'
                }
            }
        },
        cssmin: {
          options: {
            shorthandCompacting: true,
            roundingPrecision: -1
          },
          target: {
            files: {
              'www/assets/css/build/build.min.css':
              ['node_modules/normalize-css/normalize.css',
              'www/site/plugins/embed/assets/css/embed.css',
              'www/assets/css/app.min.css']
            }
          }
        },
        watch: {
            // js: {
            //     files: ['src/js/components/*.js', 'src/js/app.js'],
            //     tasks: ['concat:app', 'uglify:app'],
            //     options: {
            //         livereload: true,
            //     }
            // },
            css: {
                files: ['src/css/**/*.styl'],
                tasks: ['stylesheets'],
                options: {
                    livereload: true,
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('javascript', ['concat', 'uglify']);
    grunt.registerTask('stylesheets', ['stylus']);
    grunt.registerTask('test', ['php', 'mocha']);
    grunt.registerTask('default', ['svgstore', 'stylesheets', 'watch']);
};
