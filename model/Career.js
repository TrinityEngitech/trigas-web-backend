const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    employmentType: {
      type: String,
      enum: [
        "Full Time",
        "Part Time",
        "Contract",
        "Internship",
        "Remote",
      ],
      default: "Full Time",
    },

    experience: {
      type: String,
      required: true,
    },

    vacancies: {
      type: Number,
      default: 1,
    },

    description: {
      type: String,
      required: true,
    },

    requirements: [
      {
        type: String,
      },
    ],

    lastDateToApply: {
      type: Date,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Career", careerSchema);