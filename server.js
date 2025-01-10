import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Get the current directory using __dirname workaround in ES module
const __dirname = path.resolve();

const app = express();
dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = "Portfolio";
const collectionName = "Contact";
const PORT = process.env.PORT || 3000;

mongoose.connect(uri)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
});

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());


// Handle root route and serve index.html
app.get("/", (req, res) => {
  res.sendFile = path.join(__dirname, "public", "index.html");
});

const contactSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone_no: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
});

const Contact = mongoose.model("Contact", contactSchema);

app.post("/api/contact", async (req, res) => {
  try {
    const { first_name, last_name, phone_no, email, description } = req.body;


    if (!first_name || !last_name || !phone_no || !email || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({ first_name, last_name, phone_no, email, description });
    await newContact.save();

    res.status(201).json({ message: "Contact info saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
