// model/CareerApplication.js

const mongoose = require("mongoose");

const careerApplicationSchema = new mongoose.Schema(
  {
    careerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    currentLocation: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    resume: {
      type: String,
      required: true,
    },

    coverLetter: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Shortlisted",
        "Interview Scheduled",
        "Selected",
        "Rejected",
      ],
      default: "Applied",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CareerApplication",
  careerApplicationSchema
);