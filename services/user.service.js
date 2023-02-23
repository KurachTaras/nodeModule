const User = require('../dataBase/User');

module.exports = {
    findByParams: async (filter = {}) => {
        return User.find(filter);
    },

    findOneByParams: async (filter = {}) => {
        return User.findOne(filter);
    },

    updateOne: async (userId, newUserInfo) => {
        return User.findByIdAndUpdate(userId, newUserInfo);
    },

    findByIdWithCars: async (userId) => {
       const userWithCars = await User.aggregate([
           {
               $match : {
                   _id: userId
               }
           },
           {
               $lookup: {
                   from: 'cars',
                   localField: '_id',
                   foreignField: 'user',
                   as: 'cars'
               }
           }
       ]);

       return userWithCars[0];
    },

    create: async (userInfo) => {
        return User.create(userInfo);
    },

    deleteOne: async (userid) => {
        return User.deleteOne({_id: userid});
    },
}
