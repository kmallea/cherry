var Cherry = (function () {

	var options = {
		isDev : true,
		logToPage : true,
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
		appName : 'CherryDev',
		startTime : 0,
		endTime : 0,
		modules : {},
		modulesToLoad : 0,
		modulesLoaded : 0,
		isModuleInit : [],
		windowVars : []
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
			if(options.isDev){ 
				console.log(settings.appName + ': debug:' + options.isDev + ' ' , arguments);
				if(options.logToPage){
					if(!$('#cherryLogger').length){
						$('body').append('<div id="cherryLogger"><h1>Cherry Dev Logger</h1></div>');
					}
					var args = [];
					for(var i in arguments){
						
						args.push(arguments[i]);
					}
					$('#cherryLogger').html($('#cherryLogger').html() + '<hr>' + settings.appName + ': debug:' + options.isDev + ' [ ' + args + ' ]')
				} 
			}	

		}	
	},
	api = {
		pub : {
			init : function(opts){
				tools.log('Initializing ' + settings.appName);
				tools.timer.start();
				tools.extend(options,opts);
				//load global vars
				for(var i in window){ settings.windowVars.push(i); }
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
				
				var modulePath = (moduleName.indexOf('/') > -1) ? moduleName : options.cherryFilesPath + options.cherryModulePath + moduleName + '.js';
				var error = 0;
				if(typeof window[moduleName] === 'undefined'){
					head.load(modulePath,function(){
						for(var i in window){
							if(settings.windowVars.indexOf(i) === -1){
								//settings.modules[moduleName] = window[moduleName];
								settings.modules[i] = window[i];
								settings.windowVars.push(i);
								tools.log('MODULE ADDED: ' + i);
							}
						}
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
			hasModule : function(moduleName){
				return  (typeof settings.modules[moduleName] !== 'undefined') ? true : false;
			},
			tree : function(){
				tools.log('CHERRY TREE START');
				tools.log(' |   ');
				tools.log('   MODULES   ');
				// look at  modules loaded
				for(var i in settings.modules){
					tools.log(' |--- MODULE:' + i);
				}
				tools.log(' |   ');
				tools.log(' |   ');
				tools.log('   OPTIONS   ');
				for(var i in options){
					tools.log(' |--- OPTION:' + i + ' "' + options[i] + '"');
				}
				tools.log(' |   ');
				tools.log(' |   ');
				tools.log('   SETTINGS   ');
				for(var i in settings){
					tools.log(' |--- SETTING:' + i + ' "' + settings[i] + '"');
				}
				tools.log('CHERRY TREE END');
			},
			pick : settings.modules,
			tools : tools
		},
		priv : {
			pageInit : function(callback){
				var initPath = options.cherryFilesPath + options.cherryInitsPath + options.cherryInitStrName + options.pageSection + '.js';
				tools.log('PRIVATE::pageInit() : METHOD ' + initPath);
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