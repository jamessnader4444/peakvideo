import multer from "multer";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";
import dotenv from "dotenv";

dotenv.config();
const maxSize = 200 * 1024 * 1024;

const s3Config = new AWS.S3({
  accessKeyId: process.env.AWS_IAM_USER_KEY,
  secretAccessKey: process.env.AWS_IAM_USER_SECRET,
  region: "us-east-1",
});
// local storage
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
//external storage
const multerS3Config = multerS3({
  s3: s3Config,
  acl: "public-read",
  bucket: process.env.AWS_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

let upload = multer({
  storage: multerS3Config,
  limits: { fileSize: maxSize },
});

export default upload;
