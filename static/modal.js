'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dialog = function () {
    var instance;
    return function (options) {
        if (!instance) {
            instance = new Modal(options);
        }
        return instance;
    };
}();

var Modal = function () {
    function Modal(options) {
        _classCallCheck(this, Modal);

        //默认属性
        this.initOptions = {
            title: '标题',
            maskClosable: true,
            header: true,
            footer: true,
            closable: true,
            okText: '确 定',
            cancelText: '取 消',
            destroyOnClose: false,
            keyboard: true,
            zIndex: 1000,
            width: 500 + 'px',
            afterClose: null
        };
        this.options = Object.assign({}, this.initOptions, options);

        this.instance = document.createElement('div'); //节点实例，因为只需要一个模态框，这里设置节点就可以了
        this.mounted = false; //是否挂载在节点上
    }

    //处理模态框的点击事件


    _createClass(Modal, [{
        key: '_modalClick',
        value: function _modalClick(e) {
            var className = e.target.className;
            //匹配类名，例如 带有 class='modal-close' 的元素点击可以关闭模态框
            if (new RegExp("(\\s|^)modal-close(\\s|$)").test(className)) {
                this.cancel(); //关闭模态框
            } else if (new RegExp("(\\s|^)modal-onOk(\\s|$)").test(className)) {
                this.onOk(); //执行确定按钮的回调
            } else if (new RegExp("(\\s|^)modal-container(\\s|$)").test(className)) {
                this.outSideClick(); //模态框外的点击
            }
        }

        //处理键盘ESC关闭

    }, {
        key: '_escClose',
        value: function _escClose(e) {
            var code = e.keyCode;
            if (code === 27) {
                this.cancel();
            }
        }

        //渲染模态框节点

    }, {
        key: 'render',
        value: function render() {
            var modal = this.instance;
            modal.style.zIndex = this.options.zIndex;
            modal.className = 'modal-container';
            var closeIcon = this.options.closable ? '<span class="modal-close">×</span>' : '';
            var header = this.options.header ? this.options.header === true ? '<div class=\'modal-header\'>' + this.options.title + '\n                                    ' + closeIcon + '\n                                </div>' : this.options.header : '';
            var footer = this.options.footer ? this.options.footer === true ? '<div class=\'modal-footer\'>\n                                <span class="modal-btn modal-close">' + this.options.cancelText + '</span>\n                                <span class="modal-btn  modal-onOk modal-btn-primary">' + this.options.okText + '</span>\n                            </div>' : this.options.footer : '';
            modal.innerHTML = '<div class="modal" style="width: ' + this.options.width + '">\n' + header + '\n                                <div class=\'modal-content\'>' + this.options.content + '</div>\n                                ' + footer + '\n                            </div>';
        }

        //蒙层点击关闭

    }, {
        key: 'outSideClick',
        value: function outSideClick() {
            if (this.options.maskClosable) {
                this.close();
            }
        }

        //处理监听

    }, {
        key: 'listen',
        value: function listen() {
            this._modalClick = this._modalClick.bind(this);
            this.instance.addEventListener('click', this._modalClick);

            if (this.options.keyboard) {
                this._escClose = this._escClose.bind(this);
                window.addEventListener('keyup', this._escClose);
            }
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            if (typeof this.options.onCancel === "function") {
                this.options.onCancel();
            }
            this.close();
        }

        //点击确定回调

    }, {
        key: 'onOk',
        value: function onOk() {
            this.options.onOkFn();
            this.close();
        }

        /****************** 提供的方法  ********************* */
        //设置属性

    }, {
        key: 'set',
        value: function set(options) {
            Object.assign(this.options, options);
            this.render();
        }

        //打开模态框

    }, {
        key: 'open',
        value: function open() {
            document.body.style.overflowY = 'hidden';
            var modal = this.instance;
            //实例如果没挂载
            if (!this.mounted) {
                this.mounted = true;
                this.render();
                document.body.appendChild(modal);
                this.listen();
            }
            removeClass(modal, 'close');
            addClass(modal, 'open');
        }

        //关闭模态框

    }, {
        key: 'close',
        value: function close() {
            document.body.style.overflowY = '';
            var modal = this.instance;
            removeClass(modal, 'open');
            addClass(modal, 'close');
            if (this.options.destroyOnClose === true) {
                this.destroy();
            }
            if (typeof this.options.afterClose === "function") {
                var afterClose = this.options.afterClose.bind(this);
                setTimeout(afterClose, 0);
            }
        }
        //从节点上移除模态框

    }, {
        key: 'destroy',
        value: function destroy() {
            this.instance.removeEventListener('click', this._modalClick); //移除click监听
            window.removeEventListener('keyup', this._escClose); //移除keyup监听
            document.body.removeChild(this.instance); //移除模态框节点
            this.mounted = false;
        }
    }]);

    return Modal;
}();

function hasClass(elements, cName) {
    return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
};
function addClass(elements, cName) {
    if (!hasClass(elements, cName)) {
        elements.className += " " + cName;
    };
};
function removeClass(elements, cName) {
    if (hasClass(elements, cName)) {
        elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), "");
    };
};