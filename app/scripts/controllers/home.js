'use strict';

/**
 * @ngdoc function
 * @name wishListFrontV2App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wishListFrontV2App
 */
angular.module('wishListFrontV2App')
  .controller('HomeCtrl', function ($cookieStore, $location, $scope, Wishlist, User) {
    if(!$cookieStore.get('token')){
        $location.path('/');
    }

    Wishlist.getLists().then(function(d) {
      $scope.lists = d;
    });

    $scope.addList = function () {
      Wishlist.addList($scope.list);
    }

    $scope.logout = function () {
      User.logout();
    }

    $scope.seeList = function(id) {
      $cookieStore.put('list_id', id);
      $location.path('/list/'+id);
    }

    $scope.deleteList = function(id) {
      Wishlist.deleteList(id);
    }
});
