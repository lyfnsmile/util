var judgeDirection = (function() {
    var jqDirection;

    function Direction(id) {
        this.id = document.getElementById(id) || id;
    }
    Direction.prototype.init = function(enterObj, leaveObj) {
        //鼠标滑入元素
        var self = this;
        this.id.addEventListener('mouseenter', function(e) {
            var directionNumber = self.main(e); //返回数字  返回0:上方进入， 返回1:右方进入，返回2：下方进入，返回3：左方进入
            var funArray = [enterObj.top, enterObj.right, enterObj.bottom, enterObj.left];
            funArray[directionNumber](self.id);
        }, false);
        this.id.addEventListener('mouseleave', function(e) {
            var directionNumber = self.main(e); //返回数字  返回0:上方离开， 返回1:右方离开，返回2：下方离开，返回3：左方离开
            var funArray = [leaveObj.top, leaveObj.right, leaveObj.bottom, leaveObj.left];
            funArray[directionNumber](self.id);
        }, false);
    };
    /*主函数 返回数字来判断从哪个方向进入*/
    Direction.prototype.main = function(e) {
        var w = this.id.scrollWidth;
        var h = this.id.scrollHeight;
        var x = (e.offsetX - (w / 2)) * (w > h ? (h / w) : 1);
        var y = (e.offsetY - (h / 2)) * (h > w ? (w / h) : 1);
        var number = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
        return number;
    };

    //返回一个对象
    return function(id, enterObj, leaveObj) { //这个接口用于原生js
        var direction = new Direction(id);
        direction.init(enterObj, leaveObj);
    }

})();


/*
这个模块对外暴露一个run方法，有三个参数：judgeDirection.run(id, enterObject, leaveObject)

- id : 元素的id
- enterObject：用于判断鼠标是从哪个方向进入元素后的对象，对象必须含有四个方向的回调方法，即如下
*/


/*
enterObjext = {
        left：function(self){//self是对id这个元素的引用
            //这里是鼠标从左边进入元素后的回调
        }，
        right: function(self){
            //这里是鼠标从右边进入元素后的回调
        }，
        top: function(self){
            //这里是鼠标从上边进入元素后的回调
        }，
        bottoom: function(self){
            //这里是鼠标从下边进入元素后的回调
        }
    }
*/
//leaveObject和enterObject一样
