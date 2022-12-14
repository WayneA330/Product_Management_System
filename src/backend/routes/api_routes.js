const AppController = require("../controllers/App/AppController");

module.exports = (router) => {
  router.post("/add-company", AppController.addCompany);
  router.get("/get-company-data", AppController.getCompanyData);
  router.post("/deactivate-company/:id", AppController.deactivateCompany);
  router.post("/activate-company/:id", AppController.activateCompany);
  router.post("/edit-company/:id", AppController.editCompany);
  router.get("/get-company-name", AppController.getCompanyName);
  router.post("/add-product", AppController.addProduct);
  router.get("/get-product-data", AppController.getProductData);
  router.post("/delete-company/:id", AppController.deleteCompany);
  router.post("/deactivate-product/:id", AppController.deactivateProduct);
  router.post("/activate-product/:id", AppController.deactivateProduct);
  router.post("/edit-product/:id", AppController.editProduct);
  router.post("/delete-product/:id", AppController.deleteProduct);
};
