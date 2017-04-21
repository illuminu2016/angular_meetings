/**
 * Created by constantin.crismaru on 4/7/2017.
 */
(function () {
  'use strict';

  angular.module('app.login.factories', [])

    .factory('loginService', loginService);

  loginService.$inject = ['$q', '$ionicModal'];

  function loginService($q, $ionicModal) {

    function getLoginError(scope) {
      var deferred = $q.defer(),
          modal =$ionicModal.fromTemplate('' +
            '<div class="modal">' +
            '<header class="bar bar-header bar-positive"> ' +
            '<h1 class="title">Login Error</h1>' +
            '</header>' +
            '<content has-header="true" padding="true" class="modal-content">' +
            '<div class="reason-title">' +
            '<div class="reason-info">For some reason you can\'t login into Malinoo.<br> Below are some possible reasons for that:</div>' +
            '<div class="footer-reason"><div>The app can\'t communicate with Facebook api.</div>' +
            '<div>We can\'t determine your current location.</div>' +
            '<div>Please verify internet connection and check location service on your device.</div>' +
            '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<a class="modal-link-btn" ng-click="modal.hide()">Ok</a>' +
            '</div>' +
            '</content>' +
            '</div>', {
            scope: scope,
            animation: 'slide-in-down'
          });

          deferred.resolve(modal);

      return deferred.promise;
    }

    return {
      getLoginError: getLoginError
    };
  }

})();


