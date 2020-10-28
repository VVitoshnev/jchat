export const Socket = (function () {
    let connectInstance;

    const connect = () => {
        connectInstance = io.connect('http://35.157.80.184:8080');
    }

    const noInstanceError = () => {
        console.error('Socket instance is not exists')
    }

    const createEventListener = (eventNme, listener) => {
        if (!connectInstance) {
            noInstanceError()
            return null
        }

        connectInstance.on(eventNme, function (data) {
            listener(data)
        });
    }

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
                noInstanceError()
                return null
            }

            return connectInstance.emit('message', { user, message })
        },
    };
})();
