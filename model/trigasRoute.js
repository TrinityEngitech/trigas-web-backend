const express = require("express");
const routes = express.Router();

const trigasAdminCtl = require("../Controller/trigasContactController");
const passport = require("passport");

routes.post("/login",  trigasAdminCtl.login)
routes.get("/logout", trigasAdminCtl.logout)


routes.post("/contact", passport.checkAuthentication, trigasAdminCtl.trigasContact);
routes.get("/adminDashboard", passport.checkAuthentication, trigasAdminCtl.trigasAdminDashboard);
routes.post("/addAdmin", passport.checkAuthentication, trigasAdminCtl.addAdmin);
routes.get("/viewAdmin", passport.checkAuthentication, trigasAdminCtl.viewAdmin);
routes.get("/profile", passport.checkAuthentication,  trigasAdminCtl.profile);



module.exports = routes;
