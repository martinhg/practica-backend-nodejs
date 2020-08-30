const express = require('express');
const multer = require('multer');
const path = require("path")
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

const storage = multer.diskStorage({
    destination : "public/files/",
    filename : function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + 
        path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
});

router.get('/', (req, res) => {
    const filterMessages = req.query.chat || null;
    controller.getMessages(filterMessages)
        .then( (messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch( e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        });
});

router.post('/', upload.single('file'), (req, res) => {
    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
        .then( (fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        .catch( e => {
            response.error(req, res, 'Información invalida', 400, 'Error al guardar el mensaje');
        });
});

router.patch('/:id', (req, res) => {
    controller.updateMessage(req.params.id, req.body.message)
        .then( (data) => {
            response.success(req, res, data, 200);
        })
        .catch( error => {
            response.error(req, res, 'Error interno', 500, error);
        });
});

router.delete('/:id', (req, res) => {
    controller.deleteMessage(req.params.id)
        .then( () => {
            response.success(req, res, `Mensaje ${req.params.id} eliminado`, 200);
        })
        .catch( error => {
            response.error(req, res, 'Error interno', 500, error);
        });
});

module.exports = router;
