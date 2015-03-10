(function () {
	'use strict';

	function fastestAnimalService($http, $log, actualUser) {

		$log.info("fastestAnimalService called");

		var getAnimals = function () {
		    $log.info("fastestAnimalService:getAnimals called");
		    $log.info("fastestAnimalService:getAnimals token: " + actualUser.profile.token);
			return $http.get("/api/FastestAnimal")
			.then(function (response) {
				return response.data;
			});
		}

		var getAnimal = function (id) {
		    $log.info("fastestAnimalService:getAnimal called");
		    $log.info("fastestAnimalService:getAnimal token: " + actualUser.profile.token);
		    
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
	module.factory("fastestAnimalService",
		[
			"$http",
			"$log",
            "actualUser",
            fastestAnimalService
		]
	);

})();
