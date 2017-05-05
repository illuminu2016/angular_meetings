/**
 * Created by constantin.crismaru on 3/25/2017.
 */
(function () {
  'use strict';

  angular.module('app.notifications.controllers')
    .controller('ChatDetailsCtrl', ChatDetailsCtrl);

  ChatDetailsCtrl.$inject = ['$injector', '$scope', '$stateParams', '$timeout', '$state', '$ionicPopover', '$ionicPopup'];

  function ChatDetailsCtrl($injector, $scope, $stateParams, $timeout, $state, $ionicPopover, $ionicPopup) {
    /**
     * Injections
     */

    var globalsService = $injector.get('globalsService'),
        teamplatesService = $injector.get('teamplatesService'),
        chatService = $injector.get('chatService'),
        chatBackgroundService = $injector.get('chatBackgroundService');

    /**
     * Private properties
     */

    var templatePopover = teamplatesService.teamplates().chat.settings,
        templateBackgroundPicker = teamplatesService.teamplates().chat.backgroundPicker;

    /**
     * Private methods
     */

    function loadEmoticons() {
      var smiles = chatService.getSmileEmoticons(),
        freezy = chatService.getFreezy(),
        smileEmoExtended = chatService.getSmileEmoExtended(),
        freezyEmoExtended = chatService.getFreezyEmoExtended();

      $scope.dataHolder.emoticons.smiles.firstLevel = smiles.firstLevel;
      $scope.dataHolder.emoticons.smiles.secondLevel = smiles.secondLevel;

      $scope.dataHolder.emoticons.freezy.firstLevel = freezy.firstLevel;
      $scope.dataHolder.emoticons.freezy.secondLevel = freezy.secondLevel;

      $scope.dataHolder.emoticons.smileEmoExtended.firstLevel = smileEmoExtended.firstLevel;
      $scope.dataHolder.emoticons.smileEmoExtended.secondLevel = smileEmoExtended.secondLevel;

      $scope.dataHolder.emoticons.freezyEmoExtended.firstLevel = freezyEmoExtended.firstLevel;
      $scope.dataHolder.emoticons.freezyEmoExtended.secondLevel = freezyEmoExtended.secondLevel;
    }

    function loadBackgrounds() {
      $scope.dataHolder.backgroundPic = chatBackgroundService.getBackgrounds();
    }

    function setMessageContent() {
      var before;

      angular.element(document.querySelector('.send-msg-content')).on('focus', function () {
        before = angular.element(document.querySelector('.send-msg-content')).html();
      }).on('blur keyup paste', function () {
        var newElem = angular.element(document.querySelector('.send-msg-content'));

        if (before != newElem[0]) {
          $scope.$emit('sendMsgChanged', newElem[0].offsetHeight);
        }
      });

      $scope.$on('sendMsgChanged', function (event, data) {
        $scope.dataHolder.messageContent = data - 10;
        $scope.$digest();
      });
    }

    function loadScreen() {
      loadEmoticons();
      loadBackgrounds();
      setMessageContent();
    }

    /**
     * Scope properties
     */

    $scope.chats = chatService.all();

    $scope.chat = chatService.get($stateParams.chatId);

    $scope.stateHolder = {
      emoticonsWindow: false,
      smileEmo: true,
      freezyEmo: false,
      smileEmoExtended: false,
      freezyEmoExtended: false,
      backgroundPopup: false,
      backgroundVisibility: false
    };

    $scope.dataHolder = {
      globals: globalsService._GLOBAL(),
      messageContent: 44,
      backgroundPic: [],
      emoticons: {
        smiles: {
          firstLevel: null,
          secondLevel: null
        },
        freezy: {
          firstLevel: null,
          secondLevel: null
        },
        smileEmoExtended: {
          firstLevel: null,
          secondLevel: null
        },
        freezyEmoExtended: {
          firstLevel: null,
          secondLevel: null
        }
      }
    };
    /**
     * Scope methods
     */

    $scope.popover = $ionicPopover.fromTemplate(templatePopover, {
      scope: $scope
    });

    $scope.openPopover = function ($event) {
      $scope.popover.show($event);
    };

    $scope.closePopover = function () {
      $scope.popover.hide();
    };

    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.popover.remove();
    });

    // Execute action on hidden popover
    $scope.$on('popover.hidden', function () {
      // Execute action
    });

    // Execute action on remove popover
    $scope.$on('popover.removed', function () {
      // Execute action
    });

    $scope.remove = function (chat) {
      chatService.remove(chat);
    };

    $scope.setContentBackground = function (index, outerindex) {
      var dataSet = $scope.dataHolder.backgroundPic.chatBackgrounds[outerindex],
          backgroundPic = $scope.dataHolder.globals.paths.chatBackgroundWallPaper + dataSet.row[index].wallpaper,
          content = angular.element(document.querySelector('.notification-content'))[0];

      $scope.stateHolder.backgroundVisibility = false;

      $timeout(function() {
        content.style.background= `url('${backgroundPic}')`;
        $scope.stateHolder.backgroundVisibility = true;
      }, 500);

      $scope.dataHolder.backgroundPopup.close();
      $scope.closePopover();
    };

    $scope.setBackgroundIcons = function (index, outerindex) {
      var dataSet = $scope.dataHolder.backgroundPic.chatBackgrounds[outerindex];

      return $scope.dataHolder.globals.paths.chatBackgroundIcon + dataSet.row[index].icon;
    };

    $scope.showBackgroundPicker = function () {
      $scope.closePopover();

      //$scope.data = {}

      $scope.dataHolder.backgroundPopup = $ionicPopup.show({
        template: templateBackgroundPicker,
        cssClass: 'background-picker-popup',
        scope: $scope
      });
    };

    $scope.changeEmoWindow = function (state) {
      $scope.stateHolder.smileEmo = false;
      $scope.stateHolder.freezyEmo = false;
      $scope.stateHolder.smileEmoExtended = false;
      $scope.stateHolder.freezyEmoExtended = false;

      $scope.stateHolder[state] = true;
    };

    $scope.changeToMessages = function () {
      $scope.stateHolder.emoticonsWindow = false;
      $state.transitionTo('tab.notifications', '', {reload: true, inherit: true, notify: true});//reload
    };

    $scope.openEmoticons = function () {
      $scope.stateHolder.emoticonsWindow = !$scope.stateHolder.emoticonsWindow;
    };

    /**
     * Init Method
     */
    (function init() {
      loadScreen();
    })();
  }
})();
