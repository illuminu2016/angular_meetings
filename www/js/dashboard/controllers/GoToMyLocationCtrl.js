/**
 * Created by constantin.crismaru on 3/25/2017.
 */
(function () {
  'use strict';

  angular.module('app.dashboard.controllers')
    .controller('GoToMyLocationCtrl', GoToMyLocationCtrl);

  GoToMyLocationCtrl.$inject = ['$scope', '$rootScope'];

  function GoToMyLocationCtrl($scope, $rootScope) {

    /**
     * Injections
     */

    /**
     * Private properties
     */    
    
    /**
     * Private methods
     */

    /**
     * Scope properties
     */


    /**
     * Scope methods
     */

    $scope.goToMyLocation = function() {
      $rootScope.$broadcast('setMapCenter');
    };

    /**
     * Init Method
     */

    (function init() {
      
    })();

  }
})();
