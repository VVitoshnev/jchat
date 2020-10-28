let EVENTS = {};

function emit(event, ...args) {
  EVENTS[event].forEach((func) => func(...args));
}

export const clientSocket = {
  on(event, func) {
    if (EVENTS[event]) {
      EVENTS[event].push(func);
    } else {
      EVENTS[event] = [func];
    }
  },
  emit,
};

export const io = {
  connect: () => clientSocket,
};

export const serverSocket = { emit };

export function cleanEvents() {
  EVENTS = {};
}
