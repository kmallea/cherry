var Cherry = (function(){

	var options = {
		isDev : true,
		onInit : null,
		pageName : 'Home',
		cherryFilesPath : 'cherry_files',
		cherryModulePath : '/modules/',
		pageSection : 'home'
	},
	settings = {
		version : 0.1,
		appName : 'Cherry BareBone',
		startTime : 0,
		endTime : 0,
		modules : {}
	},
	api = {
		pub : {
			init : function(opts){
				tools.timer.start();
				tools.extend(options,opts);
				// do init functions here 

				//call once init is done if needed.
				if(typeof options.onInit === 'function'){
					options.onInit.call(this);
					tools.log('initialized in ' + tools.timer.stop() + 'ms');
				}else{
					tools.log('initialized in ' + tools.timer.stop() + 'ms');	
				}
				
			},
			config : function(opts){
				tools.extend(options,opts);
			},
			loadModule : function(moduleName, callBack){
				var modulePath = options.cherryFilesPath + options.cherryModulePath + moduleName + '.js';
				if(typeof window[moduleName] === 'undefined'){
					head.load(modulePath,function(){
						settings.modules[moduleName] = window[moduleName];
						tools.log('Module Added: ' + moduleName);
						if(typeof callBack === 'function'){
							callBack.call(this,settings.modules[moduleName]);
						}
					})
				}else{
					tools.log('WARNING: Module - ' + moduleName + ' already loaded');
				}
				
			},
			module : settings.modules
		},
		priv : {
			pageInits : function(){
				
			}
		}
	},
	tools = {
		timer : {
			start : function(){
				settings.startTime = new Date();
			},
			stop : function(){
				settings.endTime = new Date();
				var startTime = settings.startTime.getTime(),
				endTime = settings.endTime.getTime();
				var timeDif = endTime - startTime;
				return timeDif;
			}
		},
		extend : function(){
			for(var i=1; i<arguments.length; i++){
		        for(var key in arguments[i]){
		            if(arguments[i].hasOwnProperty(key))
		                arguments[0][key] = arguments[i][key];
		        }
			}
		    return arguments[0];
		},
		log : function(){
			if(options.isDev){ console.log(settings.appName + ': debug:' + options.isDev + ' ' , arguments); }	
		}	
	}
	

	return api.pub;

})();