const ApiError = require("../error/ApiError");
const { userService } = require("../services");
const { userValidator } = require('../validators');
const commonValidator = require('../validators/common.validators');

module.exports = {
    getUserDynamically: (fieldName, from = 'body', dbField = fieldName) =>  async (req, res, next) => {
        try {
            const fieldToSearch = req[from][fieldName];

            const user = await userService.findOne(dbField, fieldToSearch);

            if(!user) {
                throw new ApiError('User not found', 400);
            }

            req.user = user;

            next()
        }catch (e) {
            next(e);
        }

    },

    checkIsUserExist: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await userService.findOneByParams({ _id: userId });

            if (!user) {
                throw new ApiError(`User with id ${userId} not found`, 404);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsEmailUnique: async (req, res, next) => {
        try {
            const { email } = req.body;

            if(!email) {
                throw new ApiError('Email not present', 400);
            }

            const user = await userService.findOneByParams({ email });

            if(user) {
                throw new ApiError('User with this email already exists', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserIdValid: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const validate = commonValidator.idValidator.validate(userId);

            if(validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            next()
        } catch (e) {
            next(e);
        }
    },

    // isMongoIdValid: async (req, res, next) => {
    //     try {
    //
    //         next()
    //     } catch (e) {
    //         next(e)
    //     }
    // },

    isNewUserValid: async (req, res, next) => {
        try {
            let validate = userValidator.newUserValidator.validate(req.body);

            if(validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            next()
        } catch (e) {
            next(e)
        }
    },

    isEditUserValid: async (req, res, next) => {
        try {
            let validate = userValidator.editUserValidator.validate(req.body);

            if(validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            req.body = validate.value;

            next()
        } catch (e) {
            next(e)
        }
    },

}