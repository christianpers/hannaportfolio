import Scene from "./framework/Scene";
// import ViewCopy from "./views/ViewCopy";
// import ViewPoints from "./views/ViewPoints";
// import ViewImages from "./views/ViewImages";
// import ViewIntroOverlay from "./views/ViewIntroOverlay";
// import ViewAbout from "./views/ViewAbout";
// import ViewProjects from "./views/ViewProjects";
// import ViewContact from "./views/ViewContact";

import TopContainer from "./components/TopContainer";
import ProjectsContainer from "./components/ProjectsContainer";
import ProjectDetail from "./components/ProjectDetail";
import InfoContainer from "./components/InfoContainer";

// import MouseInteractor from "./framework/MouseInteractor";
// import KeyboardInteractor from "./framework/KeyboardInteractor";
import SceneTransforms from "./framework/SceneTransforms";
// import Framebuffer from "./framework/Framebuffer";
// import Texture from "./framework/Texture";
import ImageLoader from "./framework/ImageLoader";
// import TextureCreator from "./framework/TextureCreator";

var grad3 = [[0,1,1],[0,1,-1],[0,-1,1],[0,-1,-1],
                   [1,0,1],[1,0,-1],[-1,0,1],[-1,0,-1],
                   [1,1,0],[1,-1,0],[-1,1,0],[-1,-1,0], // 12 cube edges
                   [1,0,-1],[-1,0,-1],[0,-1,1],[0,1,1]]; // 4 more to make 16

var perm = [151,160,137,91,90,15,
  131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
  190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
  88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
  77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
  102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
  135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
  5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
  223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
  129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
  251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
  49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
  138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];

var simplex4 = [
  [0,64,128,192],[0,64,192,128],[0,0,0,0],[0,128,192,64],
  [0,0,0,0],[0,0,0,0],[0,0,0,0],[64,128,192,0],
  [0,128,64,192],[0,0,0,0],[0,192,64,128],[0,192,128,64],
  [0,0,0,0],[0,0,0,0],[0,0,0,0],[64,192,128,0],
  [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
  [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
  [64,128,0,192],[0,0,0,0],[64,192,0,128],[0,0,0,0],
  [0,0,0,0],[0,0,0,0],[128,192,0,64],[128,192,64,0],
  [64,0,128,192],[64,0,192,128],[0,0,0,0],[0,0,0,0],
  [0,0,0,0],[128,0,192,64],[0,0,0,0],[128,64,192,0],
  [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
  [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],
  [128,0,64,192],[0,0,0,0],[0,0,0,0],[0,0,0,0],
  [192,0,64,128],[192,0,128,64],[0,0,0,0],[192,64,128,0],
  [128,64,0,192],[0,0,0,0],[0,0,0,0],[0,0,0,0],
  [192,64,0,128],[0,0,0,0],[192,128,0,64],[192,128,64,0]
];

var images = ['image_1', 'image_2', 'image_3'];
var projectImages = [
			{img:'project_1', 'caption':"Lorem ipsum project 1"},
			{img:'project_2', 'caption':"Lorem ipsum project 2"},
			{img:'project_3', 'caption':"Lorem ipsum project 3"},
			{img:'project_4', 'caption':"Lorem ipsum project 4"}
		];

export default class SceneMain extends Scene {
	constructor(container) {

		super();
		this.container = container;
		
		window.addEventListener('resize', () => {
			this.onResize();
		});

		this._hasSaved = false;
		this.doRender = false;
	
		// this.orthoTransforms = new SceneTransforms(this.canvas);

		// var cue = [
		// 	{
		// 		id: "logoTexture",
		// 		src: "../assets/logoTexture_2.png"
		// 	}
		// ];
		// this.imageLoader = new ImageLoader(cue, this.onTexturesLoaded, this);
		// this.loadedImages = [];

		// this.textureCreator = new TextureCreator();

		this.currentShowingOverlay = null;

		// this.topContainer = document.getElementById('top-container');
		// this.projectsContainer = document.getElementById('projects-container');


		this.init();

	}

	init(){


		this.topContainer = new TopContainer(document.getElementById('top-container'));
		this.projectsContainer = new ProjectsContainer(document.getElementById('projects-container'), this.onProjectClick, this);
		this.projDetail = new ProjectDetail(document.getElementById('detail-container'));
		this.infoContainer = new InfoContainer(document.getElementById('info-container'));

		// this.initTextures();
		// this.initViews();
		// this.createNoiseTexture();

		var navItems = document.querySelectorAll('.nav-item');
		for (var i=0;i<navItems.length;i++){
			navItems[i].addEventListener('click', this.onNavClick.bind(this));
		}

		this.onResize();

		window.scrollTo(0, 0);
		this.onScroll();
		
		window.addEventListener('scroll', (e) => {
			this.onScroll(e);
		});

		this.doRender = false;
		// this.container.style.opacity = 1;
		
	}

	onOverlayHide(){

		document.body.style.overflow = 'visible';

		this._vImages.show();
	}

	imagesLoaded(){

		window.scrollTo(0, 0);
		this.onScroll();
		
		window.addEventListener('scroll', (e) => {
			this.onScroll(e);
		});
	}

	// onTexturesLoaded(images){

	// 	this.loadedImages = images;

	// 	this.init();

	// }

	onNavClick(e){

		var type = e.target.getAttribute('data-id');


		if (this.infoContainer.isShowing)
			this.infoContainer.hide();

		if (type == this.infoContainer.currentId)
			return;

		if (this.infoContainer.isShowing){
			setTimeout(()=>{
				this.infoContainer.show(type);
			},610);
		}else
			this.infoContainer.show(type);

		// debugger;

		// if (this._overlays[e.target.getAttribute('data-id')].showing) return;

		// if (!this._vImages.isHidden){
		// 	document.body.style.overflow = 'hidden';

		// 	this._vImages.hide();
		// }
		
		// for (var overlay in this._overlays){
		// 	this._overlays[overlay]._hide();
		// }
		
		// setTimeout(() => {

		// 	this._overlays[e.target.getAttribute('data-id')]._show();
		// },1000);
		

	}

	onProjectClick(projData){

		// console.log(projData);

		this.openProjectDetail(projData);
	}

	onProjectDetailClick(){

		this.closeProjectDetail();
	}

	openProjectDetail(projData){

		this.projDetail.open(projData);
	}

	closeProjectDetail(){

		this.projDetail.close();

	}

	onScroll(e) {

		var scrollTop = getScrollTop();

		var h = window.innerHeight;

		this.projectsContainer.onScroll(scrollTop, h);

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

	update() {

		super.update();
		// if (this._vImages)
		// 	this._vImages.update();
	}

	render() {

		if (!this.doRender) return;

		this.orthoTransforms.setCamera(this.orthoCamera);

		this.gl.viewport(0, 0, this._fboPoints.width, this._fboPoints.height);

		this._fboPoints.bind();
		this.gl.clearColor( 1.0, 1.0, 1.0, 1 );
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		this._vPoints.render(this._permTexture, this._simplexTexture);
	
		this._fboPoints.unbind();

		
		this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);

		this.gl.clearColor( 1.0, 1.0, 1.0, 1 );
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		this._vCopy.render(this._fboPoints.getTexture());

		// this._vLogo.render(this._logoTexture, this._fboPoints.getTexture());
	}

	onResize() {

		var w = window.innerWidth;
		var h = window.innerHeight;

		// this.gl.viewportWidth = w;
		// this.gl.viewportHeight = h;

		// this.canvas.width = w;
		// this.canvas.height = h;

		// this.canvas.style.height = h + 'px';
		// this.canvas.style.width = w + 'px';

		var navHeight = 54;

		this.topContainer.onResize(w,h,navHeight);
		this.projectsContainer.onResize(w,h,navHeight);


		var projectHeight = this.projectsContainer.getCurrHeight();
		document.body.style.height = h - navHeight + projectHeight + 'px';

		this.projDetail.onResize(h);
		this.infoContainer.onResize(h);
		
		// this._vImages.onResize(w, h);
		// for (var overlay in this._overlays)
		// 	this._overlays[overlay].onResize(w,h);

	}
}