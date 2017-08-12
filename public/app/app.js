/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

let formLogicComponent = __webpack_require__(1);
let formServiceComponent = __webpack_require__(2);
let scss = __webpack_require__(3);

angular.module('appNess', ['formLogic'])




/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

angular.module('formService',[])
    .service('formHttpService', function($http){
		let urlManager = {
			base: ()=> "https://graph.facebook.com/v2.10/",
			token: ()=> "EAAcOZAxkM5moBAFZBZA5aYG2cpwwiMCBC6sYLNYATPHzCShTMApqYUV3YXtBZBbKQxY5bH21RTdMnZCEv0lDp6W3q0FZAhZCOpSVDaLIgFOCc2gj6msyqhhKBQZCd6GkqFAyChQZAbEhSKrVUnLRuiryPgJaVCk5wguH3gTaTBmNHrAZDZD",
			tokenParam: ()=> "&access_token=",
			account: ()=> "act_100656429",
			search: ()=> "search?",
			estimate: ()=> "reachestimate?",
			cities: ()=> "type=adgeolocation&location_types=['country']&access_token=",
			limit: ()=> "&limit=1000",
			accessToken: ()=> "me?access_token=",
			accessAccount: ()=> "/?fields=name",
			
			
		}
		let paramManager = {	
			age_min: 20,
			age_max: 60,
			geo_locations: {countries:["AU"]},
			flexible_spec: [{
				work_positions: [{
					id: 112262562119522,
					name: "fire fighter"
				}]
			}]	
		}
		
		let urlService = {
			getCountries: function() {
				let url = urlManager.base() + urlManager.search() + urlManager.cities() + urlManager.token() + urlManager.limit();
				let promise = $http.get(url).then((response)=> response.data);
				return promise;
			},
			setParams: (min, max, country)=>{
				paramManager.age_min = min;
				paramManager.age_max = max;
				paramManager.geo_locations.countries = [country];
				console.log("params",paramManager)
				return null;
			},
			getFirefighters: function() {				
				let promise = $http.get(url).then((response)=> response.data);
				return promise;
			},
			isAccountValid: (account, token)=>{
				let url = urlManager.base() + account + urlManager.accessAccount() + urlManager.tokenParam() + token;
				console.log(url)
				let promise = $http.get(url).then(response => response.data, error => null);
				return promise;
			}
		};
		return urlService;
    });
	

	//targeting_spec={"genders":[1,2],"age_min":20,"age_max":60,"geo_locations":{"countries":["AU"]},flexible_spec:[{"work_positions":[{"id":"112262562119522","name":"firefighter"}]}]}
	//targeting_spec={genders:[1,2],age_min:20,age_max:60,geo_locations:{countries:["AU"]},flexible_spec:[{work_positions:[{id:112262562119522,name:firefighter}]}]}
	

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);