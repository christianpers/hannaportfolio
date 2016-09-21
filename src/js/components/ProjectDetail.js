import ViewSlider from "./ViewSlider";

export default class ProjectDetail{

	constructor(el){

		this._el = el;

		this._closeBtn = this._el.querySelector('.close-arrow');

		this._closeBtn.addEventListener('click', () => {
			this.close();
		});

		this.currProjCopy = undefined;

		
		
	
	}

	sliderLoaded(){


	}

	open(projData){

		var sliderWrapper = document.createElement('div');
		sliderWrapper.className = 'projectSlider';
		this._el.appendChild(sliderWrapper);
		this._slider = new ViewSlider(sliderWrapper, projData.detail, this.sliderLoaded, this);

		this.currProjCopy = this._el.querySelector('.'+projData.detail.copy);

		this.currProjCopy.style.display = 'block';
		this._closeBtn.style.opacity = 1;

		var scrollTop = getScrollTop();

		var winH = window.innerHeight;

		this._el.style.top = winH + scrollTop + 54 + 'px';

		this._el.style.display = 'block';

		document.body.style.overflow = 'hidden';

		setTimeout(()=>{

			this._el.style.transform = 'translate(0, -'+winH+'px)';

			this._slider.show(0);
		},20);

		
		

		function getScrollTop(){

			var ret = document.body.scrollTop;
 
			if (ret == 0)
			{
			    if (window.pageYOffset)
			        ret = window.pageYOffset;
			    else
			        ret = (document.body.parentElement) ? document.body.parentElement.scrollTop : 0;
			}

			return ret;
		}
	}

	close(){

		this._el.style.transform = 'translate(0, 0)';

		var sliderWrapper = this._el.querySelector('.projectSlider');
		if (sliderWrapper)
			this._el.removeChild(sliderWrapper);

		this._slider = null;

		setTimeout(()=>{
			this._el.style.display = 'none';

			document.body.style.overflow = 'visible';

			if (this.currProjCopy)
				this.currProjCopy.style.display = 'none';
		},600);
		
	}

	onResize(h){

		this.close();
		this._el.style.height = h + 'px';

	}
}