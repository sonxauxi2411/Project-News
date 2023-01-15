"use strict";

//khai báo biến
const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const confirmPasswordInput = document.getElementById("input-password-confirm");
const submitBtn = document.getElementById("btn-submit");

//hàm sự kiện click register
submitBtn.addEventListener("click", function () {
  //khai báo biến user nhập vào từ hàm User
  const user = new User(
    firstNameInput.value,
    lastNameInput.value,
    userNameInput.value,
    passwordInput.value
  );

  //khai báo biến điền kiện
  const isValidate = validate(user);
  //nếu isValidate = true (thoả điền kiện)
  if (isValidate) {
    //thêm user vào userArr
    userArr.push(user);
    //hàm lưu vào local
    saveToStorage("userArr", userArr);
    //thoả điều kiện đăng ký chuyển qua đăng nhập
    //location.href: trả về url
    window.location.href = "../pages/login.html";
  }
});

//hàm điền kiện khi nhập vào input
const validate = function (user) {
  //đặt 1 biến true
  let isValidate = true;
  //input không để trống
  if (user.firstName.trim() === "") {
    alert("Vui lòng nhập First Name");
    isValidate = false;
  }
  if (user.lastName.trim() === "") {
    alert("Vui lòng nhập Last Name");
    isValidate = false;
  }

  if (user.userName.trim() === "") {
    alert("Vui lòng nhập Username");
    isValidate = false;
  }
  //pass ko sự dụng trim() vì space cũng là 1 ký tự
  if (user.password === "") {
    alert("Vui lòng nhập Password");
    isValidate = false;
  }
  //không được có userName trùng nhau
  //sự dụng vòng lặp, lặp qua user có trong local
  for (let i = 0; i < userArr.length; i++) {
    if (user.userName === userArr[i].userName) {
      alert(`${user.userName} đã được sự dụng`);
      isValidate = false;
    }
  }

  //password và confirmpassword khác nhau
  //confirmPasswordInput.value -> User ko khai báo confirmpass
  if (user.password !== confirmPasswordInput.value) {
    alert("vui lòng nhập password giống nhau !!");
    isValidate = false;
  } //password nhiều hơn 8
  if (user.password.length <= 8) {
    alert("Password phải nhiều hơn 8 ký tự ");
    isValidate = false;
  }
  return isValidate;
};
