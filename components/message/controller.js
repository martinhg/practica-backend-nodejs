const store = require('./store');
const config = require('../../config');
const { socket } = require('../../socket');

function addMessage(chat, user, message, file) {

    return new Promise( (resolve, reject) => {
        if (!chat || !user || !message) {
            return reject('Los datos son incorrectos');
        }

        let fileUrl = '';
        if (file) {
            fileUrl = config.host + ':' + config.port + '/app/files/' + file.filename;
        }

        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileUrl
        };

        store.add(fullMessage);

        socket.io.emit('message', fullMessage);

        resolve(fullMessage);
    });
}

function getMessages(filterUser) {
    return new Promise( (resolve, reject) => {
        resolve(store.list(filterUser));
    });
}

function updateMessage(id, message) {
    return new Promise( async (resolve, reject) => {
        if (!id || !message) {
            return reject('Invalid data');
        }

        const result = await store.updateText(id, message);

        resolve(result);
    })
}


function deleteMessage(id) {
    return new Promise( (resolve, reject) => {
        if (!id) {
            reject('Id invalido');
        }

        store.remove(id)
            .then( () => {
                resolve();
            })
            .catch( error => {
                reject(error);
            });
    });
}
module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
};