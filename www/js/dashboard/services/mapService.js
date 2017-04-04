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
    var styledMapTypeDay = [
        {elementType: 'geometry', stylers: [{color: '#cccc99'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [{color: '#ff0000'}]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'geometry.stroke',
          stylers: [{color: '#00ff00'}]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels.text.fill',
          stylers: [{color: '#00ff00'}]
        },
        {
          featureType: 'administrative.locality',
          elementType: 'geometry',
          stylers: [{color: '#00ff00'}]
        },
        {
          featureType: 'administrative.neighborhood',
          elementType: 'geometry',
          stylers: [{color: '#00ff00'}]
        },
        {
          featureType: 'administrative.province',
          elementType: 'geometry',
          stylers: [{color: '#00ff00'}]
        },
        {
          featureType: 'landscape.natural',
          elementType: 'geometry',
          stylers: [{color: '#fef2d1'}]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [{color: '#ef6e61'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#e0dfdc'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry.fill',
          stylers: [{color: '#979735'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#c4d6a7'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#7e5700'}]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [{color: '#7e5123'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#7e57000'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#7e5700'}]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry',
          stylers: [{color: '#473227'}]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry.473227',
          stylers: [{color: '#db8555'}]
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9a5e3e'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [{color: '#000000'}]
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
          stylers: [{color: '#17301c'}]
        },
        {
          featureType: 'transit.station.airport',
          elementType: 'geometry',
          stylers: [{color: '#ee0000'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [{color: '#1985a1'}]
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

    var styledMapTypeNight = [
      {elementType: 'geometry', stylers: [{color: '#000000'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{color: '#ff0000'}]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'geometry',
        stylers: [{color: '#00ff00'}]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [{color: '#00ff00'}]
      },
      {
        featureType: 'administrative.locality',
        elementType: 'geometry',
        stylers: [{color: '#00ff00'}]
      },
      {
        featureType: 'administrative.neighborhood',
        elementType: 'geometry',
        stylers: [{color: '#00ff00'}]
      },
      {
        featureType: 'administrative.province',
        elementType: 'geometry',
        stylers: [{color: '#00ff00'}]
      },
      {
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [{color: '#555555'}]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{color: '#ef6e61'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#e0dfdc'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [{color: '#979735'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#c4d6a7'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#eeeeee'}]
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{color: '#dedede'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#dddddd'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#7e5700'}]
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [{color: '#473227'}]
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry.473227',
        stylers: [{color: '#db8555'}]
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9a5e3e'}]
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{color: '#eeeeee'}]
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
        stylers: [{color: '#cccccc'}]
      },
      {
        featureType: 'transit.station.airport',
        elementType: 'geometry',
        stylers: [{color: '#ee0000'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{color: '#1985a1'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#92998d'}]
      },
      {
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      }
    ];

    function getMapStyle() {
      var deferred = $q.defer();
      var userHour = new Date().getHours();

      deferred.resolve(styledMapTypeDay);

      if(userHour < 7 || userHour > 20) {
        deferred.resolve(styledMapTypeNight);
      } else {
        deferred.resolve(styledMapTypeDay);
      }
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

