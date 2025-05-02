import express from "express";
import cors from "cors";
import fs from "fs-extra";
import path from "path";

const app = express();
const PORT = 3001;

const TEMP_FOLDER = path.join('public', 'temp');

app.use(cors());
app.use(express.json());

// 📂 Serve cached images statically
app.use("/images", express.static(TEMP_FOLDER));

app.post("/save-users", async (req, res) => {
  try {
    const users = req.body;
    const filepath = path.join("users.json");
    await fs.writeJson(filepath, users, { spaces: 2 });

    console.log("✅ users.json updated successfully!");
    res.status(200).send("Users saved successfully.");
  } catch (error) {
    console.error("❌ Error saving users.json:", error.message);
    res.status(500).send("Failed to save users.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server is running at http://localhost:${PORT}`);
});
