const { knexDb } = require("../../../utils/routes.imports.utils");

const editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, price, stock, bar_code, company_id } = req?.body;

    await knexDb(`[PMS].[dbo].[Products]`)
      .update({
        name,
        price,
        stock,
        bar_code,
        company_id,
      })
      .where({
        products_id: id,
      });

    res.status(200).send({
      message: "Edited product successfully!",
      payload: req?.body,
    });
  } catch (err) {
    res.status(404).send({
      message: "Error occured when editing product!",
      payload: err,
    });
  }
};

module.exports = editProduct;
