const { knexDb } = require("../../../utils/routes.imports.utils");

const deleteProduct = async (req, res) => {
  try {
    const product_id = req.params.id;

    await knexDb.raw(`
        DELETE FROM [PMS].[dbo].[Products] WHERE products_id = '${product_id}'
    `);

    res.status(200).send({
      message: "Deleted product successfully!",
      payload: req.body,
    });
  } catch (err) {
    res.status(404).send({
      message: "Error occured when deleting product!",
      payload: err,
    });
  }
};

module.exports = deleteProduct;
