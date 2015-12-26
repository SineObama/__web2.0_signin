/* user information detail also the password */

var informationForm = {
  nameArray: ['username', 'password', 'id', 'phone', 'mail'],
  username: {
    name: 'username',
    chineseName: '用户名',
    expression: /^[a-z][a-z0-9_]{5,17}$/i,
    rule: '用户名必须是6~18位英文字母、数字或下划线，必须以英文字母开头'
  },
  password: {
    name: 'password',
    chineseName: '密码',
    expression: /^[0-9a-zA-Z\-_]{6,12}$/,
    rule: '6~12位数字、大小写字母、中划线、下划线'
  },
  id: {
    name: 'id',
    chineseName: '学号',
    expression: /^[1-9][0-9]{7}$/,
    rule: '8位数字，不能以0开头'
  },
  phone: {
    name: 'phone',
    chineseName: '电话',
    expression: /^[1-9][0-9]{10}$/,
    rule: '11位数字，不能以0开头'
  },
  mail: {
    name: 'mail',
    chineseName: '邮箱',
    expression: /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/,
    rule: '合法的'
  }
}

if (typeof module !== 'undefined')
  module.exports = informationForm;
