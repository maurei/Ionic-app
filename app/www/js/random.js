racts.service('randomResolver', ['$http', 'randomService', function($http, randomService){

		var getRandomTask = $http.get('http://localhost:3000/tasks/random')
				.success(function(response) {
					randomService.randomTask = response
				})
				.error(function(response){
					console.log('error with fetching active tasks')
				})
		return getRandomTask
}])

racts.service('randomService', [function(){

	this.randomTask = {}

}])


racts.controller('randomController', ['$scope','randomTask', 'randomService', function($scope, randomTask, randomService){

$scope.task = randomService.randomTask
console.log('Its randomController speaking!')
console.log($scope.task)





}])