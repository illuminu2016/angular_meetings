(function () {
  'use strict';

  angular.module('app.notifications.factories', [])

    .factory('chatBackgroundService', chatBackgroundService);

  chatBackgroundService.$inject = [];

  function chatBackgroundService() {
    var admin = {
      chatBackgrounds: [
        {
          row: [
            {
              icon: 'back11.jpg',
              wallpaper: 'wall11.png'
            },
            {
              icon: 'back12.jpg',
              wallpaper: 'wall12.png'
            },
            {
              icon: 'back13.jpg',
              wallpaper: 'wall13.png'
            }
          ]
        },
        {
          row: [
            {
              icon: 'back21.jpg',
              wallpaper: 'wall21.png'
            },
            {
              icon: 'back22.jpg',
              wallpaper: 'wall22.png'
            },
            {
              icon: 'back23.jpg',
              wallpaper: 'wall23.png'
            }
          ]
        },
        {
          row: [{
            icon: 'back31.jpg',
            wallpaper: 'wall31.png'
          },
            {
              icon: 'back32.jpg',
              wallpaper: 'wall32.png'
            },
            {
              icon: 'back33.jpg',
              wallpaper: 'wall33.png'
            }
          ]
        },
        {
          row: [{
            icon: 'back31.jpg',
            wallpaper: 'wall31.png'
          },
            {
              icon: 'back32.jpg',
              wallpaper: 'wall32.png'
            },
            {
              icon: 'back33.jpg',
              wallpaper: 'wall33.png'
            }
          ]
        }
      ]
    };

    function getBackgrounds() {
      return admin;
    }

    return {
      getBackgrounds: getBackgrounds
    };
  }

})();

