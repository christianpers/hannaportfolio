export default class ViewOverlay{

	constructor(el, onHideCallback, callbackScope) {

		this._el = el;

		this.dataId = this._el.getAttribute('data-id');

		this._el.style.transform = 'scale(.93)';

		this.onHideCallback = onHideCallback;
		this.callbackScope = callbackScope;

	
		var touchLayer = this._el.querySelector('.touchLayer');
		touchLayer.addEventListener('click', () => {
			this._hide();
			this.onHideCallback.call(this.callbackScope);
		});

		this.showing = false;
		// this.onResize(window.innerWidth, window.innerHeight);

	}

	toggle(){

		if (this.showing)
			this._hide();
		else
			this._show();
	}

	_show(){

		// this._el.style.transform = 'translate3d(0,100%,0)';
		this._el.style.display = 'block';
		
		var self = this;
		setTimeout(function(){
			self._el.style.opacity = 1;
			self._el.style.transform = 'scale(1.0)';
		},100);
		
		this.showing = true;
	}

	_hide(){

		// this._el.style.transform = 'translate3d(0, -100%,0)';
		this._el.style.opacity = 0;
		this._el.style.transform = 'scale(.93)';
		
		setTimeout(() => {
			this._el.style.display = 'none';

		},1000);
		this.showing = false;

	}

	

	update(){





	}

	render(){


	}

	onResize(w,h){

		

	}
	
}
