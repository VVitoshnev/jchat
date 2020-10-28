export const ChatStatus = (function () {
  const chatStatusNode = document.getElementsByClassName('connectStatus')[0];

  return {
    setConnectedStatus: () => {
      chatStatusNode.innerHTML = '<div class="connectStatus_icon connectStatus_connected"></div>';
    },
    setDisconnectedStatus: () => {
      chatStatusNode.innerHTML = '<div class="connectStatus_icon connectStatus_disconnected"></div>';
    },
    setReconnectStatus: () => {
      chatStatusNode.innerHTML = '<div class="connectStatus_icon connectStatus_connecting"></div>';
    },
    setReconnectFailedStatus: () => {
      chatStatusNode.innerHTML = '<div class="connectStatus_icon connectStatus_disconnected"></div>';
    },
  };
}());
