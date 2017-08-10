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

/**
 * Created by artem on 15/06/2017.
 */
let formLogicModule = __webpack_require__(1);
let formLogicComponent = __webpack_require__(2);
let scss = __webpack_require__(3);

angular.module('Appness', ['formLogic']);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * Created by artem on 16/06/2017.
 */
angular.module('formLogic', []);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);