import {register, login, logout, getUserData} from "../controller/Auth.js";
import express from "express";
const AuthRoutes = express.Router()

//sub regisatration route
AuthRoutes.post("/register", register)
AuthRoutes.post("/login", login)
AuthRoutes.post("/logout", logout)
AuthRoutes.get("/getUserData/:id", getUserData)

export default AuthRoutes;