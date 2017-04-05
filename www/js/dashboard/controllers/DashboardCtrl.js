/**
 * Created by constantin.crismaru on 3/25/2017.
 */
(function () {
  'use strict';

  angular.module('app.dashboard.controllers', [])
    .controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['$injector', '$scope', '$timeout', 'mapStyle', 'location'];

  function DashboardCtrl($injector, $scope, $timeout, mapStyle, location) {
    /**
     * Injections
     */

    //var chatService = $injector.get('chatService');

    /**
     * Private properties
     */

    /**
     * Private methods
     */

    function updateUsersLocation() {
      var response = [
        {
          id: "41",
          user: "ana",
          latitude: "47.1564",
          longitude: "27.5901",
          genre: "female"
        }, {
          id: "44",
          user: "cosmin",
          latitude: "47.1552",
          longitude: "27.5884",
          genre: "male"
        }];
      
      $scope.dataHolder.markers = [
        {
          id: "41",
          pos: {
            latitude: "47.1574",
            longitude: "27.5901"
          },
          options: {
            icon: "icons/male_marker_20.png"
          }
        },
        {
          id: "42",
          pos: {
            latitude: "47.1508",
            longitude: "27.5991"
          },
          options: {
            icon: "icons/male_marker_20.png"
          }
        },
        {
          id: "43",
          pos: {
            latitude: "47.1585",
            longitude: "27.5972"
          },
          options: {
            icon: "icons/female_marker_20.png"
          }
        },
        {
          id: "44",
          pos: {
            latitude: "47.1579",
            longitude: "27.5991"
          },
          options: {
            icon: "icons/female_marker_20.png"
          }
        },
        {
          id: "45",
          pos: {
            latitude: "47.1570",
            longitude: "27.5920"
          },
          options: {
            icon: "icons/female_marker_20.png"
          }
        }
      ];

    }

    function setSonar() {
      var direction = 1;
      var rMin = 25, rMax = 40;

      setInterval(function() {
        var refreshIntervalId = setInterval(function () {

          var radius = $scope.dataHolder.circle.radius;

          if ((radius > rMax)) {
            clearInterval(refreshIntervalId);
          }
          $scope.dataHolder.circle.radius = (radius + direction * 1);
          $scope.$apply();
        }, 150);

        $scope.dataHolder.circle.radius = 25;
      }, 10000);
    }

    /**
     * Scope properties
     */

    $scope.dataHolder = {
      map: {
        zoom: 14,
        control: {}
      },
      options: {
        disableDefaultUI: true,
        scrollwheel: true,
        styles: mapStyle,
        cluster: {
          minimumClusterSize : 10,
          zoomOnClick: true,
          styles: [{
              url: "icons/female_marker_20.png",
              width:60,
              height:60,
              textColor: 'white',
              textSize: 14,
              fontFamily: 'Open Sans'
          }],
          averageCenter: true,
          clusterClass: 'cluster-icon'
        }
      },
      mapCenter: {
        latitude: location.latitude,
        longitude: location.longitude
      },
      circle: {
        radius: 25,
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
      //marker: null,
      markersEvents: {
          click: function(marker, eventName, model) {
              $scope.dataHolder.window.model = model;
              $scope.dataHolder.window.show = true;
            }
      },
      window: {
        marker: {},
        show: false,
        closeClick: function() {
          this.show = false;
        },
        options: {
          boxClass: "infobox",
          boxStyle: {
            backgroundColor: "#8ab0ab",
            border: "1px solid #8ab023",
            borderRadius: "5px",
            minWidth: "180px",
            padding: "5px",
            width: "0px",
            height: "100px"
          },
          // content: "Text",
          disableAutoPan: false,
          maxWidth: 0,
          pixelOffset: {width: 20, height: -40},
          zIndex: null,
          //closeBoxMargin: "10px",
          // closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
          // infoBoxClearance: new google.maps.Size(1, 1),
          isHidden: false,
          //pane: "floatPane",
          enableEventPropagation: true
        } 
      },
      userDetails: {
        name: "Ana",
        age: "25",
        genre: "female",
        location: "Iasi",
        interests: "Clubs, cars & trips"
      },
      cluster: {
        minimumClusterSize : 10,
        zoomOnClick: true,
        styles: [{
            url: "icons/m4-fab.png",
            width:60,
            height:60,
            textColor: 'white',
            textSize: 14,
            fontFamily: 'Open Sans'
        }],
        averageCenter: true,
        clusterClass: 'cluster-icon'
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

    /**
     * Init Method
     */
    (function init() {

      setSonar();
      updateUsersLocation();
    })();
  }
})();
