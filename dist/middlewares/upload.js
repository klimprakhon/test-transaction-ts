"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const filename = `${new Date().getTime()}${Math.round(Math.random() * 100000)}.${file.mimetype.split("/")[1]}`;
        cb(null, filename);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
