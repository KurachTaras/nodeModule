const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddleware } = require('../middleware/');

router.get('/', userController.getAllUsers);

router.post(
    '/',
    userMiddleware.isNewUserValid,
    userMiddleware.checkIsEmailUnique,
    userController.createUser
);

router.get(
    '/:userId',
    userMiddleware.isUserIdValid,
    userMiddleware.getUserDynamically('userId', 'params', '_id'),
    userController.getUserById
);

router.put(
    '/:userId',
    userMiddleware.isUserIdValid,
    userMiddleware.isEditUserValid,
    userMiddleware.getUserDynamically('userId', 'params', '_id'),
    userController.updateUser
);

router.delete(
    '/:userId',
    userMiddleware.isUserIdValid,
    userController.deleteUser
);

module.exports = router;