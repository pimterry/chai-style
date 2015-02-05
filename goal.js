// Start with a webdriver instance: 
var sw = require('selenium-webdriver');
var driver = new sw.Builder()
  .withCapabilities(sw.Capabilities.firefox())
  .build()
 
// And then... 
var chai = require('chai');
var chaiWebdriver = require('chai-webdriver');
chai.use(chaiWebdriver(driver));
 
// And you're good to go! 
driver.get('http://github.com');
chai.expect('#site-container h1.heading').dom.to.not.contain.text("I'm a kitty!")
