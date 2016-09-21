import ProjectThumb from "../components/ProjectThumb";

export default class ProjectsContainer{

	constructor(el, callback, callbackScope){

		this._el = el;

		this.callback = callback;
		this.callbackScope = callbackScope;

		this.currentY = undefined;

		this.nrProjects = undefined;

		this.layout = {
			1200 : {
				"cols": 3,
				"height": 230,
				"marginTop": 50
			},
			800 : {
				"cols" : 3,
				"height": 200,
				"marginTop": 50
			},
			400 : {
				"cols" : 1,
				"height": 300,
				"marginTop": 50
			}
		}

		this.projectData = {
			"One" : {
				"thumb" : "1.jpg",
				"title" : "Electroknit",
				"detail" : {
					"copy" : "proj-one",
					"pics" : ['1.jpg','2.jpg']
				}
			},
			"Two" : {
				"thumb" : "2.jpg",
				"title" : "iamiwhoami",
				"detail" : {
					"copy" : "proj-two",
					"pics" : ['1.jpg','2.jpg']
				}
			},
			"Three" : {
				"thumb" : "3.jpg",
				"title" : "Thompson",
				"detail" : {
					"copy" : "proj-three",
					"pics" : ['1.jpg','2.jpg']
				}
			},
			"Four" : {
				"thumb" : "4.jpg",
				"title" : "Thompson",
				"detail" : {
					"copy" : "proj-four",
					"pics" : ['1.jpg','2.jpg']
				}
			},
			"Five" : {
				"thumb" : "5.jpg",
				"title" : "Woman Defined",
				"detail" : {
					"copy" : "proj-five",
					"pics" : ['1.jpg','2.jpg']
				}
			},
			"Six" : {
				"thumb" : "6.jpg",
				"title" : "Yarn",
				"detail" : {
					"copy" : "proj-six",
					"pics" : ['1.jpg','2.jpg']
				}
			},
			"Seven" : {
				"thumb" : "7.jpg",
				"title" : "Thompson",
				"detail" : {
					"copy" : "proj-seven",
					"pics" : ['1.jpg','2.jpg']
				}
			},
			"Eight" : {
				"thumb" : "8.jpg",
				"title" : "Woman Defined",
				"detail" : {
					"copy" : "proj-eight",
					"pics" : ['1.jpg','2.jpg']
				}
			},
			"Nine" : {
				"thumb" : "9.jpg",
				"title" : "Yarn",
				"detail" : {
					"copy" : "proj-nine",
					"pics" : ['1.jpg','2.jpg']
				}
			}
		};

		this.projects = [];
		for (var project in this.projectData){
			var proj = new ProjectThumb(this._el, this.projectData[project], this.onProjectClick, this);
			this.projects.push(proj);
		}
	}

	onProjectClick(projData){

		this.callback.call(this.callbackScope, projData);
	}

	

	onScroll(scrollPos, winH){

		// var y = winH - scrollPos;

		// console.log(this.currentY - scrollPos);



		this._el.style.top = this.currentY - scrollPos + 'px';
	}

	onResize(w,h,navHeight){

		this.currentY = h - navHeight + 4;

		

		this.currLayout = undefined;


	
		for (var layoutW in this.layout){
			if (w > layoutW)
				this.currLayout = this.layout[layoutW];
			
		}

		var gridW = w * .9;

		var nrCols = this.currLayout.cols;
		var height = this.currLayout.height;
		var marginLeft = 0;
		var marginTop = 0;
		var initMarginTop = this.currLayout.marginTop;
		var itemW = (gridW - (marginLeft * (nrCols-1))) / nrCols;
		var itemH = height;

		var currRow = 0;
		var currCol = 0;
		for (var i=0;i<this.projects.length;i++){
			var x = (currCol * itemW + marginLeft) + (.05 * w);
			var y = currRow * height + marginTop + initMarginTop;
			this.projects[i].onResize(x,y,itemW, itemH);

			currCol++;
			if (currCol == nrCols){
				currCol = 0;
				currRow++;
			}

			
		}

		this._el.style.top = h + 'px';
		var elH = this.getCurrHeight();
		this._el.style.height = elH + 'px';

	}



	getCurrHeight() {
		var nrCols = this.currLayout.cols;
		var currRow = 0;
		var currCol = 0;
		var height = this.currLayout.height;
		var marginTop = 0;
		var initMarginTop = this.currLayout.marginTop;
		for (var i=0;i<this.projects.length;i++){
			var y = currRow * height + marginTop + initMarginTop;
		
			currCol++;
			if (currCol == nrCols){
				currCol = 0;
				currRow++;
			}
		}

		var elH = y + height + initMarginTop;
		var winH = window.innerHeight;
		if (elH > winH)
			return elH;
		else
			return winH;

	}
}