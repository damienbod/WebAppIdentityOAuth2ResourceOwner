(function () {
	var mainApp = angular.module("mainApp", ['ngRoute']);

	mainApp.config( ['$routeProvider',  function ($routeProvider) {
		$routeProvider
			.when('/home', {
				templateUrl: 'home.html',
				controller: 'HomeController'
			})
			.when('/details/:Id', {
				templateUrl: 'details.html',
				controller: 'DetailsController'
			})
            .when('/login', {
                templateUrl: 'login.html',
                controller: 'LoginController'
            })
			.otherwise({
				redirectTo: '/home'
			});
		}]
	);

})();