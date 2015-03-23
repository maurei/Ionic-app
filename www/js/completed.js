racts.factory('completedTasksModel', [function() {

  var data = {
    assignments: []
  }
  return data;
}]);



racts.service('completedTasksResolver', ['$http', '$q', 'completedTasksModel', 'session', function($http, $q, completedTasksModel, session) {


  var getCompletedTasks = $http.get('http://localhost:3000/users/'+session.currentUser().id+'/assignments')
        .success(function(response) {
          completedTasksModel.assignments = response

        })
        .error(function(response){
          console.log('error with fetching completed tasks')
        })

  return getCompletedTasks

}])


racts.service('completedTasksService', ['$http', '$q', 'completedTasksModel', function($http, $q, completedTasksModel ) {

    this.completedTasksModel = completedTasksModel

}])



racts.controller('completedTasksController', ['$http', '$scope', 'completedTasksService', 'completedTasksResolver', function($http, $scope, completedTasksService, completedTasksResolver){
	console.log('completed initiated')
  $scope.assignments = completedTasksService.completedTasksModel.assignments

}])




