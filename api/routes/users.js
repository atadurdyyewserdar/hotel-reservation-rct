import express from "express";
import {getUsers, deleteUser, getUser, updateUser} from "../controllers/users.js";

const router = express.Router();

//UPDATE
router.put("/:id", updateUser);
//DELETE
router.delete("/:id", deleteUser);
//GET
router.get("/:id", getUser);
//GET ALL
router.get("/", getUsers);

export default router;
