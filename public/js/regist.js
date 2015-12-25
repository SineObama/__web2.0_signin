var validator = new createValidator();

$(function() {

  var namespace = ['username', 'password', 'id', 'phone', 'mail', 'passwordConfirm'];
  var validation = {};
  _.times(namespace.length, function(i) {
    var name = namespace[i];
    $('#' + name).on('blur', function() {
      if ($(this).val() === '' && name !== namespace[namespace.length - 1]) {
        validation[name].valid = false;
        return;
      }
      validator[name + 'Checker']($(this).val(), (name === namespace[namespace.length - 1] ?
          $('#password').val() : ''))
        .then(function() {
          validation[name].valid = true;
          $('#' + name + 'Msg').text('');
        }).catch(function(msg) {
          validation[name].valid = false;
          $('#' + name + 'Msg').text(msg);
        });
    });
    validation[name] = {
      name: name,
      valid: false
    };
  });

  // todo this just fresh the data at the beginning, in case of '后退'
  _.times(namespace.length, function(i) {
    $('#' + namespace[i]).trigger('blur');
  })

  $('#submit').click(function() {
    var submitable = true;
    _.times(namespace.length, function(i) {
      if (!validation[namespace[i]].valid)
        return submitable = false;
    });
    return submitable;
  });

});
