const { knexDb } = require("../../../utils/routes.imports.utils");

const getProductData = async (req, res) => {
  try {
    const response = await knexDb.raw(
      `SELECT P.products_id, P.name, P.price, P.stock, P.bar_code, P.is_active, P.company_id, C.name as company_name
    FROM [PMS].[dbo].[Products] P
    JOIN [PMS].[dbo].[Company] C
    ON P.company_id = C.company_id
    WHERE C.is_active = 1
    `
    );

    res.status(200).send({
      message: "Got product data successfully!",
      payload: response,
    });
  } catch (err) {
    res.status(404).send({
      message: "Error occured when getting product data!",
      payload: err,
    });
  }
};

module.exports = getProductData;
