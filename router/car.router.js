const router = require('express').Router();

const { carController } = require("../controller");
const { carMiddleware } = require('../middleware/');

router.get(
    '/',
    carController.getAllCars
);

router.post(
    '/',
    // carMiddleware.isNewCarValid,
    carController.createCar
);

router.get(
    '/:carId',
    carMiddleware.isCarIdValid,
    carMiddleware.getCarDynamically('carId', 'params', '_id'),
    carController.findOne
);

router.delete(
    '/:carId',
    carMiddleware.isCarIdValid,
    carController.deleteCar
);

module.exports = router;