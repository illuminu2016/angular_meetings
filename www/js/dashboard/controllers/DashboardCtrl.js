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

      $scope.dataHolder.marker = {
        id: "41",
        pos: {
          latitude: "47.1564",
          longitude: "27.5901"
        },
        options: {
          icon: "icons/female.png"
        }
      }
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
        zoom: 16
      },
      options: {
        disableDefaultUI: true,
        scrollwheel: true,
        styles: mapStyle
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
      marker: null
    };

    /**
     * Scope methods
     */

    /**
     * Init Method
     */
    (function init() {

      setSonar();
    })();
  }
})();
