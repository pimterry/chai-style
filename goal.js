// Start with a webdriver instance: 
var sw = require('selenium-webdriver');
var driver = new sw.Builder()
  .withCapabilities(sw.Capabilities.firefox())
  .build()
 
// And then... 
var chai = require('chai');
var chaiWebdriver = require('chai-webdriver');
chai.use(chaiWebdriver(driver));

sizzle = require('webdriver-sizzle')
var $ = sizzle(driver, sw);

chai.use(function (chai, utils) {
  chai.Assertion.addMethod('leftAligned', function(done) {
    var self = this;
    if (!utils.flag(this, 'dom')) {
      throw new Error('Can only test alignment of dom elements');
    }
    return $.all(this._obj).then(function(els) {
      self.assert(false, 'Should be left aligned');
      return typeof done === "function" ? done() : void 0;
    });      
  });
  chai.Assertion.addMethod('equalWidth', function(done) {
    var self = this;
    if (!utils.flag(this, 'dom')) {
      throw new Error('Can only test size of dom elements');
    }
    return $.all(this._obj).then(function(els) {
      self.assert(false, 'Should have equal width');
      return typeof done === "function" ? done() : void 0;
    });      
  });
});
 
// And you're good to go! 
driver.get('http://github.com');

loginElements = 'input[name="user[email]"], input[name="user[name]"], input[name="user[password]"], button.primary'

chai.expect(loginElements).dom.to.be.leftAligned()
chai.expect(loginElements).dom.to.have.equalWidth()
