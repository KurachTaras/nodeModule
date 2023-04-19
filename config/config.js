module.exports = {
    PORT: process.env.PORT || 5000,
    DB_PASSWORD: process.env.DB_PASSWORD || '4234242',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/test',

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'serretWord',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'secretRefreshWord',
}