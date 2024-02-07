const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getAllClients = async (req, res) => {
  try {
    const getClients = await prisma.client.findMany();
    return res.send({ clients: getClients });
  } catch (error) {
    return res.status(500).json({ error: "Error fetching clients" });
  }
};
const createClient = async (req, res) => {
    console.log('here');
  let {
    first_name,
    last_name,
    email,
    phone_number,
    company_name,
    address,
    city,
    state,
    country,
    postal_code,
  } = req.body;

  if (!first_name) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  } else {

 

    try {
      const client = await prisma.client.create({
        data: {
          first_name,
          last_name,
          email,
          phone_number,
          company_name,
          address,
          city,
          state,
          country,
          postal_code,
        },
      });

      res.status(201).json({ client: client });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
};

const deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.client.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(201).send("Client was successfully deleted");
  } catch (error) {
    return res.status(500).send({ error: "Error deleting client" });
  }
};

module.exports = {
  getAllClients,
  createClient,
  deleteClient
};
