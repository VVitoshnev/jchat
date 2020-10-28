import { ChatMessages } from './chatMessages.js';

const elements = {
  chatMessagesNode: null,
};

describe('addMessage', () => {
  beforeEach(() => {
    elements.chatMessagesNode = document.getElementsByClassName('chat_messages')[0];
  });

  afterEach(() => {
    elements.chatMessagesNode.innerHTML = '';
    elements.chatMessagesNode = null;
  });

  it('adds income message', () => {
    ChatMessages.addMessage({
      user: 'user',
      message: 'message',
    });

    const incomeMessages = document.getElementsByClassName('message-income');
    expect(incomeMessages.length).toBe(1);

    const name = incomeMessages[0].getElementsByClassName('message_name')[0];
    const text = incomeMessages[0].getElementsByClassName('message_text')[0];

    expect(name.innerHTML).toBe('user:');
    expect(text.innerHTML).toBe('message');
  });

  it('defines message source by user name', () => {
    ChatMessages.setCurrentUser('currentUser');
    ChatMessages.addMessage({
      user: 'user',
      message: 'message',
    });

    const incomeMessages = document.getElementsByClassName('message-income');
    expect(incomeMessages.length).toBe(1);
  });

  it('adds outcome message', () => {
    ChatMessages.setCurrentUser('currentUser');
    ChatMessages.addMessage({
      user: 'currentUser',
      message: 'message',
    });

    const incomeMessages = document.getElementsByClassName('message-outcome');
    expect(incomeMessages.length).toBe(1);

    const name = incomeMessages[0].getElementsByClassName('message_name');
    const text = incomeMessages[0].getElementsByClassName('message_text')[0];

    expect(name.length).toBe(0);
    expect(text.innerHTML).toBe('message');
  });
});
