const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const authentication = require('./Routes/Authentication');
const dotenv = require('dotenv');
const connectTODB = require('./DB/connect');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
dotenv.config();

app.use("/api", authentication);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectTODB()

}
);
