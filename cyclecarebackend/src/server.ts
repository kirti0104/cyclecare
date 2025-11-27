import expresss from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import allRoutes from './routes/index';
const app=expresss();
dotenv.config();
app.use(json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/v1", allRoutes);

const startServer = async () => {

   await connectDB();
  app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
  });
};

startServer();
