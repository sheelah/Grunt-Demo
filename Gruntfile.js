'use strict';
module.exports = function(grunt) {

  var appConfig = grunt.file.readJSON('app_config.json');

  grunt.initConfig({
    watch: {
      sass: {
        files: ['assets/sass/**/*.{scss,sass}'],
        tasks: ['sass:dev']
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
            'images/*.jpg',
            'images/*.png',
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

  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-browser-sync');


  // register tasks
  grunt.registerTask('default', ['dev']);
  grunt.registerTask('dev', ['browserSync', 'watch']);
  grunt.registerTask('build', ['sass:dev']);

};
