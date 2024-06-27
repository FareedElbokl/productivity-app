import express from "express";
const routerDash = express.Router();
import bcrypt from "bcrypt";
import authorization from "../middleware/authorization.js";
import pool from "../db.js";

//all this does is give back the username of the logged in user based on their token.
//the authorization middleware gives us back the user id (which it got from the token)

routerDash.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "select username from Users where user_id = $1",
      [req.user]
    );

    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("server error");
  }
});

export default routerDash;
