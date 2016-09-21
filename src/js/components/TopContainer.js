export default class TopContainer{

	constructor(el){

		this._el = el;

		this._imgs = [];
		var img1 = document.createElement('img');
		img1.src = '../assets/3.jpg';
		img1.className = 'topImg';
		this._imgs.push(img1);
		this._el.appendChild(img1);

		var img2 = document.createElement('img');
		img2.src = '../assets/2.jpg';
		img2.className = 'topImg';
		this._imgs.push(img2);
		this._el.appendChild(img2);
		// img2.style.opacity = 1;

		var img3 = document.createElement('img');
		img3.src = '../assets/5.jpg';
		img3.className = 'topImg';
		this._imgs.push(img3);
		this._el.appendChild(img3);

		this._el.addEventListener('mousemove', (e)=> {
			this.onMouseMove(e);
		});

		this.nrImgs = this._imgs.length;

		this.lastNormalized = .0;
		this.lastIdx = -1;

		
		// this._el.style.backgroundImage = 'url(../assets/projects/Thompson2/christian_thompson_gods_and_kings.jpeg)';
		// this._el.style.backgroundSize = 'cover';
		// this._el.style.backgroundRepeat = 'no-repeat';
		// this._el.style.backgroundPosition = 'center center';
	}

	onMouseMove(e){

		var winW = window.innerWidth;


		var normalized = e.pageX / winW;
		
		var threshold = 1.0 / this.nrImgs;

		var idx = Math.floor(normalized/threshold);

		// var midVal = threshold / 2 + idx * threshold;
		// var midVal = 

		// var normalizedIdx = (e.pageX - (winW / this.nrImgs)) / (winW / this.nrImgs);
		var val = Math.abs(Math.abs(((normalized - threshold * idx) / threshold) - .5) * 2 - 1);
		
		// var val = (normalized - midVal)/midVal;

		this._imgs[idx].style.opacity = val;

	}



	onResize(w,h,navHeight){

		this._el.style.top = navHeight + 'px';
		this._el.style.height = h - navHeight + 'px';
		
	}
}