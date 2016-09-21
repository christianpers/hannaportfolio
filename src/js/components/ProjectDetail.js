export default class ProjectDetail{

	constructor(el){

		this._el = el;

		this._closeBtn = this._el.querySelector('.close-arrow');

		this._closeBtn.addEventListener('click', () => {
			this.close();
		});

		this.currProjCopy = undefined;
	
	}

	open(projData){

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