const express = require("express");

const {  getAllProducts, deleteProduct } = require("../controllers/product");

const router = express.Router();


router.get('/', getAllProducts)
router.delete('/:id', deleteProduct)


module.exports = router;
