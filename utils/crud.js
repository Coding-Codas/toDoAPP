const fs = require("fs");

let todos = [];

const addTodo = (todo) => {
  todos.push(todo);
  console.log(todos);
  return new Promise((resolve, reject) => {
    fs.writeFile("./data/data.json", JSON.stringify(todos), (err) => {
      if (err) {
        reject(err);
      }
      resolve(todos.length - 1);
    });
  });
};

const readTodos = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/data.json", { encoding: "utf-8" }, (err, data) => {
      if (err) {
        reject(err);
      }
      todos = JSON.parse(data);
      resolve(todos);
    });
  });
};

const updateTodo = (id, todo) => {
  todos[id] = todo;
  return new Promise((resolve, reject) => {
    fs.writeFile("./data/data.json", JSON.stringify(todos), (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

const deleteTodo = (id) => {
  todos.splice(id, 1);
  console.log(todos);
  return new Promise((resolve, reject) => {
    fs.writeFile("./data/data.json", JSON.stringify(todos), (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

module.exports = { addTodo, readTodos, deleteTodo, updateTodo };
