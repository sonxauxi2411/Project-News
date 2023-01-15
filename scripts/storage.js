"use strict";

//hàm lưu dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//lấy dữ liệu từ local
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];
//chuyển đổi
const userArr = users.map((user) => parseUser(user));

//lấy dữ liệu đăng nhập
let currentUser = getFromStorage("currentUser")
  ? parseUser(getFromStorage("currentUser"))
  : null;

//lấy dự liệu todo từ local
let todo = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];
//chuyển đổi
let todoArr = todo.map((todo) => pareseTodo(todo));
console.log(userArr);
//hàm chuyển đổi về dạng class
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.password,
    userData.pageSize,
    userData.category
  );

  return user;
}

//hàm chuyển đổi về dạng class
function pareseTodo(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
