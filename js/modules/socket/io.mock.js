let EVENTS = {};

function emit(event, ...args) {
    EVENTS[event].forEach(func => func(...args));
}

export const clientSocket = {
    on(event, func) {
        if (EVENTS[event]) {
            return EVENTS[event].push(func);
        }

        EVENTS[event] = [func];
    },
    emit
};

export const io = {
    connect: () => {
        return clientSocket;
    }
};

export const serverSocket = { emit };

export function cleanEvents() {
    EVENTS = {};
}
