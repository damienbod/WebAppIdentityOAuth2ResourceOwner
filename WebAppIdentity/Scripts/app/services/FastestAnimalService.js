(function () {
	'use strict';

	function FastestAnimalService($http, $log, actualUser) {

		$log.info("FastestAnimalService called");

		var getAnimals = function () {
		    $log.info("FastestAnimalService:getAnimals called");
		    $log.info("FastestAnimalService:getAnimals token: " + actualUser.profile.token);
			return $http.get("/api/FastestAnimal")
			.then(function (response) {
				return response.data;
			});
		}

		var getAnimal = function (id) {
		    $log.info("FastestAnimalService:getAnimal called");
		    $log.info("FastestAnimalService:getAnimal token: " + actualUser.profile.token);
		    
			return $http.get("/api/FastestAnimal/" + id)
			.then(function (response) {
				return response.data;
			});
		}

		return {
			getAnimals: getAnimals,
			getAnimal: getAnimal
		}
	}

	var module = angular.module('mainApp');

	// this code can be used with uglify
	module.factory("FastestAnimalService",
		[
			"$http",
			"$log",
            "actualUser",
            FastestAnimalService
		]
	);

})();
