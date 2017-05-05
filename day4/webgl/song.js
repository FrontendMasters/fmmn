var ms = [800,400,500,300]

module.exports = function (t) {
  var m = ms[Math.floor(t*8)%ms.length]
  return 0
    + sin_(sin(100)+sin(50),sin(8)*0.1+1)
      * Math.pow((1-saw(2)*0.5-saw(8)*0.5)*0.5,12+sin(1)*8)
    + clamp(sin_(sin(m)+sin(1),sin(1)*0.2+saw(2)*0.4+.2)*0.1
      * Math.pow(((1-saw(4))*.5),8)*8)*.5

  function tri_ (x,t) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1 }
  function tri (x) { return tri_(x,t) }
  function saw_ (x,t) { return t%(1/x)*x*2-1 }
  function saw (x) { return saw_(x,t) }
  function sin_ (x,t) { return Math.sin(2 * Math.PI * t * x) }
  function sin (x) { return sin_(x,t) }
  function sq_ (x,t) { return t*x % 1 < 0.5 ? -1 : 1 }
  function sq (x) { return sq_(x,t) }
  function clamp (x) { return Math.max(-1,Math.min(1,x)) }
}
