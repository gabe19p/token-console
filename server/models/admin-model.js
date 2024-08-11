/*
============================================
; Title:  admin-model.js
; Author: gabe purselley
; Date:   11 Aug 24
; Description: mongoose model for the admin.
;   this model will export to ./routes/...
;===========================================
*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  userName: { type: String },
  password: { type: String },
});

module.exports = mongoose.model("Admin", adminSchema);
