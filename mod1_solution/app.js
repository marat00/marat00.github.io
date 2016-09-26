(function () {
'use strict';
  
angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);
  
LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
    $scope.response = ""; //default message
	$scope.lunch = ""; // to hold the user input for lunch entries
	  
    $scope.determineResponse = function () {
	    var lunch = $scope.lunch.split(',').filter(isValidEntry); // using Array.prototype.filter
		
		// We need to check if the number of elements is greater than 1
		if (lunch.length > 0) {
		  $scope.response = responseChecker(lunch);
        } else {
 		  $scope.response = "Please enter data first";
		}
	};
	
	// The function to check is the input is a String (might be redundant) and
	// if its length is greater than zero
	// This should filter empty strings, such as "" and "  ".
	function isValidEntry(entry) {
		return (Object.prototype.toString.call(entry) === '[object String]') && (entry.length > 1);
	}
	
	// Check if the number of elements is less than or equal to 3, or greater than 3.
	// If the number of elements is less than or equal to 3, the method returns "Enjoy!".
	// If the number of elements is greater than 3, return "Too much!".
	function responseChecker(lunchItems) {
		var response = "";
		
		if (lunchItems.length <= 3) {
			response = "Enjoy!";
		} else if (lunchItems.length > 3){
			response = "Too much!";
	    } else
			response = "Please enter data first";
		
		return response;
	}
}
})();