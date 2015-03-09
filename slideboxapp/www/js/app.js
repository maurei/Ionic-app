var racts = angular.module('racts', ['ionic'])

racts.config(function($stateProvider, $urlRouterProvider) {
  

$urlRouterProvider.otherwise('/')

$stateProvider
    .state('auth', {
      resolve: {
        localStorageCheck: ['$state','session', function($state, session){
          console.log('localstoragecheck ')
          return session.localStorageCheck().then( function(loggedIn){
            if(loggedIn){$state.go('home.active')}
          })
        }]
      },
      url: '/',
      templateUrl: '/templates/auth.html',
      controller: 'authController'
    })
    .state('home', {
      abstract: true,
      url: '',
      templateUrl: '/templates/home.html',
      controller: 'slideBoxController'
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

    .state('home.categories', {
      url: '/categories',
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

    .state('home.detail', {
      params: ['tasks'],
      views: {
        '@': {
          templateUrl: 'templates/showtasks.html',
          controller: 'showTasksController'
        }
      }
    })
    // .state('home.subscriptions.detail', {
    //   views: {
    //     showtask: {
    //       template: '<h1>fooooz0r</h1>',
    //     }
    //   }
    // })


    // .state('help', {
    //   url: '/help',
    //   views: {
    //     help: {
    //       templateUrl: '/templates/help.html'
    //     }
    //   }
    // })
    // .state('todos', {
    //   abstract: true,
    //   url: '/todos',
    //   views: {
    //     todos: {
    //       templateUrl: '/templates/todo-abstract.html'
    //     }
    //   }
    // })
    // .state('todos.index', {
    //   url: '/todos',
    //   templateUrl: '/templates/todo.html',
    //   controller: 'todoController'
    // })
    // .state('todos.detail', {
    //   url: '/todos/:todo',
    //   templateUrl: '/templates/todo-detail.html',
    //   controller: 'todoDetailController',
    //   resolve: {
    //     todo: function($stateParams, todoModel) {
    //       return todoModel.getTodo($stateParams.todo)
    //     }
    //   }
    // })

})

racts.run(['session', '$location', function(session, $location){

  if( !session.currentUser() ){
    $location.path('/')
  }

}])


racts.controller('slideBoxController', function($scope, $ionicSlideBoxDelegate, $state){

    var slideStateMapper = {
      0: function(){return $state.go('home.categories')},
      1: function(){return $state.go('home.active')},
      2: function(){return $state.go('home.subscriptions')},
    }

    $scope.slideChange = function(index){
      console.log('I am now at slide: '+index)
      typeof(index)
      slideStateMapper[index]()
    }

    $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  }

console.log('slideBoxController!')

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

