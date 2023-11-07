import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

export const Admin =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export const Event =
  mongoose.models.Event || mongoose.model("Event", eventSchema);
