import path from "path";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import courses from "./controllers/courses";
import logger from "./helper/logger";
dotenv.config();

const app = express();
app.use("/api", courses());
if (process.env.NODE_ENV !== "production") app.use(cors());
const port = process.env.PORT || 8000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", function (_, res) {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  });
}

app.listen(port, () => {
  logger.info(`server running on port ${port}`);
});
