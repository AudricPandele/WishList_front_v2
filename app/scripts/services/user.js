angular.module('wishListFrontV2App')
.service('User', function ($http, $cookieStore, $location) {

    this.login = function(user) {
      $http({
        method: 'POST',
        url: 'http://localhost:1337/auth/signin',
        data: {
          identifier: user.mail,
          password: user.password
        }
      }).then(function successCallback(response) {
        if (response.data == null) {
           console.log(response);
        }else{
          console.log(response.data);
           $cookieStore.put('id', response.data.user.id);
           $cookieStore.put('mail', response.data.user.mail);
           $cookieStore.put('token', response.data.token);
           $location.path('/home');
           location.reload();
        }
        }, function errorCallback(response) {
        });
      };

    this.register = function(user) {
      $http({
        method: 'POST',
        url: 'http://localhost:1337/auth/signup',
        data: {
          email: user.mail,
          password: user.password
        }
      }).then(function successCallback(response) {
          if (response.data == null) {
            console.log(response);
          }else{
            $cookieStore.put('id', response.data.id);
            $cookieStore.put('mail', response.data.email);
            $cookieStore.put('token', response.data.token);
            $scope.loginUser(user);
          }
        }, function errorCallback(response) {
      });
    }

    this.logout = function () {
      $cookieStore.remove('id');
      $cookieStore.remove('mail');
      $cookieStore.remove('token');
      $cookieStore.remove('list_id');
      location.reload();
    }

});
