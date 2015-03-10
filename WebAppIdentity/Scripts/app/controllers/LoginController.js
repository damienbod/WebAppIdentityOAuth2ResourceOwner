(function (module) {
    var LoginController = function (oauth2ResourceOwnerFlowService, actualUser, loginRedirect) {

        var model = this;
        model.username = "";
        model.password = "";
        model.user = actualUser.profile;

        model.login = function (form) {
            if (form.$valid) {
                oauth2ResourceOwnerFlowService.login(model.username, model.password)
                .then(loginRedirect.redirectPreLogin)
                .catch(console.log("error damien"));
                model.password = "";
            }
        }

        model.signOut = function () {
            oauth2ResourceOwnerFlowService.logout();
        };


    };
    module.controller("LoginController", LoginController);
}(angular.module("mainApp")));