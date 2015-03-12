racts.factory('activeTasksModel', [function() {

	var data = {
		assignments: []
	}
	return data;
}]);

racts.service('activeTasksResolverCopy', function($http, $q, activeTasksModel, session) {

	console.log('activeTaskResolverCopy!')

	this.get =  function(){
			var defer = $q.defer();
			$http.get('http://localhost:3000/users/'+session.currentUser().id+'/active')
				.success(function(response) {
					frontpage = response[0].description
					defer.resolve(frontpage)
				})
				.error(function(response){
					console.log('error with fetching active tasks')
				})
				return defer.promise
			}


})



racts.service('activeTasksResolver', function($http, $q, activeTasksModel, session) {

	console.log('activeTaskResolver!')

	var getActiveTasks = $http.get('http://localhost:3000/users/'+session.currentUser().id+'/active')
				.success(function(response) {
					activeTasksModel.assignments = response
				})
				.error(function(response){
					console.log('error with fetching active tasks')
				})

	return getActiveTasks

})


racts.service('activeTasksService', function($http, $q, activeTasksModel,antiRefreshService ) {

		this.activeTasksModel = activeTasksModel
		this.complete = function(task){
			$http.put("http://localhost:3000/assignments/" + task.assignment_id+'/complete')
				.success(function(response) {
					console.log("DONE!")
					antiRefreshService.reloadActive()
		    })
		    .error(function(response) {
		    	console.log("Rejected!")
		    })
			}
		
})



racts.controller('activeTasksController', function($http, $scope, activeTasksService, $ionicActionSheet){
	console.log('activeTaskController initiated')
	$scope.assignments = activeTasksService.activeTasksModel.assignments
	var completeTask = function(task) {
				 activeTasksService.complete(task)
	}

	$scope.options = function(task) {
    $ionicActionSheet.show({
     buttons: [
       { text: 'Complete', completeTask: completeTask },
     ],
     destructiveText: 'Delete',
     destructiveButtonClicked: function(){console.log('deleting'); return true},
     cancelText: 'Cancel',
     buttonClicked: function(index, button) {
     	console.log(arguments)
     	 button.completeTask(task)
       return true;
     }
   });

  }


})


// <!--  <button ng-click="completeTask(task) ; myStyle={'text-decoration': 'line-through'}">Complete</button> -->








