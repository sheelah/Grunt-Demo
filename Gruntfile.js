'use strict';
module.exports = function(grunt) {

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

  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');


  // register tasks
  grunt.registerTask('default', ['dev']);
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('build', ['sass:dev']);

};
