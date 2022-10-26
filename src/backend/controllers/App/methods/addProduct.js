const { knexDb } = require("../../../utils/routes.imports.utils");

const addProduct = async (req, res) => {
  try {
    const { name, price, stock, bar_code, company_id } = req?.body;

    await knexDb(`[PMS].[dbo].[Products]`).insert({
      name,
      price,
      stock,
      bar_code,
      company_id,
      is_active: 1,
    });

    res.status(200).send({
      message: "Added product successfully!",
      payload: req?.body,
    });
  } catch (err) {
    res.status(404).send({
      message: "Error occured when adding product!",
      payload: err,
    });
  }
};

module.exports = addProduct;
