const { carService, userService} = require('../services');

module.exports = {
    getAllCars: async (req, res, next) => {
        try {
            const cars = await carService.findByParams();

            res.json(cars);
        } catch (e) {
            next(e);
        }
    },

    findOne: async (req, res, next) => {
        try {
            const { carId } = req.params;

            const car = await carService.findOneByIdWithUser(carId);

            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const car = await carService.create(req.body);

            res.status(201).json(car);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { carId } = req.params;

            await carService.deleteOne(carId);

            res.status(204).json('Deleted')
        } catch (e) {
            next(e);
        }
    },
};