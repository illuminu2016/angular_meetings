/**
 * Created by constantin.crismaru on 3/26/2017.
 */
(function () {
  'use strict';

  angular.module('app')
    .provider('accountResolve', accountResolveProvider);

  function accountResolveProvider() {
    var self = this;

    this.$get = [function () {
      return self;
    }];

    this.loginFb = ['$stateParams', '$q', 'loginService',
      function ($stateParams, $q, loginService) {
        var defer = $q.defer();

        loginService.loginFb()
          .then(function (response) {
            defer.resolve(response);
          })
          .catch(function () {
            defer.reject({
              status: 'Not Found',
              message: 'Account was not found.'
            });
          });

        return defer.promise;
      }
    ];

    this.getLocation = ['$stateParams', '$q', 'mapService',
      function ($stateParams, $q, mapService) {
        var defer = $q.defer();

        mapService.getLocation()
          .then(function (response) {
            defer.resolve(response);
          })
          .catch(function () {
            defer.reject({
              status: 'Not Found',
              message: 'Cannot get location.'
            });
          });

        return defer.promise;
      }
    ];

    this.getMapStyle = ['$stateParams', '$q', 'mapService',
      function ($stateParams, $q, mapService) {
        var defer = $q.defer();

        mapService.getMapDayStyle()
          .then(function (response) {
            defer.resolve(response);
          })
          .catch(function () {
            defer.reject({
              status: 'Not Found',
              message: 'Cannot get style.'
            });
          });

        return defer.promise;
      }
    ];

    this.getUser = ['$stateParams', '$q', 'userService',
      function ($stateParams, $q, userService) {
        var defer = $q.defer();

        userService.getUserDetails()
          .then(function (response) {
            defer.resolve(response);
          })
          .catch(function () {
            defer.reject({
              status: 'Not Found',
              message: 'Cannot get user.'
            });
          });

        return defer.promise;
      }
    ];

    this.getMarkers = ['$stateParams', '$q', 'markersService',
      function ($stateParams, $q, markersService) {
        var defer = $q.defer();

        markersService.getMarkersDetails()
          .then(function (response) {
            defer.resolve(response);
          })
          .catch(function () {
            defer.reject({
              status: 'Not Found',
              message: 'Cannot get markers.'
            });
          });

        return defer.promise;
      }
    ];
  }

})();
