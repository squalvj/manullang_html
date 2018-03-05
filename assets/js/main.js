//@prepros-prepend dev/jquery-3.3.1.min.js
//@prepros-prepend dev/scrolloverflow.min.js
//@prepros-prepend dev/probe-scrolloverflow.min.js
//@prepros-prepend dev/tweenmax.js
//@prepros-prepend dev/mousewheel.js
//@prepros-prepend dev/fullpage.js

var home,init;
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
				scrollingSpeed: 1500,
				css3: true,
				scrollOverflow: true,
				anchors: anchor,
				normalScrollElements:'.fullpage-overflow',
				verticalCentered:false,
				controlArrows: false,
				onLeave: function(index, nextIndex, direction) {
				    var el = $(this);
				    var nextEl = el.parent().children().eq(nextIndex-1)
				    if (nextEl.hasClass('yellow')){
				    	_this.changeBackground($(".main"), '#DDDDD7');
				    }else{
				    	_this.changeBackground($(".main"), '#ffffff');
				    }
			  	},
			  	afterLoad: function(anchorLink, index) {
			  		
			  	},
		  	 	afterRender: function () {
		  	 		//showHideLoading();
				}
			});
		},
		changeBackground: function(el,color){
			TweenMax.to(el, .50, {backgroundColor: color});
		},
		processScroll: function(){
			var update = function(num1, num2){
			  var percent = Math.ceil( num1 / num2 * 100 ) + '%';
			  $(".content-overflow-process").find('span').css('width', percent);
			}

			$(".fullpage-overflow").bind('scroll', function(){
			  var top = $(this).scrollTop();
			  console.log(top)
			  var height = $(this).find("p").prop("scrollHeight") - $(this).innerHeight();
			  update(top, height);
			});
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
			activeEl = $(".header-ul").find('.active');
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
	switch (controller){
		case 'home':
			home();
			break;
		default:
			console.log(false);
			break
	}
}

$(document).ready(function() {
	init();
});
