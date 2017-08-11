angular.module('formLogic',['formService'])
    .component('formLogic',{
        templateUrl: './templates/form-logic.html',
        controller: function ($scope, formHttpService){
			
            $scope.formData = {};
			$scope.ageRange = [...Array(100).keys()].map(value => String(value)).slice(1);
			$scope.defaultMin = $scope.ageRange[0];
			$scope.defaultMax = $scope.ageRange.slice(-1)[0];
			$scope.restrictMin = (age,defaultMax)=> Number(age) > Number(defaultMax);
			$scope.restrictMax = (age,defaultMin)=> Number(age) < Number(defaultMin);
			$scope.genders = ['Male','Female'];
			$scope.selectedGender = $scope.genders[0];
			
			$scope.addCountry = function(country){
				$scope.countryQuery = country;
				$scope.isCountryValid();
			}
			$scope.isCountryValid = function(){
				if($scope.countryQuery !== undefined){
					let filtered = $scope.countryList.filter((country)=> country.toLowerCase() === $scope.countryQuery.toLowerCase());
					$scope.formData.country = filtered.length ? filtered[0] : "";
					$scope.showDropDown = filtered.length ? false : true;
				}
			}

			$scope.$watch('formData', function(){
				$scope.formData.min = $scope.defaultMin;
				$scope.formData.max = $scope.defaultMax;
				console.log('formData',$scope.formData )
			}, true);
			$scope.countries = ()=> {
				formHttpService.async().then(function(data) {
					$scope.countryData = data;
					console.log(data)
					$scope.countryList = data.data.map(data => data.name);
				});	
			}
			$scope.countries();
			
        }
    });
	