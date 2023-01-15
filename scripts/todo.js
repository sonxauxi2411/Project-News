"use strict";

//khai báo biến
const taskInput = document.getElementById("input-task");
const addBtn = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");
const close = document.getElementsByClassName("close");

addBtn.addEventListener("click", function () {
  // điều kiện nhập title != rỗng
  if (taskInput.value.trim() === "") {
    alert(`vui lòng nhập Title !!`);
  } else {
    //khai báo nhập todo
    const todo = new Task(taskInput.value, currentUser.userName, false);
    //thoả điều kiện
    todoArr.push(todo);
    saveToStorage("todoArr", todoArr);
    displayTodo();
    taskInput.value = "";
  }
});

//toggle task
const taskCheck = function () {
  //lặp phần tử con của todo-list là thẻ li với itemes là từng li
  document.querySelectorAll("#todo-list li").forEach((items) => {
    //bắt sự kiện click của từng items (li)
    items.addEventListener("click", function (e) {
      // console.log(e.target);
      // console.log(items.children[0]);
      //loại bỏ sự kiện trên phần tử con của li
      if (e.target !== items.children[0]) {
        //thêm checked vào class li với toggle
        items.classList.toggle("checked");
        //tìm todo từ todoArr thoả điều kiện
        //lấy đúng phần tử cần thêm
        const todo = todoArr.find(
          (todoItems) =>
            todoItems.owner === currentUser.userName &&
            todoItems.task === items.textContent.slice(0, -1)
        );
        //isDone true khi có checked, false khi ko checked
        todo.isDone = items.classList.contains("checked") ? true : false;
        saveToStorage("todoArr", todoArr);
        console.log("click");
      }
    });
  });
};

// //xoá task todolist
const deleteTodo = function () {
  //lặp qua phần tử con của todo-list là close với items từng close
  document.querySelectorAll("#todo-list .close").forEach((items) => {
    //bắt sự kiện click close
    items.addEventListener("click", function () {
      //tìm vị trí của task cần xoá từ findIndex
      //findIndex trả về index của phần tử tìm thấy và -1 khi ko tìm thấy

      const index = todoArr.findIndex(
        (element) =>
          element.owner === currentUser.userName &&
          element.task === items.parentElement.textContent.slice(0, -1)
      );
      //xoá đi phần tử đã tìm với index
      todoArr.splice(index, 1);
      saveToStorage("todoArr", todoArr);
      displayTodo();
    });
  });
};

const displayTodo = function () {
  let html = "";
  todoArr
    .filter((items) => items.owner === currentUser.userName)
    .forEach((items) => {
      html += `<li class='${items.isDone ? "checked" : ""}' >${
        items.task
      }<span class="close"  >×</span></li>`;
    });
  todoList.innerHTML = html;
  taskCheck();
  deleteTodo();
};
displayTodo();
