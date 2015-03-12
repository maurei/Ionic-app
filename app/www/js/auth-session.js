

racts.service('authService', ['$http', '$q', function($http, $q){
	var credentials = {email: "", password: ""}
	this.credentials = function(){return credentials}

	var authenticate = function(defer){
		$http.post('http://localhost:3000/login', {credentials: credentials})
		.success(function(data){
			if(data.success === false){
				defer.reject()
			}
			else{
			var currentUser = {email: credentials.email, id: data.user, username: data.username}
			defer.resolve(currentUser)
			}
		})
		.error(function(){
			defer.reject()
		})
	}


	this.submit = function(){

		deferSubmit = $q.defer()
		authenticate(deferSubmit)
		return deferSubmit.promise
	}

}])

racts.service('registerService', ['$http','$q',function($http, $q){
  var userDetails = { email: "", username: "", password: "", password_confirm: ""}
  this.userDetails = function(){ return userDetails }

  this.submit = function() {
  	var q = $q.defer()
    $http.post('http://localhost:3000/users', {credentials: userDetails})
      .success(function(response) {
         var currentUser = { email: userDetails.email, id: response.user}
         q.resolve(currentUser)
      })
      .error(function(response) {
        console.log("Error!")
        q.reject(currentUser)
      })
      return q.promise
    }




}])

racts.controller('authController', function($rootScope, $state, $scope, currentUser, authService, localStorageCheck, session, registerService, $ionicPopup, activeTasksResolverCopy){

		console.log('authcontroller activated')

		$scope.registrationDetails = registerService.userDetails


		$scope.credentials = authService.credentials

		var submit = function(){
			console.log('submitting..')
			authService.submit().then( successfullAuth, errorAuth )
		}

		$scope.submitRegister = function() {
			registerService.submit().then( successfullAuth, errorAuth)
		}


		$scope.loggedIn = false
		// $scope.mainpageTask = 'foo text'


		function successfullAuth(user){
			session.setCurrentUser(user)
			$scope.loggedIn = true
			console.log('succesfullAuth!')
			activeTasksResolverCopy.get().then(function(data){
				console.log(session.currentUser())
				$scope.loggedIn = true
				$rootScope.frontPageTask = data.description
				$rootScope.taskId = data.id
				$scope.username = session.currentUser().username

			})


		}
		function errorAuth(){
			alert('Authentication failed!')
		}

		$scope.gearButton = function(){
			$state.go('home')
		}


		$scope.showPopup = function() {
	  	$scope.data = {}

		  // An elaborate, custom popup
		  var myPopup = $ionicPopup.show({
		    templateUrl: 'templates/loginpopup.html',
		    title: 'Please enter your credentials',
		    subTitle: 'Or register using our website',
		    scope: $scope,
		    buttons: [
		      { text: 'Cancel' },
		      {
		        text: '<b>Submit</b>',
		        type: 'button-positive',
		        onTap: function(e) {
		        	console.log(e)
		          if (!$scope.credentials().password) {
		          	console.log('no pass')
		            e.preventDefault();
		          }
		          else if (!$scope.credentials().email) {
		            e.preventDefault();
		          }
		          else {
		          	submit()
		          }
		          
		        }
		      }
		    ]
		  });
		 } 


	// }

})




racts.service('session', ['$q', 'currentUser', function($q, currentUser){

	function getLocal(){
		var localStorage = window.localStorage['currentUser']
		if ( localStorage ){
			return JSON.parse(localStorage)
		}
		else {
			return null
		}
	}
	//devmode//
	this.getLocal = getLocal
	//end
	this.localStorageCheck = function(){
		var deferLocalCheck = $q.defer()
		user = getLocal()
		var trigger = false
		if (user){
			setCurrentUser(user)
			trigger = true
		}
		deferLocalCheck.resolve(trigger)
		return deferLocalCheck.promise
	}



	function setLocal(currentUser){
		window.localStorage['currentUser'] = JSON.stringify(currentUser)
	}
	function setCurrentUser(user){
		currentUser = user
		setLocal(user)
	}

	this.setCurrentUser = setCurrentUser


	this.currentUser = function(){
		return currentUser
	}




}])


racts.factory('currentUser', [function(){

	var currentUser = null

	return currentUser

}]);



/*
https://github.com/angular-ui/ui-router/issues/42
http://blog.thejsj.com/angular-js-authentication-with-ui-router/
<<<<<<< HEAD
http://arthur.gonigberg.com/2013/06/29/angularjs-role-based-auth/
*/

//  Register controller

// racts.factory('UsersList', [''])