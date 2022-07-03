const express = require("express");
const db = require("../database/db");
const userController = require("../controllers/userController");
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-'  + file.originalname
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter:fileFilter
})
// Get all users
router.get("/", userController.get_All);
router.post("/", upload.single('personal_image'), userController.new_user);
router.get("/:userId", userController.get_user);
router.put("/:userId",upload.single('personal_image'), userController.update_user);
router.delete("/:userId", userController.delete_user);

module.exports = router;
