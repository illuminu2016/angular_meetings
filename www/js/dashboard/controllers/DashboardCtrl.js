/**
 * Created by constantin.crismaru on 3/25/2017.
 */
(function () {
  'use strict';

  angular.module('app.dashboard.controllers', [])
    .controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['$injector', '$scope', 'location', 'mapStyle', 'uiGmapGoogleMapApi'];

  function DashboardCtrl($injector, $scope, location, mapStyle, uiGmapGoogleMapApi) {
    /**
     * Injections
     */

    //var mapService = $injector.get('mapService');

    /**
     * Private properties
     */

    /**
     * Private methods
     */
    function getWindowInfo(name, photo) {
      var contentStringCal = '<div id="contentCal" class="iw-container">' +
        '<div class="iw-title"></div>' +
        '<div>' +
        '<div style="margin: 0 auto;">' +
        '<img src="' + photo + '" width="80" height="80">' +
        '</div>' +
        '</div>' +
        '<div class="profile_information">' +
        '<div><div style="margin: 0 auto"> ' + name + '</div></div>' +
        '</div>' +
        '</div>';
      return contentStringCal;
    }

    function addListenersOnMap(marker, infowindow, map, contentStringCal) {
      google.maps.event.addListener(marker, 'mouseover', function () {
        //open the infowindow when it's not open yet
        if (contentStringCal != infowindow.getContent()) {
          infowindow.setContent(contentStringCal);
          infowindow.open(map, marker);
        }
      });

      google.maps.event.addListener(marker, 'click', function () {
        //when the infowindow is open, close it an clear the contents
        if (contentStringCal == infowindow.getContent()) {
          infowindow.close(map, marker);
          infowindow.setContent('');
        }
        //otherwise trigger mouseover to open the infowindow
        else {
          google.maps.event.trigger(marker, 'mouseover');
        }
      });
      //clear the contents of the infwindow on closeclick
      google.maps.event.addListener(infowindow, 'closeclick', function () {
        infowindow.setContent('');
      });
      google.maps.event.addListener(infowindow, 'domready', function () {
        // Reference to the DIV that wraps the bottom of infowindow
        var iwOuter = $('.gm-style-iw');

        /* Since this div is in a position prior to .gm-div style-iw.
         * We use jQuery and create a iwBackground variable,
         * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
         */
        var iwBackground = iwOuter.prev();

        // Removes background shadow DIV
        iwBackground.children(':nth-child(2)').css({'display': 'none'});

        // Removes white background DIV
        iwBackground.children(':nth-child(4)').css({'display': 'none'});

        // Moves the infowindow 115px to the right.
        iwOuter.parent().parent().css({left: '115px'});

        // Moves the shadow of the arrow 76px to the left margin.
        iwBackground.children(':nth-child(1)').attr('style', function (i, s) {
          return s + 'left: 76px !important;'
        });

        // Moves the arrow 76px to the left margin.
        iwBackground.children(':nth-child(3)').attr('style', function (i, s) {
          return s + 'left: 76px !important;'
        });

        // Changes the desired tail shadow color.
        iwBackground.children(':nth-child(3)').find('div').children().css({
          'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px',
          'z-index': '1'
        });

        // Reference to the div that groups the close button elements.
        var iwCloseBtn = iwOuter.next();

        // Apply the desired effect to the close button
        iwCloseBtn.css({
          opacity: '1',
          right: '38px',
          top: '3px',
          height: '27px',
          width: '27px',
          border: '7px solid #48b5e9',
          'border-radius': '13px',
          'box-shadow': '0 0 5px #3990B9'
        });

        // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
        if ($('.iw-content').height() < 140) {
          $('.iw-bottom-gradient').css({display: 'none'});
        }

        // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
        iwCloseBtn.mouseout(function () {
          $(this).css({opacity: '1'});
        });
      });
    }

    function drawUserOnMap(item, username, icon, map) {
      if (item.user != username) {
        var pos = {
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude)
        };

        var inArray = $scope.dataHolder.instancesMarker.some(function (instance) {
          return instance.username === item.user;
        });

        if (!inArray) {
          $scope.dataHolder.instancesMarker.push({
            username: item.user,
            instancePosition: null
          });
        }

        //addMarkerOnMap(map, icon, pos, item.user, inArray);
      }
    }

    function addMarkerOnMap(map, icon, pos, user, inArray) {
      if (!inArray) {
        var marker = new MarkerWithLabel({
            setMap: map,
            draggable: false,
            icon: icon,
            animation: google.maps.Animation.DROP,
            position: pos
          }),
          infowindow = new google.maps.InfoWindow({}),
          contentStringCal = (user === 'cosmin') ? getWindowInfo('Crismaru Constantin', 'cosmin.jpg') : getWindowInfo('Ana Pascal', 'ana.jpg');

        var newLen = $scope.dataHolder.markers.push(marker);
        $scope.dataHolder.instancesMarker.forEach(function (item) {
          if (item.username === user) {
            item.instancePosition = newLen - 1;
          }
        });

        $scope.dataHolder.instancesMarker[newLen - 1].instancePosition = newLen - 1;

        addListenersOnMap(marker, infowindow, map, contentStringCal);

      } else {
        var newPosition = {
          latitude: pos.latitude,
          longitude: pos.longitude
        };

        var instanceMarker = $scope.dataHolder.instancesMarker.find(function (instance) {
          return instance.username === user;
        });

        $scope.dataHolder.markers[instanceMarker.instancePosition].setPosition(newPosition);
      }
    }

    function getLocation() {
      var infoWindow = new google.maps.InfoWindow({}),
        username = 'ana',
        icon = {
          url: "icons/man.png",
          anchor: new google.maps.Point(25, 50),
          scaledSize: new google.maps.Size(42, 100)
        },
        icon2 = {
          url: "icons/female.png",
          anchor: new google.maps.Point(25, 50),
          scaledSize: new google.maps.Size(42, 100)
        },
        map = $scope.dataHolder.map;

      var pos = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };

/*      if (!$scope.circle) {
        $scope.circle = new google.maps.Circle({
          setMap: map,
          radius: 45,
          strokeColor: "#83b7c7",
          strokeOpacity: 0.8,
          fillOpacity: 0.35,
          strokeWeight: 2,
          fillColor: '#83b7c7',
          center: pos
        });
      }*/

      var response = [{"id": "41", "user": "ana", "latitude": "47.1564", "longitude": "27.5901", "genre": "female"}, {
        "id": "44",
        "user": "cosmin",
        "latitude": "47.1552",
        "longitude": "27.5884",
        "genre": "male"
      }];

      //var response = JSON && JSON.parse(data) || $.parseJSON(data);

      response.forEach(function (item) {
        console.log(item);
        var ico = (item.genre === 'male') ? icon : icon2;

        //drawUserOnMap(item, username, ico, map);
      });
    }

    /**
     * Scope properties
     */

    $scope.dataHolder = {
      map: {
        zoom: 19
      },
      options: {
        disableDefaultUI: true,
        scrollwheel: true,
        mapTypeControlOptions: {
          mapTypeIds: ['styled_map'],
          styles: mapStyle
        }
      },
      marker: {},
      markers: [],
      instancesMarker: [],
      circle: null,
      mapShow: false,
      mapCenter: null
    };

    /**
     * Scope methods
     */

    /**
     * Init Method
     */
    (function init() {
        $scope.dataHolder.mapCenter = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        };

        getLocation($scope.dataHolder.map);
    })();
  }
})();
