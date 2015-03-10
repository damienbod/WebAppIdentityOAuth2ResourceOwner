(function () {
    'use strict';

    var addTokenToAllHttpRequestsWhenLoggedIn = function (actualUserService, $q, $log) {
    	 
        var request = function (config) {
            $log.info("addTokenToAllHttpRequestWhenLoggedIn:request:adding token to request: " + actualUserService.profile.token);
            $log.info(actualUserService.profile.loggedIn);
            if (actualUserService.profile.loggedIn) {
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
