const express = require('express');
const { createItem, getItems, updateItem, deleteItem } = require('../controllers/itemController');

const router = express.Router();

const useSocket = (handler) => (req, res) => handler(req, res, req.app.get('io'));

router.post('/items', useSocket(createItem));
router.get('/items', useSocket(getItems));
router.put('/items/:id', useSocket(updateItem));
router.delete('/items/:id', useSocket(deleteItem));

module.exports = router;