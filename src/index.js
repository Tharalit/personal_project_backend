require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/auth-route");
const notFoundMiddleware = require("./middlewars/notFound");
const errorMiddleware = require("./middlewars/error");
const cors = require("cors");
const newsRouter = require("./routes/news-route");
const authenticate = require("./middlewars/authenticate");
const commentsRouter = require("./routes/comment-route");
const favoriteRouter = require("./routes/favorite-route");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/news", newsRouter);
app.use("/comments",commentsRouter)
app.use("/favorites",favoriteRouter)

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(process.env.PORT || 8000, () =>
  console.log(`${process.env.PORT} is running`)
);
