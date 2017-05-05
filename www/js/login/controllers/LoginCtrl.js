/**
 * Created by constantin.crismaru on 3/26/2017.
 */
(function () {
  'use strict';

  angular.module('app.login.controllers', [])
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', '$state', '$injector', '$ionicLoading', '$cordovaOauth', '$window'];

  function LoginCtrl($scope, $state, $injector, $ionicLoading, $cordovaOauth, $window) {
    /**
     * Injections
     */

    var loginService = $injector.get('loginService');

    /**
     * Private properties
     */

    /**
     * Private methods
     */

    function checkConnection() {
      var networkState = navigator.connection.type;

      var states = {};
      states[Connection.UNKNOWN] = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI] = 'WiFi connection';
      states[Connection.CELL_2G] = 'Cell 2G connection';
      states[Connection.CELL_3G] = 'Cell 3G connection';
      states[Connection.CELL_4G] = 'Cell 4G connection';
      states[Connection.CELL] = 'Cell generic connection';
      states[Connection.NONE] = 'No network connection';

      return states[networkState];
    }

    /**
     * Scope properties
     */

    $scope.modal = null;

    /**
     * Scope methods
     */

    $scope.login = function () {
      if (checkConnection() === 'No network connection') {
        $scope.modal.show();
      } else {
        $ionicLoading.show({
          template: '<ion-spinner icon="android" class="loader-app"></ion-spinner><div class="loader-text">Loading...</div>'
        });

        $cordovaOauth.facebook("1637916846222464", ["public_profile"]).then(function (result) {
          $window.localStorage.accessToken = result.access_token;
          $state.transitionTo('tab.dashboard', '', {reload: true, inherit: true, notify: true});//reload
        }, function (error) {
          $ionicLoading.hide();
        });
      }
    };

    $scope.$on('locationError', function (event, data) {
      $scope.modal.show();
    });

    /**
     * Init Method
     */
    (function init() {
      loginService.getLoginError($scope).then(function (modal){
        $scope.modal = modal;
      })
    })();
  }
})();
