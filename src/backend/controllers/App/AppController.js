const addCompany = require("./methods/addCompany");
const getCompanyData = require("./methods/getCompanyData");
const deactivateCompany = require("./methods/deactivateCompany");
const activateCompany = require("./methods/activateCompany");
const editCompany = require("./methods/editCompany");

const AppController = {
  addCompany,
  getCompanyData,
  deactivateCompany,
  activateCompany,
  editCompany,
};

module.exports = AppController;
