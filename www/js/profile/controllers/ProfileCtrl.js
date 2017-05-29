/**
 * Created by constantin.crismaru on 3/25/2017.
 */
(function () {
  'use strict';

  angular.module('app.profile.controllers')
    .controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['$injector', '$scope', '$stateParams', '$timeout', '$state', '$ionicPopover', '$ionicPopup'];

  function ProfileCtrl($injector, $scope, $stateParams, $timeout, $state, $ionicPopover, $ionicPopup) {
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

    $scope.profile = {
        gender: "male",
        userImages: [
          {
            "path": "img/adam.jpg",
            "isMain": true
          },{
            "path": "img/ben.png",
            "isMain": false
          },{
            "path": "img/perry.png",
            "isMain": false
          },{
            "path": "img/mike.png",
            "isMain": false
          },{
            "path": "img/ana.jpg",
            "isMain": false
          }]
    };

    $scope.carouselExists = true;
    $scope.targetImageExists = true;
    $scope.maxImgNumber = 10;

    /**
     * Scope methods
     */

   $scope.changeToSettings = function () {
      $state.transitionTo('tab.account', '', {reload: true, inherit: true, notify: true});//reload
    };

    $scope.setMainImage = function(imageProfile) {
      $scope.targetImageExists = true;
      $scope.profile.mainImage = imageProfile;
      angular.forEach($scope.profile.userImages, function(userImage) {
        userImage.isMain = false;
      });
      $scope.profile.mainImage.isMain = true;
    };

    $scope.deleteImage = function(index, image) {      
      $scope.carouselExists = false;
      $scope.profile.userImages.splice(index, 1);
      $timeout(function(){
        $scope.carouselExists = true;
      });

      if($scope.profile.mainImage === image) {
        $scope.targetImageExists = false;
        return $scope.profile.gender === "male" ? '../img/man-black.png' : '../img/woman-black.png';
      }
    };

    $scope.getProfileImage = function() {
      if($scope.profile.userImages.length === 0) {
        return $scope.profile.gender === "male" ? '../img/man-black.png' : '../img/woman-black.png';
      } else {
        angular.forEach($scope.profile.userImages, function(image) {
          if(image.isMain) {
            $scope.profile.mainImage = image;
          }
        });
        return $scope.profile.mainImage.path;
      }
    };

    $scope.getDefaultImage = function(gender) {
      return gender === "male" ? '../img/man-black.png' : '../img/woman-black.png';
    }

    $scope.uploadImage = function() {
      alert("Upload image functionality.");
    };

    $scope.saveProfileDescription = function() {
      console.log("Profile description should be saved here.");
    };

    $scope.showAge = function(profileShowAge) {
      console.log("Profile description should be saved here. - Show age: ", profileShowAge);
    };

    /**
     * Init Method
     */
    (function init() {
      
    })();
  }
})();
