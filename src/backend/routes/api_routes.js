const AppController = require("../controllers/App/AppController");

module.exports = (router) => {
  router.post("/add-company", AppController.addCompany);
  router.get("/get-company-data", AppController.getCompanyData);
};
