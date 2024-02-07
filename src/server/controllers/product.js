const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getAllProducts = async (req, res) => {
  try {
    const getProducts = await prisma.product.findMany();
    return res.status(200).send({ products: getProducts });
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(201).send("Product was successfully deleted");
  } catch (error) {
    return res.status(500).send({ error: "Error deleting product" });
  }
};

module.exports = {
  getAllProducts,
  deleteProduct,
};
