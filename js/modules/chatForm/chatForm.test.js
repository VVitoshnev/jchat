import { ChatForm } from './chatForm.js';

const elements = {
    chatForm: null,
    form: null,
    chatInputUser: null,
    chatInputMessage: null,
};

describe('onMessage callback', () => {
    beforeEach(() => {
        elements.chatForm = document.getElementsByClassName('chat_form')[0];
        elements.form = elements.chatForm.getElementsByClassName('form')[0];
        elements.chatInputUser = elements.chatForm.getElementsByClassName('input_name')[0];
        elements.chatInputMessage = elements.chatForm.getElementsByClassName('input_message')[0];
    });

    afterEach(() => {
        elements.chatForm = null;
        elements.form = null;
        elements.chatInputUser = null;
        elements.chatInputMessage = null;
    });

    it('calls a callback function on valid submit', function() {
        const callback = jest.fn();

        elements.chatInputUser.value = 'user name';
        elements.chatInputMessage.value = 'description';
        ChatForm.setIsConnected(true);
        ChatForm.onMessage(callback);

        elements.form.submit();

        expect(callback.mock.calls.length).toBe(1);
    });

    it('does not call a callback function when status is not connect', function() {
        const callback = jest.fn();

        elements.chatInputUser.value = 'user name';
        elements.chatInputMessage.value = 'description';
        ChatForm.setIsConnected(false);
        ChatForm.onMessage(callback);

        elements.form.submit();

        expect(callback.mock.calls.length).toBe(0);
    });

    it('doesnt call a callback function if submit data is invalid', function() {
        const callback = jest.fn();
        ChatForm.setIsConnected(true);
        ChatForm.onMessage(callback);
        elements.chatInputUser.value = '';
        elements.chatInputMessage.value = '';
        elements.form.submit();
        expect(callback.mock.calls.length).toBe(0);

        elements.chatInputUser.value = 'user name';
        elements.chatInputMessage.value = '';
        elements.form.submit();
        expect(callback.mock.calls.length).toBe(0);

        elements.chatInputUser.value = '';
        elements.chatInputMessage.value = 'message';
        elements.form.submit();
        expect(callback.mock.calls.length).toBe(0);
    });

    it('sets correct error states for inputs if submit data is invalid', function() {
        const callback = jest.fn();
        ChatForm.setIsConnected(true);
        ChatForm.onMessage(callback);
        elements.chatInputUser.value = '';
        elements.chatInputMessage.value = '';
        elements.form.submit();
        const userErrorClassIndex = elements.chatInputUser.className.indexOf('input_error')
        const messageErrorClassIndex = elements.chatInputMessage.className.indexOf('input_error')
        expect(userErrorClassIndex).toBeGreaterThan(-1);
        expect(messageErrorClassIndex).toBeGreaterThan(-1);
    });
});
