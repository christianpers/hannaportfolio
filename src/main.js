'use strict';
require("./scss/main.scss");
import SceneMain from "./js/SceneMain";

class Starter {
	constructor() {
		// let canvas = document.createElement("canvas");
		// canvas.width = window.innerWidth;
		// canvas.height = window.innerHeight;
		// canvas.className = "Main-Canvas";
		// canvas.id = 'gl';
		// var container = document.body.querySelector('.container-bg')
		// container.appendChild(canvas);
		
		// window.NS = {};
		// window.NS.GL = {};
		// window.NS.GL.params = {};
		// window.NS.GL.params.detail = 32;

		
		// this.sceneMain = new SceneMain(container);
		

		function transformProp() {
		  var testEl = document.createElement('div');
		  if(testEl.style.transform == null) {
		    var vendors = ['Webkit', 'Moz', 'ms'];
		    for(var vendor in vendors) {
		      if(testEl.style[ vendors[vendor] + 'Transform' ] !== undefined) {
		        return vendors[vendor] + 'Transform';
		      }
		    }
		  }
		  return 'transform';
		};
		
		window.NS = {};
		window.NS.transform = transformProp();

		this.sceneMain = new SceneMain();

		// this.reqFrame();

	}

	reqFrame() {

		requestAnimationFrame(() => {
			this.reqFrame();
		});

		this.sceneMain.loop();
	}

};

if(document.body) new Starter();
else {
	window.addEventListener("load", new Starter());
}






