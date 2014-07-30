var Cherry = (function () {

	var options = {
		isDev : true,
		onInit : null,
		initPages : true,
		pageName : 'Home',
		cherryFilesPath : 'cherry_files',
		cherryModulePath : '/modules/',
		cherryInitsPath : '/inits/',
		cherryInitStrName : 'init_',
		pageSection : 'home',
		requiredModules : null,
	},
	settings = {
		version : 0.1,
		appName : 'Cherry Build',
		startTime : 0,
		endTime : 0,
		modules : {},
		modulesToLoad : 0,
		modulesLoaded : 0
	},
	tools = {
		moduleExists : function(moduleName){
			return typeof settings.modules[moduleName];
		},
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
	},
	api = {
		pub : {
			init : function(opts){
				tools.timer.start();
				tools.extend(options,opts);
				// do init functions here
				var moduleListType = typeof options.requiredModules;
				if(moduleListType !== null){
					if(moduleListType === 'object'){
						settings.modulesToLoad = options.requiredModules.length
						for (i = 0; i < settings.modulesToLoad; i++){
							Cherry.loadModule(options.requiredModules[i],function(){
								settings.modulesLoaded ++;
								if(settings.modulesLoaded === settings.modulesToLoad){
									if(options.initPages){
										api.priv.pageInit(function(){
											api.priv.initialized();
										});
									}
									else{
										api.priv.initialized();	
									}
								}
							})
						}
					}
					else if(moduleListType === 'string'){
						settings.modulesToLoad = 1;
						Cherry.loadModule(options.requiredModules);
					}
				}
				else{
					if(options.initPages){
						api.priv.pageInit(function(){
							api.priv.initialized();
						});
					}
					else{
						api.priv.initialized();
					}
				} 
			},
			config : function(opts){
				tools.extend(options,opts);
			},
			loadModule : function(moduleName, callBack){
				var modulePath = options.cherryFilesPath + options.cherryModulePath + moduleName + '.js';
				var error = 0;
				if(typeof window[moduleName] === 'undefined'){
					head.load(modulePath,function(){
						settings.modules[moduleName] = window[moduleName];
						tools.log('MODULE ADDED: ' + moduleName);
						if(typeof callBack === 'function'){
							callBack.call(this,settings.modules[moduleName]);
						}
					})
				}else{
					error = 1;
				}

				switch(error){
					case 1:
						tools.log('WARNING: Module - ' + moduleName + ' already loaded... SKIPPED! Access using - Cherry.module.' + moduleName);
					break;
				}
				
			},
			pick : settings.modules,
			tools : tools
		},
		priv : {
			pageInit : function(callback){
				var initPath = options.cherryFilesPath + options.cherryInitsPath + options.cherryInitStrName + options.pageSection + '.js';
				tools.log('priv.pageInit()', initPath);
				head.load(initPath,function(){
					callback.call();
				})
			},
			initialized : function(){
				if(typeof options.onInit === 'function'){
					options.onInit.call(this);
					tools.log('initialized in ' + tools.timer.stop() + 'ms');
				}else{
					tools.log('initialized in ' + tools.timer.stop() + 'ms');	
				}
			}
		}
	}
	
	

	return api.pub;

})();