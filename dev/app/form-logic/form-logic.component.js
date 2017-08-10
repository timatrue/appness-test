/**
 * Created by artem on 16/06/2017.
 */
angular.module('formLogic')
    .component('formLogic',{
        templateUrl: './templates/form-logic.html',
        controller: function($scope){
            
			$scope.testVar = "Appness";
			$scope.ageRange = [...Array(100).keys()].slice(1);
			$scope.genders = ['Male','Female'];
			
           
        }
    });