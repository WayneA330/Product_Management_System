const express = require("express");
const router = express();
/**
 * setting headers
 */
router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,DELETE,PUT,POST"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,contentType,Content-Type,Accept,Authorization,GALLERY_API_KEY"
  );
  next();
});

module.exports = router;
