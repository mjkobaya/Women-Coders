// Setting some variables
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var windowHeight = jQuery(window).height();	
var windowWidth = jQuery(window).width();
var navHeight = jQuery('header.navbar').height();

/*=================================================================*/

jQuery(document).ready(function() {

	"use strict";
	

	/*=================================================================
	Facts 
	===================================================================*/
	if (isMobile == false) {
		$('.col').hover(function(){
		var tgt = $(this).find('.getNum'),
		num = tgt.attr('data-num'),
		cm = tgt.attr('data-bar'); 
		if($.isNumeric(num)){
			$(this).find('span').not(':animated').animate({ width: num },{duration: 500, step: function(step) {
			tgt.text(parseInt(step) + cm); }}); 
			} 
		},function(){$('.grNum').find('span').css({'width':0});});
	}
	
	/*=================================================================
	ANIMATE CONTENT       
	===================================================================*/                                                             
    if (isMobile == false) {
        $('*[data-animated]').addClass('animated');
    }
	function animated_contents() {
		$(".animated:appeared").each(function (i) {
			var $this    = $(this),
				animated = $(this).data('animated');

			setTimeout(function () {
				$this.addClass(animated);
			},100);
			
		});
	}
	animated_contents();
	$(window).scroll(function () {
		animated_contents();
	});

	/*=================================================================
	Gallery-Venobox Responsive Lightbox
	===================================================================*/       
	$('.venobox, .image-lightbox-link').venobox({
		numeratio: true
    }); 
	
	/*=================================================================
	toggle team and work section
	===================================================================*/       
	$(".show-team").click(function(){
		var selector = $(this).attr('href');	
		$(selector).slideDown(600);
		$('html, body').delay(600).animate({ scrollTop: $(selector).offset().top-60}, 800,"easeOutElastic");
	});	
	$(".show-work").click(function(){
		var selector = $(this).attr('href');		
		$(selector).slideDown(600);
		$('html, body').delay(600).animate({ scrollTop: $(selector).offset().top-60}, 800,"easeOutElastic");
		jQuery(window).smartresize();
	});	
	
	/*=================================================================
	Loading Spinner
	http://fgnass.github.io/spin.js/
	===================================================================*/       
	// Settings for Page Loading Overlay
	var spinnerHomeOptions = {
	  lines: 11, // The number of lines to draw
	  length: 10, // The length of each line
	  width: 2, // The line thickness
	  radius: 10, // The radius of the inner circle
	  corners: 0, // Corner roundness (0..1)
	  rotate: 0, // The rotation offset
	  direction: 1, // 1: clockwise, -1: counterclockwise
	  color: '#000', // #rgb or #rrggbb or array of colors
	  speed: 1.5, // Rounds per second
	  trail: 60, // Afterglow percentage
	  shadow: false, // Whether to render a shadow
	  hwaccel: false, // Whether to use hardware acceleration
	  className: 'spinnerhome', // The CSS class to assign to the spinner
	  zIndex: 2e9, // The z-index (defaults to 2000000000)
	  top: 'auto', // Top position relative to parent in px
	  left: 'auto' // Left position relative to parent in px
	};
	
	// Settings for Project Loading Overlay in portfolio
	var spinnerOptions = {
	  lines: 11, // The number of lines to draw
	  length: 20, // The length of each line
	  width: 2, // The line thickness
	  radius: 30, // The radius of the inner circle
	  corners: 0, // Corner roundness (0..1)
	  rotate: 0, // The rotation offset
	  direction: 1, // 1: clockwise, -1: counterclockwise
	  color: '#000', // #rgb or #rrggbb or array of colors
	  speed: 1.5, // Rounds per second
	  trail: 60, // Afterglow percentage
	  shadow: false, // Whether to render a shadow
	  hwaccel: false, // Whether to use hardware acceleration
	  className: 'spinner', // The CSS class to assign to the spinner
	  zIndex: 2e9, // The z-index (defaults to 2000000000)
	  top: 'auto', // Top position relative to parent in px
	  left: 'auto' // Left position relative to parent in px
	};
	
	//var target = document.getElementById('site-title');
	var spinner = new Spinner(spinnerOptions).spin();	
	var spinnerhome = new Spinner(spinnerHomeOptions).spin();	
	// Loading spinner for Homepage
	jQuery('#loadbox .inner').append(spinnerhome.el);
	// Loading Spinner for Projects
	jQuery('.project-content').after(spinner.el);
	
	/*=================================================================
	show-hide navigation
	===================================================================*/ 
	var windowOffsetHeight = windowHeight - 1;
	if (!jQuery('header.navbar').hasClass('show')) {
		jQuery(window).scroll(function() {
			if ( jQuery(this).scrollTop() > windowOffsetHeight - 230 ) {
				jQuery('header.navbar').addClass('show');
			}
			else {
				jQuery('header.navbar').removeClass('show');
			}
		});
	};
	
	/*=================================================================
	Portfolio: Isotope Layout Plugin
	===================================================================*/ 

	var container = jQuery('#portfolio-list');
	// Portfolio: Number of columns
	// 2 columns grid for mobile
	// 3 columns grid for tablet & desktop
	function portfolioColumnNumber() {
			if (windowWidth < 768) {
			var portfolioColumns = 2;
		}
		else if (windowWidth >= 768) {
			var portfolioColumns = 1;
		}
		return portfolioColumns;
	}
	
	/*=================================================================
	Initialize Isotope & Masonry Layout
	===================================================================*/ 
	container.imagesLoaded( function() {
		container.isotope({
		  itemSelector: 'li',
		  resizable: false,  // disable normal resizing
		  masonry: { columnWidth: container.width() / portfolioColumnNumber }
		 });
	 });
	
	/*=================================================================
	Update portfolio layout when resizing the browser window
	===================================================================*/ 

	jQuery(window).smartresize(function() {
		container.isotope({
	    masonry: { columnWidth: container.width() / portfolioColumnNumber }
	  });
	});
    jQuery(window).smartresize();

	/*=================================================================
	Initialize Portfolio Filter (on click)
	===================================================================*/ 
 
	jQuery('#portfolio-filter a').click(function(e) {		
			e.preventDefault();		
	  var selector = jQuery(this).attr('data-filter');
	  container.isotope({ filter: selector });		
		// Active Filter Class
		jQuery('#portfolio-filter').find('.active').removeClass('active');
		jQuery(this).parent().addClass('active');		
		return false;		
	});
	
	/*=================================================================
	Portfolio 
	===================================================================*/ 

	var portfolio = jQuery('#portfolio-list');
	var portfolioItem = portfolio.find('li');
	var projectLength = portfolioItem.length;
	var prevButton = jQuery('#project-container .prev');
	var nextButton = jQuery('#project-container .next');
	
	/*=================================================================
	Portfolio Direction Aware Hover Effect
	===================================================================*/ 

	portfolio.find('li').each(function() { 
		jQuery(this).hoverdir({
			speed : 			200,
			hoverDelay : 	100
		});
	});
	
	/*=================================================================
	FitVids v1.0 - Fluid Width Video Embeds
	===================================================================*/ 
	
	function projectFunctions() {
		$("#portfolio-slider1").owlCarousel({
        navigation: false,
        pagination: false,
        items: 1,
        navigationText: false,
		autoPlay:3000,
		itemsDesktop : [1000,1], //5 items between 1000px and 901px
		itemsDesktopSmall : [900,1], // betweem 900px and 601px
		itemsTablet: [600,1], //2 items between 600 and 0
		transitionStyle : "goDown"
    });
	$("#portfolio-slider2").owlCarousel({
        navigation: false,
        pagination: false,
        items: 1,
        navigationText: false,
		autoPlay:3000,
		itemsDesktop : [1000,1], //5 items between 1000px and 901px
		itemsDesktopSmall : [900,1], // betweem 900px and 601px
		itemsTablet: [600,1], //2 items between 600 and 0
		transitionStyle : "fadeUp"
    });
		
	jQuery('.video-full-width').fitVids();
	jQuery('.fluid-width-video-wrapper').css('padding-top','56.25%'); // Always display videos 16:9 (100/16*9=56.25)
	jQuery('#project-container .spinner').fadeOut(1000);
			
	};
	
	/*=================================================================
	portfolio Opening a Project
	=================================================================	 

	portfolioItem.find('a').click(function(e) {
		e.preventDefault();
		// Show Loading Spinner
		jQuery('#project-container .spinner').show(0);
		// Disable browser scrollbar
		jQuery('body').addClass('overflow-hidden');
		var projectLink = jQuery(this).attr('href');
		var projectOpen = portfolio.find(this).attr('href',projectLink).closest('li');
		// Add class "open" to opened project
		projectOpen.addClass('open');
		// Disable prev link, when first project is open
		if (projectOpen.index() == 0) {	prevButton.addClass('disabled'); }
		else { prevButton.attr('href', projectOpen.prev('li').find('.project-link').attr('href')); }
		// Disable next link, when last project is open
		if (projectOpen.index()+1 == projectLength) { nextButton.addClass('disabled'); }
		else { nextButton.attr('href', projectOpen.next('li').find('.project-link').attr('href')); }
		// Show project popup and load project content
		jQuery('#project-container').addClass('show');
		jQuery('.project-content').load(window.location.pathname+' '+projectLink, function() {				
			projectFunctions();
		});
	});
=*/

	// Button: Previous Project
	jQuery('.prev').click(function() {
		jQuery('#project-container .spinner').show(200);
		var currentProject = portfolio.find('.open');
		var currentIndex = currentProject.index()+1;
		// Enable next button when going to the previous project
		jQuery('.next').removeClass('disabled');
		// Disable prev button when reaching first project
		if (currentIndex <= 2) { jQuery('.prev').addClass('disabled'); }		
		var prevProjectLink = currentProject.prev('li').find('a').attr('href');
		currentProject.removeClass('open').prev('li').addClass('open');
		jQuery('.project-content').load(window.location.pathname+' '+prevProjectLink, function() {			
			projectFunctions();		
		});
	});
	
	// Button: Next Project
	jQuery('.next').click(function() {
		jQuery('#project-container .spinner').show(200);
		var currentProject = portfolio.find('.open');
		var currentIndex = currentProject.index()+1;
		// Enable prev button when going to the next project
		jQuery('.prev').removeClass('disabled'); 
		// Disable next button when reaching the last project
		if ( currentIndex+1 >= projectLength ) { jQuery('.next').addClass('disabled'); }		
		var nextProjectLink = currentProject.next('li').find('a').attr('href');		
		currentProject.removeClass('open').next('li').addClass('open');
		jQuery('.project-content').load(window.location.pathname+' '+nextProjectLink, function() {		
			projectFunctions();
		});
	});
	
	// Close button
	jQuery('.close').click(function() {
		// Enable browser scrollbar
		jQuery('body').removeClass('overflow-hidden');
		jQuery('#project-container').removeClass('show');
		portfolio.find('.open').removeClass('open');
		jQuery('.project-content').html('');
	});
	
	// Close using "ESC" key
	jQuery(document).keyup(function(e) {
		if (e.keyCode == 27) {
		// Enable browser scrollbar
		  jQuery('body').removeClass('overflow-hidden');
		  jQuery('#project-container').removeClass('show');
		  portfolio.find('.open').removeClass('open');
		  jQuery('.project-content').html('');
		}
	});

		
	
	/* Full-Width
	-------------------------*/
	var fullWidthSpace = ( windowWidth - jQuery('.full-width').width() ) / 2;
	jQuery('.full-width').css({'width': windowWidth+'px', 'margin-left' : -fullWidthSpace+'px'});
	
	/*=================================================================
	Bootstrap Plugins : Navigation - Collapse (for mobile)
	===================================================================*/ 
	jQuery('.navbar .collapse').collapse();
	jQuery(".navbar-nav li a").click(function() {
		jQuery(".collapse").toggleClass("in");
	});
	
	/*=================================================================
	Contact form
	===================================================================*/ 

	contentEditable();contactForm();
		
	/*=================================================================
	Header text slider
	===================================================================*/ 
	
	$("#heading-slider-style1").owlCarousel({
        navigation: false,
        pagination: false,
        items: 1,
        navigationText: false,
		autoPlay:4000,
		itemsDesktop : [1000,1], //5 items between 1000px and 901px
		itemsDesktopSmall : [900,1], // between 900px and 601px
		itemsTablet: [600,1], //2 items between 600 and 0
		transitionStyle : "fadeUp",
		mouseDrag:false,
		touchDrag:false
	});
	
	$("#heading-slider-style2").owlCarousel({
        navigation: false,
        pagination: false,
        items: 1,
        navigationText: false,
		autoPlay:4000,
		itemsDesktop : [1000,1], //5 items between 1000px and 901px
		itemsDesktopSmall : [900,1], // betweem 900px and 601px
		itemsTablet: [600,1], //2 items between 600 and 0
		transitionStyle : "fade",
		mouseDrag:false,
		touchDrag:false
	});
	
	
	/*=================================================================
	clients slider	
	===================================================================*/ 
	
	$("#client-slider").owlCarousel({
        navigation: false,
        pagination: false,
		autoPlay:5000,
        items: 5,
        navigationText: false
    });

	/*=================================================================
	testimonial slider
	===================================================================*/ 

	$("#testi-slider").owlCarousel({
        navigation: true,
        pagination: false,
        items: 1,
        navigationText: false,
		autoPlay:3000,
		itemsDesktop : [1000,1], //5 items between 1000px and 901px
		itemsDesktopSmall : [900,1], // betweem 900px and 601px
		itemsTablet: [600,1], //2 items between 600 and 0
		transitionStyle : "goDown"
    });
	
	/*=================================================================
	Service slider
	===================================================================*/ 

	$("#service-slider").owlCarousel({
        navigation: false,
        pagination: false,
		autoPlay:5000,
        items: 3,
        navigationText: false
    });

	/*=================================================================
	gallery slider
	===================================================================*/ 
	$("#gallery-slider").owlCarousel({
        navigation: false,
        pagination: false,
		autoPlay:5000,
        items: 1,
		itemsDesktop : [1000,1], //5 items between 1000px and 901px
		itemsDesktopSmall : [900,1], // betweem 900px and 601px
		itemsTablet: [600,1], //2 items between 600 and 0
        navigationText: false
    });
	
}); 
// END jQuery(document).ready()

jQuery(window).load(function() {

	// Parallax Backgrounds
		$(window).scroll(function(){
		var scrollAmount = $(window).scrollTop()/2;
		$('#heading-slider-style1').css('padding-bottom', scrollAmount);	
		});	
		
		 
	/*=================================================================
	Activate animate.css effects once page is loaded
	http://css-tricks.com/transitions-only-after-page-load/
	===================================================================*/ 
	
	jQuery("body").removeClass("loading");
  
	/*=================================================================
	 Hide Site Load Overlay
	===================================================================*/ 

	jQuery('#loadbox .spinnerhome').fadeOut(400);
	jQuery('#loadbox .wrapper').delay(600).addClass('animated bounceOut');
	jQuery('#loadbox').delay(800).fadeOut(400);
	
	/*=================================================================
	TwitterFeed
	===================================================================*/ 
	
	$('#twitter-box').tweet({
	    modpath: 'js/twitter/',
	    list_id: 'twitter-box',
	    count: 4,
	    avatar_size: 0,
	    loading_text: 'loading twitter feed',
	    username:'womencoders'
	});
	
	/*=================================================================
	twitter slider
	===================================================================*/ 
	
	$("#tweet-slider").owlCarousel({
        navigation: false,
        pagination: false,
        items: 1,
		itemsDesktop : [1000,1], //5 items between 1000px and 901px
		itemsDesktopSmall : [900,1], // betweem 900px and 601px
		itemsTablet: [600,1], //2 items between 600 and 0
        navigationText: false,
		autoPlay:3000,
		transitionStyle : "fadeUp"
    });
	
	
	/* Slideshow: BxSlider
	List with all slideshow options can be found here: http://bxslider.com/options
	-------------------------*/

	function overlayHeight() {
		jQuery('.parallax').each(function() {
			var parallaxHeight = jQuery(this).height();
			jQuery(this).find('.background-overlay').css('height', parallaxHeight);
		});
	};
	jQuery('.home-banner').each(function() {
			parallax();
	});

	overlayHeight();
		
	jQuery(window).smartresize(function() { overlayHeight(); });	
	
	/*=================================================================
	about into toggle
	===================================================================*/       
	
	// Smooth scroll for menu links
	jQuery('.go a[href^="#"]').on('click', function(e) {	
    e.preventDefault();
    jQuery('html,body').animate({scrollTop:jQuery(this.hash).offset().top}, 800);
	});
	
	 //Smooth scroll for menu links 
	 jQuery('header.navbar a[href^="#"], #home a[href^="#"], .modal a[href^="#"]').on('click', function (e) { 
	 e.preventDefault(); 
	 var jqBH = jQuery('html,body'); 
	 jqBH.unbind("scroll mousedown DOMMouseScroll mousewheel keyup"); 
	 jqBH.bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(){ jqBH.stop(true); }); 
	 jqBH.stop(true).animate({scrollTop: jQuery(this.hash).offset().top -50}, 1200, function (){ jqBH.unbind("scroll mousedown DOMMouseScroll mousewheel keyup"); }); });
	
});

/*parallax scrolling effects to any scrolling element*/
function parallax() {
	// Check for mobile
	if( !isMobile ) {
		jQuery(window).stellar({
			horizontalScrolling: false
		});
	}
}

function contentEditable(){
	function e(t){
		var n=jQuery.Event("keypress",{which:t});
		t.keyCode!==9?$(this).text("").addClass("js-populated").removeClass("js-error").trigger(n):$(this).one("keypress",e)
	}
	$("[contenteditable=true]").each(function(){
		var t=$(this).data("placeholder");
		$(this).one("keypress",e);
		$(this).keyup(function(){
			if($(this).text().length===0){
				$(this).text(t).removeClass("js-populated");
				$(this).one("keypress",e)
			}
		})
	});
	$("[contenteditable=true]").focus(function(){
		$(this).removeClass("js-error")
	})
}

function contactForm(){
	
	function e(e){
		var t=/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return t.test(e)
	}
	$(".js-contact-form").submit(function(){
		var i=$(".js-contact-email"),
			s=$(".js-contact-name"),
			u=$(".js-contact-brief"),
			a=1;
			
			i.removeClass("js-error");s.removeClass("js-error");u.removeClass("js-error");
			if(i.text()===i.data("placeholder")){i.addClass("js-error");a=0}else if(!e(i.text())){i.addClass("js-error");a=0}if(s.text()===s.data("placeholder")){s.addClass("js-error");a=0}if(u.text()===u.data("placeholder")){u.addClass("js-error");a=0}if(!a)return!1
			
			//send the ajax request
			$.post('email.php',{name:$(".js-contact-name").text(),
							  email:$(".js-contact-email").text().replace(/(\r\n|\n|\r)/gm,"").replace(/\s+/g," "),
							  message:$(".js-contact-brief").text().replace(/(\r\n|\n|\r)/gm,"").replace(/\s+/g," ")},
		
			//return the data
			function(data){alert(data);
			  $(".js-mail-message").addClass("js-hidden");
				$(".js-contact-submit").addClass("js-hidden");
				$(".js-mail-success").removeClass("js-hidden")
			});
			//stay on the page
			return false;
	})
}

