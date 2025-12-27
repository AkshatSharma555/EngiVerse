import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import { app, server, io } from "./socket/socket.js";

// Models
import "./models/userModel.js";

// Route Imports
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import savedJobRouter from "./routes/savedJobRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import friendRoutes from "./routes/friendRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import interviewRoutes from './routes/interviewRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import marketplaceRouter from './routes/marketplaceRoutes.js';

const port = process.env.PORT || 4000;
connectDB();

// Make io accessible to controllers via req.app.get('io')
app.set("io", io);

// Middlewares
app.use(express.json());
app.use(cookieParser());


app.use(cors({ 
    origin: true, 
    credentials: true 
}));

// API Endpoints
app.get("/", (req, res) => res.send("API Working"));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter); 
app.use("/api/users", userRouter); 
app.use("/api/dashboard", dashboardRouter);
app.use("/api/profile", profileRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/saved-jobs", savedJobRouter);
app.use("/api/tasks", taskRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/resume', resumeRouter);
app.use('/api/marketplace', marketplaceRouter);

// Start Server (Using 'server' from socket.js, not 'app.listen')
server.listen(port, () =>
  console.log(`Server (with Socket.IO) started on PORT:${port}`)
);