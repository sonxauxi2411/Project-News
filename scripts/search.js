"use strict";
//khai báo biến
const queryInput = document.querySelector("#input-query");
const searchBtn = document.querySelector("#btn-submit");
const prevBtn = document.querySelector("#btn-prev");
const nextBtn = document.querySelector("#btn-next");
const newContainer = document.querySelector("#news-container");
const pageNum = document.querySelector("#page-num");
const navPage = document.querySelector("#nav-page-num");

const dataNew = async function (key, page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${key}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=59c9820e9daf45fa8ce818709a42f2a3`
    );
    const data = await res.json();

    displayNew(data);
  } catch (err) {
    alert(err.message);
  }
};

//dataNew("us", 1);
let totalResults;
const displayNew = function (data) {
  let html = "";
  totalResults = data.totalResults;

  data.articles.forEach((items) => {
    html += `<div class= 'py-2' style="width:100%">
      <div class="row p-2 border">
      <div class="col-md-4 "  >
        <img
          src="${items.urlToImage ? items.urlToImage : null}"
          alt=""
          width="100%"
        />
      </div>
      <div class="col-md-8  ">
        <h5>${items.title}</h5>
        <p>${items.description ? items.description : ""}</p>
        <a href="${items.url}" target="_blank" class="btn btn-primary">view</a>
      </div>
    </div>
      </div>`;
    newContainer.innerHTML = html;
    checkPrev();
    checkNext();
  });
};

nextBtn.addEventListener("click", function () {
  dataNew("us", ++pageNum.textContent);
});

prevBtn.addEventListener("click", function () {
  dataNew("us", --pageNum.textContent);
});

const checkPrev = function () {
  pageNum.textContent == 1
    ? (prevBtn.style.display = "none")
    : (prevBtn.style.display = "block");
};
const checkNext = function () {
  let maxPage = Math.ceil(totalResults / currentUser.pageSize);
  pageNum.textContent == maxPage
    ? (nextBtn.style.display = "none")
    : (nextBtn.style.display = "block");
};

//bỏ next vs prev khi search mới hiện
navPage.style.display = "none";
//bắt sự kiện tìm kiếm
searchBtn.addEventListener("click", function () {
  if (queryInput.value.trim() === "") {
    alert(` Không có từ khoá bạn đang tìm !`);
  }
  dataNew(queryInput.value, 1);
  pageNum.textContent = 1;
  navPage.style.display = "block";
  checkPrev();
  checkNext();
});
