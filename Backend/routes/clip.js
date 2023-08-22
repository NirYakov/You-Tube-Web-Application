const express = require("express");

const ClipController = require("../controllers/clip");
const middleWareJwt = require("../middleware/check-auth");

const router = express.Router();

router.post("/create", middleWareJwt, ClipController.createClip); // create or post a clip

router.get("/:link", middleWareJwt, ClipController.getClip); // get one clip

router.get("/", middleWareJwt, ClipController.getAllUserClips); // get all clips

router.put("/:id", middleWareJwt, ClipController.updatedClip); // put / update clip

router.delete("/:link", middleWareJwt, ClipController.deleteClip); // delete a clip

module.exports = router;