const userInfo = require('./config'); //config.js : {userName, password}

module.exports = {
  getDbConnectionString: function () {
    return `mongodb://${userInfo.username}:${userInfo.password}@ds211029.mlab.com:11029/manhang-irv`
  }
}