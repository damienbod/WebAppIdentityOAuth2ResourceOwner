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

            // username=damien&password=damien&grant_type=password         
            var data = encodeQueryData(username, password);
            return $http.post("/oauth/token", data, config)
                .then(function (response) {             
                    actualUser.setProfile(username, response.data.access_token);
                });
        }

        function encodeQueryData(username, password) {
            var data = "username=" + username + "&password=" + password + "&grant_type=password";
            console.log(data);
            return data;
        }

        return {
            login: login
        }
    }

    module.factory('oauth2Password', oauth2Password);

})();
