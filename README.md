# util
a collection of userful function in daily day

> 主要用于收集工作中会经常用到的代码片段或是一些常见的交互特效

*会不定期的更新...*


[TOC]

### HTTP消息头
#### general
- Connection 这个消息头用于告诉通信的另一端，在完成 HTTP 传输后是关闭 TCP 连接，还是保持连接开放以接收其他消息
- Content-Encoding 这个消息头为消息主体中的内容指定编码形式（如 gzip），一些应用程序使用它来压缩响应以加快传输速度
- Content-Length 这个消息头用于规定消息主体的字节长度。（HEAD语法的响应例外，它在对应的 GET请求的响应中指出主体的长度。）
- Content-Type 这个消息头用于规定消息主体的内容类型。例如，HTML文档的内容类型为 text/html。
- Transfer-Encoding。这个消息头指定为方便其通过 HTTP 传输而对消息主体使用的任何编码。如果使用这个消息头，通常用它指定块编码。

#### Request Headers

- Accept 这个消息头用于告诉服务器客户端愿意接受哪些内容，如图像类型、办公文档格式等。
- Accept-Encoding 这个消息头用于告诉服务器，客户端愿意接收哪些内容编码。
- Authorization 这个消息头用于为一种内置 HTTP 身份验证向服务器提交证书。
- Cookie 这个消息头用于向服务端提交它以前发布的 cookie。
- Host 这个消息头用于指定出现在所有请求的完整 Url 中得主机名称。
- If-Modified-Since 这个消息头用于说明浏览器最后一次收到请求的资源的时间。如果自那以后资源没有发生变化，服务器就会发出一个带状态304的响应，指示客户端使用资源的缓存副本。
- If-None-Match 这个消息头用于指定一个实体标签。实体标签是一个说明消息主题内容的标识符。当最后一次收到请求的资源时，浏览器提交服务器的实体标签。服务器可以使用实体标签确定浏览器是否使用资源的缓存副本。
- Origin 这个消息头用在跨域 Ajax 请求中，用于指示提出请求的域。
- Referer 这个消息头用于指示提出当前请求的原始 url。
- User-Agent 这个消息头提供与浏览器或生成请求的其他客户端软件。

#### Response Headers

- Access-Control-Allow-Origin 这个消息头用于指示可否通过跨域 Ajax 请求获取资源。
- Cache-Control .这个消息头用于向浏览器传送缓存指令（如no-cache）.
- ETag 这个消息头用于指定一个实体标签。客户端可在将来的请求中提交这个标识符，获得和 
- If-None-Match 消息头中相同的资源，通知服务器浏览器当前缓存中保存的是哪个版本的资源。
- Expires 用于向浏览器说明消息主体内容的有效时间。在这个时间之前，浏览器可以使用这个资源的缓存副本。
- Location 用于在重定向响应（这些状态码以3开头的响应）中说明重定向的目标。
- Pragma 用于向浏览器传送缓存指定
- Server 提供所使用的 Web 服务器软件的相关信息。
- Set-Cookie 用于向浏览器发布 cookie，浏览器会在随后的请求中将其返回给服务器。
- WWW-Authenticate 用在带401状态码的响应中，提供与服务器所支持的身份验证类型有关的信息。
- X-Frame-Options 只是浏览器框架是否及如何加载当前响应。 


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
