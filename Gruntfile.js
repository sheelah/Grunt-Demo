'use strict';
module.exports = function(grunt) {

  var appConfig = grunt.file.readJSON('app_config.json');

  // load all grunt tasks from package.json automatically
  require('load-grunt-tasks')(grunt);

  // Show elapsed time
  require('time-grunt')(grunt);

  grunt.initConfig({

    // watch for changes and run tasks upon change
    watch: {
      sass: {
        files: ['assets/sass/**/*.{scss,sass}'],
        tasks: ['sass:dev', 'postcss']
      },
      js: {
        files: '<%= jshint.all %>',
        tasks: ['jshint'],
        options: {
          spawn: false,
        }
      },
      options: {
        livereload: true
      }
    },

    // compile Sass
    sass: {
      options: {
        sourceMap: true,
        sourceMapContents: true
      },
      dev: {
        options: {
          outputStyle: 'compressed',
        },
        files: [{
          expand: true,
          cwd: 'assets/sass',
          src: ['*.scss'],
          dest: 'assets/stylesheets',
          ext: '.css'
        }]
      }
    },

    // browser sync
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'assets/stylesheets/*.css',
            '**/*.html',
            'assets/js/**/*.js',
            'assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
          ],
        },
        options: {
          watchTask: true,
          debugInfo: true,
          logConnections: true,
          notify: true,
          proxy: appConfig.proxy,
          ghostMode: {
            scroll: true,
            links: true,
            forms: true
          }
        }
      }
    },

    // postcss
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: ['last 2 versions', 'ie 9', 'ios 6', 'android 4']})
        ]
      },
      dev: {
        src: 'assets/stylesheets/*.css'
      }
    },

    // javascript linting
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        node: true // enable node code
      },
      js: {
        options: {
          curly: true,
          eqeqeq: true,
          immed: true,
          latedef: true,
          newcap: true,
          noarg: true,
          sub: true,
          undef: true,
          unused: true,
          boss: true,
          eqnull: true,
          browser: true,
          globals: {
            jQuery: true,
            $: true,
          }
        }
      },
      all: ['Gruntfile.js', 'assets/js/src/*.js'],
    },

    // concatenate JS files
    concat: {
      options: {
      stripBanners: true,
      nonull: true,
    },
      main: {
        src: 'assets/js/src/*.js',
        dest: 'assets/js/site.js'
      }
    },

    // minify concatenated JS and make source maps
    uglify: {
      main: {
        options: {
          sourceMap: true,
          sourceMapIncludeSources: true,
        },
        src: '<%= concat.main.dest %>',
        dest: 'assets/js/site.min.js'
      }
    },

    // image optimization
    imagemin: {
      main: {
        options: {
          optimizationLevel: 7,
          progressive: true,
          interlaced: true
        },
        files: [{
          expand: true,
          cwd: 'assets/images/src',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'assets/images/'
        }]
      }
    },

  });

  // register tasks
  grunt.registerTask('default', ['dev']);
  grunt.registerTask('dev', ['browserSync', 'watch']);
  grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'sass:dev', 'postcss:dev', 'imagemin']);
  grunt.registerTask('lint', ['jshint']);

};
