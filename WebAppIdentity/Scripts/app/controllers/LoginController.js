(function () {
    'use strict';

    var LoginController = function (oauth2ResourceOwnerFlowService, actualUserService, loginRedirectService, $scope, $log) {

        $scope.message = "Login to server";
        var model = this;
        model.username = "";
        model.password = "";
        model.user = actualUserService.profile;

        model.login = function (form) {
            $log.info("LoginController:login");
            if (form.$valid) {
                oauth2ResourceOwnerFlowService.login(model.username, model.password)
                .then(loginRedirectService.redirectPreLogin)
                .catch(console.log("error something has gone wrong"));
                model.password = "";
            }
        }

        model.signOut = function () {
            $log.info("LoginController:signOut");
            oauth2ResourceOwnerFlowService.logout();
        };
    };

    var module = angular.module('mainApp');

    // this code can be used with uglify
    module.controller('LoginController',
		[
			'oauth2ResourceOwnerFlowService',
			'actualUserService',
			"loginRedirectService",
			"$scope",
            "$log",
			LoginController
		]
	);

})();
