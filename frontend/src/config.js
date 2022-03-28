var config = {
    BACKEND_HOST : process.env.NODE_ENV === 'production' ? 'vps2644.directvps.nl' : '127.0.0.1',
    BACKEND_PORT : '3000'
}

module.exports = config;