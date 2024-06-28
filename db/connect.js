const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/TODO-APP";

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("DB succefully connected");
  } catch (error) {
    console.log(error);
  }
};

connectDB(connectionString);

// mongoose
//   .connect(connectionString)
//   .then(() => console.log("DB connected successfully"))
//   .catch((err) => console.log(err));
