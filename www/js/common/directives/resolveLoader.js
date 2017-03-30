/**
 * Created by constantin.crismaru on 3/29/2017.
 */
(function () {
  'use strict';

  angular.module('app.common.directives')
    .directive('showDuringResolve', showDuringResolve)
    .directive('resolveLoader', resolveLoader);

  showDuringResolve.$inject = ['$rootScope'];

  function showDuringResolve($rootScope) {

    return {
      link: function(scope, element) {

        element.addClass('ng-hide');

        var unregister = $rootScope.$on('$routeChangeStart', function() {
          element.removeClass('ng-hide');
        });

        scope.$on('$destroy', unregister);
      }
    };
  }

  resolveLoader.$inject = ['$rootScope', '$timeout'];

  function resolveLoader($rootScope, $timeout) {

    return {
      restrict: 'E',
      replace: true,
      template: '<ion-spinner icon="dots"></ion-spinner>',
      link: function(scope, element) {

        $rootScope.$on('$routeChangeStart', function(event, currentRoute, previousRoute) {
          /*if (previousRoute) return;*/

/*          $timeout(function() {*/
            element.removeClass('ng-hide');
/*          });*/
        });

        $rootScope.$on('$routeChangeSuccess', function() {
          element.addClass('ng-hide');
        });
      }
    }
  }

})();
