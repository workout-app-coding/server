"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tent_dome_1 = require("tent-dome");
var bcrypt = require("bcrypt-nodejs");
exports.User = tent_dome_1.Tent.Entity("User", {
    email: String,
    password: String,
    roles: [String],
    active: Boolean,
    last_edited: Date
});
exports.User.Schema.method('setPassword', function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
});
exports.User.Routes.create()
    .pre("save", function (req, res, next) {
    var document = req.tent.document;
    if (document.setPassword)
        document.setPassword(req.tent.document.password);
    next();
});
exports.User.Routes.update()
    .pre("save", function (req, res, next) {
    var document = req.tent.document;
    if (document.setPassword)
        document.setPassword(req.tent.document.password);
    next();
});
exports.User.Routes.read();
exports.User.Routes.list();
exports.User.Routes.delete();
exports.User.register();
