/**
 * Created by constantin.crismaru on 3/25/2017.
 */
(function () {
  'use strict';

  angular.module('app')
    .config(Config);

    Config.$inject = ['uiGmapGoogleMapApiProvider', '$ionicConfigProvider'];

    function Config(GoogleMapApiProviders, $ionicConfigProvider) {

      $ionicConfigProvider.tabs.position('bottom');

      GoogleMapApiProviders.configure({
        china: true
      });
    }
})();
