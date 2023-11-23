const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const port = process.env.PORT || 3001;

let curHealth = 800;
let nLocked = 3;
let nPC = 9;

const locks = () => {
  const newLocks = [];
  for (let i = 0; i < nLocked; i++) {
    let n = Math.floor(Math.random() * nPC);
    while(true) {
      n = Math.floor(Math.random() * nPC);
      if (newLocks.indexOf(n) === -1) break;
    }
    newLocks.push(n);
  }
  return newLocks;
}
let curLocked = locks();
let nextLocked = locks();

setInterval(() => {
  if(curHealth !== -100) {
    curLocked = nextLocked;
    nextLocked = locks();
    console.log("Locks:", curLocked, nextLocked);
    io.emit('locks', curLocked);
    io.emit('nextLocks', nextLocked);
  }
}, 10000);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.emit('health', curHealth);
  io.emit('locks', curLocked);
  io.emit('nextLocks', nextLocked);
});

const OSC = require('osc-js');
const osc = new OSC({
  plugin: new OSC.DatagramPlugin()
});

const HEALTS = {
  0: 800,
  1: 500,
  2: 200,
  3: 50,
  4: -100,
}

osc.on('/phase', (message, rinfo) => {
  const phase = message.args[0];
  console.log(phase);
  curHealth = HEALTS[phase];
  console.log(curHealth)
  io.emit('phase', phase);
  if(phase == 4) {
    curLocked = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    io.emit('locks', curLocked);
  }
  io.emit('health', curHealth);
})

osc.on('*', message => {
  console.log(message)
})

osc.open({ port: 9000 })

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});