const { knexDb } = require("../../../utils/routes.imports.utils");

const addCompany = async (req, res) => {
  try {
    await knexDb(`[PMS].[dbo].[Company]`).insert({
      name: req?.body?.name,
      address: req?.body?.address,
      phone_no: req?.body?.phone_no,
      is_active: 1,
    });

    res.status(200).send({
      message: "Added company successfully!",
      payload: req?.body,
    });
  } catch (err) {
    res.status(404).send({
      message: "Error occured when adding when adding company!",
      payload: err,
    });
  }
};

module.exports = addCompany;
