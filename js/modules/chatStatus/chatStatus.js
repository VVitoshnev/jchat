export const ChatStatus = (function () {
  const chatStatusNode = document.getElementsByClassName('connectStatus')[0];

  return {
    setConnectedStatus: () => {
      chatStatusNode.innerHTML = '<div class="connectStatus_icon connectStatus_connected"></div>';
    },
    setDisconnectedStatus: () => {
      chatStatusNode.innerHTML = '<div class="connectStatus_icon connectStatus_disconnected"></div>' +
          '<div class="connectStatus_text">Disconnected</div>';

    },
    setReconnectStatus: () => {
      chatStatusNode.innerHTML = '<div class="connectStatus_icon connectStatus_connecting"></div>' +
          '<div class="connectStatus_text">Trying to reconnect...</div>';
    },
    setReconnectFailedStatus: () => {
      chatStatusNode.innerHTML = '<div class="connectStatus_icon connectStatus_disconnected"></div>' +
          '<div class="connectStatus_text">Failed to connect</div>';
    },
  };
}());
