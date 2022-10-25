const { knexDb } = require("../../../utils/routes.imports.utils");

const editCompany = async (req, res) => {
  try {
    const id = req.params.id;

    await knexDb(`[PMS].[dbo].[Company]`)
      .update({
        name: req?.body?.name,
        address: req?.body?.address,
        phone_no: req?.body?.phone_no,
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
      message: "Error occured when editing when adding company!",
      payload: err,
    });
  }
};

module.exports = editCompany;
