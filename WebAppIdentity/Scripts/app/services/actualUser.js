(function () {
    'use strict';

    var module = angular.module('mainApp');
  
    var actualUser = function() {
    	
        var setProfile = function (username, token) {
            console.log("actualUser:setProfile, username:" + username + ",token:" + token);
            profile.username = username;
            profile.token = token;
        }

        var profile = function () {
            username = "",
            token = "",
            loggedIn = function() {
                return this.token;
            }
        }

        return {
            setProfile: setProfile,
            profile: profile
        }
    }

    // this code can be used with uglify
    module.factory('actualUser', actualUser);
})();
