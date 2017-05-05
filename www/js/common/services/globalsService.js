/**
 * Created by constantin.crismaru on 4/27/2017.
 */
(function () {
  'use strict';

  angular.module('app.common.factories')

    .factory('globalsService', globalsService);

  globalsService.$inject = ['$q'];

  function globalsService($q) {
    var admin = {
      paths: {
        chatBackgroundIcon: '../../img/backgrounds/icons/',
        chatBackgroundWallPaper: '../../img/backgrounds/wallpaper/'
      }
    };

    function globals() {
      return admin;
    }

    return {
      _GLOBAL: globals
    };
  }

})();


