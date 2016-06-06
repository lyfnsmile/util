/**
   封装好的动画框架，可改变元素的长宽，位置及透明度
**/
//获取元素计算后的样式值
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
};
//动画函数、运动框架
function startMove(obj, json, fn) {
    var flag = true;
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        for (attr in json) {
            if (attr == "opacity") {
                var icur = Math.round(parseFloat(getStyle(obj, attr)) * 100)
            } else {
                var icur = parseInt(getStyle(obj, attr))
            };
            //计算速度
            var speed = (json[attr] - icur) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //检测是否停止定时器
            if (icur != json[attr]) {
                flag = false;
            }
            if (attr == "opacity") {
                obj.style.filter = "alpha(opacity:'+(icur+speed)+')";
                obj.style.opacity = (icur + speed) / 100;
            } else {
                obj.style[attr] = icur + speed + "px";
            }
        };
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        };
    }, 30)
};