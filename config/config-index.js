const userInfo = require('./config');

module.exports = {
  getDbConnectionString: function () {
    return `mongodb://${userInfo.username}:${userInfo.password}@ds211029.mlab.com:11029/manhang-irv`
  }
}