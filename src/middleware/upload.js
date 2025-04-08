import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/bills");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `bill-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

export const upload = multer({ storage });