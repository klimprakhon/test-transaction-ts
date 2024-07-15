import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const filename = `${new Date().getTime()}${Math.round(
      Math.random() * 100000
    )}.${file.mimetype.split("/")[1]}`;

    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

export default upload;
