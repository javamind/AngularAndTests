'use strict';


function WelcomeSpeaker() {

  var obj = this;

  obj.sayHello = function (name) {

    if (!name) {
      return 'Who are you ?'
    }

    try {
      return 'Hello ' + name + '(lg=' + obj.nameWidth(name) + ')';
    }
    catch (e) {
      return 'Error occured';
    }

  }

  obj.nameWidth = function (name) {
    return name ? name.length : 0;
  }
}