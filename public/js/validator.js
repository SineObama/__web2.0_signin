function createValidator() {

  var validator = this;

  validator.username = createChecker('username', '用户名', /^[a-z][a-z0-9_]{5,17}$/i, '用户名必须是6~18位英文字母、数字或下划线，必须以英文字母开头');
  validator.password = createChecker('password', '密码', /^[0-9a-zA-Z\-_]{6,12}$/, '6~12位数字、大小写字母、中划线、下划线');
  validator.id = createChecker('id', '学号', /^[1-9][0-9]{7}$/, '8位数字，不能以0开头');
  validator.phone = createChecker('phone', '电话', /^[1-9][0-9]{10}$/, '11位数字，不能以0开头');
  validator.mail = createChecker('mail', '邮箱', /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/, '合法的');
  validator.passwordConfirm = function(data, password) {
    if (typeof data === 'object')
      return data.password === data.passwordConfirm ? Promise.resolve() : Promise.reject('密码不一致');
    return password === data ? Promise.resolve() : Promise.reject('密码不一致');
  };

  validator.information = function(user) {
    return validator.username(user || {}).then(validator.id).then(validator.phone).then(validator.mail);
  }

  function createChecker(varName, chineseName, expression, rule) {
    return function(data) {
      if (typeof data === 'object') {
        if (!data[varName])
          return Promise.reject(chineseName + '为空');
        if (!data[varName].match(expression))
          return Promise.reject(chineseName + '必须是' + rule);
        return Promise.resolve(data);
      }
      if (!data)
        return Promise.reject(chineseName + '为空');
      if (!data.match(expression))
        return Promise.reject(chineseName + '必须是' + rule);
      return Promise.resolve();
    };
  }

}

if (typeof module !== 'undefined')
  module.exports = new createValidator;
