// Start server with: webdriver-manager start
// Execute with: protractor exercise3.js

exports.config = {
	capabilities: {
		'browserName': 'chrome'
	},
	seleniumAddress: 'http://localhost:4444/wd/hub',
	framework: 'jasmine',
	specs: ['exercise3code.js'],
	SELENIUM_PROMISE_MANAGER: false,
	stopSpecOnExpectationFailure: true,
	jasmineNodeOpts: {
		defaultTimeoutInterval: 60000,
		stopSpecOnExpectationFailure: true
	}
};