Cherry
------


----------


Cherry is in early development. But... The goal behind Cherry is to be a javascript app runner/manager. Write your js apps how you want, use the plugins you want, and use Cherry to control all of them as one unified app.

Usage:
------


----------


    Cherry.init({
					pageSection : 'home',
					isDev : true,
					requiredModules : ['cherry_files/lib/handlebars.js', 'isMobile','AdSizer','hbLoader','CherryCore'],
					onInit : function(){
						Cherry.tools.log('DEVICE LAYOUT', Cherry.pick.CherryCore.getDeviceLayout());
						Cherry.tools.log('APP IS READY TO GO!');
					}
				});
			

Methods
-------


----------

**Cherry.config()**


 
Sets or adds new options to Cherry

    Cherry.config({
        isDev : false
    });
    
**Arguments:**
    

 - options : Object - an oject of existing or new options

 
 *returns null*   


----------


**Cherry.loadModule()**

Loads a new module in to Cherry. Either a module name that can be found in the 'cherryFilesPath + cherryModulePath' Config Option or a full path to a javascript file.

    Cherry.loadModule(['isMobile', 'path/to/file.js'],function(){
        //when modules are loaded do something
    })
**Arguments**

 - moduleName  : Array/String an array or string of either a module name
   or full path of the file.

*returns null*


----------


**Cherry.tree()**

    Cherry.tree();

**Arguments**

 - None

*returns null*


----------

***Cherry is in dev and is a work in progress***
