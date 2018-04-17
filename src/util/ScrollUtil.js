class ScrollUtil {

	constructor(scrollDom) {
		this.scrollDom=scrollDom; //滚动面板
	}

	scrollBottomInit() {
		this.scrollDom.scrollTop = this.scrollDom.scrollHeight;
	}
}

export default ScrollUtil;