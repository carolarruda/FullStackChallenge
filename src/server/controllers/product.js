const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getAllProducts = async (req, res) => {
  const getProducts = await prisma.product.findMany();
  return res.send({ products: getProducts });
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
    console.error("Error deleting product:", error);
    return res.status(500).send({ error: "Error deleting product" });
  }
};

module.exports = {
  getAllProducts,
  deleteProduct,
};
