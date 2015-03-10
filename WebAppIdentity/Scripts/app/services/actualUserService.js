(function () {
    'use strict';

    var actualUserService = function($log) {
    	
        var setProfile = function (username, token) {
            $log.info("actualUserService:setProfile, username:" + username + ",token:" + token);
            profile.username = username;
            profile.token = token;
            profile.userHasLoggedInSuccessfully = true;
        }

        var profile = function () {
            username = "",
            token = ""
        }

        return {
            setProfile: setProfile,
            profile: profile
        }
    }

    var module = angular.module('mainApp');

    // this code can be used with uglify
    module.factory("actualUserService",
		[
			"$log",
            actualUserService
		]
	);


})();
