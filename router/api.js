const express = require("express");
const router = new express.Router();
const usersController = require("../controller/user");
const blogsController = require("../controller/blog");
const isAuth = require("../middleware/auth")

router.post("/blog/create", blogsController.create);
router.get("/blog/:id", blogsController.indexMe);
router.get("/blog/user/:id", blogsController.index);
router.get("/blog", blogsController.findAll);
router.delete("/blog/:id", blogsController.delete);
router.put("/blog/:id", blogsController.update);
router.delete("/blog/temp/:id", blogsController.tempDelete);

router.post("/user/signUp", usersController.signUp);
router.post("/user/signIn", usersController.signIn);
router.get("/user/:id", usersController.indexMe);
router.get("/user/email/:email", usersController.indexDefault);
router.get("/user", isAuth, usersController.index);
router.put("/user/:id", usersController.update);
module.exports = router;