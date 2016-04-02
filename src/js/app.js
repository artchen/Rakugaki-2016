(function($){
	
	var Rakugaki = angular.module('rakugaki', [
		'ngAnimate', 
		'ngTouch', 
		'ui.router'
	]);
	
	var RakugakiConfig = function($stateProvider, $urlRouterProvider, $locationProvider) {
		  
	  $urlRouterProvider.otherwise("/");
    
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
	
		$stateProvider
		  .state('welcome', {
		    url: "/",
		    templateUrl: "/views/welcome.html",
		    controller: "SlideController",
		    data: { 
		      pageTitle: 'Welcome',
		      index: 0
		    }
		  })
		  .state('springtide', {
		    url: "/springtide",
		    templateUrl: "/views/springtide.html",
		    controller: "SlideController",
		    data: { 
		      pageTitle: 'Springtide Press',
		      index: 1
		    }
		  })
		  .state('shiro', {
		    url: "/shiro",
		    templateUrl: "/views/shiro.html",
		    controller: "SlideController",
		    data: { 
		      pageTitle: 'Shiro',
		      index: 2
		    }
		  })
		  .state('kcalb', {
		    url: "/theme-kcalb",
		    templateUrl: "/views/kcalb.html",
		    controller: "SlideController",
		    data: { 
		      pageTitle: 'Kcalb',
		      index: 3,
		      slug: "kcalb",
		      name: "Kcalb",
		      wp: "",
		      ghost: "http://themeforest.net/item/kcalb-a-minimal-responsive-ghost-theme/7191057",
		      demo: "http://kcalb.rakugaki.me"
		    }
		  })
		  .state('yabu', {
		    url: "/theme-yabu",
		    templateUrl: "/views/yabu.html",
		    controller: "SlideController",
		    data: { 
		      pageTitle: 'Yabu no Naka',
		      index: 4,
		      slug: "yabu",
		      name: "Yabu no Naka",
		      wp: "https://sellfy.com/p/p8CR/",
		      ghost: "http://themeforest.net/item/yabu-no-naka-a-responsive-ghost-theme/6813025",
		      demo: "http://yabu.rakugaki.me"
		    }
		  })
		  .state('about', {
		    url: "/about",
		    templateUrl: "/views/about.html",
		    controller: "SlideController",
		    data: { 
		      pageTitle: 'About',
		      index: 5
		    }
		  });
  };
	
	angular
		.module('rakugaki')
	  .config(RakugakiConfig)
	  .run(function($rootScope, $state, $stateParams) {
	    $rootScope.$state = $state;
	    $rootScope.$stateParams = $stateParams;
	  });
	
})(jQuery, angular);