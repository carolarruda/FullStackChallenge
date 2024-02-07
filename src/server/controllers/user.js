const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");
const secret = process.env.JWT_SECRET;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 11;

const getUsers = async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.status(200).json({ users: allUsers, status: "success" });
  } catch (error) {
    res.status(500).json({ error: "Error fetching users", status: "error" });
  }
};
const registerUser = async (req, res) => {
  console.log('got here');
  const { username, password } = req.body;
  const findUser = await prisma.user.findUnique({
    where: { username: username },
  });

  const hash = await bcrypt.hash(password, saltRounds);
  try {
    if (!findUser) {
      const user = await prisma.user.create({
        data: {
          username: username,
          password: hash,
        },
      });
      res.status(201).json({ user: user, status: "success" });
    } else {
      return res.status(409).json({ error: "The username is already taken" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const logUser = async (req, res) => {
  const { username, password } = req.body;
  console.log('got here', username, password);

  const user = await prisma.user.findUnique({
    where: { username: username },
    select: { password: true, id: true },
  });
  const createToken = (payload, secret) => {
    const token = jwt.sign(payload, secret);
    return token;
  };

  if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      hasAccess(result);
    });
  } else {
    return res.status(404).json({ error: "User not in system" });
  }

  function hasAccess(result) {
    if (result) {
      console.log("Access Granted!");
      const payload = { username, password };
      const myToken = createToken(payload, secret);
      return res.status(200).json({
        status: "success",
        data: { token: myToken, userId: user.id, username: username },
      });
    } else {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  }
};

module.exports = {
  getUsers,
  registerUser,
  logUser,
};
