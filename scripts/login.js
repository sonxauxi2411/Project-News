"use strict";
//khai báo biến
const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const loginBtn = document.getElementById("btn-submit");

//hàm bắt sụ kiện click login
loginBtn.addEventListener("click", function () {
  //điều kiện login
  const isValidate = validate();
  if (isValidate) {
    //sự dụng find để tìm username và passs
    //sự dụng && vì cần thoả cả 2
    const user = userArr.find(
      (items) =>
        items.userName === userNameInput.value &&
        items.password === passwordInput.value
    );
    //nếu tìm thấy username và pass thì thông báo thành công
    if (user) {
      alert("đăng nhập thành công");
      //lưu user đăng nhập (tìm được) vào local currentUsser
      saveToStorage("currentUser", user);
      window.location.href = "../index.html";
    } else {
      //không tìm thấy user và pass trùng nhau
      alert("username và password không đúng");
    }
  }
});

//điều kiện khi đăng nhập
function validate() {
  //userName và password ko được để trống
  let isValidate = true;
  if (userNameInput.value.trim() === "") {
    alert(`Vui lòng nhập username`);
    isValidate = false;
  }
  if (passwordInput.value === "") {
    alert(`vui lòng nhập password`);
    isValidate = false;
  }
  return isValidate;
}
