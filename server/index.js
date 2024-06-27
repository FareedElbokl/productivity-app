import express from "express";
import cors from "cors";
import router from "./routes/jwtAuth.js";
import routerDash from "./routes/user.js";
import routerSesh from "./routes/session.js";
import routerTodo from "./routes/todo.js";

const app = express();
const port = 3000;

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//ROUTES
//register and login routes
app.use("/auth", router);
//dashboard(homepage) route (gives us info on a user based on their token)
app.use("/dashboard", routerDash);
//Study session routes
app.use("/session", routerSesh);
//todo task routes
app.use("/todos", routerTodo);

app.listen(port, () => [console.log(`Server running on port ${port}`)]);
