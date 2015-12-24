
function studentData() {
    var data = [];

    this.addStudent = function(username, id, phone, mail) {
        // todo need check?
        var message = this.checkValidation(username, id, phone, mail);
        if (message === '')
            data.push(new student(username, id, phone, mail));
        return message;
    }

    this.getDataByUsername = function(username) {
        log('try to get username: ' + username);
        var student = null;
        for (var i = data.length - 1; i >= 0; i--) {
            if (data[i].username === username) {
                student = data[i];
                break;
            }
        }
        if (!student) {
            log('could not found username: ' + username);
            // todo exception
            return;
        }
        log('found username: ' + username);
        return student;
    }

    this.checkValidation = function(username, id, phone, mail) {
        if (!username)
            return '用户名为空';
        if (!username.match(/^[a-z][a-z0-9_]{5,17}$/i))
            return '用户名必须是6~18位英文字母、数字或下划线，必须以英文字母开头';
        for (var i = data.length - 1; i >= 0; i--)
            if (data[i].username === username)
                return '用户名已存在';
        if (!id)
            return '学号为空';
        if (!id.match(/^[1-9][0-9]{7}$/))
            return '学号必须是8位数字，不能以0开头';
        for (var i = data.length - 1; i >= 0; i--)
            if (data[i].id === id)
                return '学号已存在';
        if (!phone)
            return '电话为空';
        if (!phone.match(/^[1-9][0-9]{10}$/))
            return '电话必须是11位数字，不能以0开头';
        for (var i = data.length - 1; i >= 0; i--)
            if (data[i].phone === phone)
                return '电话已存在';
        if (!mail)
            return '邮箱为空';
        if (!mail.match(/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/))
            return '邮箱不合法';
        for (var i = data.length - 1; i >= 0; i--)
            if (data[i].mail === mail)
                return '邮箱已存在';
        return '';
    }

    function student(username, id, phone, mail) {
        this.username = username;
        this.id = id;
        this.phone = phone;
        this.mail = mail;
    }
}

module.exports = new studentData();
