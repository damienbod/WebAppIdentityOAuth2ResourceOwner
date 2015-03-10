(function () {
    'use strict';

    var addTokenToAllHttpRequestsWhenLoggedIn = function (actualUserService, $q, $log) {   	 
        var request = function (config) {    
            if (actualUserService.profile.userHasLoggedInSuccessfully) {
                $log.info("addTokenToAllHttpRequestsWhenLoggedIn:request:adding token to request: " + actualUserService.profile.token);
                config.headers.Authorization = "Bearer " + actualUserService.profile.token;
            }

            return $q.when(config);
        }

        return {
            request: request
        }
    }
 
    var module = angular.module('mainApp');

    // this code can be used with uglify
    module.factory("addTokenToAllHttpRequestsWhenLoggedIn",
		[
			"actualUserService",
			"$q",
            "$log",
            addTokenToAllHttpRequestsWhenLoggedIn
		]
	);

    module.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push(addTokenToAllHttpRequestsWhenLoggedIn);
    }]);


})();
