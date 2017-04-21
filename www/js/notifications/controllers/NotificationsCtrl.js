/**
 * Created by constantin.crismaru on 3/25/2017.
 */
(function () {
  'use strict';

  angular.module('app.notifications.controllers', [])
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

    $scope.stateHolder = {
      emoticonsWindow: false
    }
    /**
     * Scope methods
     */

    $scope.remove = function(chat) {
      chatService.remove(chat);
    };

    $scope.changeToMessages = function() {
      $scope.stateHolder.emoticonsWindow = false;
      $state.transitionTo('tab.notifications', '', { reload: true, inherit: true, notify: true });//reload
    };

    $scope.openEmoticons = function() {
      $scope.stateHolder.emoticonsWindow = !$scope.stateHolder.emoticonsWindow;
    };

    $scope.getMessagesListClasses = function (chat) {
      var returnClass = '';

      if(chat.read) {
        returnClass = chat.read ? 'read-message ' : '';
      }

      return (chat.orientation === 'left') ? returnClass + 'chat-animation-left' : returnClass + 'chat-animation-right';
    };

    /**
     * Init Method
     */
    (function init() {

    })();
  }
})();
