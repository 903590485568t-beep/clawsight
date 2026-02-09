const WebSocket = require('ws');

const ws = new WebSocket('wss://pumpportal.fun/api/data');

let count = 0;

ws.on('open', function open() {
  console.log('Connected');
  ws.send(JSON.stringify({
    method: "subscribeNewToken"
  }));
});

ws.on('message', function message(data) {
  const parsed = JSON.parse(data);
  console.log('received:', JSON.stringify(parsed, null, 2));
  
  if (parsed.mint) {
      count++;
  }
  
  if (count >= 2) {
      ws.close();
  }
});

ws.on('error', function error(err) {
  console.error('Error:', err);
});
