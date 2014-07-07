

    $(document).ready(function() {
     
		var time = 5; // time in seconds
     
		var $progressBar,
		$bar,
		$elem,
		isPause,
		tick,
		percentTime;
     
		//Init the carousel	
		$("#owl-demo").owlCarousel({
     
			// Most important owl features
			items : 5,
			itemsCustom : true,
			itemsDesktop : [1199,4],
			itemsDesktopSmall : [980,3],
			itemsTablet: [768,2],
			itemsTabletSmall: true,
			itemsMobile : [479,1],
			singleItem : true,
			itemsScaleUp : true,
		 
			//Basic Speeds
			slideSpeed : 500,
			paginationSpeed : 500,
			rewindSpeed : 1000,
		 
			//Autoplay
			autoPlay : false,
			stopOnHover : false,
		 
			// Navigation
			navigation : false,
			navigationText : ["prev","next"],
			rewindNav : true,
			scrollPerPage : false,
		 
			//Pagination
			pagination : true,
			paginationNumbers: false,
		 
			// Responsive
			responsive: true,
			responsiveRefreshRate : 200,
			responsiveBaseWidth: window,
			 
			// CSS Styles
			baseClass : "owl-carousel",
			theme : "owl-theme",
			 
			//Lazy load
			lazyLoad : false,
			lazyFollow : true,
			lazyEffect : "fade",
			 
			//Auto height
			autoHeight : false,
			 
			//JSON
			jsonPath : false,
			jsonSuccess : false,
			 
			//Mouse Events
			dragBeforeAnimFinish : true,
			mouseDrag : true,
			touchDrag : true,
			 
			//Transitions
			transitionStyle : false,
			 
			// Other
			addClassActive : false,
			 
			//Callbacks
			beforeUpdate : false,
			afterUpdate : false,
			beforeInit: false,
			afterInit: progressBar,
			beforeMove: false,
			afterMove: moved,
			afterAction: false,
			startDragging : pauseOnDragging,
			afterLazyLoad : false
		 
			})
    
		// Auto scale up - true
		$(".itemsScaleUp-true").owlCarousel({
			items : 7,
			itemsScaleUp:true
		});
 
		// Auto scale up - false
		$(".itemsScaleUp-false").owlCarousel({
			items : 7
		});
	 
		//Init progressBar where elem is $("#owl-demo")
		function progressBar(elem){
		$elem = elem;
		//build progress bar elements
		buildProgressBar();
		//start counting
		start();
		}
     
		//create div#progressBar and div#bar then prepend to $("#owl-demo")
		function buildProgressBar(){
		$progressBar = $("<div>",{
		id:"progressBar"
		});
		$bar = $("<div>",{
		id:"bar"
		});
		$progressBar.append($bar).prependTo($elem);
		}
     
		function start() {
		//reset timer
		percentTime = 0;
		isPause = false;
		//run interval every 0.01 second
		tick = setInterval(interval, 10);
		};
     
		function interval() {
		if(isPause === false){
			percentTime += 1 / time;
			$bar.css({
				width: percentTime+"%"
			});
			//if percentTime is equal or greater than 100
			if(percentTime >= 100){
				//slide to next item
				$elem.trigger('owl.next')
			}
		}
		}
     
		//pause while dragging
		function pauseOnDragging(){
		isPause = true;
		}
     
		//moved callback
		function moved(){
		//clear interval
		clearTimeout(tick);
		//start again
		start();
		}
     
		//uncomment this to make pause on mouseover
		// $elem.on('mouseover',function(){
		// isPause = true;
		// })
		// $elem.on('mouseout',function(){
		// isPause = false;
		// })
     
    });

