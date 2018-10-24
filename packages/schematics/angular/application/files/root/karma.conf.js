// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  const frameworks = ['jasmine', '@angular-devkit/build-angular'];
  const plugins = [
    require('karma-jasmine'),
    require('karma-chrome-launcher'),
    require('karma-jasmine-html-reporter'),
    require('karma-coverage-istanbul-reporter'),
    require('@angular-devkit/build-angular/plugins/karma')
  ];
  <% if (karmaParallel) { %>
  const runInParallel = !!config.buildWebpack.options.parallel;
  console.info('Running in parallel: ' + runInParallel);
  frameworks.unshift('parallel');
  plugins.unshift(require('karma-parallel'));
  <% } %>
    config.set({
    basePath: '',
    frameworks,
    plugins,
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '<%= relativePathToWorkspaceRoot %>/coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};