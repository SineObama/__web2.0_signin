var title = '\n\n    fatalError: ';

module.exports = function(err) {
  console.error(title + err);
  if (typeof err == 'object')
    console.error(err.stack);
  process.exit(1);
}
