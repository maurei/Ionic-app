

racts.controller('showTasksController', ['$stateParams','$http', '$scope', function($stateParams, $http, $scope){

	console.log('showtask launched!')
  var originalParams = JSON.parse($stateParams.tasks)
	$scope.tasks = originalParams





}])
