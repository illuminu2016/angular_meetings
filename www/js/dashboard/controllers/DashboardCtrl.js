/**
 * Created by constantin.crismaru on 3/25/2017.
 */
(function () {
  'use strict';

  angular.module('app.dashboard.controllers', [])
    .controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['$injector', '$scope', 'mapStyle'];

  function DashboardCtrl($injector, $scope, mapStyle) {
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

    /**
     * Scope properties
     */

    $scope.dataHolder = {
      map: {
        zoom: 19
      },
      options: {
        disableDefaultUI: true,
        scrollwheel: true,
        styles: mapStyle
      },
      mapCenter: {
        latitude: "47.1564",
        longitude: "27.5901"
      },
      /*      mapCenter: {
       latitude: location.coords.latitude,
       longitude: location.coords.longitude
       },*/
      circle: {
        radius: 45,
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
          latitude: "47.1564",
          longitude: "27.5901"
        },
        /*        center: {
         latitude: location.coords.latitude,
         longitude: location.coords.longitude
         },*/
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

      updateUsersLocation();
    })();
  }
})();
