import express from "express";
import { getUserData, EditProfile } from "../controller/profile.js";
import { authMiddleware } from "../Middleware/Authmiddlewere.js";
const ProfileRoutes = express.Router()

ProfileRoutes.get("/getUserData/:id", getUserData);
ProfileRoutes.put("/editprofile/:id", EditProfile);

export default ProfileRoutes;