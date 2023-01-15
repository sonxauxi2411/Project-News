"use strict";

//khai báo biến
const pageSizeInput = document.querySelector("#input-page-size");
const categoryInput = document.querySelector("#input-category");
const saveBtn = document.querySelector("#btn-submit");
//bắt sự kiện click save
saveBtn.addEventListener("click", function () {
  //điều kiện input
  if (parseInt(pageSizeInput.value) <= 0 || pageSizeInput.value === "") {
    alert("New page ko hợp lệ !!");
  } else {
    //gán pageSize và category vào input
    currentUser.pageSize = pageSizeInput.value;
    currentUser.category = categoryInput.value;
    saveToStorage("currentUser", currentUser);
    //thay đổi userArr để có được giá trị của pagesize và category
    const index = userArr.findIndex(
      (items) => items.userName === currentUser.userName
    );
    userArr[index] = currentUser;

    saveToStorage("userArr", userArr);
    alert(`Cài đặt thành công!!`);
    pageSizeInput.value = "";
  }
});
