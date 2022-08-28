const { knexDb } = require("../../../utils/routes.imports.utils");

const example = async (req, res) => {
  try {
    await knexDb(`[TESTS].[dbo].[test]`).insert({
      item: req?.body?.item,
    });

    res.status(200).send({
      message: "Example successful!",
      payload: req?.body,
    });
  } catch (err) {
    console.log(err);
    res.status(404).send({
      message: "Example failed!",
    });
  }
};

module.exports = example;
