(function () {
    'use strict';

    var module = angular.module('mainApp');
   
    var addTokenToAllHttpRequestsWhenLoggedIn = function (actualUser, $q) {
    	 
        var request = function (config) {
            console.log("addTokenToAllHttpRequestWhenLoggedIn:request:adding token to request: " + actualUser.profile.token);
            console.log(actualUser.profile.loggedIn);
            if (actualUser.profile.loggedIn) {
                config.headers.Authorization = "Bearer " + actualUser.profile.token;
            }

            return $q.when(config);
        }

        return {
            request: request
        }
    }
 
    module.factory('addTokenToAllHttpRequestsWhenLoggedIn', addTokenToAllHttpRequestsWhenLoggedIn);

    module.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push(addTokenToAllHttpRequestsWhenLoggedIn);
    }]);


})();
