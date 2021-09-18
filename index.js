const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const env = require("dotenv");
env.config();
const userRoute = require("./routes/user");
const bookRoute = require("./routes/book");
const authRoute = require("./routes/auth");
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/book", bookRoute);
app.use('/auth',authRoute)



mongoose
  .connect(
   process.env.MONGODB_CONNECTION_STRING
  )
  .then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => {
      console.log("Server is listening on port 5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
