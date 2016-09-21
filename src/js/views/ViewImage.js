export default class ViewImage{

	constructor(el, idx) {

		this._el = el;
		this._idx = idx;

	}

	update(normalized){

		// console.log(normalized);

		// normalized += .5;



		// var opacity = normalized;
		// if (normalized > 1)
		// 	opacity = normalized - 1.5;
		// normalized = Math.round(normalized * 10)/10;
		var opacity = Math.pow(normalized, 8);
		var scale = Math.pow(normalized, 3) * 1.3;


		// if (normalized >= 1.3 && normalized <= 2){
		// 	opacity = 2 - normalized;
		// 	// console.log('within');
		// }else if (normalized > 2)
		// 	opacity = 0;
		
		// // console.log(normalized, opacity);

		this._el.style.transform = 'scale('+scale+')';

		this._el.style.opacity = opacity;

		// console.log('opacity: ',opacity, ' idx: ',this._idx);

	}

	onResize(w,h){

		this._el.style.marginLeft = - (this._el.width / 2) + 'px';
	}
	
}
