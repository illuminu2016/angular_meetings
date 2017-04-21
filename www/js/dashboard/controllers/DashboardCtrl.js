/**
 * Created by constantin.crismaru on 3/25/2017.
 */
(function () {
  'use strict';

  angular.module('app.dashboard.controllers', [])
    .controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['$scope', '$ionicLoading', '$timeout', 'mapStyle', '$http', 'CONSTANTS'];

  function DashboardCtrl($scope, $ionicLoading, $timeout, mapStyle, $http, CONSTANTS) {

    /**
     * Injections
     */

    //var chatService = $injector.get('chatService');

    /**
     * Private properties
     */

      // TODO: to be removed
      var location = {
         latitude: "47.1574",
         longitude: "27.5901"
      };

    /**
     * Private methods
     */

     function getIcon() {
        angular.forEach($scope.dataHolder.markers, function(item) {

          if(item.gender === 'male') {
            item.options.icon = "icons/male_marker_22.png";
          } else {
            item.options.icon = "icons/female_marker_22.png";
          }
        });
     }

    function calculator(markers) {
        var currentHour = new Date().getHours();
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

    /**
     * Scope properties
     */

    $scope.dataHolder = {
      map: {
        zoom: 14,
        refresh: false
      },
      options: {
        disableDefaultUI: true,
        scrollwheel: true,
        styles: mapStyle,
        minZoom: 9,
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
        visible: true
      },
      mapEvents: {
        zoom_changed: function(map) {
          var currentZoom = map.getZoom(),
              currentRadius = $scope.dataHolder.circle.radius,
              p = Math.pow(2, (21 - currentZoom));

          $scope.dataHolder.circle.radius = p * 1128.497220 * 0.0027;
          // On zoom, close all the infoWindows
          $scope.dataHolder.window.show = false;
        }
      },
      markersEvents: {
          click: function(marker, eventName, model) {
              $scope.dataHolder.window.model = model;
              $scope.dataHolder.window.show = true;
            }
      },
      window: {
        options: {
          boxClass: "infobox",
          boxStyle: {
            backgroundColor: "#181A1C",
            borderRadius: "5px",
            minWidth: "180px",
            padding: "5px",
            width: "0px",
            height: "120px",
            boxShadow: "2px 0px 54px -1px rgba(0,0,0,0.75)"
          },
          disableAutoPan: false,
          maxWidth: 0,
          pixelOffset: {width: 20, height: -40},
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
        calculator: calculator
      },
      clusterEvents: {
        click: function(cluster, clusterModels) {

        }
      }
    };

    /**
     * Scope methods
     */

     $scope.viewUser = function() {
        alert("Go to user's profile page.");
     };

     $scope.contactUser = function() {
        alert("Contact the user.");
     };

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
