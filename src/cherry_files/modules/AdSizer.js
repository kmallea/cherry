
var AdSizer = (function(){
	var units = {
		'mobile' : {'min':0, 'max':479},
		'mobileWide' : {'min':0, 'max':767},
		'tablet' : {'min':768, 'max':979},
		'desktop' : {'min':979, 'max':5000}
	},
	width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
	adUnit = 'standard';

	if(isMobile.apple.phone || isMobile.apple.ipod || isMobile.android.phone){
		adUnit = 'mobileAd';
	}else if(isMobile.apple.tablet || isMobile.android.tablet || isMobile.seven_inch){
		adUnit = 'tablet';
	}
	else{
		if (width >= units.desktop.min) {
			adUnit = 'standard';
		}
		else if ((width >= units.tablet.min) && (width <= units.tablet.max)) {
			adUnit = 'tablet';
		}
		else {
			adUnit = 'mobileAd';
		}
	}

	//console.log('THE WIDTH',width);

	return {
		unit : function(){ 
			width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			//console.log(width);
			return adUnit; 
		},
		showAd : function(who) {
			$(who).addClass(AdSizer.unit());
		}
	};
})();