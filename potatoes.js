/**
 * Created by lindayong on 2016/11/3.
 */

function addDrop(element) {
    element.addEventListener('dragstart', handleDragStart, false);
    element.addEventListener('dragover', handleDragOver, false);
    element.addEventListener('drop', handleDrop, false);
}

function handleDragStart(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
}

function handleDragOver(ev) {
    ev.preventDefault();
}

function handleDrop(ev) {
    var data = ev.dataTransfer.getData('text');
    var source_li = document.getElementById(data);
    var target = ev.target;
    if (target.tagName == 'LI') {
        if (source_li.id == target.id) return;
        source_input = source_li.getElementsByTagName('input')[1];
        source_li.removeChild(source_input);
        source_li.appendChild(target.getElementsByTagName('input')[1]);
        target.appendChild(source_input);
    }
    else {
        if (source_li.id == target.parentNode.id) return;
        source_input = source_li.getElementsByTagName('input')[1];
        source_li.removeChild(source_input);
        target.parentNode.appendChild(source_input);
        source_li.appendChild(target);
    }
}

function todo_dblclick () {
    this.readOnly = false;
    this.style.backgroundColor = '#aaa4D0';
    this.parentElement.style.backgroundColor = '#aaa4D0';
}

function todo_blur() {
    this.readOnly = true;
    this.style.backgroundColor = '#FFF';
    this.parentElement.style.backgroundColor = '#FFF';
}

function addZero(num) {
    result = num > 9 ? num : '0'+num;
    return result.toString();
}

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

window.onload = function () {
    // 倒计时模块
    function updateTime() {
        var nowTime = new Date();
        var minute = addZero(nowTime.getMinutes());
        var second = addZero(nowTime.getSeconds());
        document.getElementById("title").innerHTML = minute + ':' + second + ' - Pomotodo';
    }

    test = setInterval(updateTime, 1000);


    // Display the enter_svg when the todo_input is focused on
    // And hidden the enter_svg when the todo_input lose focus
    var todo_input = document.getElementById('todo_input').getElementsByTagName('input')[0];
    var enter_svg = document.getElementById('enter_svg');
    todo_input.onfocus = function () {
        // TODO: use fadeIn
        enter_svg.style.display = 'block';
    };
    todo_input.onblur = function () {
        // TODO: use fadeOut
        enter_svg.style.display = 'none';
    };

    // When press enter in the todo_input, if the list num greater than 10,
    // tell the user to delete some unimportant task, or complete some task first.
    // else, put the task at the end of the list.
    todo_input.onkeypress = function (event) {
        if (event.keyCode === 13) {
            var todo_list = document.getElementById('todo_list').getElementsByTagName('ul')[0];
            var todo_list_num = todo_list.getElementsByTagName('li').length;
            if (todo_list_num >= 10) {
                alert('Please delete some unimportant task or complete some task first!!');
            }
            else {
                var li = document.createElement('li');
                li.id = getTime();
                li.setAttribute('draggable', true);
                li_text = '<input type="checkbox" /> ' +
                    '<input type="text" value="' + todo_input.value + '" readonly="readonly"/>';
                li.innerHTML = li_text;
                li.getElementsByTagName('input')[1].ondblclick = todo_dblclick;
                li.getElementsByTagName('input')[1].onblur = todo_blur;
                addDrop(li);
                todo_list.appendChild(li);
                todo_input.value = '';
            }
        }
    };

    // Modify the text when double_click
    var todo_list_li = document.getElementById('todo_list').getElementsByTagName('li');
    for (var i = 0; i < todo_list_li.length; i++) {
        var input_text = todo_list_li[i].getElementsByTagName('input')[1];
        input_text.ondblclick = todo_dblclick;
        // onblur can only use in input tag !!!
        input_text.onblur = todo_blur;

        addDrop(todo_list_li[i]);
    }

};