import express from "express";
import dotenv from "dotenv";
import db from "./config/database.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
// import Users from "./models/UserModel.js";
import router from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";
import upload from "./middleware/Upload.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected...");
  // await Users.sync();
} catch (error) {
  console.error(error);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.use(express.static(path.resolve(__dirname, "./client/build/")));
app.get("/uploads/:file", (req, res) => {
  const { file } = req.params;
  res.sendFile(path.join(__dirname, `./uploads/${file}`));
});
app.post("/api/uploads/file", upload.single("file"), uploadFile);

function uploadFile(req, res) {
  console.log(req.file);
  res.json({ filename: req.file.filename });
}
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
