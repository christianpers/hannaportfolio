export default class InfoContainer{

	constructor(el){

		this._el = el;

		this._content = [];
		var infoContents = this._el.querySelectorAll('.info-content');
		for (var i=0;i<infoContents.length;i++){
			var id = infoContents[i].getAttribute('data-id');
			this._content[id] = {showing: false, obj: null};
			this._content[id].obj = infoContents[i];
		}

		this.isShowing = false;
		this.currentId = undefined;
		this.hideTimer = null;
		
		
	}

	show(id){

		clearTimeout(this.hideTimer);
		this.showContainer();
		this.showContent(this._content[id]);
		this.currentId = id;

	}

	hide(){

		this.hideContainer();
		this.hideContent(this._content[this.currentId]);

		

	}

	showContent(obj){

		obj.obj.style.display = 'block';
		obj.showing = true;

		console.log('show: ',obj);
	}

	showContainer(){

		var scrollTop = getScrollTop();

		var winH = window.innerHeight;

		this._el.style.top = scrollTop - winH + 54 + 'px';

		this._el.style.display = 'block';

		document.body.style.overflow = 'hidden';

		setTimeout(()=>{

			this._el.style.transform = 'translate(0,'+winH+'px)';
			this.isShowing = true;
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

	hideContent(obj){

		obj.obj.style.display = 'none';
		obj.showing = false;

		console.log('hide: ',obj);

	}

	hideContainer(){

		this._el.style.transform = 'translate(0, 0)';

		this.hideTimer = setTimeout(()=>{
			this._el.style.display = 'none';

			document.body.style.overflow = 'visible';

			this.currentId = undefined;
			this.isShowing = false;

		},600);
	}

	onResize(h){

		this._el.style.height = h + 'px';
		
	}
}