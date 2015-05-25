'use strict';


function WelcomeSpeaker() {

  var obj = this;

  obj.sayHello = function (name) {

    if (!name) {
      return 'Who are you ?'
    }

    try {
      return 'Hello ' + name + '(lg=' + obj.nameLength(name) + ')';
    }
    catch (e) {
      return 'Error occured';
    }

  }

  obj.nameLength = function (name) {
    return name ? name.length : 0;
  }
}