/**
 * Created by ehret_g on 16/05/15.
 */
(function () {
  'use strict'

  describe('WelcomeSpeaker', function(){

    var obj;

    beforeEach(function(){
      obj = new WelcomeSpeaker();
    });

    describe('sayHello', function () {

      it('should say "Who are you" when name undefined', function(){
       expect(obj.sayHello()).toBe('Who are you ?');
      });

      it('should say "Hello Breizhcamp (lg=10)" when name is Breizhcamp', function () {
        expect(obj.sayHello('Breizhcamp')).toBe('Hello Breizhcamp(lg=10)');
      });

      it('should say "Hello Breizhcamp (lg=5)" when name is Breizhcamp', function () {

        spyOn(obj, 'nameWidth').and.returnValue(5);

        expect(obj.sayHello('Breizhcamp')).toBe('Hello Breizhcamp(lg=5)');
      });

      it('should say "Hello Breizhcamp (lg=5)" when name is Breizhcamp', function () {
        spyOn(obj, 'nameWidth').and.throwError("error");
        expect(function(){
          obj.sayHello('Breizhcamp');
        }).not.toThrow();
        expect(obj.sayHello('Breizhcamp')).toBe('Error occured');
      });
    });

    describe('nameWidth', function () {
      it('should be 0 name is undefined', function(){
       expect(obj.nameWidth()).toBe(0);
      });

      it('should be 10 when name is Breizhcamp', function(){
        expect(obj.nameWidth('Breizhcamp')).toBe(10);
      });
    });



  });

})();