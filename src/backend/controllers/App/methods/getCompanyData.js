const { knexDb } = require("../../../utils/routes.imports.utils");

const getCompanyData = async (req, res) => {
  try {
    const response = await knexDb.raw("SELECT * FROM [PMS].[dbo].[Company]");

    res.status(200).send({
      message: "Got company data successfully!",
      payload: response,
    });
  } catch (err) {
    res.status(404).send({
      message: "Error occured when getting company data!",
      payload: err,
    });
  }
};

module.exports = getCompanyData;
