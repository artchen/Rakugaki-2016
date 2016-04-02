(function($) {
	
	var staticIncludeDirective = function($http, $templateCache, $compile) {
	  return function(scope, element, attrs) {
	      var templatePath = attrs.staticInclude;
	      $http.get(templatePath, { cache: $templateCache }).success(function(response) {
	          var contents = element.html(response).contents();
	          $compile(contents)(scope);
	      });
	  };
	};
	
	var pageTitleDirective = function($rootScope, $timeout) {
		return {
	    link: function(scope, element) {
	      var listener = function(event, toState, toParams, fromState, fromParams) {
	        var title = 'Rakugaki';
	        if (toState.data && toState.data.pageTitle) title = 'Rakugaki / ' + toState.data.pageTitle;
	        $timeout(function() {
	          element.text(title);
	        });
	      };
	      $rootScope.$on('$stateChangeStart', listener);
	    }
	  };
	};
	
	angular
		.module('rakugaki')
		.directive('staticInclude', staticIncludeDirective)
		.directive('pageTitle', pageTitleDirective);

	
})(jQuery, angular);
