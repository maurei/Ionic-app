racts.factory('availableModel', [function() {

	var data = {
		list: []
	}

	return data;

}]);



racts.service('availableResolver', ['$http', '$q', 'availableModel','session', function($http, $q, availableModel, session ) {

	console.log('available resolver initialized!')

		var getAvailable = $http.get('http://localhost:3000/categories/?user_id=' + session.currentUser().id)

				.success(function(response) {
					availableModel.list = response.list
				})
				.error(function(response){
					console.log('error')
				})

	return getAvailable

}])


racts.service('availableService', ['$stateParams','$state','$rootScope', '$http', '$q', 'availableModel', 'session', 'antiRefreshService', function($stateParams, $state, $rootScope, $http, $q, availableModel, session, antiRefreshService ) {

	function $broadcast() {
	    return $rootScope.$broadcast.apply($rootScope, arguments);
	}



	this.subscribe = function(category){
		var amount = Number(prompt("Enter the number of tasks you want to subscribe to")) || 1;
	  var period = Number(prompt("Enter the period of subscription in years")) || 4;

	  $http.post('http://localhost:3000/users/' + session.currentUser().id + '/categories/' + category.id + '/subscribe?amount=' + amount + '&period=' + period)
	  	.success(function(response) {
	  		alert("You have been subscribed to " + amount + " task(s) in " +  category.name + " category for a period of " + period + " year(s)")
	  		antiRefreshService.reloadAvailable(true)
	  	})
	  	.error(function(response) {
	  		console.log("ERROR!")
	  	})
	}
	this.availableModel = availableModel


}])



racts.controller('availableController', function($http, $scope, availableService, availableResolver, loadAvailableTasksService, antiRefreshService, $ionicActionSheet){

	$scope.available = availableService.availableModel.list
  
  var showTasks = function(index){
		var category = availableService.availableModel.list[index]
		loadAvailableTasksService.load(category.id)
  }


  var subscribe = function(category, index) {
  	availableService.subscribe(category)
  }

	$scope.options = function(index, category) {
    $ionicActionSheet.show({
     buttons: [
       { text: 'Show associated tasks', showTasks: showTasks },
       { text: 'Subscribe', subscribe: subscribe }
     ],
     cancelText: 'Cancel',
     buttonClicked: function(index, button) {
     	 if(index === 0){button.showTasks(index)}
     	 else if (index === 1){button.subscribe(category)}
       return true;
     }
   });

  }

})





racts.service('loadAvailableTasksService', ['$state','$http', '$q', 'availableModel', function($state, $http, $q, availableModel){


		this.load = function(id){
			$http.get('http://localhost:3000/categories/'+id)
				.success(function(response) {
					var paramsJSON = JSON.stringify(response)
					$state.go('home.detail-available', {tasks: paramsJSON})

				})
				.error(function(response){
					console.log('error')
				})
		}

}])
