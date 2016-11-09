/**
 * Created by lindayong on 2016/11/3.
 */

// 添加拖拽功能，其分别包括定义了鼠标拖拽开始时的事件handleDragStart
// 鼠标拖拽过程中的事件handleDragOver和鼠标拖拽结束时的事件handleDrag.
// 详情可参考HTML5拖放(Drag和Drop)功能开发--基础实战[http://www.cnblogs.com/ijjyo/p/4300717.html]
function addDrop(element) {
    element.addEventListener('dragstart', handleDragStart, false);
    element.addEventListener('dragover', handleDragOver, false);
    element.addEventListener('drop', handleDrop, false);
}

// 删除todo的拖拽功能。
function deleteDrop(element) {
    element.removeEventListener('dragstart', handleDragStart);
    element.removeEventListener('dragover', handleDragOver);
    element.removeEventListener('drop', handleDrop);
}

// 拖拽开始时，获取拖拽源todo的相关信息
function handleDragStart(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
}

// 拖拽过程中，阻止浏览器的默认行为
function handleDragOver(ev) {
    ev.preventDefault();
}

// 拖拽结束时，按照使用习惯摆放源todo和目标todo的位置
// 如果源todo在目标todo的前面，那么拖拽结束后，我们把源todo放在目标todo的后面
// 如果源todo在目标todo的后面，那么拖拽结束后，我们把源todo放在目标todo的前面。
function handleDrop(ev) {
    var data = ev.dataTransfer.getData('text');
    var source_li = document.getElementById(data);
    var target = ev.target;
    var position = [];
    var todo_li = document.getElementById('todo_list').getElementsByTagName('li');
    for (i=0; i<todo_li.length; i++) {
        position[todo_li[i].id] = i;
    }

    function insertAfter(newElement, targetElement) {
        var parent = targetElement.parentNode;
        if (parent.lastChild == targetElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    }

    target_li = target.tagName == 'LI' ? target : target.parentNode;
    if (source_li.id == target_li.id) return;
    if (position[source_li.id] > position[target_li.id]) {
        source_li.parentNode.insertBefore(source_li, target_li);
    } else {
        insertAfter(source_li, target_li)
    }
}

// 添加双击效果。
function addDblclick(element) {
    element.ondblclick = function () {
        this.readOnly = false;
        this.style.backgroundColor = '#ddd4D0';
        this.parentElement.style.backgroundColor = '#ddd4D0';
    };
    element.onblur = function () {
        this.readOnly = true;
        this.style.backgroundColor = '#FFF';
        this.parentElement.style.backgroundColor = '#FFF';
    };
}

// 删除双击效果
function deleteDblclick(element) {
    console.log(element);
    element.ondblclick = null;
    element.onblur = null;
}


function addZero(num) {
    result = num > 9 ? num : '0'+num;
    return result.toString();
}

// 按照YYYY-MM-DD-HH-MM-SS的格式返回当前时间
function getTime() {
    var nowTime = new Date();
    var year = nowTime.getFullYear();
    var month = addZero(nowTime.getMonth()+1);
    var day = addZero(nowTime.getDate());
    var hours = addZero(nowTime.getHours());
    var minutes = addZero(nowTime.getMinutes());
    var seconds = addZero(nowTime.getSeconds());
    return year + month + day + hours + minutes + seconds;

}

// todo_input 的回车键被按下时，往todo_list的末尾添加新todo
// 并给新todo添加双击效果、完成效果、拖拽效果和删除效果
function todo_input_press(todo_input) {
    if (todo_input.value.length == 0) return;
    var todo_list = document.getElementById('todo_list').getElementsByTagName('ul')[0];
    var todo_list_num = todo_list.getElementsByTagName('li').length;
    if (todo_list_num >= 10) {
        alert('Please delete some unimportant task or complete some task first!!');
    } else {
        var li = document.createElement('li');
        li.id = getTime();
        li.setAttribute('draggable', true);
        li_text = '<input type="checkbox" name="todo_checkbox" /> ' +
            '<input type="text" value="' + todo_input.value + '" readonly="readonly" /> ' +
            '<img class="delete_png" src="delete.png" alt="delete_icon" />';
        li.innerHTML = li_text;
        addDblclick(li.getElementsByTagName('input')[1]);
        addDone(li);
        addDrop(li);
        addDelete(li);
        todo_list.appendChild(li);
        todo_input.value = '';
    }
}


// 添加删除效果
function addDelete (li) {
    var delete_img = li.getElementsByTagName('img')[0];
    delete_img.onclick = function () {
        this.parentNode.parentNode.removeChild(this.parentNode);
    };

    li.onmouseover = function () {
        this.getElementsByTagName('img')[0].style.display = 'block';
    };
    li.onmouseout = function () {
        this.getElementsByTagName('img')[0].style.display = 'none';
    };
}

// 给todo添加完成效果
// todo完成之后，将其放置在complete_list的末尾，添加todo效果
// 删除双击效果和拖拽效果
function addDone(li) {
    var todo_checkbox = li.getElementsByTagName('input')[0];
    var completed_todo_ul = document.getElementById('completed_todo').getElementsByTagName('ul')[0];
    todo_checkbox.onclick = function () {
        li.parentNode.removeChild(li);
        li.getElementsByTagName('input')[0].checked=true;
        deleteDblclick(li.getElementsByTagName('input')[1]);
        deleteDrop(li);
        addTodo(li);
        completed_todo_ul.appendChild(li);
    };
}

// 给complete_todo添加todo效果
// complete_todo设置为todo时，将其放置在todo_list的末尾
// 添加双击效果、拖拽效果和完成效果
function addTodo(li) {
    var done_checkbox = li.getElementsByTagName('input')[0];
    var todo_ul = document.getElementById('todo_list').getElementsByTagName('ul')[0];
    done_checkbox.onclick = function () {
        li.id=getTime();
        li.setAttribute('draggable', true);
        li.parentNode.removeChild(li);
        li.getElementsByTagName('input')[0].checked=false;
        addDblclick(li.getElementsByTagName('input')[1]);
        addDrop(li);
        addDone(li);
        todo_ul.appendChild(li);
    };
}


function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}


function potatoes_js() {

    // Display the enter_svg when the todo_input is focused on
    // And hidden the enter_svg when the todo_input lose focus
    var todo_input = document.getElementById('todo_input').getElementsByTagName('input')[0];
    var enter_png = document.getElementById('enter_png');
    todo_input.onfocus = function () {
        enter_png.style.display = 'block';
    };
    todo_input.onblur = function () {
        enter_png.style.display = 'none';
    };

    // When press enter in the todo_input, if the list num greater than 10,
    // tell the user to delete some unimportant task, or complete some task first.
    // else, put the task at the end of the list.
    todo_input.onkeypress = function (event) {
        if (event.keyCode === 13) {
            todo_input_press(this);
        }
    };
    enter_png.onclick = function () {
        todo_input_press(todo_input);
    };

    var todo_list_li = document.getElementById('todo_list').getElementsByTagName('li');
    for (var i = 0; i < todo_list_li.length; i++) {
        var input_text = todo_list_li[i].getElementsByTagName('input')[1];
        // Modify the text when double_click
        // onblur can only use in input tag !!!
        addDblclick(input_text);
        addDone(todo_list_li[i]);
        addDrop(todo_list_li[i]);
        addDelete(todo_list_li[i]);
    }

    var completed_todo_div = document.getElementById('completed_todo').getElementsByTagName('div')[0];
    var completed_todo_ul = document.getElementById('completed_todo').getElementsByTagName('ul')[0];
    var completed_todo_li = completed_todo_ul.getElementsByTagName('li');
    completed_todo_div.onclick = function () {
        completed_todo_ul.style.display == 'none' ?
            completed_todo_ul.style.display = 'block' : completed_todo_ul.style.display = 'none';
    };

    for (var i=0; i<completed_todo_li.length; i++) {
        addDelete(completed_todo_li[i]);
        addTodo(completed_todo_li[i]);
    }
}


addLoadEvent(potatoes_js);