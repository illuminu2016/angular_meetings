/**
 * Created by constantin.crismaru on 3/25/2017.
 */
(function () {
  'use strict';

  angular.module('app.account.controllers')
    .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = ['$injector', '$scope', '$http', 'CONSTANTS', '$ionicPopup'];

  function AccountCtrl($injector, $scope, $http, CONSTANTS,$ionicPopup) {
    /**
     * Injections
     */

    var chatService = $injector.get('chatService');

    /**
     * Private properties
     */

    /**
     * Private methods
     */

    /**
     * Scope properties
     */

    $scope.settings = {
        username: "Marty McFly",
        profileImg: "img/adam.jpg",
        men: true,
        women: true,
        messages: true,
        emails: true,
        distance: 500
    };

    /**
     * Scope methods
     */

     $scope.searchDistance = function(distance) {
        console.log("distance: ", distance);
        console.log("Search distance is saved"); 
     };

     $scope.searchGenderMen = function(newValue, oldValue) {
        if(!newValue && !$scope.settings.women) {
            $scope.settings.women = true;  
            console.log("Search for women is saved"); 
        }
     };

     $scope.searchGenderWomen = function(newValue, oldValue) {
        if(!newValue && !$scope.settings.men) {
            $scope.settings.men = true;   
            console.log("Search for men is saved"); 
        }
     };

     $scope.getMessages = function(message) {
        console.log("'Get message' is saved"); 
     };

     $scope.getEmails = function(email) {
        console.log("'Get emails' is saved"); 
     };

     $scope.contactUs = function() {
        alert("This should open a new window with the 'Contact' page");
     }

     $scope.logout = function() {
        alert("This should be the Logout functionality");
     };

     $scope.deleteAccount = function() {
        $ionicPopup.show({
            title: 'Are you sure you want to delete your account?',
            scope: $scope,
            buttons: [
              { text: 'Yes',
              onTap: function(e) {
                  alert("This should be the Delete Account functionality");
                } 
              },
              {
                text: '<b>No</b>',
                type: 'button-positive'
              }
            ]
          });
        
    };

    function getUser() {
        $http({
            url: CONSTANTS.API_URL + 'getUser.php',
            method : 'GET'
        }).then(function(data) {
            $scope.userFromAPI = data.data[0].name;
        }).then(function(data, status, headers, config) {
            console.log(data, status);
        });
    }

    $scope.setUser = function(user) {
        $http({
            url: CONSTANTS.API_URL + 'updateUser.php',
            data : {id: '1', name: user},
            method : 'POST',
            headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        }).then(function(data) {
            getUser();
        }).then(function(data, status, headers, config) {
            console.log(data, status);
        });
    };

    /**
     * Init Method
     */
    (function init() {
        getUser();
    })();
  }
})();
