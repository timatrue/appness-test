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
	

/***/ }),
/* 2 */
/***/ (function(module, exports) {

angular.module('formService',[])
    .service('formHttpService', function($http){

		let countryService = {
			url:'https://graph.facebook.com/v2.10/search?type=adgeolocation&location_types=[%27country%27]&access_token=EAAcOZAxkM5moBAFZBZA5aYG2cpwwiMCBC6sYLNYATPHzCShTMApqYUV3YXtBZBbKQxY5bH21RTdMnZCEv0lDp6W3q0FZAhZCOpSVDaLIgFOCc2gj6msyqhhKBQZCd6GkqFAyChQZAbEhSKrVUnLRuiryPgJaVCk5wguH3gTaTBmNHrAZDZD&targeting_spec=%7B%22age_min%22%3A25%2C%22geo_locations%22%3A%7B%22cities%22%3A%5B%7B%22key%22%3A2430536%7D%5D%7D%7D&fields=key,name&limit=1000',
			async: function() {
				let promise = $http.get(this.url).then((response)=> response.data);
				return promise;
			}
		};
		return countryService;
    });
	

	
	


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);