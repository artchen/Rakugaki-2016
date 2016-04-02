(function($){
	
	var mainController = function($rootScope, $scope, $timeout, $state, $stateParams, $window) {
		
		$scope.loaded = false;
		
		$scope.slides = [
			{name: 'Welcome', state: 'welcome', index: 0},
			{name: 'Springtide', state: 'springtide', index: 1},
			{name: 'Shiro', state: 'shiro', index: 2},
			{name: 'Kcalb', state: 'kcalb', index: 3},
			{name: 'Yabu no Naka', state: 'yabu', index: 4},
			{name: 'About', state: 'about', index: 5}
		];

		$scope.currentSlide = 0;
		$scope.numSlides = $scope.slides.length;
		$scope.transitionAnimation = 'init';
		$scope.inTransition = false;
		$scope.modalShown = false;
		
		$scope.sidebarShown = false;
		$scope.infoWindowShown = false;
		$scope.slideIndexShown = false;
		
		/**
     *	safe apply
     */
    $scope.safeApply = function(fn, callback) {
      var phase = this.$root.$$phase;
      if (phase == '$apply' || phase == '$digest') {
        if (fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
        
        if (callback) {
	        callback();
        }
      }
    };
		
		
		/**
		 *	directly go to a slide
		 */
		$scope.gotoSlide = function(slide, $event) {
			if ($scope.modalShown || $scope.inTransition) {
				return;
			}
			if ($state.$current.name == slide) {
				$scope.closeInfoWindow();
				$scope.closePopup($event);
				return;
			}
			
			$scope.inTransition = true;
			$scope.closeInfoWindow();
			$scope.closePopup($event);
			$scope.safeApply(function() {
				if ($scope.transitionAnimation != 'init')
					$scope.transitionAnimation = "init";
			});
			$timeout(function(){
				$state.go(slide);
			}, 320); //wait 320ms to finish sidebar closing animation
			
		};
		
		/**
		 *	navigate to next slide	
		 */
		$scope.nextSlide = function() {
			if ($scope.modalShown || $scope.inTransition) {
				return;
			}
			
			$scope.inTransition = true;
			$scope.closeInfoWindow();
			
			$scope.safeApply(function() {
				if ($scope.transitionAnimation != 'next')
					$scope.transitionAnimation = "next";
			});
			
			if ($scope.currentSlide === $scope.slides.length - 1) {
				$scope.currentSlide = 0;
			}
			else {
				$scope.currentSlide++;
			}
			
			$timeout(function() {
				$state.go($scope.slides[$scope.currentSlide].state);
			}, 100); //seems 100ms is enough for angular to update view
			
	
		};
		
		/**
		 *	navigate to previous slide	
		 */
		$scope.prevSlide = function() {
			if ($scope.modalShown || $scope.inTransition) {
				return;
			}
			
			$scope.inTransition = true;
			$scope.closeInfoWindow();
			
			$scope.safeApply(function() {
				if ($scope.transitionAnimation != 'prev')
					$scope.transitionAnimation = "prev";
			});
			
			if ($scope.currentSlide === 0) {
				$scope.currentSlide = $scope.slides.length - 1;
			}
			else {
				$scope.currentSlide--;
			}
			
			$timeout(function() {
				$state.go($scope.slides[$scope.currentSlide].state);
			}, 100); //seems 100ms is enough for angular to update view
			
		};
		

		/**
		 *	slide right to reveal sidebar menu
		 */
		$scope.openSidebar = function($event) {
			$event.stopPropagation();
      $event.preventDefault();
      $('.nav-trigger').fadeOut();
      $('#st-container').className = 'st-container';
			
			$timeout(function() {
				$scope.sidebarShown = true;
			}, 25);
		};
		
		/**
		 *	close sidebar and all popup window
		 */
		$scope.closePopup = function($event) {
			$event.stopPropagation();

			if ($scope.sidebarShown) {
				$scope.sidebarShown = false;
				$timeout(function(){
					$('.nav-trigger').fadeIn();
	      }, 500);
			}
			if ($scope.slideIndexShown) {
				$scope.slideIndexShown = false;
				$('.slide-index').fadeOut();
			}
			
		};
		
		/**
		 *	prevent propagation
		 */
		$scope.prenventPropagation = function($event) {
      $event.stopPropagation();
		};
		
		/**
		 *	open information popup window
		 */
		$scope.openInfoWindow = function() {
			$scope.infoWindowShown = true;
			$('#info-' + $scope.slides[$scope.currentSlide].state).addClass('show');
			$scope.slideIndexShown = false;
			$('.slide-index').fadeOut();
		};
		
		/**
		 *	close information popup window
		 */
		$scope.closeInfoWindow = function() {
			$scope.infoWindowShown = false;
			$('.works-info').removeClass('show');
		};
		
		/**
		 *	tap ripple animation	
		 */
		$scope.tapAnime = function(tap_xpos, tap_ypos) {
      $(".plot").css('visibility', 'visible');
      var offset = 5;
      $(".plot").css('width', 30 + 'px');
      $(".plot").css('height', 30 + 'px');
      $(".plot").css('left', tap_xpos - 15 + 'px');
      $(".plot").css('top', tap_ypos - 15 + 'px');
      $(".plot").css({ opacity: 0.3 });
      $(".plot").animate({
        opacity: 0,
        height: 40 + "px",
        width: 40 + "px",
        left: "-=" + offset + "px",
        top: "-=" + offset + "px"
      }, 300, function() {
          $(".plot").css('visibility', 'hidden');
      });
		};
		
		/**
		 *	initialize tap ripple animation	
		 */
		$scope.initTapAnime = function() {
      $(".st-pusher, .trigger, .md-trigger, .md-modal").on("click", function($event) {
        $scope.tapAnime($event.pageX, $event.pageY);
      });
		};
		
		/**
		 *	open slide index popup
		 */
		$scope.openSlideIndex = function($event) {
			$event.stopPropagation();
			$scope.slideIndexShown = true;
			$('.slide-index').fadeIn();
			$scope.closeInfoWindow();
		};
		
		/**
		 *	initialize perfect scrollbar
		 */
		$scope.initPerfectScrollbar = function() {
			$('.works-info-content-wrapper, .slide-index').perfectScrollbar();
		};
		
		/**
		 *	initialize arrow key control
		 */
		$scope.onKeydown = function($event) {
	    if ($event.keyCode == 37) { //left arrow
			  $scope.prevSlide();
	    }
	    else if ($event.keyCode == 39) { //right arrow
			  $scope.nextSlide();
	    }
		};
		
		
		/**
		 *	set current slide on state change success
		 */
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams){
			$scope.currentSlide = $state.current.data.index;
		});
		
		/**
		 * initialize perfect scrollbar when include content is loaded
		 */
		$scope.$on('$includeContentLoaded', function () {
				$scope.initPerfectScrollbar();
		});
		
		$scope.init = function() {

			$timeout(function() {
				$scope.initTapAnime();
				$scope.loaded = true;
			}, 100);
			
		};
		
		$scope.init();
	
	};
	
	angular.module('rakugaki').controller('MainController', mainController);
	
})(jQuery, angular);