import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

export const Admin = mongoose.model("Festo_admin", adminSchema);
