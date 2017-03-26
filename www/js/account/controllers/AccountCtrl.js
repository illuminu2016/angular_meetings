/**
 * Created by constantin.crismaru on 3/25/2017.
 */
(function () {
  'use strict';

  angular.module('app.account.controllers', [])
    .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = ['$injector', '$scope'];

  function AccountCtrl($injector, $scope) {
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

    /**
     * Init Method
     */
    (function init() {

    })();
  }
})();
