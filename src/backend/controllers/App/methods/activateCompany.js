const { knexDb } = require("../../../utils/routes.imports.utils");

const activateCompany = async (req, res) => {
  try {
    const id = req.params.id;

    await knexDb(`[PMS].[dbo].[Company]`)
      .update({
        is_active: 1,
      })
      .where({ company_id: id });

    res.status(200).send({
      message: "Activated company successfully!",
      payload: req?.body,
    });
  } catch (err) {
    res.status(404).send({
      message: "Error occured when activating company!",
      payload: err,
    });
  }
};

module.exports = activateCompany;
