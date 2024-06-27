import express from "express";
const routerTodo = express.Router();
import pool from "../db.js";
import authorization from "../middleware/authorization.js";

//CREATE A TODO ITEM
//to make req, add token and content type in headers. Also add json body that contains the task description
routerTodo.post("/", authorization, async (req, res) => {
  try {
    //1 Get hold of user id from auth middleware, and task description from the body
    const user_id = req.user;
    const { task } = req.body;

    //2 place the todo in the database
    const addedTodo = await pool.query(
      "insert into Todos (user_id, task) values ($1, $2) returning*",
      [user_id, task]
    );

    //send the newly created todo back to client side
    res.status(201).json(addedTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//GET ALL TODOS
//pass token in headers of request.
routerTodo.get("/all", authorization, async (req, res) => {
  try {
    //1 Get hold of user id from auth middleware
    const user_id = req.user;

    //2 Get hold of todos from database
    const allTodos = await pool.query(
      "select * from Todos where user_id = $1",
      [user_id]
    );

    //3 check if sessions exist
    if (allTodos.rows.length === 0) {
      return res.status(404).json({ message: "No todos found for this user" });
    }

    //send back the todos to the user
    res.status(200).json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//DELETE A USER'S TODO ITEM (either due to completion or just wanting to delete it)
//add token and content type in headers of request, add todo id in url
routerTodo.delete("/item/:todoId", authorization, async (req, res) => {
  try {
    //1 get hold of user id from auth middleware and todo id from params
    const user_id = req.user;
    const { todoId } = req.params;

    //2 Delete that specific todo for that specific user from the db
    const deletedTodo = await pool.query(
      "delete from Todos where user_id = $1 and todo_id = $2 returning*",
      [user_id, todoId]
    );

    //3 check that the todo task was deleted
    if (deletedTodo.rows.length === 0) {
      return res.status(404).json({ message: "Todo failed to delete" });
    }

    //4 send back the deleted todo to the user
    res.status(200).json(deletedTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//DELETE ALL OF A USER'S TODO ITEM
//add token in headers of request
routerTodo.delete("/all", authorization, async (req, res) => {
  try {
    //1 Get hold of user id from auth middleware
    const user_id = req.user;

    //2 delete all todos from db pertaining to user
    const deletedTodos = await pool.query(
      "delete from Todos where user_id = $1 returning*",
      [user_id]
    );

    //3 check if any todos were actually deleted
    if (deletedTodos.rows.length === 0) {
      return res.status(404).json({ message: "No todos to delete" });
    }

    //4 Send back a success message to the client side
    res.status(200).json("All todos successfully deleted");
  } catch (error) {
    console.error(error.message);
  }
});

//UPDATE A TODO ITEM
//add token in headers of request along with content-type application/json, also add json body containing updated todo task description and todo id in params
routerTodo.put("/item/:todoId", authorization, async (req, res) => {
  try {
    //1 get hold of user id from auth middleware, todo id from params and new task description from body
    const user_id = req.user;
    const { updatedTask } = req.body;
    const { todoId } = req.params;

    //2 in the db, update the todo
    const updatedTodo = await pool.query(
      "UPDATE Todos SET task = $1, updated_at = NOW() WHERE todo_id = $2 AND user_id = $3 RETURNING *;",
      [updatedTask, todoId, user_id]
    );

    //3 check if todo was actually found and updated
    if (updatedTodo.rows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    //4 Send back success message to client side and the updated todo from db
    res.status(200).json({
      message: "Todo task description updated successfully",
      updatedTodo: updatedTodo.rows[0],
    });
  } catch (error) {
    console.error(error.message);
  }
});

export default routerTodo;
