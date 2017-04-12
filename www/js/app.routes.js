/**
 * Created by constantin.crismaru on 3/25/2017.
 */
(function () {
  'use strict';

  angular.module('app')
    .config(Config);

  Config.$inject = ['$stateProvider', '$urlRouterProvider', 'accountResolveProvider'];

  function Config($stateProvider, $urlRouterProvider, accountResolveProvider) {

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })

      .state('terms', {
        url: '/terms',
        templateUrl: 'views/terms.html'
      })

      .state('privacy', {
        url: '/privacy',
        templateUrl: 'views/privacy.html'
      })

      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'views/tabs.html',
        resolve: {
          location: accountResolveProvider.getLocation,
          mapStyle: accountResolveProvider.getMapStyle
        }
      })

      .state('tab.dashboard', {
        url: '/dashboard',
        views: {
          'dashboard': {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'account': {
            templateUrl: 'views/account.html',
            controller: 'AccountCtrl'
          }
        }
      })

      .state('tab.notifications', {
        url: '/notifications',
        views: {
          'notifications': {
            templateUrl: 'views/notifications.html',
            controller: 'NotificationsCtrl'
          }
        }
      })

      .state('tab.notifications-detail', {
        url: '/notifications/:chatId',
        views: {
          'notifications': {
            templateUrl: 'views/chat-detail.html',
            controller: 'NotificationsCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

  }

})();


