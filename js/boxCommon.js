/**
 * 一些通用方法
 */
(function (exports) {
    /**
     * 
     * @param {string} dom 目标dom元素
     * @param {string} className  效果的class
     */
    exports.tabEffect = function (dom, className) {
        // if (typeof dom === 'string') {
        //     dom = document.querySelector(dom);
        // }
        $("body").on("click", dom, function () {
            var index = $(this).index();
            $(dom).removeClass(className).eq(index).addClass(className);
        })

    }
      /**
     * 将对象渲染到模板
     * @param {String} template 对应的目标
     * @param {Object} obj 目标对象
     * @return {String} 渲染后的模板
     */
    exports.renderTemplate = function(template, obj) {
        return template.replace(/[{]{2}([^}]+)[}]{2}/g, function($0, $1) {
            return obj[$1] || '';
        });
    };

    /**
     * 
     * 截取url参数
     */

    exports.getUrlParam = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r != null) return unescape(r[2]);
        return null;
    }


    /**
     * 
     * 下载护士加
     */
    exports.authUrl = function(itemId,param) {
        // window.location.href="http://h5game.tuyoo.com/?act=game.init&itemId="+itemId+"&param="+param;

    };

    
      /**
    *
    *
    * @param {*} url 请求url
    * @param {*} requestData  请求参数
    * @param {*} callback 回调函数
    */
   exports.getData = function(url, requestData, callback) {
    $.post(url, requestData, function (data) {
         if(data.retcode == -2){
             $(".tipBox").hide();
             $("#noUser").show();
         }else{
             callback(data);
         }
    }, "json");
}
    /**
     * 绑定监听事件 暂时先用click
     * @param {String} dom 单个dom,或者selector
     * @param {Function} callback 回调函数
     * @param {String} eventName 事件名
     */
    exports.bindEvent = function (dom, callback, eventName) {
        eventName = eventName || 'click';
        if (typeof dom === 'string') {
            // 选择
            dom = document.querySelectorAll(dom);
        }
        if (!dom) {
            return;
        }
        if (dom.length > 0) {
            for (var i = 0, len = dom.length; i < len; i++) {
                dom[i].addEventListener(eventName, callback);
            }
        } else {
            dom.addEventListener(eventName, callback);
        }
    };
    /**
	     * @return {boolean}
	     */
    exports.IsNull=function (v) {
        return v === undefined || v === null || v === "";
    };
    /**
 *
 *
 * @param {*} url 请求url
 * @param {*} requestData  请求参数
 * @param {*} callback 回调函数
 */
    exports.getData= function (url, requestData, callback) {
    $.get(url, requestData, function (data) {
         if(data.retcode == 0){
             alert("shibai");
         }else{
             callback(data);
         }
    }, "json");

}

/**
 * 
 * 判断是否为微信设备
 * 
 */

    exports.checkIsWeixin = function(){
        if(!window.nurse) {
            window.nurse = new Object;
        }
        var u = navigator.userAgent,
            app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var  isWeixin = !!u.match(/MicroMessenger/i);//weixin
        if(isWeixin){
            return true;
        }
        return false;
    }


    /**
     * 
     * @param {string} shareTitle1 分享朋友圈title
     * @param {string} shareTitle2 分享朋友title
     * @param {string} shareContent 分享内容
     * @param {string} shareUrl   分享页面的url
     * @param {string} shareImg1  分享到朋友圈图标
     * @param {string} shareImg2  分享到朋友的图标
     */
    exports.getConfig = function (shareTitle1,shareTitle2,shareContent,shareUrl,shareImg1,shareImg2) {
    // 获取分享配置信息
    var urlC = window.location.href.split('#')[0];
    $.ajax({
      	url: "http://h5game.tuyoo.com/?act=ajax.getWxSign",
        type: 'GET',
        dataType: 'json',
        data: {
            'url': urlC
        },
        success: function(data){
        		var data = data.signPackage;
            if (data.appId == 0) {
                console.log('获取分享配置信息失败');
            } else {
                wx.config({
                    debug: false,
                    appId: data.appId,
                    timestamp: data.timestamp,
                    nonceStr: data.nonceStr,
                    signature: data.signature,
                    jsApiList: [
                        'checkJsApi',
                        // 'onMenuShareTimeline',
                        'onMenuShareAppMessage',
//                      'onMenuShareQQ',
//                      'onMenuShareQZone',
//                      'onMenuShareWeibo',
                        'hideMenuItems'
                    ]
                });
                // 微信分享点击事件处理
                wx.ready(function () {
                    // 判断当前版本是否支持指定 JS 接口，支持批量判断
                    wx.checkJsApi({
                        jsApiList: [
                            // 'onMenuShareTimeline',
                            'onMenuShareAppMessage',
//                          'onMenuShareQQ',
//                          'onMenuShareQZone',
//                          'onMenuShareWeibo'，
							'hideMenuItems'
                        ],
                        success: function (res) {
                         console.log('微信配置成功'+JSON.stringify(res));
                        },
                        fail: function (res) {
					        console.log(JSON.stringify(res));
					      }
                    });
 					wx.hideMenuItems({
						menuList: [
                            'menuItem:share:timeline',
					    	'menuItem:readMode', // 阅读模式
					    	"menuItem:share:qq",//分享到qq
					    	"menuItem:share:weiboApp",//分享到微博
					    	"menuItem:openWithQQBrowser",//qq浏览器打开
					    	"menuItem:openWithSafari",//safri打开
					    	"menuItem:share:QZone",//空间
					    	'menuItem:copyUrl'//复制链接
					    ],// 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
				      success: function (res) {
				        console.log('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
				      },
				      fail: function (res) {
				        console.log(JSON.stringify(res));
				      }
					    
					});
                    // 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
                    wx.onMenuShareAppMessage({
                        title: shareTitle2,
                        desc: shareContent,
                        link: shareUrl,
                        imgUrl: shareImg2,
                        success: function () {
							console.log("朋友成功");
                        },
                        cancel: function () {},
                        fail: function (res) {}
                    });
                    // 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
                    wx.onMenuShareTimeline({
                        title: shareTitle1,
                        link: shareUrl,
                        imgUrl: shareImg1,
                        success: function () {
							console.log("分享到朋友圈成功");
                        },
                        cancel: function () {},
                        fail: function (res) {
                            console.log("朋友圈失败--"+JSON.stringify(res));
                        }
                    });
                });
                // 微信分享出错处理
                wx.error(function (res) {
                 console.log('微信分享错误'+res.errMsg);
                });
            }
        },
        error:function (data) {
         console.log(data);
        }
    })
}


})(window.GameCenter = {});