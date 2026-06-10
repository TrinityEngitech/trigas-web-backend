// routes/careerRoutes.js

const express = require("express");
const router = express.Router();

const {
  createCareer,
  getAllCareers,
  getWebsiteCareers,
  getCareerById,
  updateCareer,
  deleteCareer,
} = require("../controller/careerController");

router.post("/", createCareer);

router.get("/website", getWebsiteCareers);

router.get("/", getAllCareers);

router.get("/:id", getCareerById);

router.put("/:id", updateCareer);

router.delete("/:id", deleteCareer);

module.exports = router;