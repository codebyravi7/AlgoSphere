import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { cloudinaryConnect } from "./config/cloudinary.js";
import path from "path";
import multer from "multer";
import { addPost, editPost } from "./controllers/post.controller.js";
import { fileURLToPath } from "url";



const __filName = fileURLToPath(import.meta.url)
const __dirname = path.resolve();

//resolving cors issue

import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";
import questionRoutes from "./routes/question.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import protectRoute from "./middleware/protectRoute.js";

dotenv.config();
// import messageRoutes from "./routes/message.routes.js";


const app = express();
app.use(cookieParser());
cloudinaryConnect();

const PORT = process.env.PORT || 5000;

app.use(express.json());


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

app.use(express.static(path.join(__dirname, '/frontend/dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist" , "index.html"))
})

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
