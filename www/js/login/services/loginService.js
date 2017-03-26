/**
 * Created by constantin.crismaru on 3/26/2017.
 */
(function () {
    'use strict';

    angular.module('app.login.factories', [])

      .factory('loginService', LoginService);

    LoginService.$inject = ['$q', '$window'];

    function LoginService($q, $window) {
      // Style map

      function loginInApp(username, password) {
        var requestObj = {
            username: username,
            password: password
          },
          deferred = $q.defer();

        if (!!username && !!password) {
          var response = '200';
          //TODO
          deferred.resolve(response);
        }

        return deferred.promise;
      }

      return {
        login: loginInApp,
        getLocation: getUserLocation
      };
    }

  })();


