//@prepros-prepend dev/jquery-3.3.1.min.js
//@prepros-prepend dev/scrolloverflow.min.js
//@prepros-prepend dev/probe-scrolloverflow.min.js
//@prepros-prepend dev/tweenmax.js
//@prepros-prepend dev/mousewheel.js
//@prepros-prepend dev/fullpage.js
var home,init,click,util;

util = {
	checkMobile: function(){
		var w = $(window).width();
		return (w <= 576) ? true : false;
	},
	checkTab: function(){
		var w = $(window).width();
		return (w <= 756) ? true : false;
	}
}


click = () => {
	var method;
	method = {
		headerLink: function(){
			$(".header-link").click(function(event) {
				if (!$(this).hasClass('active')){
					$(this).addClass('active')
				}
			});
		},
		hamburgerClick: function(){
			var openNav = function(){
				// $(".main").css({
				// 	'transform': 'translateX(-285px)',
				// 	'filter': 'blur(2px)'
				// });
				// $("#header").css('transform', 'translateX(-285px)');
				// $(".header-ul").css('transform', 'translateX(-100px)');
				$(".main, #header, .header-ul").addClass('open-navbar')
			}
			var closeNav = function(){
				// $(".main").css({
				// 	'transform': 'translateX(0)',
				// 	'filter': 'blur(0px)'
				// });
				// $("#header").css('transform', 'translateX(0)');
				// $(".header-ul").css('transform', 'translateX(-100px)');

				$(".main, #header, .header-ul").removeClass('open-navbar')
			}
			$(".hamburger").click(function(event) {
				$(this).toggleClass('active');
				if ($(this).hasClass('active')){
					if ($(".main").hasClass('open-side-nav'))
						$(".main").removeClass('open-side-nav')
					openNav();
				}
				else{
					closeNav();
				}
			});

			$(".section").click(function(event) {
				if ($(".hamburger").hasClass('active')){
					$(".hamburger").removeClass('active')
					closeNav();
				}
			});
		},
		openSideNavMobile: function(){
			if (util.checkTab()){
				$(".title-content").click(function(event) {
					$(".main").addClass('open-side-nav')
					$.fn.fullpage.setAllowScrolling(false);
				});
				$(".partners-name").click(function(event) {
					$(".main").addClass('open-side-nav')
					$.fn.fullpage.setAllowScrolling(false);
				});
			}
		},
		closeSideNavMobile: function(){
			$(".close-side-nav-mobile").click(function(event) {
				$(".main").removeClass('open-side-nav')
				$.fn.fullpage.setAllowScrolling(true);
			});
		},
		openJobVacancies: function(){
			$(".job-trigger").click(function(event) {
				var content;
				$(this).closest('.side-nav-overflow').children('li').children('a').removeClass('active')
				$(this).addClass('active')
				content = $(this).closest('.content')
				content.find('.content-the-content').find('.contact-content').fadeOut('400', function() {
					content.find('.content-the-content').find('.contact-job-vacancies').fadeIn(400);
					TweenMax.to($(".main"), .50, {backgroundColor: '#DDDDD7'});
				});
				$(".content-footer").fadeOut('400');
			});
		},
		openContact: function(){
			$(".contact-trigger").click(function(event) {
				var content;
				$(this).closest('.side-nav-overflow').children('li').children('a').removeClass('active')
				$(this).addClass('active')
				content = $(this).closest('.content')
				content.find('.content-the-content').find('.contact-job-vacancies').fadeOut('400', function() {
					content.find('.content-the-content').find('.contact-content').fadeIn(400);
					$(".content-footer").fadeIn('400');
					TweenMax.to($(".main"), .50, {backgroundColor: '#ffffff'});
				});
				
			});
		},
		autoCloseSideNav: function(){
			//when click transformer class, auto close side nav left
			if (util.checkTab){
				var content,text;
				$(".transformer").click(function(event) {
					content = $(this).closest('.content')
					text = $(this).html();
					if($(".main").hasClass('open-side-nav')){
						content.find('.content-the-content').find('.title-content').html(text)
						$(".main").removeClass('open-side-nav')
						$.fn.fullpage.setAllowScrolling(true);
					}
				});
			}
		},
		init: function(){
			this.autoCloseSideNav();
			this.openContact();
			this.openJobVacancies();
			this.openSideNavMobile();
			this.closeSideNavMobile();
			this.headerLink();
			this.hamburgerClick();
		}
	}

	return method.init();
}

home = () => {
	var fullpageElement,anchor,marker,activeNav;
	fullpageElement = $("#fullpage-home");
	marker = $("#marker");
	activeNav = $(".header-ul").find('.active');
	anchor = [];

	// naming section so we can access it using anchor
 	$('.section').each(function(el, i) {
 		anchor[el] = $(this).data('anchorName');
 	});


	var method = {
		fullpage: function(){
			var _this = this;
			fullpageElement.fullpage({
				scrollingSpeed: 1000,
				css3: true,
				scrollOverflow: false,
				anchors: anchor,
				normalScrollElements:'.fullpage-overflow, .side-nav-overflow',
				verticalCentered: (util.checkMobile()) ? true : false,
				controlArrows: false,
				onLeave: function(index, nextIndex, direction) {
					var el,nextEl;
					el = $(this)
				    nextEl = el.parent().children().eq(nextIndex-1)
				    _this.changeBackground(nextEl)
				    _this.activeNav(nextIndex);
				    _this.moveMarker();
				    _this.hoverNav();
				    _this.markerBottom(nextIndex);
			  	},
			  	afterLoad: function(anchorLink, index) {
			  		
			  	},
		  	 	afterRender: function () {
		  	 		console.log('load')
				}
			});
		},
		markerBottom: function(currentIndex){
			var marker = $(".marker-bottom").find('span')
			var total = $(".section").length;
			var update = function(num1, num2){
			  var percent = Math.ceil( num1 / num2 * 100 ) + '%';
			  $(".marker-bottom").find('span').css('width', percent);
			}
			update(currentIndex, total);
		},
		activeNav: function(i){
			$(".header-link").removeClass('active')
			$(".header-link").eq(i-1).addClass('active')
			activeNav = $(".header-ul").find('.active'); //change active nav
		},
		changeBackground: function(nextEl){
			if (nextEl.hasClass('yellow')){
				TweenMax.to($(".main"), .50, {backgroundColor: '#DDDDD7'});
		    }else if(nextEl.hasClass('gray')){
		    	TweenMax.to($(".main"), .50, {backgroundColor: '#E6E7E8'});
		    }else{
		    	TweenMax.to($(".main"), .50, {backgroundColor: '#ffffff'});
		    }
		},
		processScroll: function(){
			var update = function(num1, num2, el){
			  var percent = Math.ceil( num1 / num2 * 100 ) + '%';
			  el.css('width', percent);
			}

			$(".fullpage-overflow").bind('scroll', function(){

				var top = $(this).scrollTop();
				if ($(this).find('div').length){
					var el = $(this).closest('.content-the-content').find('.content-overflow-process').find('span')
					var height = $(this).find("div").prop("scrollHeight") - $(this).innerHeight();
					update(top, height, el);
				}else{
					var el = $(this).closest('.content-the-content').find('.content-overflow-process').find('span')
					var height = $(this).find("p").prop("scrollHeight") - $(this).innerHeight();
					update(top, height, el);
				}
			  
			});
		},
		moveMarker: function(){
			var pos,widthEl,spanPos;
			pos = activeNav.offset();
			spanPos = activeNav.find('span').offset();
			widthEl = activeNav.find('span').width();
			TweenMax.to(marker, .50, {left:pos.left,width:widthEl})
		},
		initMarker: function(){
			// init marker at navbar & mesti di timouet kalo kaga ngaco
			setTimeout(function(){
				var pos,widthEl,spanPos;
				pos = activeNav.offset();
				spanPos = activeNav.find('span').offset();
				widthEl = activeNav.find('span').width();
				marker.css({top: pos.top, left: pos.left, width:widthEl})
			},10)
			
		},
		hoverNav: function(){
			//listen hover nav
			if (!util.checkMobile()){
				var activeEl,position,widthEl; 
				activeEl = activeNav
				position = activeEl.offset();
				widthEl = activeEl.find('span').width();
				$(".header-link").hover(function() {
					var el,pos,w;
					el = $(this);
					pos = el.offset();
					w = el.find('span').width();
					TweenMax.to(marker, .75, {left: pos.left,width: w});
				}, function() {
					TweenMax.to(marker, .75, {left: position.left,width: widthEl,ease: Power2.easeOut});
				});
			}
		},
		mouseWheel: function(){
			if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
				$(".fullpage-overflow, .content-side-nav").bind('mousewheel', function(event) {
				    event.preventDefault();
				    var scrollTop = this.scrollTop;
				    this.scrollTop = (scrollTop + ((event.deltaY * event.deltaFactor) * -1));
				    //console.log(event.deltaY, event.deltaFactor, event.originalEvent.deltaMode, event.originalEvent.wheelDelta);
			  	});
			}
		},
		init: function(){
			this.hoverNav();
			this.initMarker();
			this.fullpage();
			this.mouseWheel();
			this.processScroll();
			this.markerBottom();
		},
		
	}
	return method.init();
};

init = () => {
	var controller = $("body").data('controller');
	click()
	switch (controller){
		case 'home':
			home();
			break;
		default:

			break
	}
}

$(document).ready(function() {
	init();
});
