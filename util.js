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
function isEmptyObj(obj) {
    var arr = [];
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            arr.push(key);
        }

    }

    if (arr.length == 0) {
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
function hasClass(element, className) {
    var cls = element.className;
    vat clsToArray = cls.split(" ");
    if (clsToArray.indexOf(className) != -1) {
        return true;
    }
    return false;
}

//删除节点element
function remove(element) {
    element.parentNode.removeChild(element);
}




/*
纯元素js实现的各种动画效果代码
*/
// 匀速动画效果
window.onload = function() {
    var odiv = document.getElementById('odiv');
    odiv.onmouseover = function() {
        startMover(0);
    }
    odiv.onmouseout = function() {
        startMover(-200);
    }
}
var timer = null;

function startMover(itarget) { //目标值
    clearInterval(timer); //执行当前动画同时清除之前的动画
    var odiv = document.getElementById('odiv');
    timer = setInterval(function() {
        var speed = 0;
        if (odiv.offsetLeft > itarget) {
            speed = -1;
        } else {
            speed = 1;
        }
        if (odiv.offsetLeft == itarget) {
            clearInterval(timer);
        } else {
            odiv.style.left = odiv.offsetLeft + speed + 'px';
        }
    }, 30);
}


// 缓冲动画效果
window.onload = function() {
    var odiv = document.getElementById('odiv');
    odiv.onmouseover = function() {
        startMover(0);
    }
    odiv.onmouseout = function() {
        startMover(-200);
    }
}
var timer = null;

function startMover(itarget) { //速度和目标值
    clearInterval(timer); //执行当前动画同时清除之前的动画
    var odiv = document.getElementById('odiv');
    timer = setInterval(function() {
        var speed = (itarget - odiv.offsetLeft) / 10; //缓冲动画的速度参数变化值
        //如果速度是大于0，说明是向右走，那么就向上取整
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        //Math.floor();向下取整
        if (odiv.offsetLeft == itarget) {
            clearInterval(timer);
        } else {
            //clientLeft 返回对象的offsetLeft属性值和到当前窗口左边的真实值之间的距离 
            odiv.style.left = odiv.offsetLeft + speed + 'px';
        }
    }, 30);
}

// 透明度动画
window.onload = function() {
    var odiv = document.getElementsByTagName('div');
    for (var i = 0; i < odiv.length; i++) {
        odiv[i].onmouseover = function() {
            startOP(this, 100);
        }
        odiv[i].onmouseout = function() {
            startOP(this, 30);
        }
        odiv[i].timer = null; //事先定义
        odiv[i].alpha = null; //事先定义
        //这里发现一个问题，对象的动画属性可以不定义，但是透明度属性必须定义，否则报错
    }
}

function startOP(obj, utarget) {
    clearInterval(obj.timer); //先关闭定时器
    obj.timer = setInterval(function() {
        var speed = 0;
        if (obj.alpha > utarget) {
            speed = -10;
        } else {
            speed = 10;
        }
        obj.alpha = obj.alpha + speed;
        if (obj.alpha == utarget) {
            clearInterval(obj.timer);
        }
        obj.style.filter = 'alpha(opacity:' + obj.alpha + ')'; //基于IE的
        obj.style.opacity = parseInt(obj.alpha) / 100;
    }, 30);
}

// 多物体动画

window.onload = function() {
    var olist = document.getElementsByTagName('li');
    for (var i = 0; i < olist.length; i++) {
        olist[i].onmouseover = function() {
            startmov(this, 400);
        };
        olist[i].onmouseleave = function() {
            startmov(this, 200);
        };
        olist[i].timer = null;
    }

    function startmov(obj, itarget) {
        clearInterval(obj.timer); //执行动画之前清除动画
        obj.timer = setInterval(function() {
            var speed = 0;
            speed = (itarget - obj.offsetWidth) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (obj.offsetWidth == itarget) {
                clearInterval(obj.timer);
            } else {
                obj.style.width = obj.offsetWidth + speed + 'px';
            }
        }, 30);
    }
}

// 获取样式动画

window.onload = function() {
    var odiv = document.getElementById('odiv');
    odiv.onmouseover = function() {
        startMov(this);
    };

    function startMov(obj) {
        setInterval(function() {
            obj.style.width = parseInt(getStyle(obj, 'width')) + 1 + 'px';
            obj.style.fontSize = parseInt(getStyle(obj, 'fontSize')) + 1 + 'px';
        }, 30);
    }

    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    }
}

// 多物体复杂动画

window.onload = function() {
    var li1 = document.getElementById('li1');
    var li2 = document.getElementById('li2');
    li1.onmouseover = function() {
        startMov(this, 400, 'width');
    };
    li1.onmouseout = function() {
        startMov(this, 200, 'width');
    };
    li2.onmouseover = function() {
        startMov(this, 200, 'height');
    };
    li2.onmouseout = function() {
        startMov(this, 100, 'height');
    };

    function startMov(obj, itarget, attr) {
        clearInterval(obj.timer); //执行动画之前清除动画
        obj.timer = setInterval(function() {
            var icur = parseInt(getStyle(obj, attr));
            var speed = 0;
            speed = (itarget - icur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (icur == itarget) {
                clearInterval(obj.timer);
            } else {
                obj.style[attr] = icur + speed + 'px';
            }
        }, 30);
    }

    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    }
}
//多物体复杂动画（ 带透明度的）

window.onload = function() {
    var li1 = document.getElementById('li1');
    var li2 = document.getElementById('li2');
    li1.onmouseover = function() {
        startMov(this, 100, 'opacity');
    };
    li1.onmouseout = function() {
        startMov(this, 30, 'opacity');
    };
    li2.onmouseover = function() {
        startMov(this, 200, 'height');
    };
    li2.onmouseout = function() {
        startMov(this, 100, 'height');
    }
    li1.timer = null;
    li2.timer = null;

    function startMov(obj, itarget, attr) {
        clearInterval(obj.timer); //执行动画之前清除动画
        obj.timer = setInterval(function() {
            var icur = 0;
            if (attr == 'opacity') {
                icur = Math.round(parseFloat(getStyle(obj, attr)) * 100); //转换成整数,并且四舍五入下
                //计算机在计算小数的时候往往是不准确的！
            } else {
                icur = parseInt(getStyle(obj, attr));
            }
            var speed = 0;
            speed = (itarget - icur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (icur == itarget) {
                clearInterval(obj.timer);
            } else {
                if (attr == 'opacity') {
                    obj.style.filter = 'alpha(opacity:' + (icur + speed) + ')';
                    obj.style.opacity = (icur + speed) / 100;
                } else {
                    obj.style[attr] = icur + speed + 'px';
                }
            }
        }, 30);
    }

    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    }
}

// 链式动画
window.onload = function() {
    var li1 = document.getElementById('li1');
    li1.onmouseover = function() {
        startMov(li1, 400, 'width', function() {
            startMov(li1, 200, 'height', function() {
                startMov(li1, 100, 'opacity');
            });
        });
    };
    li1.onmouseout = function() {
        startMov(li1, 30, 'opacity', function() {
            startMov(li1, 100, 'height', function() {
                startMov(li1, 100, 'width');
            });
        });
    };
    li1.timer = null;

    function startMov(obj, itarget, attr, fn) { //fn回调函数
        clearInterval(obj.timer); //执行动画之前清除动画
        obj.timer = setInterval(function() {
            var icur = 0;
            if (attr == 'opacity') {
                icur = Math.round(parseFloat(getStyle(obj, attr)) * 100); //转换成整数,并且四舍五入下
                //计算机在计算小数的时候往往是不准确的！
            } else {
                icur = parseInt(getStyle(obj, attr));
            }
            var speed = 0;
            speed = (itarget - icur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (icur == itarget) {
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
            } else {
                if (attr == 'opacity') {
                    obj.style.filter = 'alpha(opacity:' + (icur + speed) + ')';
                    obj.style.opacity = (icur + speed) / 100;
                } else {
                    obj.style[attr] = icur + speed + 'px';
                }
            }
        }, 30);
    }

    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    }
}

// 多物体同时运动动画
window.onload = function() {
    var li1 = document.getElementById('li1');
    li1.onmouseover = function() {
        startMov(li1, { width: 201, height: 200, opacity: 100 });
    };
    li1.onmouseout = function() {
        startMov(li1, { width: 200, height: 100, opacity: 30 });
    };
    li1.timer = null;

    function startMov(obj, json, fn) { //fn回调函数
        clearInterval(obj.timer); //执行动画之前清除动画
        var flag = true; //是否动画都完成了
        obj.timer = setInterval(function() {
            for (var attr in json) {
                var icur = 0;
                if (attr == 'opacity') {
                    icur = Math.round(parseFloat(getStyle(obj, attr)) * 100); //转换成整数,并且四舍五入下
                    //计算机在计算小数的时候往往是不准确的！
                } else {
                    icur = parseInt(getStyle(obj, attr));
                }
                var speed = 0;
                speed = (json[attr] - icur) / 8;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (icur != json[attr]) {
                    flag = false;
                }
                if (attr == 'opacity') {
                    obj.style.filter = 'alpha(opacity:' + (icur + speed) + ')';
                    obj.style.opacity = (icur + speed) / 100;
                } else {
                    obj.style[attr] = icur + speed + 'px';
                }
                if (flag) {
                    clearInterval(obj.timer);
                    if (fn) {
                        fn();
                    }
                }
            }
        }, 30);
    }

    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    }
}
