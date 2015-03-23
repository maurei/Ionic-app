var racts = angular.module('racts', ['ionic', 'ngCordova'])

racts.config(function($stateProvider, $urlRouterProvider) {
  

$urlRouterProvider.otherwise('/')

$stateProvider
    .state('auth', {
      resolve: {
        localStorageCheck: ['$state','session', function($state, session){
          console.log('localstoragecheck ')
          // return session.localStorageCheck().then( function(loggedIn){
          //   if(loggedIn){$state.go('home.active')}
          // })
        }]
      },
      url: '/',
      templateUrl: '/templates/auth.html',
      controller: 'authController'
    })
    .state('home', {
      abstract: false,
      url: '',
      templateUrl: '/templates/home.html',
      controller: 'tabMenusController'
    })


    .state('home.active', {
      
      url: '/active',
      views: {
        active: {
          templateUrl: '/templates/active.html',
          controller: 'activeTasksController'
        }
      },
      resolve: {
        activeTasksResolver: 'activeTasksResolver',
      }
    })
    .state('home.completed', {
      
      url: '/completed-tasks',
      views: {
        completed: {
          templateUrl: 'templates/completed.html',
          controller: 'completedTasksController',
        }
      },
      resolve: {
        completedTasksResolver: 'completedTasksResolver',
      }
    })
    .state('home.categories', {
      url: '/categories',
      cache: false,
      views: {
        categories: {
          templateUrl: '/templates/available.html',
          controller: 'availableController',
        }
      },
      resolve: {
        availableResolver: 'availableResolver'
      }
    })

    .state('home.subscriptions', {
      url: '/subscriptions',
      views: {
        subscriptions: {
          
          templateUrl: '/templates/subscriptions.html',
          controller: 'subscriptionsController'
        }
      },
      resolve: {
        subscriptionsResolver: 'subscriptionsResolver'
      }
    })

    .state('home.detail-subscription', {
      url: '/:tasks',
      views: {
        'subscriptions': {
          templateUrl: 'templates/showtasks.html',
          controller: 'showTasksController'
        }
      }
    })
    .state('home.detail-available', {
      url: '/:tasks',
      views: {
        'categories': {
          templateUrl: 'templates/showtasks.html',
          controller: 'showTasksController'
        }
      }
    })

    .state('randomact', {
      views: {
        '@': {
          url: '/random',
          templateUrl: 'templates/random.html',
          controller: 'randomController'
        }
      },
      resolve: {
        randomTask: 'randomResolver'
      }
    })




})

racts.run(function(subscriptionsResolver, session, $location, $ionicHistory, $rootScope, $state, $stateParams){

  if( !session.currentUser() ){
    $location.path('/')
  }




})


racts.controller('tabMenusController', function($scope, $ionicSlideBoxDelegate, $state){

  $scope.back = function(arguments){
    console.log('back button clicked')
    $state.go('auth')
  }


  console.log('tabController')

})



racts.controller('categoriesController', function($scope){

console.log('categoriesController!')

})



racts.directive('activeTask', function(){

  return {
    restrict: 'AE',
    templateUrl: '/directives/activetask.html',
    replace: true
  }

})

racts.directive('subscription', function(){

  return {
    restrict: 'AE',
    templateUrl: '/directives/subscription.html',
    replace: true
  }

})

racts.directive('available', function(){

  return {
    restrict: 'AE',
    templateUrl: '/directives/available.html',
    replace: true
  }

})

racts.directive('completedTask', function(){

  return {
    restrict: 'AE',
    templateUrl: 'directives/completedtask.html',
    replace: true
  }

})

