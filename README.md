TODO: 

- 字体如何进行选择

### 2016年11月03日

#### 1. CSS3媒体查询

@media {max-width: 600px}{}：当宽度小于600时，使用新样式进行覆盖。


#### 2. input的盒子问题

对于一般的标签来说，padding是计算在height和width里面的，即盒子模型是向内挤出padding的位置。但对于`<input>`标签来说，padding并不是计算在height和width里面的，这时候的盒子模型是向外扩展出padding的空间。为了得到和一般标签同样的盒子模型，我们需要在样式中设置[box-sizing](http://stackoverflow.com/questions/6586302/add-padding-to-html-text-input-field).



### 2016年11月04日

#### 1. input框后面的回车

土豆区块的input框后面的回车是使用绝对定位放置上去的（父节点设置相对定位）
	

#### 2. 双击修改问题

使用`<input readonly="readonly">`，当检测到鼠标双击事件时，把readonly属性改为false;

#### 3. input框选中的默认样式

在Chrome中，当input框被选中时，会触发浏览器的默认outline样式。如果不需要默认样式的话，可以把ouline设置成none;

#### 4. onblur 函数

onblur函数只能在input标签中使用，在其它标签中绑定onblur函数时，不会显示任何效果，且浏览器不会报错。

#### 5. 拖拽功能的实现

拖拽功能的实现主要使用的HTML5的drag and drop ([参考一](https://www.html5rocks.com/zh/tutorials/dnd/basics/)、[参考二](http://www.w3cfuns.com/notes/14960/94d52ecd0037ff37e4471e4d27443804:storey-1.html)、[参考三](http://www.cnblogs.com/ijjyo/p/4300717.html))。 按照流程依次使用了的dragstart、dragover和drop函数。值得一提的是，在drop的过程中，被拖拽元素有可能放在某个元素中，或者放到某个元素的父元素中，这时候就需要使用tagName来判断元素的标签。

拖拽功能的顺序有问题！拖拽放下的时候，检测source和target的相对位置，然后决定是使用insertBefore还是insertAfter!