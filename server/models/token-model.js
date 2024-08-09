/*
============================================
; Title:  token-model.js
; Author: gabe purselley
; Date:   6 Aug 24
; Description: mongoose model for the tokens.
;   this model will export to ./routes/...
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// starting off with a user schema that will be used in the token schema
const userSchema = new Schema({
  userId: String,
  userOrg: String,
  dateIssued: String,
  dateReturned: String,
});
// creating a token schema that will be exported
const tokenSchema = new Schema({
  tokenId: { type: Number, required: true, unique: true },
  tokenAvailable: { type: Boolean },
  currentUser: [userSchema],
  previousUser: [userSchema],
});
// export the schema
module.exports = mongoose.model("Token", tokenSchema);
