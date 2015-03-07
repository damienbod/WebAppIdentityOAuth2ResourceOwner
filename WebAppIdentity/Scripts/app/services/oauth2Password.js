(function () {
    'use strict';

    var module = angular.module('mainApp');

    function oauth2Password($http, actualUser) {

        var login = function(username, password) {
            var config = {
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }

            var data = "username=SuperPowerUser&password=damien&grant_type=password"; //$.param({ username: "username" });
            return $http.post("/oauth/token", data, config)
                .then(function (response) {             
                    actualUser.setProfile(username, response.data.access_token);
                });
        }

        return {
            login: login
        }
    }

    module.factory('oauth2Password', oauth2Password);

})();
