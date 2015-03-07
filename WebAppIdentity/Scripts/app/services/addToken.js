(function () {
    'use strict';

    var module = angular.module('mainApp');
   
    var addToken = function(actualUser, $q) {
    	 
        var request = function (config) {
            if (actualUser.profile.loggedIn) {
                config.headers.Authorization = "Bearer " + actualUser.profile.token;
            }

            return $q.when(config);
        }

        return {
            request: request
        }
    }
 
    module.factory('addToken', addToken);

    module.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push("addToken");
    }]);


})();
