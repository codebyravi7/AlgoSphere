import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { cloudinaryConnect } from "./backend/config/cloudinary.js";
import path from "path";
import multer from "multer";
import { addPost, editPost } from "./backend/controllers/post.controller.js";


//resolving cors issue

import authRoutes from "./backend/routes/auth.routes.js";
import postRoutes from "./backend/routes/post.routes.js";
import userRoutes from "./backend/routes/user.routes.js";
import questionRoutes from "./backend/routes/question.routes.js";
import connectToMongoDB from "./backend/db/connectToMongoDB.js";
import protectRoute from "./backend/middleware/protectRoute.js";

dotenv.config();
// import messageRoutes from "./routes/message.routes.js";


const app = express();
app.use(cookieParser());
cloudinaryConnect();

// const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("home route");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

app.post(
  "/api/post/add/:id/:qid",
  protectRoute,
  upload.single("file"),
  addPost
);
app.put("/api/post/edit", protectRoute, upload.single("file"), editPost);

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/question", questionRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
