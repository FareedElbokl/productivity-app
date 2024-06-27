import express from "express";
const routerSesh = express.Router();
import pool from "../db.js";
import authorization from "../middleware/authorization.js";

//the idea here is that we get hold of the userid from the token using the authorization middleware

//CREATE STUDY SESSION
//when making this request from client, must pass in token and Content-Type: application/json in header
routerSesh.post("/create", authorization, async (req, res) => {
  try {
    //1 destructure the body and get hold of user_id from authorization middleware
    const userId = req.user;
    const { session_date, duration_minutes } = req.body;
    console.log(req.user);
    console.log(req.body);

    //2 place this information in the db, in the sessions table
    const sessionInput = await pool.query(
      "INSERT INTO Sessions (user_id, session_date, duration_minutes, created_at) VALUES ($1, $2, $3, NOW()) RETURNING*",
      [userId, session_date, duration_minutes]
    );

    //3 send back the new session's info as json
    res.json(sessionInput.rows[0]); //send back this newly created session row in the sessions table
  } catch (error) {
    console.error(error.message);
  }
});

//RETREIVE ALL STUDY SESSIONS FOR A USER
//when making this request from client, must pass in token in header.
routerSesh.get("/all", authorization, async (req, res) => {
  try {
    //1 get hold of user_id from authorization middleware
    const user_id = req.user;

    //2 get hold of all rows from the sessions table pertaining to userID
    const allUsersSessions = await pool.query(
      "select * from Sessions where user_id = $1",
      [user_id]
    );

    //3 check if sessions exist
    if (allUsersSessions.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No sessions found for this user" });
    }

    //4 send back all session rows pertaining to this user
    res.status(200).json(allUsersSessions.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//DELETE A SPECIFIC STUDY SESSION
//when making request from client, mustpass in token in header (and content type applicaiton/json),and session id in params
routerSesh.delete("/delete/:sessionId", authorization, async (req, res) => {
  try {
    //1 get hold of the session id from params and user id from middleware
    const { sessionId } = req.params;
    const user_id = req.user;

    //2 sql query to delete the session of that id from the database
    const deleteSession = await pool.query(
      "delete from Sessions where session_id = $1 and user_id = $2 returning*",
      [sessionId, user_id]
    );

    // 3. Check if the session was found and deleted
    if (deleteSession.rows.length === 0) {
      // No session was deleted, meaning it doesn't exist or doesn't belong to the user
      return res
        .status(404)
        .json({ message: "Session not found or not authorized to delete" });
    }

    //4 send success message back to client
    res.status(200).send("Session Deleted Successfully");
  } catch (error) {
    console.error(error.message);
  }
});

//DELETE ALL OF A USER'S STUDY SESSIONS (CLEAR HISTORY)
//to make req, add token in headers
routerSesh.delete("/delete", authorization, async (req, res) => {
  try {
    //1 get hold of user id
    const user_id = req.user;

    //2 sql query to delete all sessions of this specific user
    const deleteAll = await pool.query(
      "delete from Sessions where user_id = $1 returning*",
      [user_id]
    );

    //3 check if any sessions were deleted. if deleteAll.rows is empty, then none existed in first place
    if (deleteAll.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No sessions were found for this user." });
    }

    //4 Send success message back to client
    res.json("All sessions succesfully deleted.");
  } catch (error) {
    console.error(error.message);
  }
});

export default routerSesh;
