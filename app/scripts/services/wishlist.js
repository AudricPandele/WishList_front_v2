angular.module('wishListFrontV2App')
.service('Wishlist', function ($http, $cookieStore, $location) {
  var Wishlist = {

    getLists: function() {
      var promise = $http({
          method: 'GET',
          url: 'http://localhost:1337/user/'+$cookieStore.get('id')+'/wishlists',
          headers: {
            Authorization: 'JWT '+$cookieStore.get('token')
          }
        }).then(function successCallback(response) {
            if (response.data == null) {
              console.log(response);
            }else{
              lists = response.data;


              $.each(lists, function( i, list ){
                list.all_pics = [];

                $http({
                    method: 'GET',
                    url: 'http://localhost:1337/wishlist/'+list.id+'/wishlistLinks',
                    headers: {
                      Authorization: 'JWT '+$cookieStore.get('token')
                    }
                  }).then(function successCallback(response) {
                      if (response.data == null) {
                        console.log(response);
                      }else{
                        var links = response.data;
                        if (links) {
                          $.each(links, function( i, link ){
                            if (i<=4) {
                              list.all_pics.push({url: link.picture, rate: link.color_rate});
                            }
                          })
                        }
                      }
                    }, function errorCallback(response) {
                  });
              });

              return response.data;
            }
          }, function errorCallback(response) {
        });
      return promise;
    },

    getListById: function (id) {
      var promise = $http({
          method: 'GET',
          url: 'http://localhost:1337/wishlist/'+id+'/wishlistLinks',
          headers: {
            Authorization: 'JWT '+$cookieStore.get('token')
          }
        }).then(function successCallback(response) {
            if (response.data == null) {
              console.log(response);
            }else{
              return response.data;
            }
          }, function errorCallback(response) {
        });
      return promise;
    },

    getListById: function(id) {
      var promise = $http({
          method: 'GET',
          url: 'http://localhost:1337/wishlist/'+id,
          headers: {
            Authorization: 'JWT '+$cookieStore.get('token')
          }
        }).then(function successCallback(response) {
            if (response.data == null) {
              console.log(response);
            }else{
              return response.data;
            }
          }, function errorCallback(response) {
        });
      return promise;
    },

    addList: function (list) {
      $http({
        method: 'POST',
        url: 'http://localhost:1337/wishlist',
        headers: {
          Authorization: 'JWT '+$cookieStore.get('token')
        },
        data: {
          title: list.title,
          description: list.description,
          owner: $cookieStore.get('id')
        }
      }).then(function successCallback(response) {
          if (response.data == null) {
            console.log(response);
          }else{
            $location.path('/home');
            location.reload();
          }
        }, function errorCallback(response) {
      });
    },

    addLink: function (id, link) {
      $http({
        method: 'POST',
        url: 'http://localhost:1337/wishlistlink',
        headers: {
          Authorization: 'JWT '+$cookieStore.get('token')
        },
        data: {
          link: link,
          wishlist: id,
        }
      }).then(function successCallback(response) {
          if (response.data == null) {
            console.log(response);
          }else{
            $location.path('/list/'+id);
            location.reload();
          }
        }, function errorCallback(response) {
      });
    },

    deleteLink: function(id) {
      var promise = $http({
          method: 'DELETE',
          url: 'http://localhost:1337/wishlistlink/'+id,
          headers: {
            Authorization: 'JWT '+$cookieStore.get('token')
          }
        }).then(function successCallback(response) {
            if (response.data == null) {
              console.log(response);
            }else{
              location.reload();
            }
          }, function errorCallback(response) {
        });
      return promise;
    },

    deleteList: function(id) {
      var promise = $http({
          method: 'DELETE',
          url: 'http://localhost:1337/wishlist/'+id,
          headers: {
            Authorization: 'JWT '+$cookieStore.get('token')
          }
        }).then(function successCallback(response) {
            if (response.data == null) {
              console.log(response);
            }else{
              location.reload();
            }
          }, function errorCallback(response) {
        });
      return promise;
    },

    updateRate: function (id, rate, order) {
      $http({
        method: 'PUT',
        url: 'http://localhost:1337/wishlistlink/'+id,
        headers: {
          Authorization: 'JWT '+$cookieStore.get('token')
        },
        data: {
          color_rate: rate,
          order: order
        }
      }).then(function successCallback(response) {
          if (response.data == null) {
            console.log(response);
          }else{
            location.reload();
          }
        }, function errorCallback(response) {
      });
    },

  };
  return Wishlist;

})
