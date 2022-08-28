const express = require("express");
const logger = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("./cors");
const routes = require("./routes/api_routes");

const PORT = 3088;

const app = express();

app.use(
  logger(
    ":method :url => Status: :status, Content length: :res[content-length], Response Time: :response-time ms "
  )
);
app.use(cors);
app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(helmet());

routes(app);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
