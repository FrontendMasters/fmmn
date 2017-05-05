module.exports = function (n, cb) {
  setTimeout(function () {
    if (n == 5) cb(null, 555)
    else cb(null, n*111)
  }, 500)
}
