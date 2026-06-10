const CareerApplication = require(
  "../model/CareerApplication"
);


exports.createApplication = async (
  req,
  res
) => {
  try {
    const application =
      await CareerApplication.create(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getAllApplications =
  async (req, res) => {
    try {
      const applications =
        await CareerApplication.find()
          .populate(
            "careerId",
            "jobTitle department location"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        count: applications.length,
        data: applications,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


  exports.getApplicationById =
  async (req, res) => {
    try {
      const application =
        await CareerApplication.findById(
          req.params.id
        ).populate("careerId");

      if (!application) {
        return res.status(404).json({
          success: false,
          message:
            "Application not found",
        });
      }

      res.status(200).json({
        success: true,
        data: application,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  exports.updateApplicationStatus =
  async (req, res) => {
    try {
      const application =
        await CareerApplication.findByIdAndUpdate(
          req.params.id,
          {
            status: req.body.status,
          },
          {
            new: true,
          }
        );

      if (!application) {
        return res.status(404).json({
          success: false,
          message:
            "Application not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Status updated successfully",
        data: application,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  exports.deleteApplication =
  async (req, res) => {
    try {
      const application =
        await CareerApplication.findByIdAndDelete(
          req.params.id
        );

      if (!application) {
        return res.status(404).json({
          success: false,
          message:
            "Application not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Application deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };