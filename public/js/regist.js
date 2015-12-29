var validator = new createValidator();

$(function() {

  var validation = {};
  const nameArray = informationForm.nameArray.slice(0);
  nameArray.push('passwordConfirm');
  var data = {};

  _.times(nameArray.length, function(i) {
    const name = nameArray[i];
    validation[name] = false;
    data[name] = $('#' + name).val();
    $('#' + name).on('blur', function() {
      const that = this;
      data[name] = $(that).val();
      if (name !== 'passwordConfirm') {
        if ($(that).val() === '') {
          validation[name] = false;
          return;
        }
        check(name).catch(function() {});
      }
    });
  });

  $('#password').on('blur', function() {
    const that = this;
    validator['password'](data).then(function() {
      if ($('#passwordConfirm').val())
        check('passwordConfirm');
    }).catch(function() {});
  });

  $('#passwordConfirm').on('blur', function() {
    const that = this;
    if ($('#password').val())
      validator['password'](data).then(function() {
        check('passwordConfirm');
      }).catch(function() {});
  });

  // this just fresh the data at the beginning, in case of '后退'
  _.times(nameArray.length, function(i) {
    $('#' + nameArray[i]).trigger('blur');
  })

  $('#submit').on('click', function() {
    validator.information(data).then(function() {
      $('#msg2').text('');
    }).catch(function(err) {
      $('#msg2').text(err);
    });
    var submitable = true;
    _.times(nameArray.length, function(i) {
      if (!validation[nameArray[i]]) {
        submitable = false;
        return false;
      }
    });
    return submitable;
  });

  $('#reset').on('click', function() {
    $('.input').val('');
    _.times(nameArray.length, function(i) {
      validation[nameArray[i]] = false;
    });
    return false;
  });

  function check(name) {
    return validator[name](data).then(function() {
      validation[name] = true;
      $('#' + name).parent().next().text('');
    }).catch(function(msg) {
      validation[name] = false;
      $('#' + name).parent().next().text(msg);
    });
  }

});
