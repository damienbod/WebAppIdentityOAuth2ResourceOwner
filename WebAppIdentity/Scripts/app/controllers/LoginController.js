(function (module) {
    var LoginController = function (oauth2Password, actualUser, loginRedirect) {

        var model = this;
        model.username = "";
        model.password = "";
        model.user = actualUser.profile;

        model.login = function (form) {
            if (form.$valid) {
                oauth2Password.login(model.username, model.password)
                .then(loginRedirect.redirectPreLogin)
                .catch(console.log("error damien"));
                model.password = "";
            }
        }

        model.signOut = function () {
            oauth2Password.logout();
        };


    };
    module.controller("LoginController", LoginController);
}(angular.module("mainApp")));