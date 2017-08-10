/**
 * Created by artem on 16/06/2017.
 */
angular.module('formLogic')
    .component('formLogic',{
        templateUrl: './templates/form-logic.html',
        controller: function($scope){
            
			$scope.testVar = "Appness";
			$scope.ageRange = [...Array(100).keys()].map(value => String(value)).slice(1);
			$scope.defaultMin = $scope.ageRange[0];
			$scope.defaultMax = $scope.ageRange.slice(-1)[0];
			$scope.restrictMin = (age,defaultMax)=> Number(age) > Number(defaultMax);
			$scope.restrictMax = (age,defaultMin)=> Number(age) < Number(defaultMin);
			
			$scope.genders = ['Male','Female'];
			$scope.selectedGender = $scope.genders[0];
			
        }
    });