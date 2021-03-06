'use strict';

angular.module('anagram_hero.api', [
    'ngResource',
])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

.factory('AuthApi', ['$resource',
    function($resource){
        return $resource('http://localhost:port/users/:name', {port: ':3000'}, {
            query: {method:'GET', params:{}, isArray:false}
        });
    }
])

.factory('WordApi', ['$resource',
    function($resource){
        return $resource('http://localhost:port/words/random', {port: ':3000'}, {
            query: {method:'GET', params:{}, isArray:false}
        });
    }
])

.factory('SaveScoreApi', ['$resource',
    function($resource){
        return $resource('http://localhost:port/users/highscore/:name', {port: ':3000'}, {
            update: {method:'PUT', params:{}}
        });
    }
])

;
