$(function() {
    $('#submit').click(function() {
        if (!$('#username').val().match(/^[a-z][a-z0-9_]{5,17}$/i)) {
            alert('用户名必须是6~18位英文字母、数字或下划线，必须以英文字母开头');
            return false;
        }
        if (!$('#password').val().match(/^[0-9a-zA-Z\-_]{6,12}$/)) {
            alert('密码为6~12位数字、大小写字母、中划线、下划线');
            return false;
        }
        return true;
    });
});
