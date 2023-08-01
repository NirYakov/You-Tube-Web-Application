const express = require("express");

const ClipController = require("../controllers/clip");

const router = express.Router();

router.post("/create", ClipController.createClip); // create or post a clip

router.get("/:id", ClipController.getClip); // get one clip

router.get("/", ClipController.getAllUserClips); // get all clips

router.put("/:id", ClipController.updatedClip); // put / update clip

router.delete("/:id", ClipController.deleteClip); // delete a clip

module.exports = router;