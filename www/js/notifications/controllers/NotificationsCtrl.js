/**
 * Created by constantin.crismaru on 3/25/2017.
 */
(function () {
  'use strict';

  angular.module('app.notifications.controllers')
    .controller('NotificationsCtrl', NotificationsCtrl);

  NotificationsCtrl.$inject = ['$injector', '$scope', '$stateParams', '$state'];

  function NotificationsCtrl($injector, $scope, $stateParams, $state) {
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

    $scope.dataHolder = {
      reflexionChats: []
    };
    /**
     * Scope methods
     */

    $scope.getMessagesListClasses = function (chat) {
      var returnClass = '';

      if (chat.read) {
        returnClass = chat.read ? 'read-message ' : '';
      }

      return (chat.orientation === 'left') ? returnClass + 'chat-animation-left' : returnClass + 'chat-animation-right';
    };

    $scope.openChatDetails = function (chatId) {
      $state.transitionTo('notifications-detail', {chatId: chatId}, { reload: true, inherit: true, notify: true });
    };

    $scope.remove = function (chat) {
      chatService.remove(chat);
    };

    $scope.$watch(function () {
      return $state.$current.name
    }, function (newVal, oldVal) {
      var tab = 'tab.notifications';

      $scope.dataHolder.reflexionChats = $scope.chats.slice(0);
      if ((newVal !== tab) && (oldVal === tab)) {
        $scope.dataHolder.reflexionChats.length = 0;
      } else if ((newVal === tab) && (oldVal !== tab)) {
        $scope.dataHolder.reflexionChats = $scope.chats.slice(0);
      }
    });

    /**
     * Init Method
     */
    (function init() {

    })();
  }
})();
