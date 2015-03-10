(function () {
    'use strict';

    function oauth2ResourceOwnerFlowService($http, $log, actualUser) {

        var login = function(username, password) {
            var config = {
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }

            // username=damien&password=damien&grant_type=password         
            var data = encodeQueryData(username, password);
            return $http.post("/oauth/token", data, config)
                .then(function (response) {             
                    actualUser.setProfile(username, response.data.access_token);
                });
        }

        var logout = function () {
            // TODO
            $log.info("oauth2ResourceOwnerFlowService:logout");
        }

        function encodeQueryData(username, password) {
            var data = "username=" + username + "&password=" + password + "&grant_type=password";
            $log.info("oauth2ResourceOwnerFlowService:encodeQueryData " + data);
            return data;
        }

        return {
            login: login,
            logout: logout
        }
    }

    var module = angular.module('mainApp');

    // this code can be used with uglify
    module.factory("oauth2ResourceOwnerFlowService",
		[
			"$http",
			"$log",
            "actualUser",
            oauth2ResourceOwnerFlowService
		]
	);

})();
