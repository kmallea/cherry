Cherry
------
Cherry is in early development. But... The goal behind Cherry is to be a javascript app runner/manager. Write your js apps how you want, use the plugins you want, and use Cherry to control all of them as one unified app.

Usage:

    Cherry.init({
					pageSection : 'home',
					isDev : true,
					requiredModules : ['cherry_files/lib/handlebars.js', 'isMobile','AdSizer','hbLoader','CherryCore'],
					onInit : function(){
						Cherry.tools.log('DEVICE LAYOUT', Cherry.pick.CherryCore.getDeviceLayout());
						Cherry.tools.log('APP IS READY TO GO!');
					}
				});
