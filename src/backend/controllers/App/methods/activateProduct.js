const { knexDb } = require("../../../utils/routes.imports.utils");

const activateCompany = async (req, res) => {
  try {
    const id = req.params.id;

    await knexDb(`[PMS].[dbo].[Products]`)
      .update({
        is_active: 1,
      })
      .where({ products_id: id });

    res.status(200).send({
      message: "Activated product successfully!",
      payload: req?.body,
    });
  } catch (err) {
    res.status(404).send({
      message: "Error occured when activating product!",
      payload: err,
    });
  }
};

module.exports = activateCompany;
