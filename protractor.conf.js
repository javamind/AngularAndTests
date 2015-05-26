// An example configuration file.
exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['test/e2e/**/*.spec.js'],

  suites: {
    abc: 'test/e2e/abc/**/*.spec.js',
    home: 'test/e2e/home/**/*.spec.js',
    talks: 'test/e2e/talks/**/*.spec.js'
  },

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
