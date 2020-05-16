module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '123456',
    DIALECT: 'sqlite',
    DB: {
        NAME: 'image_tagger',
        PROVIDER: 'sqlite::memory',
    },
    POOL: {
        MAX: 5,
        MIN: 0,
        ACQUIRE: 30000,
        IDLE: 10000
    },
};
