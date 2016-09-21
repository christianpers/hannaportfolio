export default class ProjectThumb{

	constructor(parentEl, data, callback, callbackScope){

		this._parentEl = parentEl;

		this._el = document.createElement('div');
		this._el.className = 'project-thumb';
		this._parentEl.appendChild(this._el);
		this._el.style.backgroundImage = 'url(../assets/'+data.thumb+')';
		this._el.style.backgroundSize = 'cover';
		this._el.style.backgroundPosition = 'center center';

		this._infoEl = document.createElement('div');
		this._infoEl.className = 'thumb-info';

		this._titleEl = document.createElement('h2');
		this._titleEl.className = 'thumb-title';
		this._titleEl.innerHTML = data.title;
		this._infoEl.appendChild(this._titleEl);
		this._el.appendChild(this._infoEl);

		this._touchEl = document.createElement('div');
		this._touchEl.className = 'touch-layer';
		this._el.appendChild(this._touchEl);

		this._touchEl.addEventListener('mouseover', () => {
			this._infoEl.style.opacity = 1;
		});

		this._touchEl.addEventListener('mouseleave', () => {
			this._infoEl.style.opacity = 0;
		});

		this._touchEl.addEventListener('click', () => {
			callback.call(callbackScope, data);
		});

		
	}

	onResize(x,y,w,h){

		this._el.style.left = x + 'px';
		this._el.style.top = y + 'px';
		this._el.style.width = w + 'px';
		this._el.style.height = h + 'px';
		
	}
}