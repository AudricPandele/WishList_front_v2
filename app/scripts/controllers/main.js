'use strict';

/**
 * @ngdoc function
 * @name wishListFrontV2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wishListFrontV2App
 */
angular.module('wishListFrontV2App')
  .controller('MainCtrl', function ($scope, $http, $location, $cookieStore, User) {

    // $scope.showRegister = function () {
    //   alert('dd');
    //   $('loginModal').modal('hide');
    //   $('registerModal').modal('show');
    // }

    $scope.register = function(user) {
     User.register($scope.user);
    };

    $scope.loginUser = function(user) {
      User.login($scope.user);
    };

  });
