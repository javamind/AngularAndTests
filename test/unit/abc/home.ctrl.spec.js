describe('HomeCtrl', function () {

  var $scope, $window;

  beforeEach();

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