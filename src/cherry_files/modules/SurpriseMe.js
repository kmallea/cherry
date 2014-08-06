var SurpriseMe = (function() {


	var doTemplate = function(json, selector, templateId) {
		templateId = templateId || "#singleRecipeModal";
		selector = selector || "#mainmodal";
		var html = Handlebars.compile($(templateId).html())(json);
		return html;
	};
	var getRecipe = function(){
		var that = $("#mainmodal");
		$.ajax("/services/recipe.asmx/GetRecipeLessThan", {
			dataType : "json",
			type: "POST",
			data: {
				CookTime: 30,
				rnd: new Date().getTime() * 1000 + Math.floor(Math.random() * 1000)
			}
		})
		.done(function(jobj) {
			window.location.href = jobj.Url + '?sme=true';
			/*
			var html = doTemplate(jobj);
			console.log(jobj);
			that.html(html);

			$(".singleRecipeModalTabs").tabs();
			TRM_Asda.centerModal();
			// that.dialog("option", "position", "center");
			TabBottom.writeCss({arrowHeight:10});

			$(".singleRecipeModalRating").starRating();
			$(".rateThisRecipe").rateThis();
			addthis.init();
			addthis.toolbox('.recipeSocialShare');
			*/
		});
	};

	var addBtnClick = function() {
		//TRM_Asda.initAddThis();
		$("a#btn-surprise-me, .btn-surprise-me").on("click", function(e) {
			getRecipe();
			return false;
		});
	};

	$('body').on('click', '.surpriseAgain', getRecipe);

	addBtnClick();
	//$(window).on('scroll resize', TRM_Asda.centerModal);
});

var TabBottom = (function(){
	var opts = {
		target : 'li .bottomArrow',
		appendArrowTo : '.ui-tabs li',
		parentToFind : 'li',
		arrowHeight : 10,
		top:32
	};
	var core = {
		writeCss : function(options) {
			$.extend(opts, options);
			$(opts.target).each(function() {
				var width = $(this).parent(opts.parentToFind).width()*1 / 2;
				$(this).css({
					'width' : '0px' ,
					'height' : '0px',
					'border-style' : 'solid',
					'border-width' : opts.arrowHeight + 'px ' + width + 'px 0 '+ width + 'px',
					'border-color' : '#303030 transparent transparent transparent',
					'position' : 'relative',
					'top' : opts.top
				});
			});
		}
	};

	return {
		writeCss : function(h) {
			core.writeCss(h);
		}
	};
})();
})();