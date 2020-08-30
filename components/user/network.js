const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', (req, res) => {
    controller.listUsers()
        .then( users => {
            response.success(req, res, users, 200);
        })
        .catch( error => {
            response.error(req, res, 'Internal error', 500, error);
        });
});

router.post('/', (req, res) => {
    controller.addUser(req.body.name)
        .then( data => {
            response.success(req, res, data, 201);
        })
        .catch( error => {
            response.error(req, res, 'Internal error', 500, error);
        })
});

module.exports = router;
