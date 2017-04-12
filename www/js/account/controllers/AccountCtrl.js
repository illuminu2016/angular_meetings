/**
 * Created by constantin.crismaru on 3/25/2017.
 */
(function () {
  'use strict';

  angular.module('app.account.controllers', [])
    .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = ['$injector', '$scope', '$http', 'CONSTANTS'];

  function AccountCtrl($injector, $scope, $http, CONSTANTS) {
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
      enableFriends: true
    };

    /**
     * Scope methods
     */

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
