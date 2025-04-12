const express = require("express");
const trigasRoutes = express.Router();

const trigasAdminCtl = require("../Controller/trigasContactController");

trigasRoutes.post("/contact", trigasAdminCtl.trigasContact);
trigasRoutes.get("/adminDashboard", trigasAdminCtl.trigasAdminDashboard);
trigasRoutes.delete('/adminDashboard/:id', trigasAdminCtl.trigasDeleteContact); // Delete a specific contact by ID
trigasRoutes.delete('/adminDashboard', trigasAdminCtl.trigasDeleteContacts); // Delete multiple contacts

module.exports = trigasRoutes;
