$ = require('./jq.js');
class PieceImage {
	/*
	_src = '';		 // 图片源
	_imgPos = {	    // 图片位置
		top	: 0,
		left: 0
	};
	_imgRelPos = {	// 图片相对位置
		top	: 0,
		left: 0
	};
	*/
	constructor (src) {
		this._src = src;
		this._initDom();
	}
	_initDom () {
		var domLi = 
			`<li>
				<span>
					<a></a>
					<strong></strong>
					<img src="">
				</span>
			</li>`;
		this._domLi 	= 	$(domLi);
		this._domA  	= 	$(domLi).find('li a');
		this._domImg   	=	$(domLi).find('li img');
		this._domStrong =	$(domLi).find('li strong');
	}
	/* set方法 */
	setImgPos (top, left) {
		this._imgPos.top	 = top;
		this._imgPos.left = left; 
	}
	setImgRelPos (top, left) {
		this._imgRelPos.top  = top;
		this._imgRelPos.left = left;
	}
	appenImage2Node(parentNode) {
		$(parentNode).append(this._domLi);
	}
	/* get方法 */
	getImgPosTop () {
		return this._imgPos.top;
	}
	getImgPosLeft () {
		return this._imgPos.left;
	}
	getImgRelPosTop () {
		return this._imgRelPos.top;
	}
	getImgRelPosLeft () {
		return this._imgRelPos.left;
	}
	/* getSymbol */
	_getSymbol(type) {
		let symbol = '';
		switch (type) {
			case 'percent':
				symbol = '%';
				break;
			case 'pixel':
				symbol = 'px';
				break;
			default:
				symbol = '%';
		}
		return symbol;
	}
	/* get image css */
	getImgPosCss(type = 'percent') {
		let symbol = this._getSymbol(type);
		return {top: `${this._imgPos.top}+ ${symbol}`, left: `${this._imgPos.top}+ ${symbol}`};
	}
	getImgRelPosCss(type = 'percent') {
		let symbol = this._getSymbol(type);
		return `url(${this._src}) ${this._imgRelPos.left}% ${this._imgRelPos.top}%`;
	}
}
