// var socket = io.connect('http://172.18.70.202:8000');
// socket.emit('connection', {hello:'world'});
// socket.on('news', function (data) {
//     alert(data);
// });

$(function() {
    $('#submit').click(function() {
        if (!$('#username').val().match(/^[a-z][a-z0-9_]{5,17}$/i)) {
            alert('用户名必须是6~18位英文字母、数字或下划线，必须以英文字母开头');
            return false;
        }
        if (!$('#id').val().match(/^[1-9][0-9]{7}$/)) {
            alert('学号必须是8位数字，不能以0开头');
            return false;
        }
        if (!$('#phone').val().match(/^[1-9][0-9]{10}$/)) {
            alert('电话必须是11位数字，不能以0开头');
            return false;
        }
        if (!$('#mail').val().match(/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/)) {
            alert('邮箱不合法');
            return false;
        }
        return true;
    });
});