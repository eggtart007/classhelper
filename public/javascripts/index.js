sidebar = false;
$(document).ready(function () {
    var trigger = $('.hamburger');

    if (document.body.clientWidth >= 768) {
    	$('#wrapper').toggleClass('toggled');
        sidebar = true;
    }

    contentResize();

    trigger.click(function () {
      $('#wrapper').toggleClass('toggled');
      sidebar = !sidebar;
      contentResize();
    });

    window.onresize = function(){
        if (document.body.clientWidth >= 768 && sidebar == false) {
            $('#wrapper').toggleClass('toggled');
            sidebar = true;
        }
        else if (document.body.clientWidth < 768 && sidebar == true) {
            $('#wrapper').toggleClass('toggled');
            sidebar = false;
        }
        contentResize();
    }

    $('#rightpage').click(function() {
        if (document.body.clientWidth < 768 && sidebar) {
            $('#wrapper').toggleClass('toggled');
            sidebar = false;
            contentResize();
        }
    });


});

function contentResize() {
    $('#rightpage')[0].style.width = document.body.clientWidth - (sidebar ? 240 : 0) + 'px';
}

lc = function loadContent(content) {
    contentstack = window.contentstack || [];
    if (content == '.') {
        content = contentstack[contentstack.length-1];
    } else if (content == '..') {
        contentstack.pop();
        content = contentstack[contentstack.length-1];
    } else if (content != contentstack[contentstack.length-1]) {
        contentstack.push(content);
    }
    $.get('/home/'+content).complete(function(res) {
        $('#content').html(res.responseText);
    });
}


function formSubmit() {
    $.post($("#contentForm")[0].action, $("#contentForm").serialize())
    .complete(function(res) {
        $('#content').html(res.responseText);
    });

    return false;
};

function setEditable() {
        //设置表格可编辑
    var trs = $('#stutable')[0].getElementsByTagName("tr");
    var trLength = trs.length;
    for (var i = 1; i < trLength; i ++) {
        var td = trs[i].getElementsByTagName("td");
        td[0].setAttribute("contentEditable", "true");
        td[1].setAttribute("contentEditable", "true");
    }
}

function getstudents() {
    var list = [];
    var trs = $('#stutable')[0].getElementsByTagName("tr");

    for (var i = 1; i < trs.length; i++) {
        var td = trs[i].getElementsByTagName("td");
        list.push([td[0].innerText,td[1].innerText]);
    }

    document.getElementById("stulistinput").value = JSON.stringify(list);
}

function addstudent() {
    var table = $('#stutable')[0];
    var trs = $('#stutable')[0].getElementsByTagName("tr");

    var tr = table.insertRow(trs.Length);
    var td0 = tr.insertCell(0);
    var td1 = tr.insertCell(1);

    td0.innerText = "请输入姓名。。";
    td1.innerText = "请输入学号。。";
}
