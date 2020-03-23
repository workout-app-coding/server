"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var tent_dome_1 = require("tent-dome");
dotenv_1.config();
tent_dome_1.Tent.init({
    "mongodb uri": process.env.MONGODB_URI,
    "auth user": "User",
    "auth signup": false,
    "auth email token": "email",
    "auth password token": "password",
    "auth activation token": "active",
    "auth secret": process.env.JWT_SECRET,
    "permission payload role": "roles",
});
tent_dome_1.Tent.app().all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});
require("./models/users/users");
tent_dome_1.Tent.register();
tent_dome_1.Tent.start(parseInt(process.env.PORT || "3000")).then(function () {
    console.log("\n\nTent Server has started.");
});
