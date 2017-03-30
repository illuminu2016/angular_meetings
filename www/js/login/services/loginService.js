/**
 * Created by constantin.crismaru on 3/26/2017.
 */
(function () {
    'use strict';

    angular.module('app.login.factories', [])

      .factory('loginService', LoginService);

    LoginService.$inject = ['$q', '$timeout'];

    function LoginService($q, $timeout) {

      function loginInApp(username, password) {
        var requestObj = {
            username: username,
            password: password
          },
          deferred = $q.defer();

        if (!!username && !!password) {
          var response = '200';
          //TODO
          $timeout(function() {
            deferred.resolve(response);
          }, 100);

        }

        return deferred.promise;
      }

      return {
        login: loginInApp
      };
    }

  })();


