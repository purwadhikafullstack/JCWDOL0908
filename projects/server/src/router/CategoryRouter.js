const express = require("express");
const router = express.Router();
const { CategoryController } = require("../controller");
const { tokenDecoder, isAdmin, isUser } = require("../middleware/TokenDecoder");
const { isSuperAdmin } = require("../middleware/IsSuperAdmin");

router.post("/", tokenDecoder, isAdmin, isSuperAdmin, CategoryController.createNewCategory);
router.get("/",  CategoryController.getCategories);
router.patch("/delete/:id_category", tokenDecoder, isAdmin, isSuperAdmin, CategoryController.deleteCategory);
router.patch("/edit/:id_category", tokenDecoder, isAdmin, isSuperAdmin, CategoryController.editCategory);

module.exports = router;
