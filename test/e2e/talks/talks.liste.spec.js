/**
 * Created by ehret_g on 17/05/15.
 */
(function () {
  'use strict'

  describe('homepage', function () {

    beforeEach(function () {
      browser.get('http://localhost:3000/talk');
    });

    it('should have a list of talks', function () {
      expect(element.all(by.repeater('talk in talks.list')).count()).toBe(64);
    });

    it('should filter only keynote if I deselect options for Talks and Workshops', function () {
      browser.pause();
      element(by.model('talks.filter.talk')).click();
      element(by.model('talks.filter.workshop')).click();
      expect(element.all(by.repeater('talk in talks.list')).count()).toBe(7);
    });

    it('should filter talk if I enter "test"', function () {
      element(by.model('talks.searchText')).sendKeys('Innovation');
      var talks = element.all(by.repeater('talk in talks.list'));
      expect(talks.count()).toBe(5);
    });

    it('should open a dialog when user click on a user in the list', function () {
      element(by.className('md-list-item-text')).click();
      expect(element(by.className('md-dialog-container')).isDisplayed()).toBeTruthy();
      expect(element(by.className('md-dialog-container')).element(by.tagName('h3')).getText()).toBe('North Dan');
    });
  });
})();