angular.module('formLogic',['formService'])
    .component('formLogic',{
        templateUrl: './templates/form-logic.html',
        controller: function ($scope, $rootScope, formHttpService){
			$scope.credentials = false;
            $scope.formData = {query:'Fire Fighter'};
			$scope.ageRange = [...Array(66).keys()].map(value => String(value)).slice(13);
			$scope.defaultMin = $scope.ageRange[0];
			$scope.defaultMax = $scope.ageRange.slice(-1)[0];
			$scope.restrictMin = (age,defaultMax)=> Number(age) > Number(defaultMax);
			$scope.restrictMax = (age,defaultMin)=> Number(age) < Number(defaultMin);
			$scope.genders = [{name:'All',value:[1,2]},{name:'Male',value:[1]},{name:'Female',value:[2]}];
			$scope.selectedGender = $scope.genders[0];
			$scope.countryValid = false;
			$scope.result = 0;
			$scope.pending = false;
			
			$scope.addCountry = function(country){
				
				$scope.countryQuery = country.value;
				console.log($scope.countryQuery)
				$scope.isCountryValid();
			}
			$scope.removeCountry = function(country){
				$scope.countryQuery = null;
				$scope.countryValid = false;
			}
			$scope.hideDropDown = function(list){
				let show = false;
				if($scope.countryQuery) show = list.length ? true : false;
				if($scope.countryValid) show = false;
				return show;	
			}
			$scope.isCountryValid = function(){
				if($scope.countryQuery){
					let filtered = $scope.countryList.filter((country)=> country.value.toLowerCase() === $scope.countryQuery.toLowerCase());
					$scope.formData.country = filtered.length ? filtered[0].key : "";
					$scope.countryValid = filtered.length ?  true : false;
					if($scope.countryValid) $scope.onChange();
				} else {
					$scope.countryValid = false;
				}
			}
			$scope.onChange = function(){
				$scope.formData.min = $scope.defaultMin;
				$scope.formData.max = $scope.defaultMax;
				$scope.formData.genders = $scope.selectedGender.value;
				if($scope.myForm.$valid && $scope.countryValid) {
					formHttpService.isAccountValid($scope.formData.account, $scope.formData.token)
					.then(function(data){
						if(data !== null) {
							$scope.credentials = true;
							$scope.requestAPI();
						}
						else $scope.credentials = false;
					})
				}
			}		
			$scope.credentialsError = function(){
				if($scope.myForm.$valid) {
					if($scope.countryValid) return $scope.credentials ? "" : "Wrong Account or Token";
					else return "Fill the form";
				}
				return "Fill the form";
			}
			$scope.requestAPI = function(){
				let min = $scope.formData.min;
				let max = $scope.formData.max;
				let country = $scope.formData.country;
				let genders = $scope.selectedGender.value;
				let query = $scope.formData.query;
				$rootScope.$broadcast('pending', {result: true});
				formHttpService.setParams(min, max, country, genders, query);
				formHttpService.getFirefighters($scope.formData.token, $scope.formData.account)
					.then(function(estimation){
						
						if(estimation !== null) {
							console.log("firefighters",);
							$scope.result = estimation.data.users;
						} else {
							$scope.result = "Wrong Request";
						}
						$scope.pending = false;
						$rootScope.$broadcast('result', {result: $scope.result});
						$rootScope.$broadcast('pending', {result: false});
						
					});
			}
			$scope.countries = ()=> {
				formHttpService.getCountries()
				.then(function(countries) {
					$scope.countryData = countries;
					console.log("list of countries", countries)
					$scope.countryList = countries.data.map(country => {return {value:country.name,key:country.key}});
				});	
			}
			$scope.countries();	
        }
    });
