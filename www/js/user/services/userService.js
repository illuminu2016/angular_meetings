/**
 * Created by constantin.crismaru on 3/26/2017.
 */
(function () {
  'use strict';

  angular.module('app.user.factories')

    .factory('userService', UserService);

  UserService.$inject = ['$q', '$rootScope', '$ionicLoading', 'CONSTANTS', '$http'];

  function UserService($q, $rootScope, $ionicLoading, CONSTANTS, $http) {
  
    function getUserDetails() {
      var deferred = $q.defer();

      $http.get(CONSTANTS.API_URL + 'mock_user.json').then(function(response) {

        var userDetails = response.data[0];

        deferred.resolve(userDetails);
        
        }, function (err) {
            $ionicLoading.hide();
            $rootScope.$broadcast('getUserError', 'Broadcast');
            console.log(err);
        });

      return deferred.promise;
    }

    return {
      getUserDetails: getUserDetails
    };
  }

})();