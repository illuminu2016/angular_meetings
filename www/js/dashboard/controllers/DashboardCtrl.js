/**
 * Created by constantin.crismaru on 3/25/2017.
 */
(function () {
  'use strict';

  angular.module('app.dashboard.controllers')
    .controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['$scope', '$rootScope', '$ionicLoading', '$timeout', 'mapStyle', 'location', '$http', 'CONSTANTS'];

  function DashboardCtrl($scope, $rootScope, $ionicLoading, $timeout, mapStyle, location, $http, CONSTANTS) {

    /**
     * Injections
     */

    //var chatService = $injector.get('chatService');

    /**
     * Private properties
     */

     var currentHour = new Date().getHours();

      // TODO: to be removed
     // var location = { 
     //    latitude: "47.1574",
     //    longitude: "27.5901"
     // };
    
    /**
     * Private methods
     */

     function getIcon() {
        angular.forEach($scope.dataHolder.markers, function(marker) {
          if(!checkMarker(marker)) {
            if(marker.gender === 'male') {
              marker.options.icon = "icons/male_marker_22_unavailable.png";
            } else {
              marker.options.icon = "icons/female_marker_22_unavailable.png";
            }
          } else {
            if(marker.gender === 'male') {
              marker.options.icon = "icons/male_marker_22.png";
            } else {
              marker.options.icon = "icons/female_marker_22.png";
            }
          }
        });

     }

    function checkMarker(marker) {
      var map = $scope.dataHolder.map.control.getGMap();

      // Crate a new Circle element for local use (not added to the map)
      var circle = new google.maps.Circle({
            center : new google.maps.LatLng(location.latitude,location.longitude),
            radius: $scope.dataHolder.circle.radius
        });
        
        var tempLat = parseFloat(marker.pos.latitude), 
            tempLng = parseFloat(marker.pos.longitude), 
            tempCoords = new google.maps.LatLng(tempLat, tempLng), 
            tempMarker = new google.maps.Marker({ position: tempCoords });  

        if(circle.getBounds().contains(tempMarker.getPosition())) {
          marker.options.isNear = 'true';
          return true;
        } else {
          marker.options.isNear = 'false';
          return false;
        }
    }
    
    /**
     * Scope properties
     */

    $scope.dataHolder = {
      map: {
        zoom: 15,
        refresh: false,
        control: {}
      },
      options: {
        disableDefaultUI: true,
        scrollwheel: true,
        styles: mapStyle,
        minZoom: 15,
        maxZoom: 15
      },
      mapCenter: {
        latitude: location.latitude,
        longitude: location.longitude
      },
      circle: {
        radius: 500,
        stroke: {
          color: "#83b7c7",
          weight: 2,
          opacity: 0.7
        },
        fill: {
          color: "#83b7c7",
          opacity: 0.35
        },
        center: {
          latitude: location.latitude,
          longitude: location.longitude
        },
        visible: true,
        events: {
          click: function() {
            $scope.dataHolder.window.show = false;
          }
        }
      },
      mapEvents: {
        zoom_changed: function(map) {
          var currentZoom = map.getZoom(),
              currentRadius = $scope.dataHolder.circle.radius,
              p = Math.pow(2, (21 - currentZoom));
          $scope.dataHolder.circle.radius = p * 1128.497220 * 0.0027;
          $scope.dataHolder.window.show = false;
        },
        click: function() {
          $scope.dataHolder.window.show = false;
          $scope.$digest();
        }, 
        bounds_changed: function() {
          getIcon();
        }
      },
      markersEvents: {
          click: function(marker, eventName, model) {
              $scope.dataHolder.window.model = model;
              $scope.$digest();
              $scope.dataHolder.window.show = true;
            }
      },
      window: {
        options: {
          boxClass: "infobox",
          boxStyle: {
            backgroundColor: "transparent",
            padding: "15px",
            minWidth: "270px",
            width: "0px",
            height: "180px",
            cursor: "default",
            color: "white"
          },
          disableAutoPan: false,
          maxWidth: 0,
          pixelOffset: {width: 0, height: -40},
          zIndex: null,
          isHidden: false,
          enableEventPropagation: true
        },
        closeClick: function() {
          $scope.dataHolder.window.show = false;
        } 
      },
      cluster: {
        zoomOnClick: true,
        maxZoom: 14,
        styles: [{
            url: 'icons/cluster/cluster-1.png',
            width:51,
            height:53,
            textColor: 'black',
            textSize: 14
        },{
            url: 'icons/cluster/cluster-2.png',
            width:51,
            height:53,
            textColor: 'white',
            textSize: 14
        },{
            url: 'icons/cluster/cluster-3.png',
            width:51,
            height:53,
            textColor: 'white',
            textSize: 14
        },{
            url: 'icons/cluster/cluster-4.png',
            width:51,
            height:53,
            textColor: 'white',
            textSize: 14
        },{
            url: 'icons/cluster/cluster-5.png',
            width:51,
            height:53,
            textColor: 'black',
            textSize: 14
        },{
            url: 'icons/cluster/cluster-6.png',
            width:51,
            height:53,
            textColor: 'black',
            textSize: 14
        },{
            url: 'icons/cluster/cluster-7.png',
            width:51,
            height:53,
            textColor: 'black',
            textSize: 14
        }],
        averageCenter: true,
        minimumClusterSize: 2,
        clusterClass: 'cluster-icon',
        calculator: function(markers, numStyles) {
          if(currentHour < 7 || currentHour > 20) {       // night
              if (markers.length < 10) return {text: markers.length, index: 1};
              if (markers.length < 100) return {text: markers.length, index: 6};
              if (markers.length < 1000) return {text: markers.length, index: 7};
              return {text: markers.length, index: 5};
          } else {        // day
            if (markers.length < 10) return {text: markers.length, index: 1};
            if (markers.length < 100) return {text: markers.length, index: 2};
            if (markers.length < 1000) return {text: markers.length, index: 3};
            return {text: markers.length, index: 4};
          }        
        }
      },
      clusterEvents: {
        click: function(cluster, clusterModels) {
        
        }
      }
    };

    /**
     * Scope methods
     */

    $scope.$on('setMapCenter', function(event, args) {
      $scope.dataHolder.mapCenter.latitude = location.latitude;
      $scope.dataHolder.mapCenter.longitude = location.longitude;
      $scope.dataHolder.window.show = false;
    });

    // Close the infoWindow when you enter/leave the map page
    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){ 
          $scope.dataHolder.window.show = false;
      })

     $scope.viewUser = function() {
        alert("Go to user's profile page.");
     };

     $scope.contactUser = function() {
        alert("Contact the user.");
     };

     $scope.closeInfoBox = function() {
      $scope.dataHolder.window.show = false;
     }

     $scope.getUserImage = function(user) {
      if(user) {
        if(user.image === null) {
          if(user.gender === 'male') {
            return '../img/man-white.png';
          } else {
            return '../img/woman-white.png';
          }
        } else {
          return user.image;
        }
      }      
     };

     $scope.stopPropagation = function(e) {
      if (!e) {
        e = window.event;
      }
      //IE9 & Other Browsers
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      //IE8 and Lower
      else {
        e.cancelBubble = true;
      }
     };

    /**
     * Init Method
     */
    (function init() {
      $http.get(CONSTANTS.API_URL + 'mock_markers.json').then(function(response) {
        $scope.dataHolder.markers = response.data;
        getIcon();
      });

      $timeout(function () {
        $ionicLoading.hide();
        navigator.vibrate(1000);
      }, 2000);
      
    })();
  }
})();
