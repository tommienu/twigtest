 /*
  * Gruntfile only for my own usage, don't care about others ;)
 */

 module.exports = function(grunt){

// Project configuration.
require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

  // Linting the HTML to check for obvious errors
  htmlhint: {
    build: {
      options: {
        'tag-pair': true,
        'tagname-lowercase': true,
        'attr-lowercase': true,
        'attr-value-double-quotes': true,
        'doctype-first': true,
        'spec-char-escape': true,
        'id-unique': true,
        'head-script-disabled': true,
        'style-disabled': true
      },
      src: ['*.html']
    }
  },

  // Minify Javascript.
  uglify: {
    build: {
      files: {
        'build/js/main.min.js': ['build/js/main.js'],
        'build/js/jquery.min.js': ['build/js/libs/jquery.js'],
        'build/js/modernizr.min.js': ['build/js/libs/modernizr.js']
      }
    }
  },
  // Condense css wih css-condense ( https://github.com/rstacruz/css-condense ), 
  //   settings: https://github.com/mediapart/grunt-cssc
  cssc: {
    build: {
      options: {
        sortSelectors             : true,
        lineBreaks                : true,
        sortDeclarations          : true,
        consolidateViaDeclarations: true,
        consolidateViaSelectors   : true,
        consolidateMediaQueries   : true,
        compress                  : true,
        sort                      : false,
        safe                      : false
      },
      files: {
        'build/css/screen.css': 'build/css/screen.css'
      }
    }
  },
  // Css minify, done after css-c to reduce it as much as possible.
  cssmin: {
    build: {
      src: 'build/css/screen.css',
      dest: 'build/css/screen.css'
    }
  },
    // SCSS to CSS, sourcemaps on.
    sass: {
      build: {
        options: {
          'sourcemap': true
        },
        files: {
          'build/css/screen.css': 'sass/screen.scss'
        }
      }
    },
    // Jade compiler
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          },
          pretty: true
        },
        files: {
          "module/Application/view/application/index/index.twig": "module/Application/jade/index.jade",
          "module/Application/view/layout/layout.phtml": "module/Application/jade/layout.jade"
        }
      }
    },
  // Watch-acions, no minification, js needs to be run initially.
  watch: {
    jade: {
      files: ['module/Application/jade/*.jade', 'module/Application/jade/partials/*.jade'],
      tasks: ['html']
    },
    htmlhint: {
      files: ['build/*.html'],
      tasks: ['htmlhint']
    },
    css: {
      files: ['sass/**/*.scss'],
      tasks: ['css']
    },
    options: {
      livereload: true,
    },
  }
  });
    grunt.registerTask('default', ['watch']);  // Watching by default
    grunt.registerTask('start',  ['jade', 'htmlhint', 'uglify', 'sass']);
    grunt.registerTask('js',  ['uglify']); 
    grunt.registerTask('css',  ['sass']);
    grunt.registerTask('html',  ['jade']);
  // Proper build action
  grunt.registerTask('build',  ['jade', 'htmlhint', 'uglify', 'sass', 'cssc', 'cssmin']);
};