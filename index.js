const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const userRoute = require("./routes/user");
const bookRoute = require("./routes/book");
app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/book", bookRoute);

mongoose
  .connect(
    "mongodb+srv://Hassan:Hassan@cluster0.hpfkv.mongodb.net/Hassan?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database is connected");
    app.listen(5000, () => {
      console.log("Server is listening on port 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
