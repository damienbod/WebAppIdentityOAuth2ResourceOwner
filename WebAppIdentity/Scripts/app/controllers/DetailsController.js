(function () {
    'use strict';

    function DetailsController($scope, $log, fastestAnimalService, $routeParams) {
    	$log.info("DetailsController called");
    	$scope.message = "Animal Details";
    	$scope.Id = $routeParams.Id;
    	$log.info("DetailsController called for: " + $scope.Id);

    	var getAnimals = function () {
    	    fastestAnimalService.getAnimal($scope.Id)
			    .then(onSuccess, onError);
    	}

    	getAnimals($routeParams.Id);

    	function onSuccess(response) {
    		$scope.animal = response;
    	}

    	function onError(reason) {
    		$scope.error = reason;
    	}
    }

    var module = angular.module('mainApp');

    // this code can be used with uglify
    module.controller('DetailsController',
		[
			'$scope',
			'$log',
			"fastestAnimalService",
			"$routeParams",
			DetailsController
		]
	);

})();
