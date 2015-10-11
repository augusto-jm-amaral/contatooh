var URL = 'http://localhost:3000';

exports.config = {
  seleniumAddress: ' http://127.0.0.1:4444/wd/hub',
  specs: ['../test/e2e/**/*.js'],
  baseUrl: URL,
  onPrepare: function () {
    browser.driver.get('http://localhost:3000');
    browser.driver.findElement(by.id('entrar')).click();
    browser.driver.findElement(by.id('login_field')).sendKeys('');
    browser.driver.findElement(by.id('password')).sendKeys('');
    browser.driver.findElement(by.name('commit')).click();

    return browser.driver.wait(function () {
      return browser.driver.getCurrentUrl().then(function (url) {
        return /contatos/.test(url);
      });
    }, 10000);
  }
};
