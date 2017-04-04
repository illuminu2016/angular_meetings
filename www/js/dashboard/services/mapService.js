/**
 * Created by constantin.crismaru on 3/26/2017.
 */
(function () {
  'use strict';

  angular.module('app.dashboard.factories', [])

    .factory('mapService', MapService);

  MapService.$inject = ['$q', '$window', '$cordovaGeolocation', '$ionicLoading'];

  function MapService($q, $window, $cordovaGeolocation, $ionicLoading) {
    // Style map
    var styledMapType = [
        {elementType: 'geometry', stylers: [{color: '#e8e8e8'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [{color: '#faf7f0'}]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'geometry.stroke',
          stylers: [{color: '#faf7f0'}]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels.text.fill',
          stylers: [{color: '#faf7f0'}]
        },
        {
          featureType: 'landscape.natural',
          elementType: 'geometry',
          stylers: [{color: '#e8e8e8'}]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [{color: '#d9d9d9'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#e0dfdc'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry.fill',
          stylers: [{color: '#c4d6a7'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#c4d6a7'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#d4d0c7'}]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [{color: '#b8b8b8'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#f8c967'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#e9bc62'}]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry',
          stylers: [{color: '#e98d58'}]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry.stroke',
          stylers: [{color: '#db8555'}]
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [{color: '#806b63'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [{color: '#6b6e6c'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.fill',
          stylers: [{color: '#8f7d77'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#6b6e6c'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'geometry',
          stylers: [{color: '#dfd2ae'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [{color: '#b9d3c2'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#+'}]
        },
        {
          elementType: 'labels',
          stylers: [{visibility: 'off'}]
        }
      ];

    function getMapStyle() {
      var deferred = $q.defer();

      deferred.resolve(styledMapType);

      return deferred.promise;
    }

    function getUserLocation() {
      var deferred = $q.defer();

      var posOptions = {timeout: 10000, enableHighAccuracy: true};

        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (response) {

            var position = {
              latitude: response.coords.latitude,
              longitude: response.coords.longitude
            };

            console.log('position', position);

            deferred.resolve(position);

          }, function (err) {
            $ionicLoading.hide();
            console.log(err);
          });

      return deferred.promise;
    }

    return {
      getMapDayStyle: getMapStyle,
      getLocation: getUserLocation
    };
  }

})();

