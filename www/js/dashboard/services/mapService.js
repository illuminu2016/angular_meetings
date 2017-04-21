/**
 * Created by constantin.crismaru on 3/26/2017.
 */
(function () {
  'use strict';

  angular.module('app.dashboard.factories', [])

    .factory('mapService', MapService);

  MapService.$inject = ['$q', '$rootScope', '$cordovaGeolocation', '$ionicLoading'];

  function MapService($q, $rootScope, $cordovaGeolocation, $ionicLoading) {
    // Style map
    var styledMapTypeDay = [
        {elementType: 'geometry', stylers: [{color: '#E3F7F7'}]},
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
          elementType: 'geometry.stroke',
          stylers: [{color: '#00ff00'}]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'administrative.locality',
          elementType: 'geometry',
          stylers: [{color: '#00ff00'}]
        },
        {
          featureType: 'administrative.locality',
          elementType: 'labels',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'administrative.neighborhood',
          elementType: 'geometry',
          stylers: [{color: '#00ff00'}]
        },
        {
          featureType: 'administrative.neighborhood',
          elementType: 'labels',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'administrative.province',
          elementType: 'geometry',
          stylers: [{color: '#00ff00'}]
        },
        {
          featureType: 'administrative.province',
          elementType: 'labels',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'landscape.natural',
          elementType: 'geometry',
          stylers: [{color: '#E3F7F7'}]
        },
        {
          featureType: 'landscape.natural.landcover',
          elementType: 'geometry',
          stylers: [{color: '#000000'}]
        },
        {
          featureType: 'landscape.natural.terrain',
          elementType: 'geometry',
          stylers: [{color: '#614126'}]
        },
        {
          featureType: 'landscape.man_made',
          elementType: 'geometry',
          stylers: [{color: '#e6e6e6'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry.fill',
          stylers: [{color: '#A6E08D'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#ffffff'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#7e5700'}]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [{color: '#ffffff'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#D49587'}]
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
          elementType: 'geometry',
          stylers: [{color: '#999999'}]
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [{color: '#000000'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [{color: '#999999'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'geometry',
          stylers: [{color: '#17301c'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'transit.station.airport',
          elementType: 'geometry',
          stylers: [{color: '#aaaaaa'}]
        },
        {
          featureType: 'transit.station.airport',
          elementType: 'labels',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [{color: '#1985a1'}]
        },
        {
          featureType: 'water',
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
    var styledMapTypeNight2 = [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'administrative.neighborhood',
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'administrative.province',
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.line',
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'transit.station.airport',
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      }
    ];

    function getMapStyle() {
      var deferred = $q.defer();
      var userHour = new Date().getHours();

      if(userHour < 7 || userHour > 20) {
        deferred.resolve(styledMapTypeNight2);
      } else {
        deferred.resolve(styledMapTypeDay);
      }

      return deferred.promise;
    }

    function getUserLocation() {
      var deferred = $q.defer();

      var posOptions = {timeout: 30000, enableHighAccuracy: true};

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
            $rootScope.$broadcast('locationError', 'Broadcast');
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

