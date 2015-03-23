racts.factory('subscriptionsModel', [function() {

	var data = {
		list: []
	}

	return data

}]);



racts.service('subscriptionsResolver', ['$http', '$q', 'subscriptionsModel', 'session', function($http, $q, subscriptionsModel, session ) {


	this.getSubscriptions = getSubscriptions
	var getSubscriptions = $http.get('http://localhost:3000/users/1/subscriptions')
				.success(function(response) {
					subscriptionsModel.list = response.list
				})
				.error(function(response){
					console.log('error')
				})


	return getSubscriptions

}])


racts.service('subscriptionsService', function($http, $q, subscriptionsModel, antiRefreshService, session ) {

		this.subscriptionsModel = subscriptionsModel
		this.unsubscribe = function(subscription){
			$http.delete('http://localhost:3000/users/1/subscriptions/' + subscription.subscription_id)
	  	.success(function(response) {
	      antiRefreshService.reloadSubscriptions(true)
	  	})
	  	.error(function(response) {
	  		console.log("ERROR!")
	  	})
		}
})



racts.controller('subscriptionsController', function($http, $scope, subscriptionsService, subscriptionsResolver, loadSubscriptionTasksService, session, $ionicActionSheet){

	console.log('subscriptionsController!')

	$scope.subscriptions = subscriptionsService.subscriptionsModel.list


  var showTasks = function(index){
  	var subscription = subscriptionsService.subscriptionsModel.list[index]
  	loadSubscriptionTasksService.load(subscription.id)
  }

  var unsubscribe = function(subscription){
  	subscriptionsService.unsubscribe(subscription)
  }

	$scope.options = function(index, subscription) {
    $ionicActionSheet.show({
     buttons: [
       { text: 'Show associated tasks', showTasks: showTasks },
     ],
     destructiveText: 'Unsubscribe',
     destructiveButtonClicked: function(){
     		unsubscribe(subscription)
     		return true
     	},

     cancelText: 'Cancel',
     buttonClicked: function(index, button) {
     	 button.showTasks(index)
       return true;
     }
   });

  }



})


racts.service('loadSubscriptionTasksService', ['$state','$http', '$q', 'subscriptionsModel', function($state, $http, $q, subscriptionsModel ){


		this.load = function(id){

			$http.get('http://localhost:3000/categories/'+id)
				.success(function(response) {
					console.log(response)
					var paramsJSON = JSON.stringify(response)
					$state.go('home.detail-subscription', {tasks: paramsJSON})

				})
				.error(function(response){
					console.log('error')
				})
		}

}])


