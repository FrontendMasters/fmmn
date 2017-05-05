module.exports = function (bus, state) {
  bus.on('set-visitors', function (n) {
    state.visitors = n
    bus.emit('update')
  })
  bus.on('increment-x', function () {
    state.x = (state.x + 1) % 4
    bus.emit('update')
  })
}
