export default class ViewProjectItem{

	constructor(parentEl, data){

		var el = document.createElement('div');
		el.classList.add('projectItem');

		var captionLayer = document.createElement('div');
		captionLayer.classList.add('itemCaption');

		var captionCopy = document.createElement('h5');
		captionCopy.innerHTML = data.caption;

		captionLayer.appendChild(captionCopy);

		var touchLayer = document.createElement('div');
		touchLayer.classList.add('touchLayer');

		el.appendChild(touchLayer);
		el.appendChild(captionLayer);

		parentEl.appendChild(el);

		this._el = el;

		var img = new Image();
		img.onload = () => {
			this._el.appendChild(img);
		}
		img.src = '../assets/projects/' + data.img + '.jpg';


		touchLayer.addEventListener('mouseover', () => {
			captionLayer.style.opacity = 1;
		});

		touchLayer.addEventListener('mouseout', () => {
			captionLayer.style.opacity = 0;
		});

	}

	onResize(x,y,w,h){

		this._el.style.left = x + 'px';
		this._el.style.top = y + 'px';
		this._el.style.width = w + 'px';
		this._el.style.height = h + 'px';


	}
}