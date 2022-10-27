const { knexDb } = require("../../../utils/routes.imports.utils");

const deactivateCompany = async (req, res) => {
  try {
    const id = req.params.id;

    await knexDb(`[PMS].[dbo].[Products]`)
      .update({
        is_active: 0,
      })
      .where({ products_id: id });

    res.status(200).send({
      message: "Deactivated product successfully!",
      payload: req?.body,
    });
  } catch (err) {
    res.status(404).send({
      message: "Error occured when deactivating product!",
      payload: err,
    });
  }
};

module.exports = deactivateCompany;
