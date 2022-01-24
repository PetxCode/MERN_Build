const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const storeModel = require("../model/storeModel");
const multer = require("multer");
const path = require("path");

router.get("/users", async (req, res) => {
  try {
    const getUsers = await userModel.find();
    res.status(200).json({
      message: "all users found",
      totalUsers: getUsers.length,
      data: getUsers,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.get("/store", async (req, res) => {
  try {
    const getStore = await storeModel.find();
    res.status(200).json({
      message: "all items found",
      totalUsers: getStore.length,
      data: getStore,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const hsalt = await bcrypt.genSalt(10);
    const real = await bcrypt.hash(password, hsalt);

    const createUser = await userModel.create({
      name,
      email,
      password: real,
    });

    res.status(201).json({ message: "user created", data: createUser });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const pCheck = await bcrypt.compare(req.body.password, user.password);

      if (pCheck) {
        const { password, ...data } = user._doc;

        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
          },
          "ThisISMySEcREtKEY",
          { expiresIn: "1d" }
        );

        res.status(201).json({
          message: `Wecome back ${user.name}`,
          data: { ...data, token },
        });
      } else {
        res.status(401).json({ message: "your password is incorrect" });
      }
    } else {
      res.status(401).json({ message: "user not found in my database..." });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

const verified = (req, res, next) => {
  try {
    const authToken = req.headers.authorization;

    if (authToken) {
      const token = authToken.split(" ")[2];

      if (token) {
        jwt.verify(token, "ThisISMySEcREtKEY", (error, payload) => {
          if (error) {
            res.status(401).json({ message: "Check your Credentials Again" });
          } else {
            req.user = payload;
            next();
          }
        });
      } else {
        res.status(401).json({ message: "Check your Credentials" });
      }
    } else {
      res.status(401).json({
        message: "You do not have credentail right for this Operation",
      });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

router.patch("/user/:id", verified, async (req, res) => {
  try {
    // req.user.id === req.params.id ||
    if (req.user.isAdmin) {
      const updateUser = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
        },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "user has been updated", data: updateUser });
    } else {
      res.status(200).json({ message: "You can't do this operation" });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("image");

router.post("/upload", upload, async (req, res) => {
  try {
    const uploadImage = await storeModel.create({
      name: req.body.name,
      price: req.body.price,
      image: req.file.path,
    });

    res.status(201).json({ message: "item created", data: uploadImage });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
