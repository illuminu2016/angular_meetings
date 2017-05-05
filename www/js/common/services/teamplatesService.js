/**
 * Created by constantin.crismaru on 4/27/2017.
 */
(function () {
  'use strict';

  angular.module('app.common.factories')

    .factory('teamplatesService', teamplatesService);

  teamplatesService.$inject = [];

  function teamplatesService() {
    var admin = {
                  chat: {
                    settings: '<ion-popover-view class="settings-popover">' +
                                          '<ion-content>' +
                                            '<div class="popover-content">' +
                                              '<div class="row">' +
                                                  '<div class="col"><img ng-src="{{chat.face}}" class="chat-settings-image"></div>' +
                                                  '<div class="col"><button class="ion-link button-icon icon button-light link-settings-btn"></button></div>' +
                                                  '<div class="col"><img ng-src="img/max.png" class="chat-settings-image"></div>' +
                                                '</div>' +
                                                  '<div class="popover-menu">' +
                                                      '<div ng-click="showBackgroundPicker()"> Background to this conversation </div>' +
                                                      '<div> Send current location </div>' +
                                                      '<div> Block contact </div>' +
                                                      '<div> Report </div>' +
                                                      '<div class="delete-chat"> Delete chat </div>' +
                                                  '</div>' +
                                             '</div>' +
                                         '</ion-content>' +
                                        '</ion-popover-view>',
                    backgroundPicker: '<div class="row picker-select-container" ng-repeat="picRow in dataHolder.backgroundPic.chatBackgrounds" ng-init="outerindex = $index">' +
                                        '<div class="col" ng-repeat="pic in picRow.row track by $index" ng-click="setContentBackground($index, outerindex)">' +
                                          '<img width="100%" ng-src="{{setBackgroundIcons($index, outerindex)}}">' +
                                        '</div>' +
                                      '</div>'
                  }
    };

    function teamplates() {
      return admin;
    }

    return {
      teamplates: teamplates
    };
  }

})();


