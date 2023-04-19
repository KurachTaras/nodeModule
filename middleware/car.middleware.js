const ApiError = require('../error/ApiError');
const { carService } = require('../services');
const { carValidator}  = require('../validators');
const commonValidator = require("../validators/common.validators");

module.exports = {

    getCarDynamically: (fieldName, from = 'body', dbField) => async (req, res, next) =>{
        try {
            const fieldToSearch = req[from][fieldName];

            const car = await carService.findOne(dbField, fieldToSearch);

            if(!car) {
                throw new ApiError('Car not found', 400);
            }

            req.car = car

            next()
        } catch (e) {
            next(e);
        }
    },

    isCarIdValid: async (req, res, next) => {
        try {
            const { carId } = req.params;

            const validate = commonValidator.idValidator.validate(carId);

            if(validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            next()
        } catch (e) {
            next(e);
        }
    },

    isNewCarValid: async (req, res, next) => {
        try {
            let validate = carValidator.newCarValidator.validate(req.body);

            if(validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            next()
        } catch (e) {
            next(e)
        }
    },
}

