const addCompany = require("./methods/addCompany");
const getCompanyData = require("./methods/getCompanyData");
const deactivateCompany = require("./methods/deactivateCompany");
const activateCompany = require("./methods/activateCompany");
const editCompany = require("./methods/editCompany");
const getCompanyName = require("./methods/getCompanyName");
const addProduct = require("./methods/addProduct");
const getProductData = require("./methods/getProductData");
const deleteCompany = require("./methods/deleteCompany");

const AppController = {
  addCompany,
  getCompanyData,
  deactivateCompany,
  activateCompany,
  editCompany,
  getCompanyName,
  addProduct,
  getProductData,
  deleteCompany,
};

module.exports = AppController;
