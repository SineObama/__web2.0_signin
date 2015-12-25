function createValidator() {

  this.usernameChecker = createChecker('用户名', /^[a-z][a-z0-9_]{5,17}$/i, '用户名必须是6~18位英文字母、数字或下划线，必须以英文字母开头');
  this.passwordChecker = createChecker('密码', /^[0-9a-zA-Z\-_]{6,12}$/, '6~12位数字、大小写字母、中划线、下划线');
  this.idChecker = createChecker('学号', /^[1-9][0-9]{7}$/, '8位数字，不能以0开头');
  this.phoneChecker = createChecker('电话', /^[1-9][0-9]{10}$/, '11位数字，不能以0开头');
  this.mailChecker = createChecker('邮箱', /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/, '合法的');

  this.informationChecker = function(user) {
    user = user || {};
    return this.usernameChecker(user.username).then(function() {
      return this.idChecker(user.id);
    }).then(function() {
      return this.phoneChecker(user.phone);
    }).then(function() {
      return this.mailChecker(user.mail);
    });
  }

  this.passwordConfirmChecker = function(confirm, password) {
    return new Promise(function(res, rej) {
      if (password === confirm)
        res();
      rej('密码不一致');
    });
  }

  function createChecker(chineseName, expression, rule) {
    return function(data) {
      return new Promise(function(res, rej) {
        if (!data)
          rej(chineseName + '为空');
        if (!data.match(expression))
          rej(chineseName + '必须是' + rule);
        res();
      });
    };
  }

}

if (typeof module !== 'undefined')
  module.exports = new createValidator;
