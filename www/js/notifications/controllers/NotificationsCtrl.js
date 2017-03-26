/**
 * Created by constantin.crismaru on 3/25/2017.
 */
(function () {
  'use strict';

  angular.module('app.notifications.controllers', [])
    .controller('NotificationsCtrl', NotificationsCtrl);

  NotificationsCtrl.$inject = ['$injector', '$scope', '$stateParams'];

  function NotificationsCtrl($injector, $scope, $stateParams) {
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

    $scope.chats = chatService.all();

    $scope.chat = chatService.get($stateParams.chatId);

    /**
     * Scope methods
     */

    $scope.remove = function(chat) {
      chatService.remove(chat);
    };

    /**
     * Init Method
     */
    (function init() {

    })();
  }
})();
