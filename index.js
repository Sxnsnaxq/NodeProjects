const express = require("express");
const cors = require("cors");
const { swaggerSpecs, swaggerUI } = require("./swagger")
const cookieParser = require("cookie-parser");
const apiRouter = require("./routes/api");
const apiRouterV2 = require("./routes/apiv2");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  }));
app.use(cookieParser());
app.use("/api/v1", apiRouter);
app.use("/api/v2", apiRouterV2);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

const port = 8080;
app.listen(port, () => {
  console.log("Server listening on port:" + port);
});
