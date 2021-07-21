const socketio = io('http://' + document.domain + ':' + location.port + '/chat');

const chat = document.querySelector('#chat');
const inputMessage = document.querySelector('#message');
const sendMessage = document.querySelector('#send');
const leaveLink = document.querySelector('#leave');

sendMessage.onclick = (event) => {
    let inputMessageValue = inputMessage.value;

    if (inputMessageValue.length == 0) {
        inputMessage.value = 'Type something!';

    } else {
        socketio.emit('message', {message: inputMessageValue});
    }
};

leaveLink.onclick = (event) => {
    socketio.emit('left', {}, () => {
        socketio.disconnect();

        window.location.href = "/leave";
    });
};

socketio.on('connect', () => {
    socketio.emit('joined', {});
});

socketio.on('status', (data) => {
    addMessage(data);
});

socketio.on('message', (data) => {
    addMessage(data);
});


const addMessage = (data) => {
    let objectMessage = document.createElement('li');
    objectMessage.innerHTML = data.message;
    chat.append(objectMessage);
};