config = require('./config.js')();

exports.config = {
  sauceUser : config.sauceUser,
  sauceKey : config.sauceKey,
  capabilities : {
    'name': config.sauceTestName,
    'browserName': 'chrome',
    'tunnel-identifier': config.travisJobNumber,
    'build': config.travisBuild
  },
  specs: ['../test/e2e/**/*.js'],
  onPrepare: function () {
    browser.manage().timeouts().pageLoadTimeout(100000);
    browser.driver.get('http://localhost:3000');
    browser.driver.wait(function () {
      return browser.driver.getCurrentUrl().then(function (url) {
        return /auth/.test(url);
      });
    }, 10000);
    browser.driver.findElement(by.id('entrar')).click();
    browser.driver.findElement(by.id('login_field')).sendKeys(config.seleniumUser);
    browser.driver.findElement(by.id('password')).sendKeys(config.seleniumUserPassword);
    browser.driver.findElement(by.name('commit')).click();

    return browser.driver.wait(function () {
      return browser.driver.getCurrentUrl().then(function (url) {
        return /contatos/.test(url);
      });
    }, 10000);
  }
};
