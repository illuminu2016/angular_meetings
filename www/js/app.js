(function () {
  'use strict';

  /*
   Creates main module for application
   */

  angular.module('app', [
      'ionic',
      'ngCordova',
      'ngCordovaOauth',
      'uiGmapgoogle-maps',
      'app.common',
      'app.account',
      'app.dashboard',
      'app.login',
      'app.notifications'
    ]);

  //common
  angular.module('app.common', [
    'app.common.directives'
  ]);

  angular.module('app.common.directives', []);

  //account

  angular.module('app.account', [
    'app.account.services',
    'app.account.factories',
    'app.account.controllers',
    'app.account.directives',
    'app.account.filters'
  ]);

  angular.module('app.account.services', []);
  angular.module('app.account.factories', []);
  angular.module('app.account.controllers', []);
  angular.module('app.account.directives', []);
  angular.module('app.account.filters', []);

  //dashboard

  angular.module('app.dashboard', [
    'app.dashboard.services',
    'app.dashboard.factories',
    'app.dashboard.controllers',
    'app.dashboard.directives',
    'app.dashboard.filters'
  ]);

  angular.module('app.dashboard.services', []);
  angular.module('app.dashboard.factories', []);
  angular.module('app.dashboard.controllers', []);
  angular.module('app.dashboard.directives', []);
  angular.module('app.dashboard.filters', []);

  //login

  angular.module('app.login', [
    'app.login.services',
    'app.login.factories',
    'app.login.controllers',
    'app.login.directives',
    'app.login.filters'
  ]);

  angular.module('app.login.services', []);
  angular.module('app.login.factories', []);
  angular.module('app.login.controllers', []);
  angular.module('app.login.directives', []);
  angular.module('app.login.filters', []);

  //notifications

  angular.module('app.notifications', [
    'app.notifications.services',
    'app.notifications.factories',
    'app.notifications.controllers',
    'app.notifications.directives',
    'app.notifications.filters'
  ]);

  angular.module('app.notifications.services', []);
  angular.module('app.notifications.factories', []);
  angular.module('app.notifications.controllers', []);
  angular.module('app.notifications.directives', []);
  angular.module('app.notifications.filters', []);

})();
