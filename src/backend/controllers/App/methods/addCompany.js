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
      message: "Example successful!",
      payload: req?.body,
    });
  } catch (err) {
    res.status(404).send({
      message: "Example failed!",
      payload: err,
    });
  }
};

module.exports = addCompany;
