const { body, validationResult } = require('express-validator');

// ...

const createItemValidator = [
    body('name').notEmpty().withMessage('Item name is required'),
    body('status').notEmpty().withMessage('Item status is required'),
];

const updateItemValidator = [
    body('name').notEmpty().withMessage('Item name is required'),
    body('status').notEmpty().withMessage('Item status is required'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// ...

module.exports = {
    createItemValidator,
    updateItemValidator,
    validate,
};
