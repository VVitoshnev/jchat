import { Socket } from './modules/socket/socket.js'
import { ChatMessages } from './modules/chatMessages/chatMessages.js'
import { ChatForm } from './modules/chatForm/chatForm.js'
import { ChatStatus } from './modules/chatStatus/chatStatus.js'

function init() {
    ChatStatus.setDisconnectedStatus();
    ChatForm.setIsConnected(false);
    Socket.connect();

    Socket.onConnect(() => {
        ChatStatus.setConnectedStatus();
        ChatForm.setIsConnected(true);
        Socket.onMessage((data) => {
            if (data && data.user && data.message) {
                ChatMessages.addMessage({
                    user: data.user,
                    message: data.message,
                });
            }
        })
    })
    Socket.onDisconnect(() => {
        ChatForm.setIsConnected(false);
        ChatStatus.setDisconnectedStatus();
    })
    Socket.onConnectFailed(() => {
        ChatStatus.setDisconnectedStatus();
    })
    Socket.onReconnect(() => {
        ChatStatus.setReconnectStatus();
    })
    Socket.onReconnectFailed(() => {
        ChatStatus.setReconnectFailedStatus();
    })

    ChatForm.onMessage((data) => {
        ChatMessages.setCurrentUser(data.user);
        Socket.sendMessage({
            user: data.user,
            message: data.message,
        });
    })
}

window.onload = function() {
    init();
}
