const AppController = require("../controllers/App/AppController");

module.exports = (router) => {
  router.post("/add-example", AppController.example);
};
