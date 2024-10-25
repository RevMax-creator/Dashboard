import io from 'socket.io-client';

const socket = io('https://data.gdscnsut.com');  // Connect to WebSocket API

export const getSocketData = (callback) => {
  socket.on('connect', () => {
    console.log('Connected to socket');
  });

  socket.on('random_number', (data) => {
    console.log('Random number received from socket:', data);  // Log the received data
    callback(data);  // Pass the received data (should have a 'number' field)
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from socket');
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
};