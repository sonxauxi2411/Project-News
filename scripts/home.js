"use strict";

//khai báo biến
const loginModal = document.getElementById("login-modal");
const welcome = document.getElementById("welcome-message");
const logoutBtn = document.getElementById("btn-logout");

//hàm kiểm tra trong local có giá trị hay ko
const displayHome = function () {
  // currentUser=true có giá trị trong local
  if (currentUser) {
    loginModal.style.display = "none";
    welcome.innerHTML = `<h2>Welcome ${currentUser.userName}</h2>`;
    // welcome.style.fontSize = "22px";
    //currentUser = false ko có giá trị
  } else {
    loginModal.style.display = "block";
  }
};

displayHome();

//hàm bắt sự kiện click logout
logoutBtn.addEventListener("click", function () {
  //khai báo logout xác nhận muốn out hay ko
  const logout = confirm(`Bạn muốn thoát không ?`);
  //logout = true
  if (logout) {
    //removeItem: xoá currentUser
    localStorage.removeItem("currentUser");
    loginModal.style.display = "block";
    welcome.innerHTML = ``;
  }
});
