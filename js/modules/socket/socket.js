export const Socket = (function () {
  let connectInstance;

  const connect = () => {
    // eslint-disable-next-line no-undef
    connectInstance = io.connect('http://35.157.80.184:8080');
  };

  const noInstanceError = () => {
    // eslint-disable-next-line no-console
    console.error('Socket instance is not exists');
  };

  const createEventListener = (eventNme, listener) => {
    if (!connectInstance) {
      noInstanceError();
    } else {
      connectInstance.on(eventNme, (data) => {
        listener(data);
      });
    }
  };

  return {
    connect: () => {
      if (!connectInstance) {
        connect();
      }
    },
    onConnect: (listener) => createEventListener('connect', listener),
    onDisconnect: (listener) => createEventListener('disconnect', listener),
    onReconnect: (listener) => createEventListener('reconnecting', listener),
    onReconnectFailed: (listener) => createEventListener('reconnect_error', listener),
    onConnectFailed: (listener) => createEventListener('connect_failed', listener),
    onMessage: (listener) => createEventListener('message', listener),
    sendMessage: ({ user, message }) => {
      if (!connectInstance) {
        noInstanceError();
        return null;
      }

      return connectInstance.emit('message', { user, message });
    },
  };
}());
