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

__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(4);

angular.module('appNess', ['formLogic'])




/***/ }),
/* 1 */
/***/ (function(module, exports) {

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
			$scope.getResult = function(){
				return $scope.result ? $scope.result : "No data"; 
			}
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
				console.log($scope.countryQuery)
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
						else {
							$scope.credentials = false;
							$scope.result = null;
						}
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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

angular.module('formLogic')
    .component('formSpinner',{
        templateUrl: './templates/form-spinner.html',
        controller: function ($scope){
			
			$scope.pending = false;
			
			$scope.$on('pending', (event, params) => {
				$scope.pending = params.result;
			});
        }
    });


/***/ }),
/* 3 */
/***/ (function(module, exports) {

angular.module('formService',[])
    .service('formHttpService', function($http){
		let targetManager = {
			genders:[1],
			age_min: 20,
			age_max: 60,
			geo_locations: {countries:["AU"]},
			flexible_spec: [{
				work_positions: [{
					id: 112262562119522,
					name: "fire fighter"
				}]
			}]	
		};
		let urlManager = {
			base: ()=> "https://graph.facebook.com/v2.10/",
			search: ()=> "search",
			estimate: ()=> "reachestimate",
			getBaseUrl: (...arguments)=> {
				let dir = arguments.join('/');
				return urlManager.base() + dir + '?';
			},
			getParams: (...arguments)=> {
				return arguments.map(arg => {
					return arg.map( param => '&' + Object.keys(param) + '=' + Object.values(param)).join('')
				}).join('')	
			},
			geoParams: ()=>{
				return [{type:'adgeolocation'},{location_types:['country']},{limit:1000}];
			},
			searchParams: (query)=>{
				return [{type:'adworkposition'},{q:query}];
			},
			credParams: ()=>{
				return [{access_token:"EAAcOZAxkM5moBAFZBZA5aYG2cpwwiMCBC6sYLNYATPHzCShTMApqYUV3YXtBZBbKQxY5bH21RTdMnZCEv0lDp6W3q0FZAhZCOpSVDaLIgFOCc2gj6msyqhhKBQZCd6GkqFAyChQZAbEhSKrVUnLRuiryPgJaVCk5wguH3gTaTBmNHrAZDZD"}];
			},
			targetParams: ()=>{
				return [{targeting_spec: JSON.stringify(targetManager)}];
			},
			accountParams: ()=>{
				return [{fields: 'name'}];
			},
			guestToken: (token)=>{
				return [{access_token:token}];
			}
		};
		let queryManager = {
			query: ""
		}
		let urlService = {
			getCountries: function() {
				let manager = urlManager;
				let url = manager.getBaseUrl(manager.search()) + manager.getParams(manager.geoParams(), manager.credParams())
				console.log("url", url);
				let promise = $http.get(url).then((response)=> response.data);
				return promise;
			},
			setParams: (min, max, country, genders, query)=>{
				targetManager.age_min = min;
				targetManager.age_max = max;
				targetManager.genders = genders;
				targetManager.geo_locations.countries = [country];
				queryManager.query = query;
			},
			getFirefighters: function(token, account) {
				let manager = urlManager;
				let query = queryManager.query;
				let urlSearch = manager.getBaseUrl(manager.search())+ manager.getParams(manager.searchParams(query), manager.guestToken(token))
				
				let promise = $http.get(urlSearch).then(response=> {
					return response.data.data.filter(result => result.name === query)
					.map(result => {return {name:result.name,id:result.id}});
				}, error => null).then(result=>{
					targetManager.flexible_spec[0].work_positions = result;
					let urlFire = manager.getBaseUrl(account, manager.estimate()) + manager.getParams(manager.targetParams(), manager.guestToken(token));
					console.log("get firefighters", urlFire)
					return $http.get(urlFire).then(response => response.data, error => null)
				})
				return promise;
			},
			isAccountValid: (account, token)=>{
				let manager = urlManager;
				let url = manager.getBaseUrl(account) + manager.getParams(manager.accountParams(), manager.guestToken(token));
				console.log(url)
				let promise = $http.get(url).then(response => response.data, error => null);
				return promise;
			}
		};
		return urlService;
    });

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);