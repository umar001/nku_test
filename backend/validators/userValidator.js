const { Validator } = require('node-input-validator');
const { body, validationResult } = require('express-validator');

// Validation middleware for registering a user
const registerUserValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')

];

// Validation middleware for Login user
const loginUserValidator = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
        .notEmpty().withMessage('Password is required')

];


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};




module.exports = {
    loginUserValidator,
    registerUserValidator,
    validate
};
