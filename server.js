import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import  categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import verifyToken from "./middlewares/verifyToken.js"
dotenv.config();

const app = express();
connectDB();

const PORT = process.env.PORT || 5000;

app.use(express.json())

app.use("/uploads", express.static("uploads"))
app.use("/api/auth", authRoutes)

app.use("/api/categories/",verifyToken,categoryRoutes)
app.use("/api/products/",verifyToken,productRoutes)

app.listen(PORT, ()=> 
{
    console.log (`Server running on port : ${PORT}`)
})