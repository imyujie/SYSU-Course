/*global module:false*/
module.exports = function(grunt) {

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
    sass: {                              // Task 
      dist: {                            // Target 
        options: {                       // Target options 
          style: 'compressed'
        },
        files: {                         // Dictionary of files 
          'dist/css/app.css': 'client/sass/**/*.{scss,sass}'
        }
      }
    },
    tmod: {
      template: {
        src: 'tpl/src/**/*.html',
        dest: 'client/js/template.js',
        options: {
          combo: true,
          base: './tpl/src'
        } 
      }
    },
    browserify: {
      vendor: {
        src: ['lib/**/*.js'],
        dest: 'dist/js/vendor.js',
        options: {
          require: ['jquery'],
          //alias: ['./lib/moments.js:momentWrapper']
        }
      },

      //standalone browserify watch - do NOT use with grunt-watch
      client: {
        src: ['client/**/*.js'],
        dest: 'dist/js/client.js',
        options: {
          external: ['jQuery'],
          watch: true,
          keepAlive: true
        }
      },

      //working with grunt-watch - do NOT use with keepAlive above
      watchClient: {
        src: ['client/**/*.js'],
        dest: 'dist/js/client.js',
        options: {
          external: ['jQuery'],
          watch: true
        }
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['dist/js/vendor.js', 'dist/js/client.js'],
        dest: 'dist/js/app.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/js/app.min.js'
      }
    },
    watch: {
      template: {
        files: '<%=tmod.template.src%>',
        tasks: ['tmod'],
        options: {
          spawn: false
        }
      },
      sass: {
        files: ['lib/sass/**/*.{scss,sass}','sass/_partials/**/*.{scss,sass}'],
        tasks: ['sass'],
        options: {
          livereload: true,
        }
      },
      concat: {
        files: ['dist/js/app.js'],
        tasks: ['concat']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-tmod');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', ['tmod', 'sass', 'browserify:vendor', 'browserify:watchClient', 'concat', 'uglify']);
  grunt.registerTask('browserifyWithWatch', [
    'browserify:vendor',
    'browserify:watchClient',
    'watch:concat'
  ]);
};
