# Speaker notes

*home.ctrl.spec.js*

```
 describe('HomeCtrl', function () {
     var $scope, $location, $window, HomeCtrl;

     beforeEach(module('at-controllers'));

     beforeEach(inject(function (_$controller_, _$location_) {
       $scope = {};
       $location = _$location_;
       $window = {
         location : {
           href : ''}
       };
       HomeCtrl = _$controller_('HomeCtrl', {$scope: $scope, $window: $window});
     }));

     it('should have its name in pageinfo', function () {
       expect($scope.pageinfo.name).toBe('home');
       expect($scope.pageinfo).toEqual({name: 'home'});
     });

     it('should change name in pageinfo', function () {
       $scope.changeName('test');
       expect($scope.pageinfo).toEqual({name: 'test'});
     });

     it('should navigate to external url', function () {
       $scope.goToLink('http://dev-mind.fr');
       expect($window.location.href).toBe('http://dev-mind.fr');
     });
   });
```

## Live templates

* an1 *

```
describe('HomeCtrl', function () {

    var $scope, $window;

    beforeEach($END$);

    it('should have its name in pageinfo', function () {
      expect($scope.pageinfo.name).toBe('home');
      expect($scope.pageinfo).toEqual({name: 'home'});
    });

    it('should change name in pageinfo', function () {
      $scope.changeName('test');
      expect($scope.pageinfo).toEqual({name: 'test'});
    });

    it('should navigate to external url', function () {
      $scope.goToLink('http://dev-mind.fr');
      expect($window.location.href).toBe('http://dev-mind.fr');
    });
  });
```

* an2 *

```
$window = {
        location : {
          href : ''}
      };
```

* an3 *

```
describe('Pour aller plus loin', function () {

      var $compile;

      beforeEach(inject(function($injector){
        $compile = $injector.get('$compile');
      }));

      it('should interpolate angular expression', function () {
        var expression = '<p>{{pageinfo.name}} {{1+1}}</p>';

        $END$

        expect(element.html()).toBe('home 2');
      });
    });
```

* c1 *

```
'app/bower_components/angular/angular.js',
        'app/bower_components/angular-animate/angular-animate.js',
        'app/bower_components/angular-aria/angular-aria.js',
        'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'app/bower_components/angular-material/angular-material.min.js',

        'app/bower_components/angular-mocks/angular-mocks.js',

        'app/main/**/*.js',
        'app/main/**/*.html',
```

* c2 *

```
'app/main/**/*.html': ['ng-html2js']
```

* c3 *

```
ngHtml2JsPreprocessor: {
      stripPrefix: 'app/main/',
      moduleName: 'at-templates'
    },
```

* c4 *

```
'app/main/**/*.js': ['coverage']
```

* c5 *

```
coverageReporter: {
      type: 'lcov',
      dir: '.tmp/reports/coverage/'
    },
```

* j1 *

```
it('should return length 0 when name is undefined', function () {
       var obj = new WelcomeSpeaker();
        expect(obj.nameLength()).toBe(0);
      });
```

* j2 *

```
describe('sayHello', function(){

    });

    describe('nameLength', function(){

    });
```

* j3 *

```
it('should say "Hello Breizhcamp (lg=10)" when name is Breizhcamp', function(){
        expect(obj.sayHello('Breizhcamp')).toBe('Hello Breizhcamp(lg=10)');
      });
```

* j4 *

```
it('should be 10 when name is Breizhcamp', function(){
        expect(obj.nameLength('Breizhcamp')).toBe(10);
      });
```

* j5 *

```
it('should say "Error occured" when name length generate Error', function () {
      spyOn(obj, 'nameLength').and.throwError(new Error());
      expect(obj.sayHello('Breizhcamp')).toBe('Error occured');
    });
```

* o1 *

```
'use strict';


function WelcomeSpeaker() {

  var obj = this;

  obj.sayHello = function (name) {

    if(!name){
      return 'Who are you ?'
    }

    try{
      return 'Hello ' + name + '(lg='+ obj.nameLength(name) + ')';
    }
    catch(e){
      return 'Error occured';
    }

  }

  obj.nameLength = function (name) {
    return name ? name.length : 0;
  }
}
```

* pro1 *

```
describe('homepage', function () {

    beforeEach(function () {
      browser.$END$
    });

    it('should filter talk list',function(){

    });
  });
```

* pro2 *

```
suites: {
    abc: 'test/e2e/abc/**/*.spec.js',
    home: 'test/e2e/home/**/*.spec.js',
    talks: 'test/e2e/talks/**/*.spec.js'
  },
```

