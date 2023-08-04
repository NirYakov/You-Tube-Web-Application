const express = require("express");

const CategoryController = require("../controllers/category");

const router = express.Router();

router.post("/create", CategoryController.createCategory); // create or post a Category

router.get("/:id", CategoryController.getCategory); // get one Category

router.get("/", CategoryController.getAllCategories); // get all Categories