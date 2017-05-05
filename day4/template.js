var n = 5
console.log(tag`hi
  n=${n}
  wow`)
  
function tag (strings) {
  return arguments
}
