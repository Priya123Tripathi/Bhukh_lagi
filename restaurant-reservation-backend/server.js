require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes =require("./routes/auth");
const restaurantRoutes =require("./routes/restaurant");
const reservationRoutes =require("./routes/reservation");
const cors = require("cors");

const menuRoutes=require("./routes/menu");

const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://bhukh-lagi.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());

app.use((req,res,next)=>{
   console.log("BODY FROM SERVER =>", req.body);
   next();
});
app.use("/api/restaurants",restaurantRoutes);
app.use("/api/auth",authRoutes);
app.use( "/api/menu",menuRoutes);
app.use("/api/reservations",reservationRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


app.get("/", (req, res) => {
  res.send("Backend Running Successfully ");
});
app.listen(process.env.PORT, () => {
   console.log("Server Running");
});