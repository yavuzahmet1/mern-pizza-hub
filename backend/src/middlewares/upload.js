import multer from "multer";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

    const isMimeValid = allowedTypes.includes(file.mimetype);

    const ext = path.extname(file.originalname).toLowerCase();
    const isExtValid = allowedExtensions.includes(ext);

    if (isMimeValid && isExtValid) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG or WebP formats are accepted!"), false);
    }
  },
});

export default upload;
