(function($,undefined) {

    //默认参数配置
    var defaults = {
        selectors: {
            sections: ".sections",
            section: ".section",
            page: ".pages",
            active: ".active"
        },
        index: 0,
        easing: "ease",
        duration: 500,
        loop: true,
        pagination: true,
        keyboard: true,
        direction: "vertical", //horizator
    };

    // IFEE
    // PageSwitch是一个构造函数
    var PageSwitch = (function() {
        function PageSwitch(element, options) {
            //深复制
            this.settings = $.extend(true, defaults, options || {});
            console.log(this.settings)
            this.element = element;
            this.init();
            if (this.settings.keyboard) {
                var me = this;
                $(window).on("keydown", function(e) {
                    if(me.flag){
                    	if (e.keyCode == 37 || e.keyCode == 38) {
	                        me.prev()
	                    } else if (e.keyCode == 39 || e.keyCode == 40) {
	                        me.next()
	                    }
                    }
                })
            }
        };

        PageSwitch.prototype = {

            init: function() {
                
                var me = this;
                me.selectors = me.settings.selectors;
                me.sections = me.selectors.sections;
                me.section = me.selectors.section;

                me.direction = me.settings.direction === "vertical" ? true : false;
                console.log(me.settings.index)
                me.pagesCount = me.pagesCount();
                me.index = (me.selectors.index >= 0 && me.selectors.index < me.pagesCount) ? me.selectors.index : 0;

                if (!me.direction) {
                    me._initLayout()
                }

                if (me.settings.pagination) {
                    me._initPaging();
                }


                //动画标志flag
                me.flag=true;
                me._scrollPage()
                //鼠标点击和滑轮事件
                //窗口缩放事件
                me._initEvent();

            },

            pagesCount: function() {
                //获取页面数
                var me = this;
                return $(me.section).length;
                //这儿好像有错误
            },

            switchLength: function() {
                //长
                var me = this;
                return me.direction ? me.element.height() : me.element.width();
            },

            prev: function() {
                var me = this;
                //loop==false&&me.index==0
                if(!me.settings.loop&&me.settings.index==0){
                	return;
                }
                if (me.settings.index > 0) {
                    me.settings.index--;
                } else if (me.settings.loop) {
                    me.settings.index = me.pagesCount - 1;
                }

                if(me.flag){
               		
                    me._scrollPage();
                }
            },

            //下一页
            next: function() {
                var me = this;
                if(!me.settings.loop&&me.settings.index==me.pagesCount - 1){
                	return;
                };
                if (me.settings.index < me.pagesCount - 1) {
                    me.settings.index++;
                    console.log(me.settings.index)
                } else if (me.settings.loop&&me.settings.index === me.pagesCount - 1) {
                    me.settings.index = 0;
                };
                console.log(123)
                console.log(me.flag)
               if(me.flag){
                    me._scrollPage();
               }
                
            },
            /*横屏*/
            _initLayout: function() {
                var me = this;
                var width = (me.pagesCount * 100) + "%";
                var cellWidth = (100 / me.pagesCount).toFixed(2) + "%";

                $(me.sections).width(width);
                $(me.section).width(cellWidth).css("float", "left")
            },

            _initPaging: function() {
                var me = this;
                //获取class
                pageClass = me.selectors.page.substring(1);
                me.activeClass = me.selectors.active.substring(1);
                console.log(me.activeClass)
                var pageHtml = "<ul class=" + pageClass + ">";
                for (var i = 0; i < me.pagesCount; i++) {
                    pageHtml += "<li></li>";
                }
                pageHtml += "</ul>";
                //me.element值得是目标元素
                me.element.append(pageHtml);

                //找到li的父元素ul
                var pages = me.element.find(me.selectors.page);
                me.pagesItem = pages.find("li");
                me.pagesItem.css("cursor", "pointer");
                console.log(me.settings.index)
                me.pagesItem.eq(me.settings.index).addClass(me.activeClass);
                console.log(me.pagesItem.eq(me.index))
                if (me.direction) {
                    pages.addClass("vertical");
                } else {
                    pages.addClass('horizator');
                }

            },

            _initEvent: function() {
                var me = this;

                me.element.on("click", me.selectors.page + " li", function() {
                    me.index = $(this).index();
                    //页面滑动事件
                    me._scrollPage();

                    //处理鼠标滑动的兼容性问题

                });

                me.element.on("mousewheel DOMMouseScroll", function(e) {
	                //firefox和其他浏览器不同
	                var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
	                console.log(delta)
	                if(me.flag){
	                	if (delta > 0 && (me.settings.index || me.settings.loop)) {
		                    
		                    me.prev(); // 向上滚动
		                    

		                } else if (delta < 0 && ((me.settings.index === me.pagesCount - 1 && me.settings.loop)||me.settings.index <me.pagesCount - 1)) {
		                    me.next();
		                }
	                }
	            })
            },
            _scrollPage: function() {
                var me = this;
                me.flag = false;
                var dest = $(me.section).eq(me.settings.index).position();
                if (!dest) {
                    return;
                };
               
            	var animateCss = me.direction ? { top: -dest.top } : { left: -dest.left };
            	console.log(animateCss)
                $(me.sections).animate(animateCss, me.settings.duration,function(){
					me.flag = true;
				});

                me.pagesItem.eq(me.settings.index).addClass("active").siblings().removeClass("active");
	                
             
                
                
          
            }

        };


        return PageSwitch;

    })();

	//在jquery原型上挂载一个pageswitch方法
	$.fn.PageSwitch = function(options) {
	    return $(this).each(function() {
	        var me = $(this),
	            instance = me.data("PageSwitch");
	        console.log(instance)
	        if (!instance) {
	            instance = new PageSwitch(me, options);
	            console.log(instance)
	            me.data("PageSwitch", instance)
	        }
	    })
	};
})(jQuery);