// An example configuration file.
exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: [
    'app/bower_components/angular/angular.js',
    'app/bower_components/angular-animate/angular-animate.js',
    'app/bower_components/angular-aria/angular-aria.js',
    'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'app/bower_components/angular-material/angular-material.min.js',

    'app/bower_components/angular-mocks/angular-mocks.js',

    'app/main/**/*.js',
    'app/main/**/*.html',
    'test/e2e/**/*.js'
  ],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};