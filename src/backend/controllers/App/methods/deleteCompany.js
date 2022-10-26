const { knexDb } = require("../../../utils/routes.imports.utils");

const deleteCompany = async (req, res) => {
  try {
    const company_id = req.params.id;

    knexDb.transaction(async (trx) => {
      await trx.raw(`
            DELETE FROM [PMS].[dbo].[Company] WHERE company_id = '${company_id}'
        `);

      await trx.raw(`
            DELETE FROM [PMS].[dbo].[Products] WHERE company_id = '${company_id}'
        `);
    });

    res.status(200).send({
      message: "Deleted company successfully!",
      payload: req.body,
    });
  } catch (err) {
    res.status(404).send({
      message: "Error occured when deleting company!",
      payload: err,
    });
  }
};

module.exports = deleteCompany;
