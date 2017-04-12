/**
 * Created by constantin.crismaru on 3/25/2017.
 */
(function () {
  'use strict';

  angular.module('app')
    .config(Config)

    Config.$inject = ['uiGmapGoogleMapApiProvider', '$ionicConfigProvider', '$httpProvider'];

    function Config(GoogleMapApiProviders, $ionicConfigProvider, $httpProvider) {

      $ionicConfigProvider.tabs.position('bottom');

      GoogleMapApiProviders.configure({
        china: true
      });
      // Allow CORS
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
})();
