const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const reserveRouter = require("./routes/reserve");
const jukeboxRouter = require("./routes/jukebox");
const studyAssocRouter = require("./routes/studyAssociation");
const eventRouter = require("./routes/event");
const backOfficeRouter = require("./routes/backoffice");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/reserve", reserveRouter);
app.use("/jukebox", jukeboxRouter);
app.use("/studyassociation", studyAssocRouter);
app.use("/events", eventRouter);
app.use("/backoffice", backOfficeRouter);

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
