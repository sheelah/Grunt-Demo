'use strict';
module.exports = function(grunt) {

  var appConfig = grunt.file.readJSON('app_config.json');

  grunt.initConfig({
    watch: {
      sass: {
        files: ['assets/sass/**/*.{scss,sass}'],
        tasks: ['sass:dev', 'postcss']
      },
      options: {
        livereload: true
      }
    },
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
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'assets/stylesheets/*.css',
            '**/*.html',
            'assets/js/**/*.js',
            'assets/images/*.jpg',
            'assets/images/*.png',
          ],
        },
        options: {
          watchTask: true,
          debugInfo: true,
          logConnections: true,
          notify: true,
          proxy: appConfig['proxy'],
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

  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-postcss');


  // register tasks
  grunt.registerTask('default', ['dev']);
  grunt.registerTask('dev', ['browserSync', 'watch']);
  grunt.registerTask('build', ['sass:dev', 'postcss:dev']);

};
