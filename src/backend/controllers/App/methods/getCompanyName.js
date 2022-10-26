const { knexDb } = require("../../../utils/routes.imports.utils");

const getCompanyName = async (req, res) => {
  try {
    const response = await knexDb.raw(
      "SELECT company_id, name from [PMS].[dbo].[Company] WHERE is_active = 1"
    );

    res.status(200).send({
      message: "Got company names successfully!",
      payload: response,
    });
  } catch (err) {
    res.status(404).send({
      message: "Error occured when getting company names!",
      payload: err,
    });
  }
};

module.exports = getCompanyName;
