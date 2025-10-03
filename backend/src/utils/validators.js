const { body } = require('express-validator');

const userValidation = [
  body('name').isLength({ min: 20, max: 60 }).withMessage('Name must be between 20-60 characters'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/)
    .withMessage('Password must be 8-16 characters with uppercase and special character'),
  body('address').isLength({ max: 400 }).withMessage('Address must be max 400 characters')
];

const storeValidation = [
  body('name').isLength({ min: 20, max: 60 }).withMessage('Store name must be between 20-60 characters'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('address').isLength({ max: 400 }).withMessage('Address must be max 400 characters'),
  body('owner_id').isInt().withMessage('Owner ID must be a valid integer')
];

const passwordValidation = [
  body('password').matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/)
    .withMessage('Password must be 8-16 characters with uppercase and special character')
];

module.exports = { userValidation, storeValidation, passwordValidation };