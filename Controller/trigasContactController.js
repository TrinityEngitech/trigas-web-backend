const nodemailer = require("nodemailer");
// contact
const TrigasContactSchema = require("../model/trigasContactSchema");

// contact
module.exports.trigasContact = async (req, res) => {
  try {
    console.log(req.body);
    let data = await TrigasContactSchema.create(req.body);

    const { email, name, message, number } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "info@trigas.in",
        pass: "xdipnleveyvanwmk", 
      },
    });

    // 1️⃣ Mail to Customer
    const customerMail = {
      from: "info@trigas.in",
      to: email,
      subject: "Your Recent Inquiry with TRIGAS COMPANY",
      html: `<h2>Dear Customer</h2>
             <p>Thank you for reaching out to us through our contact form. We have received your message and will be happy to assist you.</p>
             <p>Our team is currently reviewing your inquiry and will get back to you. 
             If you need immediate assistance, please feel free to reach out to us via:</p>
             <ul>
               <li>Phone Call: +91 8866210228</li>
               <li>WhatsApp: +91 8866210228</li>
             </ul>
             <p>We appreciate your patience and look forward to helping you!</p>
             <h4>Best regards,</h4>
             <h5>TRIGAS</h5>`,
    };

    // 2️⃣ Mail to Your Team
    const teamMail = {
      from: "info@trigas.in",
      to: "info@trigas.in", // your internal/team email
      subject: `New Inquiry from ${name}`,
      html: `<h3>New contact form submission from TRIGAS:</h3>
             <ul>
               <li><strong>Name:</strong> ${name}</li>
               <li><strong>Email:</strong> ${email}</li>
               <li><strong>Phone:</strong> ${number}</li>
               <li><strong>Message:</strong> ${message}</li>
               <p>Check the admin panel or reach out to the customer if needed.</p>
             </ul>`,
    };

    // First send to customer
    transporter.sendMail(customerMail, (error, info) => {
      if (error) {
        console.log("Error sending customer email:", error);
        return res.status(500).json({ status: 500, error });
      } else {
        // Then send to your team
        transporter.sendMail(teamMail, (teamErr, teamInfo) => {
          if (teamErr) {
            console.log("Error sending team email:", teamErr);
            return res.status(500).json({ status: 500, teamErr });
          }
          res
            .status(201)
            .json({ status: 201, info: { customer: info, team: teamInfo } });
        });
      }
    });
  } catch (error) {
    console.error("Error processing contact:", error);
    res.status(400).json({ msg: "Data not submitted", error });
  }
};

// contact Inquiry
module.exports.trigasAdminDashboard = async (req, res) => {
  try {
    const contacts = await TrigasContactSchema.find({});
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
};

// New method to delete a single contact by ID
module.exports.trigasDeleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    await TrigasContactSchema.findByIdAndDelete(id);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Error deleting contact" });
  }
};

// New method to delete multiple contacts
module.exports.trigasDeleteContacts = async (req, res) => {
  const { ids } = req.body; // Expecting an array of IDs in the request body
  try {
    await TrigasContactSchema.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: "Contacts deleted successfully" });
  } catch (error) {
    console.error("Error deleting contacts:", error);
    res.status(500).json({ message: "Error deleting contacts" });
  }
};
