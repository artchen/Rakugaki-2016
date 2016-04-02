(function($){
	
	var slideController = function($rootScope, $scope, $timeout, $state, $stateParams, $sce) {
		
		$scope.modal = {
			slug: "",
			name: "",
			wp: "",
			ghost: "",
			show: false
		};
		
		$scope.iframeSource = "";
		$scope.iframeSetip = false;
		
		/**
		 *	show modal
		 */
		$scope.openModal = function() {
			$scope.$parent.modalShown = true;
			$(".slide-nav, .info-trigger, .nav-trigger").fadeOut();
      $scope.modal.show = true;
      $timeout(function() {
	      $scope.setupIframe();
      }, 320);
      
		};
		
		/**
		 *	hide modal
		 */
		$scope.closeModal = function() {
			$scope.$parent.modalShown = false;
      $scope.modal.show = false;
      $timeout(function() {
	      $(".slide-nav, .info-trigger, .nav-trigger").fadeIn();
      }, 500);
		};
		
		/**
		 *	initialize keyboard interaction
		 */
		$scope.initKeyControl = function() {
			$(document).keydown(function(event) {  
        if (event.target.type !== 'textarea' &&
            event.target.type !== 'text'
        ) { 
          var keyCode = event.keyCode || event.which;

          switch (keyCode) {
            case 27: // ESC
              $('.md-close').click();
            break;
            default:
              break;
          }
        }
      });
		};
		
		/**
		 *	animation to play on state change
		 */
		$scope.initLogoAnimations = function() {
			$(".bamboo").hover(
        function(){
          $(".bamboo .trigger").addClass("shake");
        },function(){
          $(".bamboo .trigger").removeClass("shake");
        }
	    );
	    
	    $("#kcalb-logo").hover(
        function(){
          $("#kcalb .logo").addClass("bounce");
        }, function(){
          $("#kcalb .logo").removeClass("bounce");
        }
	    );
	    
	    $("#springtide-logo").hover(
        function(){
          $(this).addClass("tada");
        }, function(){
          $(this).removeClass("tada");
        }
	    );
		};
		
		/**
		 *	prevent propagation
		 */
		$scope.prenventPropagation = function(ev) {
      ev.stopPropagation();
		};
		
		/**
		 *	prevent default
		 */
		$scope.preventDefault = function(ev) {
			ev.preventDefault();
		};
		
		/**
		 *	setup iframe secure url
		 */
		$scope.setupIframe = function() {
			if ($scope.iframeSetup) return;
			$scope.iframeSetup = true;
      $scope.iframeSource = $sce.trustAsResourceUrl($scope.modal.demo);
    };

		/**
		 *	initialize perfect scrollbar
		 */
		$scope.initPerfectScrollbar = function() {
			$('.resume-wrapper').perfectScrollbar();
		};
		
		$scope.init = function() {
			$scope.initPerfectScrollbar();
			$scope.initLogoAnimations();
			$scope.initKeyControl();
			
			$timeout(function() {
				$scope.$parent.inTransition = false;
			}, 320);
			
			$timeout(function() {
				if ($state.current.name == 'yabu' || $state.current.name == 'kcalb') {
					$scope.modal = {
						slug: $state.current.data.slug,
						name: $state.current.data.name,
						wp: $state.current.data.wp,
						ghost: $state.current.data.ghost,
						demo: $state.current.data.demo,
						show: false
					};
				}
			}, 500);
			
		};
		
		$scope.init();
	
	};
	
	angular.module('rakugaki').controller('SlideController', slideController);
	
})(jQuery, angular);