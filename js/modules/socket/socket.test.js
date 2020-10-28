import {
  io as mockedIo, cleanEvents, serverSocket, clientSocket,
} from './io.mock.js';
import { Socket } from './socket.js';

global.io = mockedIo;

describe('connect', () => {
  afterEach(() => {
    cleanEvents();
  });

  it('connects to server', () => {
    const connectFn = mockedIo.connect;
    mockedIo.connect = jest.fn();

    Socket.connect();

    expect(mockedIo.connect).toHaveBeenCalled();
    mockedIo.connect = connectFn;
  });

  it('adds connect callbacks and calls them', () => {
    jest.clearAllMocks();
    const onConnect = jest.fn();
    const onDisconnect = jest.fn();
    const onReconnect = jest.fn();
    const onReconnectFailed = jest.fn();
    const onConnectFailed = jest.fn();

    Socket.connect();
    Socket.onConnect(onConnect);
    Socket.onDisconnect(onDisconnect);
    Socket.onReconnect(onReconnect);
    Socket.onReconnectFailed(onReconnectFailed);
    Socket.onConnectFailed(onConnectFailed);

    ['connect', 'disconnect', 'reconnecting', 'reconnect_error', 'connect_failed'].forEach((event) => {
      serverSocket.emit(event);
    });

    expect(onConnect).toHaveBeenCalled();
    expect(onDisconnect).toHaveBeenCalled();
    expect(onReconnect).toHaveBeenCalled();
    expect(onReconnectFailed).toHaveBeenCalled();
    expect(onReconnectFailed).toHaveBeenCalled();
    expect(onConnectFailed).toHaveBeenCalled();
  });

  it('receives messages', () => {
    const oMessage = jest.fn();
    const message = {
      user: 'userName',
      msg: 'message',
    };

    Socket.connect();
    Socket.onMessage(oMessage);
    serverSocket.emit('message', message);
    expect(oMessage).toHaveBeenCalledWith(message);
  });

  it('sends messages', () => {
    clientSocket.on('message', jest.fn());
    clientSocket.emit = jest.fn();
    const message = {
      user: 'userName',
      message: 'message',
    };
    Socket.connect();
    Socket.sendMessage(message);
    expect(clientSocket.emit).toHaveBeenCalledWith('message', message);
  });
});
