/**
 * Created by constantin.crismaru on 3/26/2017.
 */
(function () {
  'use strict';

  angular.module('app.dashboard.factories')

    .factory('markersService', MarkersService);

  MarkersService.$inject = ['$q', '$rootScope', '$ionicLoading', 'CONSTANTS', '$http'];

  function MarkersService($q, $rootScope, $ionicLoading, CONSTANTS, $http) {
  
    function getMarkersDetails() {
      var deferred = $q.defer();

      $http.get(CONSTANTS.API_URL + 'mock_markers.json').then(function(response) {

        var markersDetails = response.data;

        deferred.resolve(markersDetails);
        
        }, function (err) {
            $ionicLoading.hide();
            $rootScope.$broadcast('getMarkersError', 'Broadcast');
            console.log(err);
        });

      return deferred.promise;
    }

    return {
      getMarkersDetails: getMarkersDetails
    };
  }

})();