const express = require(`express`);

const userRouter = require(`./routes/userRoutes`);
const eventRouter = require(`./routes/eventRoutes`);

const app = express();

//BODY PARSER
app.use(express.json());

//MOUNT ROUTERS
app.use(`/api/users`, userRouter);
app.use(`/api/events`, eventRouter);

module.exports = app;
