/*
globalVars v 1.0
copyright 2006 Thomas Frank

This program is free software under the terms of the 
GNU General Public License version 2 as published by the Free 
Software Foundation. It is distributed without any warranty.
*/

globalVars={
	init:function(){
		this.initially=[];
		for(var i in window){this.initially[i]=true};
	},
	get:function(x){
		var win=window;
		if(navigator.userAgent.toLowerCase().indexOf("msie")>=0 && window["ActiveXObject"]){
			win=this.ieFix()
		};
		var obj={};
		var ffx=',addEventListener,location,document,navigator,event,frames,';
		for(var i in win){
			if(i=="fullScreen"){continue};
			var a=true;
			if(this.initially[i] && typeof window[i]=="function"){this.initially[i]=false};
			a=a && !(this.initially[i]);
			a=a && !(window[i]===undefined);
			a=a && !(window[i]===null);
			a=a && (i.indexOf("[[")<0);
			a=a && (window[i]+"").indexOf("[native code]")<0;
			var b=a;
			a=a && (window[i]+"").indexOf("[object HTML")!=0;
			if(a!=b){b=false} else {b=true};
			a=a && (window[i]+"").indexOf("[object Window")!=0;
			a=a && (window[i]+"").indexOf("[object]")!=0;
			a=a && ((window[i]+"")!="[function]");
			a=a && ((window[i]+"")!="(Internal Function)");
			a=a && (!(typeof window[i]=="function" && (window[i]+"").indexOf("<Logger")==0));
			a=a && (i!="NaN");
			a=a && (i!="0" && i!="1");		
			a=a && (i!="Infinity");
			a=a && (i!="Math");
			a=a && ffx.indexOf(','+i+',')<0;
			if(x && b){a=true};
			if (a){obj[i]=window[i]};
		};
		obj["globalVars"]=globalVars;
		if(window["onload"]){obj.onload=onload};
		return obj
	},
	getAll:function(){return this.get(true)},
	getOwn:function(){return this.get()},
	getNative:function(){
		var x=this.getAll();
		var y=this.getOwn();
		var z={};
		for(var i in x){if(y[i]===undefined){z[i]=x[i]}};
		return z
	},
	ieFix:function(){
		var allt="";
		var x=document.scripts;
		for (var i=0;i<x.length;i++){
			if (x[i].innerHTML){allt+=x[i].innerHTML}
			else {if((x[i].src+"").indexOf("undefined")<0){allt+=this.getsrc(x[i].src)}}
		};
		allt=allt.replace(/\W/g," ").split(" ");
		var obj={};
		for(var i=0;i<allt.length;i++){if(window[allt[i]]!==undefined){obj[allt[i]]=true}};
		for(var i in window){obj[i]=true};
		return obj
	},
	getsrc:function(x) {
		var httpRequest = new ActiveXObject('Msxml2.XMLHTTP');
		httpRequest.open('GET', x, false);
		httpRequest.send(null);
		return httpRequest.responseText;
	}
}
globalVars.init()