const express = require("express");
const authRoutes = require("./routes/auth");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
