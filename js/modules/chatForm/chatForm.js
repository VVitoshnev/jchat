export const ChatForm = (function () {
  let isConnected;
  const chatForm = document.getElementsByClassName('chat_form')[0];
  const form = chatForm.getElementsByClassName('form')[0];
  const chatInputUser = chatForm.getElementsByClassName('input_name')[0];
  const chatInputMessage = chatForm.getElementsByClassName('input_message')[0];
  chatInputUser.focus();

  const cleanInput = (str) => {
    const text = document.createTextNode(str.trim());
    const p = document.createElement('p');
    p.appendChild(text);
    return p.innerHTML;
  };

  const validate = (user, message) => {
    let hasErrors = false;
    const errors = {};
    if (!user) {
      hasErrors = true;
      errors.user = 'User is not defined';
    }

    if (!message) {
      hasErrors = true;
      errors.message = 'Message is not defined';
    }

    return hasErrors ? errors : null;
  };

  const showFormErrors = (errors) => {
    if (errors.user) {
      chatInputUser.classList.add('input_error');
    }

    if (errors.message) {
      chatInputMessage.classList.add('input_error');
    }

    if (errors.user) {
      chatInputUser.focus();
    } else if (errors.message) {
      chatInputMessage.focus();
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  return {
    onMessage: (listener) => {
      form.addEventListener('submit', () => {
        const user = cleanInput(chatInputUser.value);
        const message = cleanInput(chatInputMessage.value);
        const errors = validate(user, message);

        if (errors) {
          return showFormErrors(errors);
        } if (isConnected) {
          chatInputMessage.value = '';
          chatInputMessage.focus();
          return listener({ user, message });
        }

        return null;
      });
    },
    setIsConnected: (value) => {
      isConnected = value;
    },
  };
}());
