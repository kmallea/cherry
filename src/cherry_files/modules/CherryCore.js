var CherryCore = (function(){

	var options = {},
	settings = {
		is_touch_device : false,
		eventTouchClick : 'click',
		isDragging : false,
		debug : true,
		isPhone : false,
		isTablet : false,
		aniSpeed : 100,
		scriptPath : '/media/RecipeCenter/files/',
		isRetina : window.devicePixelRatio > 1
	},
	obj = {
		container : '.trm_grid',
		nav : '.navItem',
		navGroup : '.mobile-nav',
		mobileNavCtrl : '.mobile-nav-control',
		links : '.link',
		header : '.header',
		modalBg : '.modalBg',
		pov : '.flexslider',
		poll: '.poll-container',
		body: 'body'
	},
	props = {
		lastScrollTop : 0,
		scrollPosOnDisable : [],
		isTopAnimating : false,
		isNavOpen : false,
		pageType : '',
		modalOpen : false,
		pageSection : '',
		povAct : '',
		selectedSlide : 0
	},
	api = {
		pub : {
			isDragging : function() {
				return settings.isDragging;
			},
			canClick : function() {
				return !settings.isDragging;
			},
			linkCatch : function() {
				event.stopPropagation();
			},
			onResize : function() {
				if (props.isNavOpen) {
					if(!isMobile.apple.phone && !isMobile.apple.ipod && !isMobile.android.phone){
						nav.toggle();
					}
				}
			},
			lazyloadImg : function() {
				$('img.lazy').each(function(){
					var $this = $(this);
					var orig = $this.data('original');
					if (orig) {
						$this.attr('src', orig);
					}
					if (TRM_Asda.isRetina()) {
						$this.retinafy();
					}
				});
			},
			getDeviceLayout : function () {
				var $inspector = $('<div>').css('display', 'none').addClass('trm-device-layout');
				var deviceLayout = 'Desktop';
				$(obj.body).append($inspector); // add to DOM to read the CSS property
				try {
					switch ($inspector.css('zoom')) {
					case '1':
						deviceLayout = 'Desktop';
						break;
					case '2':
						deviceLayout = 'Tablet';
						break;
					case '3':
						deviceLayout = 'Mobile';
						break;
					case '4':
						deviceLayout = 'MobileLandscape';
						break;
					}
					return deviceLayout;
				} finally {
					$inspector.remove(); // then remove from DOM
				}
			},
			deviceProper : function(d){
				var dvic = 'DSK';
				switch(d.toUpperCase()) {
				case 'DESKTOP':
					dvic = 'DSK';
					break;
				case 'TABLET':
					dvic = 'TAB';
					break;
				case 'MOBILE':
				case 'MOBILELANDSCAPE':
					dvic = 'MOB';
					break;
				}

				return dvic;
			},
		},
		priv : {}
	}
	

	return api.pub
})();