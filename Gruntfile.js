module.exports = function (grunt) {

  grunt.initConfig({
    // copy: {
    //   project: {
    //     expand: true,
    //     cwd: '.',
    //     src: ['**', '!Gruntfile.js', '!package.json', '!bower.json'],
    //     dest: 'dist'
    //   }
    // },
    //
    // clean: {
    //   dist: {
    //     src: 'dist'
    //   }
    // },

    usemin: {
      html: 'app/views/**/*.ejs' // faz o build dos .js e .css
    },

    useminPrepare: {
      options: {
        root: 'public',
        dest: 'public'
      },
      html: 'app/views/**/*.ejs' // anexa os .css e .js ao nosso pagina .html
    },

    ngAnnotate: {
      scripts: {
        expand: true,
        src: ['public/js/**/*.js']
      }
    }
  });

  // grunt.registerTask('default', ['dist', 'minifica']);
  // grunt.registerTask('dist',['clean', 'copy']);
  grunt.registerTask('minifica',['useminPrepare', 'ngAnnotate', 'concat', 'uglify', 'cssmin', 'usemin']);

  // grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-ng-annotate');
};
