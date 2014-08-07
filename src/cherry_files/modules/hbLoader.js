/*
	Author: Khary Mallea kharymallea@gmail.com

	DESCRIPTION:
	hbLoader simplifies the process of loading in and using handlebars templates within your application.
	hbLoader has 3 methods:

	load(templatePath:String, onComplete:function);
	Loads the templates specified in the template path and automaticly appends to body.

	insert(templateName:String, data:jsonObject, target:Object);
	The templateName that is passed in is called and assigned the jsonObject passed in with the data and then appends the result to the passed in "target"
	
	get(templateName, data);
	returns the html object of the templateName passed in wih the jsonObject

	USAGE:

	//make sure the templates are loaded and perform a function on complete
	hbLoader.load('view/templates.htm', function(){ console.log('TEMPLATES LOADED'); });

	//insert a template called "userTemplate" into a div with the class .container and a json object of data
	hbLoader.insert('userTemplate', jsonData, '.container');

	//return the html instead of appending to an element
	hbLoader.get('templateName', jsonData);
*/

var hbLoader = {
	// holds and returns handlebars templates
	insert : function(templateName, data, target){ var itm = hbLoader.templates[templateName](data); $(itm).appendTo(target); },
	get : function(templateName, data){ return hbLoader[templateName](data); },
	load : function(templatePath, complete){
		$.get(templatePath,function(templates){
			$('body').append(templates);
			$(templates).each(function(){
				var tmpId = $(this).attr('id'); if(typeof tmpId != 'undefined'){ hbLoader.templates[tmpId] = Handlebars.compile($("#" + tmpId).html()); }     		
			});	
			if(typeof(complete) == 'function'){ complete.call(this); }
		});
	},
	templates : {}
}