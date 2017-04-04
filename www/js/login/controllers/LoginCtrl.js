/**
 * Created by constantin.crismaru on 3/26/2017.
 */
(function () {
  'use strict';

  angular.module('app.login.controllers', [])
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', '$state', '$ionicLoading', '$cordovaOauth', '$window'];

  function LoginCtrl($scope, $state, $ionicLoading, $cordovaOauth, $window) {
    /**
     * Injections
     */

    /**
     * Private properties
     */

    /**
     * Private methods
     */

    /**
     * Scope properties
     */

    /**
     * Scope methods
     */

    $scope.login = function() {
      $ionicLoading.show({
          template: '<ion-spinner icon="android" class="loader-app"></ion-spinner><div class="loader-text">Loading...</div>'
       });

      $cordovaOauth.facebook("1637916846222464", ["public_profile"]).then(function (result) {
        $window.localStorage.accessToken = result.access_token;
        $state.transitionTo('tab.dashboard', '', { reload: true, inherit: true, notify: true });//reload
      }, function (error) {
        $ionicLoading.hide();
        console.log(error);
      });

    };


    /**
     * Init Method
     */
    (function init() {
    })();
  }
})();
