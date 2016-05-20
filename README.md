# util
a collection of userful function in daily day

> 主要用于收集工作中会经常用到的代码片段或是一些常见的交互特效

*会不定期的更新...*


[TOC]


### 可编辑内容区域  `只需在标签上添加contenteditable属性`
```html
<div id="editor" contenteditable>
    click to edit
</div>
```
> **将document对象的designMode属性设置为字符串on**就使得整个文档可编辑
可以通过innerHTML

### 判断用户在文档中选取的文本
```javascript
function getSelectedText(){
    if(window.getSelection){//HTMl5 标准api
        return window.getSelection().toString();
    }else if(document.selection){//IE特有api
        return document.selection.createRange().text;
    }
}
```

### css的盒模型和定位细节

- 标准的css盒模型规定元素的width和height样式属性为给定内容区域的尺寸，不包含内边距和边框，此模型又被称为"内容模型",在老版本的IE和新版的IE里都存在一些例外，在IE6之前及当IE6——8在"怪异模式"下显示一个页面时(页面中缺少<!Doctype>声明),width和height属性包含内边距和边框宽度。
- 在css3中引入了一个新的box-sizing属性,默认值是content-box，它指定了上面描述的标准盒模型，当属性值被设置为border-box时，浏览器会为那个元素应用IE盒模型。
- 当我们想要以百分比的形式为元素设置宽高，又想以像素单位指定元素的边框和内边距属性时，边框盒模型就特别合适。
```html
<div style="box-sizing: border-box; width: 80%; padding: 5px; border:1px solid #e00;"></div>
```

> 为了兼容更多浏览器，最好带上浏览器前缀

### visibility和display区别
visibility和display都可以用来设置元素隐藏，二者区别就是visibility:hidden时依旧占据原来空间,而display:none则是不再给元素分配空间，当它从来就不存在。

### 部分可见overflow和clip
- overflow属性一般很简单，无需多言
- clip属性不常用，被用于指定元素的裁剪区域，在css2中，裁剪区域是矩形的。语法如下：
    rect(top,right,bottom,left)

例如:

```css
style="clip:rect(0px 100px 100px 0px);"
```

> *注意：*圆括号中的四个值是长度，所以需包含明确的单位。不允许使用百分比。可以为负值，让裁剪区域超出为元素指定的边框尺寸。也可以为任何四个值使用auto关键字来指定裁剪区域的边缘就是元素边框对应的边缘。例如用style属性指定只显示元素最左边的100像素：

```css
style="clip:rect(auto 100px auto auto);"
```

> 通过JavaScript设置css的float属性

```javascript
element.style.cssFloat="left";
```

> 字符串类型数字转纯数字的方法 

```
function toNumber(strNum){
    return +strNum;
}
```
- 通常做法有调用Number(), parseInt(), parseFloat()方法实现
