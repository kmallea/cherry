Cherry
------


----------


**Cherry is in early development. But...** 
The goal behind Cherry is to be a javascript app runner/manager for rapid app development.

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
 - logToPage : true, // when true *Cherry.tools.log();* is displayed in the #cherryLogger div
 - logToConsole : true, // when true *Cherry.tools.log();* is displayed in the console 		
 - onInit : null, // a function to run when initiation is complete 		
 - initPages : true, // run the init file for the *pageSection* value
 - cherryFilesPath : 'cherry_files', // path to folder for cherry files
 - cherryModulePath : '/modules/', // path for modules that live inside of cherry files
 - cherryInitsPath : '/inits/', // path for init files that cherry will autoload
 - cherryInitStrName : 'init_', // string to prepend to *pageSection* option that will create autoload init files		
 - pageSection : 'home', // a unique name for a page. Used to auto run init scripts   
 - requiredModules : null, // module name or full path of a module (.js file)

 
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
