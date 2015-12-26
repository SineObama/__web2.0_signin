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
      if ($(that).val() === '' && name !== 'passwordConfirm') {
        validation[name] = false;
        return;
      }
      check(name);
    });
  });

  $('#password').on('blur', function() {
    const that = this;
    if ($('#passwordConfirm').val())
      check('passwordConfirm');
  });

  // this just fresh the data at the beginning, in case of '后退'
  _.times(nameArray.length, function(i) {
    $('#' + nameArray[i]).trigger('blur');
  })

  $('#submit').on('click', function() {
    // validator.information(data).then(function() {
    //   $.post('http://127.0.0.1:8000/signup', data);
    // }).catch(function(err) {

    // });

    // _.times(nameArray.length, function(i) {
    //   const name = nameArray[i];
    // });
    var submitable = true;
    _.times(nameArray.length, function(i) {
      if (!validation[nameArray[i]])
        return submitable = false;
    });
    return submitable;
  });

  $('#reset').on('click', function() {
    _.times(nameArray.length, function(i) {
      validation[nameArray[i]] = false;
    });
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
