const express = require("express");
const bodyParser = require("body-parser");
const bookRoutes = require("./src/routes/bookRoutes");
const memberRoutes = require("./src/routes/memberRoutes");
const setupSwagger = require("./src/swagger");

const app = express();
app.use(bodyParser.json());

app.use("/books", bookRoutes);
app.use("/members", memberRoutes);

setupSwagger(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
