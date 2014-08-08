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

**Example:**

    Cherry.config({
        isDev : false
    });
    
**Arguments:**
    

 - options : Object - an oject of existing or new options

**Options**

 - isDev : true //when set true will show console messages for *Cherry.tools.log();*
 - logToPage : true, 		
 - onInit : null, 		
 - initPages : true,
 - pageName : 'Home',
 - cherryFilesPath : 'cherry_files',
 - cherryModulePath : '/modules/', 		
 - cherryInitsPath : '/inits/',
 - cherryInitStrName : 'init_', 		
 - pageSection : 'home',
 - requiredModules : null,

 
 *returns null*   


----------

Cherry.hasModule()
------------------

Checks if a module exists inside of Cherry

**Example:**

    var hasMobileDetect = Cherry.hasModule('isMobile');

**Arguments**
 - moduleName  : Array/String an array or string of either a module name
   or full path of the file.

*returns Boolean*


----------


**Cherry.loadModule()**

Loads a new module in to Cherry. Either a module name that can be found in the 'cherryFilesPath + cherryModulePath' Config Option or a full path to a javascript file.

**Example:**

    Cherry.loadModule(['isMobile', 'path/to/file.js'],function(){
        //when modules are loaded do something
    })
**Arguments**

 - moduleName  : Array/String an array or string of either a module name
   or full path of the file.

*returns null*


----------


**Cherry.tree()**

**Example:**

    Cherry.tree();

**Arguments**

 - None

*returns null*


----------
**Cherry.pick.*{moduleName}***

Gives you access to the module you want to use.

**Example:**

    Cherry.pick.moduleName(moduleOptions);
    
*returns based on module used.*


----------
**Cherry.tools.log()**

Logs a message to the console and to #cherryLogger div. Only displays when isDev option is set to true.

**Example:**

    Cherry.tools.log('My Log message');
    
Arguments

 - none

*returns null*


***Cherry is in dev and is a work in progress***
