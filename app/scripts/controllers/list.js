'use strict';

/**
 * @ngdoc function
 * @name wishListFrontV2App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wishListFrontV2App
 */
angular.module('wishListFrontV2App')
  .controller('ListCtrl', function ($cookieStore, $location, $scope, Wishlist, $routeParams) {

    $scope.slider = {
      value: 2,
      options: {
          floor: 1,
          ceil: 4,
          showTicks: true,
          showSelectionBar: true,
          getSelectionBarColor: function(value) {
              if (value <= 1)
                  return '#EE8277';
              if (value <= 2)
                  return '#EEA565';
              if (value <= 3)
                  return '#71B7E6';
              return '#81C684';
          },
          getPointerColor: function(value) {
            if (value <= 1)
                return '#EE8277';
            if (value <= 2)
                return '#EEA565';
            if (value <= 3)
                return '#71B7E6';
            return '#81C684';
        }
      }
    };

    if(!$cookieStore.get('token')){
        $location.path('/');
    }

    Wishlist.getListById($routeParams['id']).then(function(d) {
      $scope.wishlist = d;
    });

    $scope.addLink = function () {
      Wishlist.addLink($scope.wishlist.id, $scope.link.url);
    }

    $scope.delete = function (id) {
      Wishlist.deleteLink(id);
    }

    $scope.updateRate = function (id, rate, order) {
      Wishlist.updateRate(id, rate, order);
    }

    $scope.flip = function(id){
      $('.card_'+id).addClass('flipped');
    }

    $scope.reflip = function(id){
      $('.card_'+id).removeClass('flipped');
    }

  });
