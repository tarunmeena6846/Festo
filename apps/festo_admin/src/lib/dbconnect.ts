import { mongoose } from "mongoose";
let alreadyDone = false;

export async function ensureDbConnected() {
  if (alreadyDone) {
    return;
  }
  alreadyDone = true;
  console.log("tarun inside ensuredbconnected");
  await mongoose.connect(process.env.MONGODB_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    dbName: "festo",
  });
}
