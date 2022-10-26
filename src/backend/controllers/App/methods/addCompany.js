const { knexDb } = require("../../../utils/routes.imports.utils");

const addCompany = async (req, res) => {
  try {
    const { name, address, phone_no } = req?.body;

    await knexDb(`[PMS].[dbo].[Company]`).insert({
      name,
      address,
      phone_no,
      is_active: 1,
    });

    res.status(200).send({
      message: "Added company successfully!",
      payload: req?.body,
    });
  } catch (err) {
    res.status(404).send({
      message: "Error occured when adding company!",
      payload: err,
    });
  }
};

module.exports = addCompany;
