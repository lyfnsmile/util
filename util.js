/*
异步载入并执行一个脚本
 */

function loadasync(url){
	var head=document.getElementsByTagName("head")[0];
	var script=document.createElement("script");
	script.src=url;
	head.appendChild(script);
}

/*
删除指定节点
 */

function removeNoed(element){
	element.parentNode.removeChild(element);
}

/*
cookie的添加，删除，读取操作
 */
function(){

}

/*
查询计算出的元素的样式值
元素的style属性用来设置元素的内联样式，它是改变元素样式的最好方法
但是在查询元素实际样式时用处不大
 */


function getStyle(element){
	return window.getComputedStyle(element,null); 
}


/*
css动画效果
shake()元素左右晃动  接受四个参数
ele,:目标元素
fn: 动画完成后的回调函数
distance：晃动距离
time:的话说事件
 */


function shake(ele,fn,distance,time){
	distance=distance||5;
	time=time||500;

	//记录元素的原始位置
	var originalStyle=ele.style.cssText;
	ele.style.position="relative";
	//记录动画开始时间
	var start=(new Date()).getTime();
	//执行动画
	animate();

	function animate(){
		var now=(new Date()).getTime();
		var elapsed=now-start;
		var fraction=elapsed/time;

		if(fraction<1){
			//动画还未结束
			//relative  相对于元素原来的位置坐标
			var x=distance*Math.sin(fraction*4*Math.PI);
			ele.style.left=x+"px";

			//在25毫秒后或是总时间的最后一次尝试再次执行该函数
			//25毫秒是为产生每秒40帧的动画效果
			setTimeout(animate,Math.min(25,time-elapsed));
		}else{
			ele.style.cssText=originalStyle;
			//判断是否有回调  参数为目标元素
			if(fn){
				fn(ele)
			}
		}
	}
}
