module.exports = function(grunt) {
  // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt);

  var configs = require('load-grunt-configs')(grunt, {
    config: {
      src: 'tasks/*.js',
    },
  });

  grunt.initConfig(configs);

  grunt.registerTask('copy-deps', 'Copy dep from node_modules into the tree',
                     ['clean:deps', 'copy']);

  grunt.registerTask('build', ['clean:dist', 'sass', 'webpack']);
  grunt.registerTask('serve', 'Dev server with webpack hot module reloading',
    ['clean:dist', 'sass:dev', 'webpack-dev-server:start', 'watch:sass']);
  grunt.registerTask('watch-static', 'Watches and rebuilds JS + CSS',
    ['clean:dist', 'sass:dev', 'webpack:dev', 'watch:sass']);
  grunt.registerTask('gh-publish', 'Publish source to Github Pages',
                     ['build', 'gh-pages']);
};
