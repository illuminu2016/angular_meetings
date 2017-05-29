/**
 * Created by constantin.crismaru on 3/25/2017.
 */
(function () {
  'use strict';

  angular.module('app.notifications.controllers')
    .controller('UserCtrl', UserCtrl);

  UserCtrl.$inject = ['$injector', '$scope', '$stateParams', '$timeout', '$state', 'userDetails'];

  function UserCtrl($injector, $scope, $stateParams, $timeout, $state, userDetails) {
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

     $scope.dataHolder = {
        user: userDetails
      }
   
    /**
     * Scope methods
     */
    
      $scope.changeToMap = function() {
        $state.transitionTo('tab.dashboard', '', {reload: true, inherit: true, notify: true});//reload
      };

      $scope.getProfileImage = function() {
        if($scope.dataHolder.user.userImages.length === 0) {
          return $scope.dataHolder.user.gender === "male" ? '../img/man-black.png' : '../img/woman-black.png';
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
        
      // });
    })();
  }
})();
