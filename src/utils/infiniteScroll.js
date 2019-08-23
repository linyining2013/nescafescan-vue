import _ from "lodash";

const defaults = {
    throttle: 400,
    offset: 100,
    el: window
};

function InfiniteScroll(fn, options) {
    this.options = _.extend({}, defaults, options);
    this.cb = _.throttle(this.detectCallBack(fn), this.options.throttle);
    this.el = this.options.el;
    this.isWindow = this.el === window;
    this.elementHeight = this.getElementHeight();
    this.bind();
}

_.extend(InfiniteScroll.prototype, {
    bind() {
        this.el.addEventListener('scroll', this.cb);
    },
    destroy() {
        this.el.removeEventListener('scroll', this.cb);
    },
    pause() {
        this.isPause = true;
    },
    restart() {
        this.isPause = false;
    },
    detectCallBack(fn) {
        let isWindow = this.el === window;
        return () => {
            if (this.isPause) return;
            let maxHeight = this.getMaxHeight();
            let curHeight = this.getScrollY();
            if (maxHeight - curHeight < this.options.offset) { //maxHeight != curHeight && 
                fn();
            }
        };
    },
    getScrollY() {
        let offsetY = this.isWindow ? window.pageYOffset : this.el.scrollTop;
        return offsetY + this.elementHeight;
    },
    getMaxHeight() {
        return this.isWindow ? document.body.scrollHeight : this.el.scrollHeight;
    },
    getElementHeight() {
        if (this.isWindow) {
            return window.innerHeight;
        } else {
            return this.el.offsetHeight;
        }
    }
});


export default InfiniteScroll;