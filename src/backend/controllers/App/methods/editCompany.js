const { knexDb } = require("../../../utils/routes.imports.utils");

const editCompany = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, address, phone_no } = req?.body;

    await knexDb(`[PMS].[dbo].[Company]`)
      .update({
        name,
        address,
        phone_no,
      })
      .where({
        company_id: id,
      });

    res.status(200).send({
      message: "Edited company successfully!",
      payload: req?.body,
    });
  } catch (err) {
    res.status(404).send({
      message: "Error occured when editing company!",
      payload: err,
    });
  }
};

module.exports = editCompany;
