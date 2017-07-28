$ = require('./jq.js');
var PieceImage = require('./pieceimage.js');
class FullImage {
	/* 
	_bodySize: {
		width	: 0,
		height	: 0
	},
	config = {
		backgroud: 'img/body_bg.jpg',
		containerSelector: '', // parent container css selector
	},
	pieceImageArr = [],
	
	*/
	constructor (srcArr, config = null) {
		this._srcArr = srcArr;
		this._config = config;
		this._initDom();
		this._initBaseData();
	}

	_initDom () {
		var container = 
			`<div class="container">
				<ul class="content"></ul>
			</div>`;
		this._domContainer  =	$(container);
		this._domContent 	=	$(container).find('.content');
		$(this._config.containerSelector).append(this._domContainer);
	}

	_initBaseData () {
		this._imgCount = srcArr.length;
		this._loadingFinishCount = 0;
		this._initData();
		this._getBodySize();
		this._timer = null;
		this._height_w = 0;
		this._width_w = 0;
		this._marginLeft = 0;
		this._marginTop = 0;
		this._marLs = 0;
		this._xyz = 0;
		this._turnOn = true;
	}

	_getBodySize () {
		this._bodySize.width  = parseInt($("body").css("height"));
		this._bodySize.height = parseInt($("body").css("width"));
	}

	s_initData () {
		var top = left = relTop = relLeft = 0;
		this.finish = 0;
		var that = this;
		for (var index = 0; index < this._srcArr.length; index ++) {
			this.pieceImageArr[index] = new PieceImage(imgUrlArr[i]);
			this.pieceImageArr[index].setImgPos(top, left);
			this.pieceImageArr[index].setImgRelPos(relTop, relLeft);
			// 向右移动
			left += 20;
			relLeft += 25;
			// 向下移动
			if((i + 1)%5 == 0) {
				left = relLeft = 0;
				top += 20;
				relTop += 25;
			}
			this.pieceImageArr[index].onloadImg(function() {
				that._loadingFinishCount ++;
				if (that._loadingFinishCount == that._imgCount) {
					that._setImage2FullDiv(that._srcArr[0], 600);
				}
			});
			// 绑定时间，点击集合
			this.pieceImageArr[index].bindClickEvent(function(){
				that._domContainer.stop(true);
				that._domContent.stop(true);
				clearTimeout(that._timer);
				if(parseInt(that._domContent.css("width"))!=800){
					var marginT=(that._height_w-500)/2;
					var marginL=(that._width_w-800)/2;
					
					$(".content li img").animate({"margin":"0px","width":"160px","height":"100px"}, 200, function (){
						that._domContent.animate({
						"width":"800px",
						"height":"500px",
						"margin-top":marginT+"px",
						"margin-left":marginL+"px"	
						
						},1000);

						that._domContainer.animate({"margin-left":-that._marginLeft-that._marLs+"px","margin-top":-xyz+"px"},1000,function (){
							that._domContent.css({"box-shadow":"2px 2px 6px -1px #111111"});
							$(".left").animate({"margin-left":"0px"},400);
							$(".right").animate({"margin-right":"0px"},400);	
						});
						that.rotate(false);
					});

					that._setImage2FullDiv(this._src,1000);
				}
				else{
					$(".left").animate({"margin-left":"-95px"},400);
					$(".right").animate({"margin-right":"-95px"},400);
					that._domContent.css("box-shadow","0px 0px 0px 0px #111111");
					that._domContent.animate({
						"width":that._width_w+"px",
						"height":that._height_w+"px",
						"margin-top":"0px",
						"margin-left":"0px"
					},600);
					that.rotate(true);
					that._timer = setTimeout(that._spreadForAll,600);
					$(that._domContent).find('li span a, li span strong').fadeOut(700);
					that._domContainer.animate({"margin-left":-that._marginLeft+"px","margin-top":-that._xyz+that._marginTop+"px"},600);
				}
			});
		}
	}

	_setImage2FullDiv (url, fadeDelay = 600) {
		var left = top = 0;
		for (var index = 0; index < this._srcArr.length; index ++) {
			left += 25;
			if((i + 1)%5 == 0) {
				left=0;
				top=top+25;
			}
			this.pieceImageArr[index].setPieceImage(url, fadeDelay);
		}
	}

	_spreadForAll () {
		$(this._domContainer).find('img').animate({"margin":"5px","width":"150px","height":"90px"},300);
	}

	_bindEvents () {
		var that = this;
		$(window).resize(function (){
			that._domContent.css("box-shadow","0px 0px 0px 0px #111111");
			that._domContent.stop(true);
			that._turnOn = false;
			that._getBodySize();
			that._domContainer.stop(true);
			that.CDispersion(0);
			that._timer = setTimeout(UlWH,300);
		});
	}

	runFullImage() {
		this._initBaseData();
		this._bindEvents();
	}

	GifNone(){
		this._getBodySize();
		$(".load").css("display","none");
		this.CDispersion(600);
	};

	CDispersion(s){
		var width    = parseInt(this._bodySize.width / 100 * 80);
		var height   = parseInt(this._bodySize.height / 100 * 80);
		var marginTop    = (height - ( height * 0.8 ) - 100) / 2;
		var marginT  = parseInt(height / 2);
			this._width_w  = width;
			this._height_w = height;
		var margin_1 = parseInt(width / 2);
		var margin_2 = parseInt(width - (width / 100 * 80 + 160));
		var margin_3 = parseInt(margin_2 / 2);
		this._marLs    = margin_3;
		var marginL  = margin_1 - margin_3;
		var marginLeft   = marginL;
		this._xyz = marginT;
		var that = this;
		

		$(".content li span a,.content li span strong").fadeOut(1000);
		this._domContainer.animate({
			"width":width+"px",
			"height":height+"px",
			"margin-top":-marginT+marginTop+"px",
			"margin-left":-marginL+"px"	
		},s,function (){
			if(that._turnOn){
				that._domContent.css({
					"width":width+"px",
					"height":height+"px"
				});
			};
		});
	}

	UlWH() {
		this._domContent.stop(true);
		this._domContainer.stop(true);
		clearTimeout(this._timer);
		this._width_w  = parseInt(DivObj.css("width"));
		this._height_w = parseInt(DivObj.css("height"));
		this.pieceImageArr.each(function() {
			this.rotate(true);
		});
		var that = this;

		this._domContent.animate({

			"width": that._width_w+"px",
			"height": that._height_w+"px",	
			"margin-top":"0px",
			"margin-left":"0px"
		},800,function (){
			that._spreadForAll();	
		});	
	}
}