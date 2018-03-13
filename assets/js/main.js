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
		return (w < 576) ? true : false;
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
		init: function(){
			this.headerLink();
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
				scrollOverflow: true,
				anchors: anchor,
				normalScrollElements:'.fullpage-overflow, .content-side-nav',
				verticalCentered:false,
				controlArrows: false,
				onLeave: function(index, nextIndex, direction) {
					var el,nextEl;
					el = $(this)
				    nextEl = el.parent().children().eq(nextIndex-1)
				    _this.changeBackground(nextEl)
				    _this.activeNav(nextIndex);
				    _this.moveMarker();
				    _this.hoverNav();
			  	},
			  	afterLoad: function(anchorLink, index) {
			  		
			  	},
		  	 	afterRender: function () {
		  	 		//showHideLoading();
				}
			});
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
			var update = function(num1, num2){
			  var percent = Math.ceil( num1 / num2 * 100 ) + '%';
			  $(".content-overflow-process").find('span').css('width', percent);
			}

			$(".fullpage-overflow").bind('scroll', function(){
			  var top = $(this).scrollTop();
			  var height = $(this).find("p").prop("scrollHeight") - $(this).innerHeight();
			  update(top, height);
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
		},
		mouseWheel: function(){
			if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
				$(".fullpage-overflow").bind('mousewheel', function(event) {
				    event.preventDefault();
				    var scrollTop = this.scrollTop;
				    this.scrollTop = (scrollTop + ((event.deltaY * event.deltaFactor) * -1));
				    //console.log(event.deltaY, event.deltaFactor, event.originalEvent.deltaMode, event.originalEvent.wheelDelta);
			  	});
			}
		},
		init: function(){
			this.initMarker();
			this.fullpage();
			this.hoverNav();
			this.mouseWheel();
			this.processScroll();
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
