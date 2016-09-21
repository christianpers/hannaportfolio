import ViewOverlay from './ViewOverlay';
import ViewProjectItem from './ViewProjectItem';

export default class ViewProjects extends ViewOverlay{

	constructor(el, onHideCallback, callbackScope, projectsData){

		super(el, onHideCallback, callbackScope);

		

		this.projectsContainer = this._el.querySelector('.projectsContainer');

		this.ITEMS_PER_ROW = 3;
		this.ITEMS_PER_ROW_MOBILE = 1;
		this.MOBILE_BREAK = 500;
		this.MARGIN = 10;

		this.items = [];
		for (var projectData of projectsData){
			var item = new ViewProjectItem(this.projectsContainer, projectData);
			this.items.push(item);
		}

	}

	onResize(w,h){

		var containerW = w * .8;
		this.projectsContainer.style.width = containerW + 'px';

		var itemsPerRow = this.ITEMS_PER_ROW;

		var itemW = Math.floor(containerW / itemsPerRow);

		var currentX = 0;
		var currentY = 0;
		var idx = 1;

		for (var item of this.items){
			item.onResize(currentX, currentY, itemW, 300);
			if (idx % itemsPerRow == 0){
				if (idx > 0){
					currentY += 300 + this.MARGIN;
				}
				currentX = 0;
			}else{
				currentX += itemW + this.MARGIN;
			}

			idx++;
		}
	}
}