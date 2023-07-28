import multer from "multer";
const maxSize = 200 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
});

export default upload;
