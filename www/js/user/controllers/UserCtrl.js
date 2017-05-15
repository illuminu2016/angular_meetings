/**
 * Created by constantin.crismaru on 3/25/2017.
 */
(function () {
  'use strict';

  angular.module('app.notifications.controllers')
    .controller('UserCtrl', UserCtrl);

  UserCtrl.$inject = ['$injector', '$scope', '$stateParams', '$timeout', '$state', '$http', 'CONSTANTS'];

  function UserCtrl($injector, $scope, $stateParams, $timeout, $state, $http, CONSTANTS) {
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

     $scope.dataArrived = false;

     //TODO: Create a service which will get the data for the current user ($stateParams.userId)

   
    /**
     * Scope methods
     */
    
      $scope.changeToMap = function() {
        $state.transitionTo('tab.dashboard', '', {reload: true, inherit: true, notify: true});//reload
      };

      $scope.getProfileImage = function() {
        if($scope.dataHolder.user.userImages.length === 0) {
          if($scope.dataHolder.user.gender === "male") {
            return '../img/man-black.png';
          } else {
            return '../img/woman-black.png';
          }
        } else {
          return $scope.dataHolder.user.mainImage.path;
        }
      };

      $scope.viewImage = function(image) {
        $scope.dataHolder.user.mainImage = image;
        angular.forEach($scope.dataHolder.user.userImages, function(userImage) {
          userImage.isMain = false;
        });
        $scope.dataHolder.user.mainImage.isMain = true;
      };

      $scope.sendMessage = function(chatId) {
        $state.transitionTo('notifications-detail', {chatId: chatId}, {reload: true, inherit: true, notify: true});//reload
      };

    /**
     * Init Method
     */
    (function init() {
      //TODO: Replace 'mock_user.json' with the correct user ID ($stateParams.userId)
      $http.get(CONSTANTS.API_URL + 'mock_user.json').then(function(response) {
        $scope.dataHolder = {
          user: response.data[0]
        };
        $scope.dataArrived = true;
        
      });
    })();
  }
})();
