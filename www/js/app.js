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
      'slick',
      'app.common',
      'app.account',
      'app.dashboard',
      'app.login',
      'app.notifications',
      'app.profile',
      'app.user'
    ]);

  //common
  angular.module('app.common', [
    'app.common.factories'
  ]);

  angular.module('app.common.factories', []);

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

  //profile

  angular.module('app.profile', [
    'app.profile.services',
    'app.profile.factories',
    'app.profile.controllers',
    'app.profile.directives',
    'app.profile.filters'
  ]);

  angular.module('app.profile.services', []);
  angular.module('app.profile.factories', []);
  angular.module('app.profile.controllers', []);
  angular.module('app.profile.directives', []);
  angular.module('app.profile.filters', []);

  //user

  angular.module('app.user', [
    'app.user.services',
    'app.user.factories',
    'app.user.controllers',
    'app.user.directives',
    'app.user.filters'
  ]);

  angular.module('app.user.services', []);
  angular.module('app.user.factories', []);
  angular.module('app.user.controllers', []);
  angular.module('app.user.directives', []);
  angular.module('app.user.filters', []);

})();
