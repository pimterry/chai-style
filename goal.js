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
      sw.promise.map(els, function(e) {
        return e.getLocation();
      }).then(function(locations) {
        self.assert(locations.every(function(location) {
          return location.x === locations[0].x;
        }, "Not all left positions were equal"));
        return typeof done === "function" ? done() : void 0;
      });
    });      
  });
  chai.Assertion.addMethod('equalWidth', function(done) {
    var self = this;
    if (!utils.flag(this, 'dom')) {
      throw new Error('Can only test size of dom elements');
    }
    return $.all(this._obj).then(function(els) {
      sw.promise.map(els, function(e) {
        return e.getSize();
      }).then(function(sizes) {
        self.assert(sizes.every(function(size) {
          return size.width === sizes[0].width;
        }, "Not all sizes were equal"));
        return typeof done === "function" ? done() : void 0;
      });
    });      
  });
  chai.Assertion.addMethod('equalHeight', function(done) {
    var self = this;
    if (!utils.flag(this, 'dom')) {
      throw new Error('Can only test size of dom elements');
    }
    return $.all(this._obj).then(function(els) {
      sw.promise.map(els, function(e) {
        return e.getSize();
      }).then(function(sizes) {
        self.assert(sizes.every(function(size) {
          return size.height === sizes[0].height;
        }, "Not all sizes were equal"));
        return typeof done === "function" ? done() : void 0;
      });
    });      
  });
});
 
// And you're good to go! 
driver.get('http://github.com');

loginElements = 'input[name="user[email]"], input[name="user[login]"], input[name="user[password]"], button.primary'

chai.expect(loginElements).dom.to.be.leftAligned()
chai.expect(loginElements).dom.to.have.equalWidth()
