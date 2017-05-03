var spawn = require('child_process').spawn
var ps = spawn('grep',['potato'])
ps.stdout.pipe(process.stdout)
ps.stdin.write('cheese\n')
ps.stdin.write('carrots\n')
ps.stdin.write('carrot potatoes\n')
ps.stdin.write('potato!\n')
ps.stdin.end()
