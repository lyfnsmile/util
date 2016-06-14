/*
异步载入并执行一个脚本
*/
function loadasync(url) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.src = url;
    head.appendChild(script);
}


/*
cookie的添加，删除，读取操作
*/
function() {

}


/*
css动画效果
shake()元素左右晃动  接受四个参数
ele,:目标元素
fn: 动画完成后的回调函数
distance：晃动距离
time:的话说事件
 */
function shake(ele, fn, distance, time) {
    distance = distance || 5;
    time = time || 500;

    //记录元素的原始位置
    var originalStyle = ele.style.cssText;
    ele.style.position = "relative";
    //记录动画开始时间
    var start = (new Date()).getTime();
    //执行动画
    animate();

    function animate() {
        var now = (new Date()).getTime();
        var elapsed = now - start;
        var fraction = elapsed / time;

        if (fraction < 1) {
            //动画还未结束
            //relative  相对于元素原来的位置坐标
            var x = distance * Math.sin(fraction * 4 * Math.PI);
            ele.style.left = x + "px";

            //在25毫秒后或是总时间的最后一次尝试再次执行该函数
            //25毫秒是为产生每秒40帧的动画效果
            setTimeout(animate, Math.min(25, time - elapsed));
        } else {
            ele.style.cssText = originalStyle;
            //判断是否有回调  参数为目标元素
            if (fn) {
                fn(ele)
            }
        }
    }
}

/*
获取浏览器视口高度，滚动条高度以及整个文档高度
判断滚动条到达底部的方法
实现滚动到底部加载更多的效果
*/

function getScrollTop() {　　
    var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;　　
    if (document.body) {　　　　
        bodyScrollTop = document.body.scrollTop;　　
    }　　
    if (document.documentElement) {　　　　
        documentScrollTop = document.documentElement.scrollTop;　　
    }　　
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;　　
    return scrollTop;
}
//文档的总高度
function getScrollHeight() {　　
    var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;　　
    if (document.body) {　　　　
        bodyScrollHeight = document.body.scrollHeight;　　
    }　　
    if (document.documentElement) {　　　　
        documentScrollHeight = document.documentElement.scrollHeight;　　
    }　　
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;　　
    return scrollHeight;
}
//浏览器视口的高度
function getWindowHeight() {　
    var windowHeight = 0;　　
    if (document.compatMode == "CSS1Compat") {　　　　
        windowHeight = document.documentElement.clientHeight;　　
    } else {　　　　
        windowHeight = document.body.clientHeight;　　
    }　　
    return windowHeight;
}
//监听鼠标滚动事件
window.onscroll = function() {　　
    //在滚动条距离底部500px时触发ajax，向后台请求数据
    if (getScrollTop() + getWindowHeight() >= getScrollHeight() - 500) {　　　　
        alert("you are in the bottom!");
        //window.onscroll = null;　　
    }
};


/*
日期转换函数
 */
function timeFormat(value) {
    var timeNum = parseInt(value);
    var time = new Date(timeNum);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    //如果小于10就在前面补上"0";
    if (month < 10) { month = "0" + month; }
    if (day < 10) { day = "0" + day }
    if (hours < 10) { hours = "0" + hours }
    if (minutes < 10) { minutes = "0" + minutes }
    var date = year + "/" + month + "/" + day + " " + hours + ":" + minutes;
    return date;
}


//它返回一个对象，其中包含了left、right、top、bottom四个属性
var myDiv = document.getElementById('myDiv');
var x = myDiv.getBoundingClientRect().left; 
var y = myDiv.getBoundingClientRect().top; 


//封装好的事件对象的常用属性和方法
var EventUtil = {
    //给元素绑定事件处理程序
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false)
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler)
        } else {
            element["on" + type] = handler;
        }
    },
    //移除元素的事件处理程序
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false)
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler)
        } else {
            element["on" + type] = null;
        }
    },
    //获取事件对象
    getEvent: function(ev) {
        return ev ? ev : window.event;
    },
    //获取事件真正的目标元素
    getTarget: function(ev) {
        return ev.target || ev.srcElement;
    },
    //取消事件的捕获或冒泡
    stopPropaation: function(ev) {
        if (ev.stopPropaation) {
            ev.stopPropaation();
        } else {
            ev.cancelBubble = true;
        }
    },
    //阻止事件默认行为
    preventDefault: function(ev) {
        if (ev.preventDefault) {
            ev.preventDefault();
        } else {
            ev.returnValue = false;
        }
    }
};

//返回顶部函数
function backTop() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var speed = Math.ceil(scrollTop / 10);
    var timer = null;
    //alert(scrollTop);
    timer = setInterval(function() {
        if (document.body.scrollTop == 0) {
            clearInterval(timer);
        } else {
            document.body.scrollTop = document.body.scrollTop - speed;
        }
    }, 30)
};

//用于解析url中？后面部分的查询字符串，以对象的形式返回
function parseQuery(url) {
    var query = url.split("?")[1];
    var queryPart = query.split("&");
    var obj = {};
    for (var i = 0; i < queryPart.length; i++) {
        var value = queryPart[i].split("=");
        var name = value[0];
        obj[name] = value[1];
    };
    return obj;
};

/*判断空对象*/
function isEmptyObj(obj){
    var arr=[];
    for(key in obj){
        if(obj.hasOwnProperty(key)){
            arr.push(key);
        }
        
    }

    if(arr.length==0){
        return true;
    }

    return fasle;
};

//获取时间差
(function(window, undefined) {
    var diffTime = function(oldTime, current) {
        var current = current ? current : new Date().getTime(),
            minute = 1000 * 60,
            hour = minute * 60,
            day = hour * 60,
            week = day * 7,
            month = day * 30,
            year = month * 12,
            result = '',
            diffValue = current - oldTime,
            _year = diffValue / year,
            _month = diffValue / month,
            _week = diffValue / week,
            _day = diffValue / day,
            _hour = diffValue / hour,
            _minute = diffValue / minute;


        if (_year >= 1) {
            result = Math.floor(_year) + "年前";
        } else if (_month >= 1) {
            result = Math.floor(_month) + "月前";
        } else if (_week >= 1) {
            result = Math.floor(_week) + "周前";
        } else if (_day >= 1) {
            result = Math.floor(_day) + "天前";
        } else if (_hour >= 1) {
            result = Math.floor(_hour) + "小时前";
        } else if (_minute >= 1) {
            result = Math.floor(_hour) + "分钟前";
        } else {
            result = "刚刚";
        }

        return result;
    };

    window.diffTime = diffTime;
})(window)


//兼容低版本的IE浏览器的getElementsByClassName方法
function getElementsByClassName(element, className) {
    if (element.getElementsByClassName) {
        return element.getElementsByClassName(className)
    } else {
        var list = element.getElementsByTagName("*");
        var result = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].className == className) {
                result.push(list[i]);
            }
        }
        return result;
    }
};

/*
 **jquery  hasClass方法的实现
*/
function hasClass(element,className){
    var cls=element.className;
    vat clsToArray=cls.split(" ");
    if(clsToArray.indexOf(className) != -1){
        return true;
    }
    return false;
}

//删除节点element
function remove(element) {
    element.parentNode.removeChild(element);
}