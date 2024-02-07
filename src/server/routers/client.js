const express = require("express");

const {  getAllClients, createClient, deleteClient } = require("../controllers/client");

const router = express.Router();


router.get('/', getAllClients)
router.post("/", createClient);
router.delete("/:id", deleteClient)

module.exports = router;
