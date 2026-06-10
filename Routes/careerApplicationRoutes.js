// Routes/careerApplicationRoutes.js

const express = require("express");

const router = express.Router();

const {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} = require(
  "../Controller/careerApplicationController"
);

router.post("/", createApplication);

router.get("/", getAllApplications);

router.get("/:id", getApplicationById);

router.put(
  "/:id/status",
  updateApplicationStatus
);

router.delete(
  "/:id",
  deleteApplication
);

module.exports = router;