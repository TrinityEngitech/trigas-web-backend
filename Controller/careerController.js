const Career = require("../model/Career");

exports.createCareer = async (req, res) => {
  try {
    const career = await Career.create(req.body);

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: career,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllCareers = async (req, res) => {
  try {
    const careers = await Career.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: careers.length,
      data: careers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getWebsiteCareers = async (req, res) => {
  try {
    const careers = await Career.find({
      status: true,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: careers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(
      req.params.id
    );

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      data: career,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCareer = async (req, res) => {
  try {
    const career =
      await Career.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: career,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteCareer = async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(
      req.params.id
    );

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};