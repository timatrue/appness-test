angular.module('formLogic',['formService'])
    .component('formLogic',{
        templateUrl: './templates/form-logic.html',
        controller: function ($scope, formHttpService){
			$scope.credentials = false;
            $scope.formData = {};
			$scope.ageRange = [...Array(100).keys()].map(value => String(value)).slice(1);
			$scope.defaultMin = $scope.ageRange[0];
			$scope.defaultMax = $scope.ageRange.slice(-1)[0];
			$scope.restrictMin = (age,defaultMax)=> Number(age) > Number(defaultMax);
			$scope.restrictMax = (age,defaultMin)=> Number(age) < Number(defaultMin);
			$scope.genders = ['All','Male','Female'];
			$scope.selectedGender = $scope.genders[0];
			$scope.countryValid = false;
			
			$scope.cleanInput = function(input){
				formData[input] = "";
			}
			$scope.addCountry = function(country){
				console.log("click", country);
				$scope.countryQuery = country;
				$scope.isCountryValid();
			}
			$scope.isCountryValid = function(){
				if($scope.countryQuery !== undefined){
					let filtered = $scope.countryList.filter((country)=> country.toLowerCase() === $scope.countryQuery.toLowerCase());
					$scope.formData.country = filtered.length ? filtered[0] : "";
					$scope.countryValid = filtered.length ?  true : false;
					if($scope.countryValid) $scope.onChange();
				}
			}
			
			$scope.onChange = function(){
				$scope.formData.min = $scope.defaultMin;
				$scope.formData.max = $scope.defaultMax;
				if($scope.myForm.$valid && $scope.countryValid) {
					formHttpService.isAccountValid($scope.formData.account, $scope.formData.token)
					.then(function(data){
						if(data !== null) {
							$scope.credentials = true;
							$scope.requestAPI();
						}
						else $scope.credentials = false;
					});
				};
			};
			
			
			$scope.credentialsError = function(){
				if($scope.myForm.$valid) {
					if($scope.countryValid) return $scope.credentials ? "" : "Wrong Account or Token";
				}
				return "Fill the form";
			}
			$scope.requestAPI = function(){
				let min = $scope.formData.min;
				let max = $scope.formData.max;
				let country = $scope.formData.country;
				formHttpService.setParams(min, max, country);
				console.log('requestAPI',$scope.formData, $scope.myForm.$valid)
			}
			$scope.countries = ()=> {
				formHttpService.getCountries()
				.then(function(data) {
					$scope.countryData = data;
					console.log(data)
					$scope.countryList = data.data.map(data => data.name);
				});	
			}
			$scope.countries();
			
        }
    });
