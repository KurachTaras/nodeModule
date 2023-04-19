const User = require('../dataBase/User');

module.exports = {
    findByParams: async (filter = {}) => {
        return User.find(filter);
    },

    findOneByParams: async (filter = {}) => {
        return User.findOne(filter);
    },

    findOne: async (dbField, fieldToSearch) => {
        return User.findOne({[dbField]: fieldToSearch});
    },

    updateOne: async (userId, newUserInfo) => {
        return User.findByIdAndUpdate(userId, newUserInfo);
    },

    findByIdWithCars: async (id) => {
        const res = await User.aggregate([
            {
                $match: {
                    _id: id
                }
            },
            {
                $lookup: {
                    from: 'cars',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'cars',
                }
            }
        ]);

        console.log(res[0]);
        return res[0];
    },

    create: async (userInfo, hashPassword) => {
        return User.create({...userInfo, password: hashPassword});
    },

    deleteOne: async (userid) => {
        return User.deleteOne({_id: userid});
    },
}
