/**
  drag.js拖动绝对定位的HTML元素
  这个模块定义了一个drag()函数，它用于mousedown事件处理程序的调用
  随后的mousemove事件将移动指定元素，mouseup事件将终止拖动
**/
function dragable(element, event) {
    var event = event || window.event;
    //初始鼠标位置，转换为文档坐标
    var startX = event.clientX;
    var startY = event.clientY;
    //获取待拖动元素的初始位置
    var origX = element.offsetLeft;
    var origY = element.offsetTop;
    //计算鼠标按下时鼠标分别距离元素左边和上边的距离
    var deltaX = startX - origX;
    var deltaY = startY - origY;
    document.onmousemove = function(ev) {
        var ev = ev || window.event;
        //按下鼠标中间或右键移动不能触发拖拽事件
        if (ev.button != 0) {
            return;
        };
        var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        if (ev.clientX - deltaX <= 50) {
            element.style.left = 0;
        } else if (clientWidth - element.offsetLeft < element.offsetWidth) {
            element.style.left = clientWidth - element.offsetWidth + "px";
        } else {
            element.style.left = ev.clientX - deltaX + "px";
            element.style.top = ev.clientY - deltaY + "px";
        }
    };
    document.onmouseup = function() {
        document.onmousemove = null;
    }
    return false;
};