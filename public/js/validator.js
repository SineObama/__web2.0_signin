/* each validator recieve an object (with the legal property name),
 * or the information itself in string */

var informationForm = informationForm || (typeof require !== 'undefined' && require('./userInformationForm.js'));

if (typeof module !== 'undefined')
  module.exports = new createValidator();

function createValidator() {

  var validator = this;

  for (var i = informationForm.nameArray.length - 1; i >= 0; i--) {
    var name = informationForm.nameArray[i];
    validator[name] = createChecker(informationForm[name]);
  }
  validator.passwordConfirm = function(data) {
    return data.password === data.passwordConfirm ? Promise.resolve(data) : Promise.reject('密码不一致');
  };

  validator.information = function(user) {
    return validator.username(user || {}).then(validator.password).then(validator.passwordConfirm).then(validator.id).then(validator.phone).then(validator.mail);
  }

  function createChecker(formData) {
    if (!formData)
      return function() {}
    return function(data) {
      if (typeof data === 'object') {
        if (!data[formData.name])
          return Promise.reject(formData.chineseName + '为空');
        if (!data[formData.name].match(formData.expression))
          return Promise.reject(formData.chineseName + '必须是' + formData.rule);
        return Promise.resolve(data);
      }
      if (!data)
        return Promise.reject(formData.chineseName + '为空');
      if (!data.match(formData.expression))
        return Promise.reject(formData.chineseName + '必须是' + formData.rule);
      return Promise.resolve();
    };
  }

}
