const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const authRouter = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

app.use("/", authRouter);

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
