var valid = function() {
  return new Promise(function(res, rej) {
    res();
  }).then(function(data) {
    console.log('can\'t see me' + data);
    return new Promise(function(res, rej) {
      res('second Promise');
    });
  }).then(function(data) {
    data = new Promise(function(res, rej) {
      res('third Promise');
    });
    data ? console.log(data + 'eeeeeeeeeee') : 0;
  });
}

valid().catch(function(err) {
  console.log(err + 'uivbvh');
})

