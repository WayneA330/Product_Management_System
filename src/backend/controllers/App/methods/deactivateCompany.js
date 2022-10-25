const { knexDb } = require("../../../utils/routes.imports.utils");

const deactivateCompany = async (req, res) => {
  try {
    const id = req.params.id;

    await knexDb(`[PMS].[dbo].[Company]`)
      .update({
        is_active: 0,
      })
      .where({ company_id: id });

    res.status(200).send({
      message: "Deactivated company successfully!",
      payload: req?.body,
    });
  } catch (err) {
    res.status(404).send({
      message: "Error occured when deactivating company!",
      payload: err,
    });
  }
};

module.exports = deactivateCompany;
