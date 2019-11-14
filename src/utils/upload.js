import $ from '@/utils/jquery.min.js';
import _ from "lodash";
var UploadPhoto;
(function($) {
    /**
     * 实例代码
     * @param  {String} $btn 	[按钮的Jquery对象]
     * @param  {Object} config    [配置]
     */
     uploadPhoto = function(config) {
        this.config = $.extend({}, this.setting, config);
        /** 判断是否已引入所需要的 */
        if (!Qiniu) throw "Din't find Qiniu,include it!";
        this.init();
        this.fetchToken();
    };

     _.extend(uploadPhoto.prototype, {
            /**
             * 初始化
             * @return {[type]} [description]
             */
            init: function() {
                this.result = {};
                this.value = "";
                this.tmp = {};
                this.$browseButton = $('#' + this.config.browse_button);
                this.config.container = this.$browseButton.parent('div').attr('id') || "SuperUploadPhoto" + Math.round(Math.random() * 1000);
                this.$browseButton.parent('div').attr('id', this.config.container)
            },
            fetchToken: function() {
                var _self = this;

                /** 获取token回调成功函数 */
                // var _success = function(responseText, status) {
                // 	var res = getDataFromJson(responseText);
                // 	var domainStr = res.domainStr;
                // 	window.$$SuperQiniuDomain = domainStr;
                // 	/** 创建上传控件 */
                // 	_self.uploader = _self.createUploader(domainStr);
                // }

                /** [请求七牛Token] */
                if (window.$$SuperQiniuDomain) {
                    _self.uploader = _self.createUploader(window.$$SuperQiniuDomain);
                } else {
                    $.ajax({
                        // url: Super.action.get("getQiuniuInfo"),
                        url: Super.action.get("getQiuniuInfo"),
                        method: 'get',
                        success: function(data) {
                            var datainfo = data;
                            // console.log(datainfo)
                            $.ajax({
                                url: Super.action.get("getQiuniuToken"),
                                method: 'get',
                                success: function(data) {
                                    // console.log(data)
                                    var domainStr = datainfo.domainStr;
                                    var upload_token = data.uptoken;
                                    window.$$SuperQiniuDomain = domainStr;
                                    /** 创建上传控件 */
                                    _self.uploader = _self.createUploader(domainStr, upload_token);
                                }
                            });
                        }
                    });

                    // $.ajax({
                    // 	url: Super.action.get("getQiuniuToken"),
                    // 	type: 'GET',
                    // 	// jsonpCallback: 'CallBack',
                    // 	dataType: 'JSONP', //here
                    // 	success: function(data) {
                    // 		var domainStr = data.data.qiniu_domain;
                    // 		var upload_token = data.data.upload_token;
                    // 		window.$$SuperQiniuDomain = domainStr;
                    // 		/** 创建上传控件 */
                    // 		// console.log(domainStr)
                    // 		// console.log(upload_token)


                    // 		_self.uploader = _self.createUploader(domainStr, upload_token);

                    // 	},
                    // 	error: function(XMLHttpRequest, data, obj) {}
                    // });
                }
            },
            createUploader: function(domain, token) {
                var _self = this,
                    _uploadEvent = _self.config.uploadEvent;
                uploader = Qiniu.uploader({
                    runtimes: 'html5,flash,html4',
                    //Upload model, degradation in turn
                    browse_button: _self.config.browse_button,
                    //ID of upload file Btn，**necessary**
                    container: _self.config.container,
                    //ID of upload area,the default is browser_button parent element,
                    // drop_element: 'club-upload-photo',
                    //ID of Drag upload area，Drag files or folders can be triggered after upload
                    //max_retries: 3, 
                    //maximum retries of upload failed
                    // flash_swf_url: $$ClubData.staticsPre + 'statics/js/common/plupload/Moxie.swf',
                    flash_swf_url: 'statics/js/common/plupload/Moxie.swf',
                    //Introducing the flash, relative path
                    dragdrop: true, //Open upload can be Drag
                    chunk_size: '4mb',
                    // uptoken_url: $$ClubData.webPathPre + $$ClubData.interface.getQiNiuToken,
                    // uptoken_url: $$ProjectData.action.get("getQiuniuToken"),
                    uptoken: token,
                    domain: domain,
                    unique_names: (!_self.config.unique_names ? _self.config.unique_names : true),
                    auto_start: true,
                    filters: {
                        // Maximum file size
                        max_file_size: _self.config.max_file_size || '2mb',
                        // Specify what files to browse for
                        mime_types: [{
                            title: "Image files",
                            extensions: "jpeg,jpg,JPG,JPEG,BMP,bmp,PNG,png,gif,GIF"
                        }]
                    },
                    init: {
                        'init': function() {
                            _uploadEvent.init && _uploadEvent.init.call(this);
                        },
                        'FilesAdded': function(up, files) {
                            // _self.tmp.uFileId = files[0].id;
                            // var type = files[0].type.split('/')[1];
                            // var name = files[0].name;
                            // var size = (files[0].size / 1024 / 1024).toFixed(2);
                            // if (_self.imageName != null) {

                            // } else {
                            // 	_self.imageName = name;
                            // }
                            _uploadEvent.filesAdded && _uploadEvent.filesAdded.call(this, up, files);
                        },
                        'BeforeUpload': function(up, file) {
                            _uploadEvent.beforeUpload && _uploadEvent.beforeUpload.call(this, up, file);
                        },
                        'UploadProgress': function(up, file) {
                            _uploadEvent.uploadProgress && _uploadEvent.uploadProgress.call(this, up, file);
                        },
                        'UploadComplete': function() {

                            _uploadEvent.uploadComplete && _uploadEvent.uploadComplete.call(this);
                        },
                        'FileUploaded': function(up, file, info) {
                            // if (_self.tmp.uFileId !== file.id) {
                            // 	return;
                            // }
                            //After the success of the each file upload, handle the relevant things
                            var retJson = Super.getDataFromJson(info.response);

                            var key = retJson.key;
                            //Image name

                            var imgUrl = domain + '/' + encodeURI(retJson.key);
                            //Image path
                            _self.result.origin = imgUrl;
                            //var imageInfo = Qiniu.imageInfo(retJson.key); 
                            //Image width\height But incompatible IE8

                            var img = new Image();
                            img.src = imgUrl;
                            _self.image = img;

                            // var imgLen = $('#upload-stop-pic-wrap img').length;
                            // if (typeof(_self.config.success) === "function") {
                            // 	_self.config.success.call(_self, {
                            // 		value: imgUrl
                            // 	});
                            // }
                            // /** 当选择了需要裁剪的将会初始化裁切框,否则直接返回数据. */
                            // if (imgLen == 9) {
                            // 	$('#upload-stop-pic').hide();
                            // 	return;
                            // }

                            img.onerror = function() {
                                Super.error('图片上次失败，请重试！');
                            };
                            img.onload = function() {
                                //Create an object of image to trigger images load after the completion of the event
                                var imgHeight = img.height,
                                    imgWidth = img.width;

                                if (typeof(_self.config.success) === "function") {
                                    _self.config.success.call(_self, {
                                        url: imgUrl,
                                        width: img.width,
                                        height: img.height,
                                    });
                                }
                            }

                            _uploadEvent.fileUploaded && _uploadEvent.fileUploaded.call(this, up, file, info);
                        },
                        'Error': function(up, err, errTip) {
                            //上传出错时,处理相关的事情
                            if (err.message == 'File size error.') {
                                Super.error('图片最大只能上传 2MB 哦~');
                            } else if (err.message == 'File extension error.') {
                                Super.error('图片格式只支持支持JPG, JPEG, BMP, PNG哦~');
                            } else {
                                Super.error(errTip);
                            }
                            _uploadEvent.error && _uploadEvent.error.call(this, up, err, errTip);
                        },
                        'Key': function(up, file) {
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在unique_names: false，save_key: false时才生效
                            var key = window.$$phtotName;
                            // do something with key here
                            return key;
                        }

                    }
                });
                return uploader;
            },
            /**
             * 成功触发事件
             * @param  {Function} callback [description]
             * @return {[type]}            [description]
             */
            success: function(callback) {
                if (typeof(callback) === "function") {
                    this.config.success = callback;
                }
            },
            /**
             * 获取内容
             * @return {[type]} [description]
             */
            getData: function() {
                return this.result;
            },
            /**
             * 配置文件
             * @type {Object}
             */
            setting: {
                browse_button: 'u-p-w-selecter', //点击上传按钮
                container: 'upload-photo-wrap', //放置隐藏按钮的区域
                drop_element: 'u-p-w-selecter', //拖放文件的区域
                uploadEvent: {
                    filesAdded: function() {}, //文件添加完
                    beforeUpload: function() {}, //上传之前
                    uploadProgress: function() {}, //上传过程
                    uploadComplete: function() {}, //上传全部完成
                    fileUploaded: function() {}, //文件上传完
                    error: function() {} //错误
                }
            }
        })
        // UploadPhoto.prototype = 

    /** 定义命名空间 */
    // Super =  _.extend({
    //     UploadPhoto: UploadPhoto
    // },  {});

})($);

export default uploadPhoto;
export let uploadPhoto = {
    install(Vue) {
        vm = Vue;
        Vue.prototype.$uploadPhoto = uploadPhoto;
    }
}