const {
    createItemValidator,
    updateItemValidator,
    validate
} = require('../validators/itemValidator');
const express = require('express')
const router = express.Router()
const itemController = require('../controllers/itemController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, itemController.getItems);
router.get('/:id', authMiddleware, itemController.getItemsById);
router.post('/', createItemValidator, validate, authMiddleware, itemController.createItem);
router.put('/:id', updateItemValidator, validate, itemController.updateItem);
router.delete('/:id', itemController.deleteItem);


module.exports = router

