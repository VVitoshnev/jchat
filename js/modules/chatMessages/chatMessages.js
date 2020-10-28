export const ChatMessages = (function() {
    let user;

    const chatMessagesNode = document.getElementsByClassName('chat_messages')[0];

    const createNode = (htmlString) => {
        const messageElement = document.createElement('template');
        messageElement.innerHTML = htmlString;

        return messageElement.content.childNodes[0];
    }

    const createMessageHtmlString = ({ user, message, isIncome, status }) => `<div
            class="chat_message message ${isIncome ? `message-income` : 'message-outcome'} ${status ? `message_${status}` : ''}"
        >
            ${isIncome ? `<div class="message_name">${user}:</div>` : ''}
            <div class="message_text">${message}</div>
        </div>`

    return {
        setCurrentUser: (userName) => {
            user = userName;
        },
        addMessage: (data) => {
            const htmlString = createMessageHtmlString({
                ...data,
                isIncome: user !== data.user
            })
            const messageNode = createNode(htmlString);
            chatMessagesNode.appendChild(messageNode)
            chatMessagesNode.scrollTop = chatMessagesNode.scrollHeight;

            return messageNode;
        },
    }
})()
