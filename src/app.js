const {
  addTodo,
  readTodos,
  deleteTodo,
  updateTodo,
} = require("../utils/crud.js");

const { validator } = require("../utils/validator.js");
const express = require("express");
const server = express();

server.use(express.json());

server.get("/todos", async (req, res) => {
  try {
    let todos = await readTodos();
    res.status(200).send(todos);
  } catch (error) {
    res.status(400).send(error);
  }
});

server.post("/todo", async (req, res) => {
  let { todo } = req.body;

  if (!validator(todo)) {
    res.status(400).send("Error! Todo cannot be saved");
    return;
  }

  let todoID = await addTodo(todo);

  res.status(200).send({
    id: todoID,
    msg: "Todo has been saved successfully!",
  });
});

server.put("/todo/:id", async (req, res) => {
  let { todo } = req.body;
  let id = req.params.id;

  if (!validator(todo)) {
    res.status(400).send("Error! Todo cannot be updated");
    return;
  }

  await updateTodo(id, todo);

  res.status(200).send("Todo successfully updated!");
});

server.delete("/todo/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await deleteTodo(id);
    res.status(200).send("Todo deleted successfully with id: " + id);
  } catch (error) {
    res.status(400).send(error);
  }
});

server.listen(4000, () => {
  console.log("Express Server is up and running");
});