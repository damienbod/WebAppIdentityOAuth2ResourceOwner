(function () {
    'use strict';

    var loginRedirectService = function () {
        var loginUrl = "/login";
        var lastPath = "";
        this.setLoginUrl = function (value) {
            loginUrl = value;
        };
        this.$get = function ($q, $location, $log) {
            return {
                responseError: function (response) {
                    if (response.status == 401) {
                        $log.info("loginRedirectService:responseError 401, redirect to login");
                        lastPath = $location.path();
                        $location.path(loginUrl);
                    }
                    return $q.reject(response);
                },
                redirectPreLogin: function () {
                    $log.info("loginRedirectService:redirectPreLogin");
                    if (lastPath) {
                        $location.path(lastPath);
                        lastPath = "";
                    } else {
                        $location.path("/");
                    }
                }
            };
        };
    };

    var module = angular.module('mainApp');

    // this code can be used with uglify
    module.provider('loginRedirectService',
		[
			loginRedirectService
		]
	);

    module.config(function ($httpProvider) {
        $httpProvider.interceptors.push("loginRedirectService");
    });
})();
